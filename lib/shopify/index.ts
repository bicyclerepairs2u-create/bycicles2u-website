// Shopify Storefront API Client
import { getStorefrontApiUrl, getStorefrontHeaders, isShopifyConfigured } from './config'
import {
  PRODUCTS_QUERY,
  PRODUCT_BY_HANDLE_QUERY,
  COLLECTIONS_QUERY,
  COLLECTION_BY_HANDLE_QUERY,
  CART_QUERY,
  CART_CREATE_MUTATION,
  CART_LINES_ADD_MUTATION,
  CART_LINES_UPDATE_MUTATION,
  CART_LINES_REMOVE_MUTATION,
} from './queries'
import type {
  ShopifyResponse,
  ProductsResponse,
  ProductResponse,
  CollectionsResponse,
  CartResponse,
  CartCreateResponse,
  CartLinesAddResponse,
  CartLinesUpdateResponse,
  CartLinesRemoveResponse,
  ShopifyProduct,
  ShopifyCollection,
  ShopifyCart,
} from './types'

// Re-export types
export * from './types'
export { isShopifyConfigured } from './config'

// Generic fetch function for Shopify Storefront API
async function shopifyFetch<T>(
  query: string,
  variables: Record<string, unknown> = {}
): Promise<T> {
  if (!isShopifyConfigured()) {
    throw new Error('Shopify is not configured. Please check your environment variables.')
  }

  const response = await fetch(getStorefrontApiUrl(), {
    method: 'POST',
    headers: getStorefrontHeaders(),
    body: JSON.stringify({ query, variables }),
    cache: 'no-store',
  })

  if (!response.ok) {
    throw new Error(`Shopify API error: ${response.status} ${response.statusText}`)
  }

  const json: ShopifyResponse<T> = await response.json()

  if (json.errors) {
    throw new Error(json.errors.map((e) => e.message).join(', '))
  }

  return json.data
}

// Product functions
export async function getProducts(first = 20, after?: string): Promise<ShopifyProduct[]> {
  const data = await shopifyFetch<ProductsResponse>(PRODUCTS_QUERY, { first, after })
  return data.products.edges.map((edge) => edge.node)
}

export async function getProductByHandle(handle: string): Promise<ShopifyProduct | null> {
  const data = await shopifyFetch<ProductResponse>(PRODUCT_BY_HANDLE_QUERY, { handle })
  return data.product
}

// Collection functions
export async function getCollections(first = 10): Promise<ShopifyCollection[]> {
  const data = await shopifyFetch<CollectionsResponse>(COLLECTIONS_QUERY, { first })
  return data.collections.edges.map((edge) => edge.node)
}

export async function getCollectionByHandle(
  handle: string,
  productsFirst = 20
): Promise<ShopifyCollection | null> {
  const data = await shopifyFetch<{ collection: ShopifyCollection | null }>(
    COLLECTION_BY_HANDLE_QUERY,
    { handle, first: productsFirst }
  )
  return data.collection
}

// Cart functions
export async function getCart(cartId: string): Promise<ShopifyCart | null> {
  const data = await shopifyFetch<CartResponse>(CART_QUERY, { cartId })
  return data.cart
}

export async function createCart(
  lines?: { merchandiseId: string; quantity: number }[]
): Promise<ShopifyCart | null> {
  const data = await shopifyFetch<CartCreateResponse>(CART_CREATE_MUTATION, { lines })

  if (data.cartCreate.userErrors.length > 0) {
    throw new Error(data.cartCreate.userErrors.map((e) => e.message).join(', '))
  }

  return data.cartCreate.cart
}

export async function addToCart(
  cartId: string,
  lines: { merchandiseId: string; quantity: number }[]
): Promise<ShopifyCart | null> {
  const data = await shopifyFetch<CartLinesAddResponse>(CART_LINES_ADD_MUTATION, {
    cartId,
    lines,
  })

  if (data.cartLinesAdd.userErrors.length > 0) {
    throw new Error(data.cartLinesAdd.userErrors.map((e) => e.message).join(', '))
  }

  return data.cartLinesAdd.cart
}

export async function updateCartLine(
  cartId: string,
  lines: { id: string; quantity: number }[]
): Promise<ShopifyCart | null> {
  const data = await shopifyFetch<CartLinesUpdateResponse>(CART_LINES_UPDATE_MUTATION, {
    cartId,
    lines,
  })

  if (data.cartLinesUpdate.userErrors.length > 0) {
    throw new Error(data.cartLinesUpdate.userErrors.map((e) => e.message).join(', '))
  }

  return data.cartLinesUpdate.cart
}

export async function removeFromCart(
  cartId: string,
  lineIds: string[]
): Promise<ShopifyCart | null> {
  const data = await shopifyFetch<CartLinesRemoveResponse>(CART_LINES_REMOVE_MUTATION, {
    cartId,
    lineIds,
  })

  if (data.cartLinesRemove.userErrors.length > 0) {
    throw new Error(data.cartLinesRemove.userErrors.map((e) => e.message).join(', '))
  }

  return data.cartLinesRemove.cart
}

// Utility functions
export function formatPrice(price: { amount: string; currencyCode: string }): string {
  return new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: price.currencyCode,
  }).format(parseFloat(price.amount))
}

export function getFirstVariant(product: ShopifyProduct) {
  return product.variants.edges[0]?.node || null
}
