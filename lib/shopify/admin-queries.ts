// GraphQL mutations for Shopify Admin API

export const STAGED_UPLOADS_CREATE_MUTATION = `
  mutation stagedUploadsCreate($input: [StagedUploadInput!]!) {
    stagedUploadsCreate(input: $input) {
      stagedTargets {
        url
        resourceUrl
        parameters {
          name
          value
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`

export const PRODUCT_CREATE_MUTATION = `
  mutation productCreate($input: ProductInput!, $media: [CreateMediaInput!]) {
    productCreate(input: $input, media: $media) {
      product {
        id
        handle
        title
        variants(first: 1) {
          edges {
            node {
              id
              inventoryItem {
                id
              }
            }
          }
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`

// Mutation to set variant price (productVariantsBulkUpdate)
export const PRODUCT_VARIANT_UPDATE_MUTATION = `
  mutation productVariantsBulkUpdate($productId: ID!, $variants: [ProductVariantsBulkInput!]!) {
    productVariantsBulkUpdate(productId: $productId, variants: $variants) {
      productVariants {
        id
        price
      }
      userErrors {
        field
        message
      }
    }
  }
`

export const PRODUCT_SET_MUTATION = `
  mutation productSet($input: ProductSetInput!) {
    productSet(input: $input) {
      product {
        id
        handle
        title
      }
      userErrors {
        field
        message
      }
    }
  }
`

// Query to get the Online Store publication ID
export const GET_PUBLICATIONS_QUERY = `
  query getPublications {
    publications(first: 10) {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`

// Query to get the primary location ID (needed for inventory)
export const GET_LOCATIONS_QUERY = `
  query getLocations {
    locations(first: 1) {
      edges {
        node {
          id
        }
      }
    }
  }
`

// Mutation to set inventory quantity
export const INVENTORY_SET_QUANTITIES_MUTATION = `
  mutation inventorySetOnHandQuantities($input: InventorySetOnHandQuantitiesInput!) {
    inventorySetOnHandQuantities(input: $input) {
      inventoryAdjustmentGroup {
        id
      }
      userErrors {
        field
        message
      }
    }
  }
`

// Mutation to publish a product to sales channels
export const PUBLISHABLE_PUBLISH_MUTATION = `
  mutation publishablePublish($id: ID!, $input: [PublicationInput!]!) {
    publishablePublish(id: $id, input: $input) {
      publishable {
        availablePublicationsCount {
          count
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`
