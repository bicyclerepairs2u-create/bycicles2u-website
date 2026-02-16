// Shopify Admin API Client (server-side only)
// Uses OAuth Client Credentials Grant for Dev Dashboard apps
import { getAdminApiUrl, getAdminHeaders, isAdminConfigured } from './config'
import { getAccessToken, isTokenManagerConfigured } from './token-manager'
import {
  STAGED_UPLOADS_CREATE_MUTATION,
  PRODUCT_CREATE_MUTATION,
  PRODUCT_VARIANT_UPDATE_MUTATION,
  GET_PUBLICATIONS_QUERY,
  PUBLISHABLE_PUBLISH_MUTATION,
  GET_LOCATIONS_QUERY,
  INVENTORY_SET_QUANTITIES_MUTATION,
} from './admin-queries'
import type {
  StagedUploadsCreateResponse,
  ProductCreateResponse,
  ProductVariantUpdateResponse,
  PublicationsQueryResponse,
  PublishablePublishResponse,
  StagedUploadTarget,
  LocationsQueryResponse,
  InventorySetQuantitiesResponse,
} from './admin-types'

// Generic fetch for Admin API (server-side only)
async function adminFetch<T>(
  query: string,
  variables: Record<string, unknown> = {}
): Promise<T> {
  if (!isAdminConfigured() || !isTokenManagerConfigured()) {
    throw new Error(
      'Shopify Admin API is not configured. Please set SHOPIFY_CLIENT_ID and SHOPIFY_CLIENT_SECRET environment variables.'
    )
  }

  // Get a valid access token (automatically refreshes if expired)
  const accessToken = await getAccessToken()

  const response = await fetch(getAdminApiUrl(), {
    method: 'POST',
    headers: getAdminHeaders(accessToken),
    body: JSON.stringify({ query, variables }),
  })

  if (!response.ok) {
    const text = await response.text()
    throw new Error(`Admin API error: ${response.status} - ${text}`)
  }

  const json = await response.json()

  if (json.errors) {
    throw new Error(json.errors.map((e: { message: string }) => e.message).join(', '))
  }

  return json.data
}

// Create staged upload URLs for images
export async function createStagedUploads(
  files: { filename: string; mimeType: string; fileSize: number }[]
): Promise<StagedUploadTarget[]> {
  const input = files.map((f) => ({
    filename: f.filename,
    mimeType: f.mimeType,
    resource: 'IMAGE',
    httpMethod: 'POST',
    fileSize: f.fileSize.toString(),
  }))

  const data = await adminFetch<StagedUploadsCreateResponse>(
    STAGED_UPLOADS_CREATE_MUTATION,
    { input }
  )

  if (data.stagedUploadsCreate.userErrors.length > 0) {
    throw new Error(
      data.stagedUploadsCreate.userErrors.map((e) => e.message).join(', ')
    )
  }

  return data.stagedUploadsCreate.stagedTargets
}

// Create product with media
export async function createProduct(
  productInput: Record<string, unknown>,
  mediaUrls: string[]
): Promise<{
  id: string
  handle: string
  title: string
  variants?: { edges: { node: { id: string; inventoryItem?: { id: string } } }[] }
} | null> {
  const media = mediaUrls.map((url, index) => ({
    originalSource: url,
    mediaContentType: 'IMAGE',
    alt: `Product image ${index + 1}`,
  }))

  const data = await adminFetch<ProductCreateResponse>(PRODUCT_CREATE_MUTATION, {
    input: productInput,
    media,
  })

  if (data.productCreate.userErrors.length > 0) {
    throw new Error(
      data.productCreate.userErrors.map((e) => e.message).join(', ')
    )
  }

  return data.productCreate.product
}

// Get Online Store publication ID
export async function getOnlineStorePublicationId(): Promise<string | null> {
  try {
    const data = await adminFetch<PublicationsQueryResponse>(GET_PUBLICATIONS_QUERY)

    // Find the Online Store publication
    const onlineStore = data.publications.edges.find(
      (edge) =>
        edge.node.name === 'Online Store' ||
        edge.node.name.toLowerCase().includes('online store')
    )

    return onlineStore?.node.id || null
  } catch (error) {
    // This typically fails if the app doesn't have read_publications scope
    console.warn('Could not fetch publications (missing read_publications scope?):', error)
    return null
  }
}

// Publish product to Online Store
export async function publishProduct(productId: string): Promise<boolean> {
  try {
    const publicationId = await getOnlineStorePublicationId()

    if (!publicationId) {
      console.warn('Online Store publication not found - product will not be auto-published. Add read_publications scope to enable auto-publishing.')
      return false
    }

    const data = await adminFetch<PublishablePublishResponse>(
      PUBLISHABLE_PUBLISH_MUTATION,
      {
        id: productId,
        input: [{ publicationId }],
      }
    )

    if (data.publishablePublish.userErrors.length > 0) {
      console.error(
        'Publish errors:',
        data.publishablePublish.userErrors.map((e) => e.message).join(', ')
      )
      return false
    }

    return true
  } catch (error) {
    console.warn('Could not auto-publish product:', error)
    return false
  }
}

// Update variant price and optionally compareAtPrice
export async function updateVariantPrice(
  productId: string,
  variantId: string,
  price: string,
  compareAtPrice?: string
): Promise<void> {
  const variantInput: { id: string; price: string; compareAtPrice?: string } = {
    id: variantId,
    price,
  }

  // Only add compareAtPrice if it's provided and valid
  if (compareAtPrice && parseFloat(compareAtPrice) > 0) {
    variantInput.compareAtPrice = compareAtPrice
  }

  const data = await adminFetch<ProductVariantUpdateResponse>(
    PRODUCT_VARIANT_UPDATE_MUTATION,
    {
      productId,
      variants: [variantInput],
    }
  )

  if (data.productVariantsBulkUpdate.userErrors.length > 0) {
    throw new Error(
      data.productVariantsBulkUpdate.userErrors.map((e) => e.message).join(', ')
    )
  }
}

// Get the primary location ID for inventory management
export async function getPrimaryLocationId(): Promise<string | null> {
  try {
    const data = await adminFetch<LocationsQueryResponse>(GET_LOCATIONS_QUERY)
    return data.locations.edges[0]?.node.id || null
  } catch (error) {
    console.warn('Could not fetch locations:', error)
    return null
  }
}

// Set inventory quantity for an item at a location
export async function setInventoryQuantity(
  inventoryItemId: string,
  locationId: string,
  quantity: number
): Promise<void> {
  const data = await adminFetch<InventorySetQuantitiesResponse>(
    INVENTORY_SET_QUANTITIES_MUTATION,
    {
      input: {
        reason: 'correction',
        setQuantities: [
          {
            inventoryItemId,
            locationId,
            quantity,
          },
        ],
      },
    }
  )

  if (data.inventorySetOnHandQuantities.userErrors.length > 0) {
    throw new Error(
      data.inventorySetOnHandQuantities.userErrors.map((e) => e.message).join(', ')
    )
  }
}

// Create product with media, set price, and publish
export async function createAndPublishProduct(
  productInput: Record<string, unknown>,
  mediaUrls: string[],
  price: string,
  compareAtPrice?: string
): Promise<{ id: string; handle: string; title: string } | null> {
  // Create the product first
  const product = await createProduct(productInput, mediaUrls)

  if (!product) {
    return null
  }

  // Get variant ID and update price (and compareAtPrice if provided)
  const variant = product.variants?.edges?.[0]?.node
  if (variant?.id) {
    await updateVariantPrice(product.id, variant.id, price, compareAtPrice)

    // Set inventory to 1 (each bike is unique/one-off)
    const inventoryItemId = variant.inventoryItem?.id
    if (inventoryItemId) {
      const locationId = await getPrimaryLocationId()
      if (locationId) {
        await setInventoryQuantity(inventoryItemId, locationId, 1)
      }
    }
  }

  // Publish to Online Store
  await publishProduct(product.id)

  return {
    id: product.id,
    handle: product.handle,
    title: product.title,
  }
}
