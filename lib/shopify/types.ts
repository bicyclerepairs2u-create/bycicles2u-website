// Shopify Storefront API Types

export interface ShopifyImage {
  url: string
  altText: string | null
  width: number
  height: number
}

export interface ShopifyPrice {
  amount: string
  currencyCode: string
}

export interface ShopifyProductVariant {
  id: string
  title: string
  availableForSale: boolean
  selectedOptions: {
    name: string
    value: string
  }[]
  price: ShopifyPrice
  compareAtPrice: ShopifyPrice | null
  image: ShopifyImage | null
}

export interface ShopifyProduct {
  id: string
  handle: string
  title: string
  description: string
  descriptionHtml: string
  vendor: string
  productType: string
  tags: string[]
  availableForSale: boolean
  featuredImage: ShopifyImage | null
  images: {
    edges: {
      node: ShopifyImage
    }[]
  }
  variants: {
    edges: {
      node: ShopifyProductVariant
    }[]
  }
  priceRange: {
    minVariantPrice: ShopifyPrice
    maxVariantPrice: ShopifyPrice
  }
}

export interface ShopifyCollection {
  id: string
  handle: string
  title: string
  description: string
  image: ShopifyImage | null
  products: {
    edges: {
      node: ShopifyProduct
    }[]
  }
}

export interface ShopifyCartLineItem {
  id: string
  quantity: number
  merchandise: {
    id: string
    title: string
    product: {
      id: string
      handle: string
      title: string
      featuredImage: ShopifyImage | null
    }
    price: ShopifyPrice
    image: ShopifyImage | null
  }
}

export interface ShopifyCart {
  id: string
  checkoutUrl: string
  totalQuantity: number
  cost: {
    totalAmount: ShopifyPrice
    subtotalAmount: ShopifyPrice
    totalTaxAmount: ShopifyPrice | null
  }
  lines: {
    edges: {
      node: ShopifyCartLineItem
    }[]
  }
}

// API Response Types
export interface ShopifyResponse<T> {
  data: T
  errors?: {
    message: string
    locations?: { line: number; column: number }[]
    path?: string[]
  }[]
}

export interface ProductsResponse {
  products: {
    edges: {
      node: ShopifyProduct
      cursor: string
    }[]
    pageInfo: {
      hasNextPage: boolean
      hasPreviousPage: boolean
    }
  }
}

export interface ProductResponse {
  product: ShopifyProduct | null
}

export interface CollectionsResponse {
  collections: {
    edges: {
      node: ShopifyCollection
    }[]
  }
}

export interface CartResponse {
  cart: ShopifyCart | null
}

export interface CartCreateResponse {
  cartCreate: {
    cart: ShopifyCart | null
    userErrors: {
      field: string[]
      message: string
    }[]
  }
}

export interface CartLinesAddResponse {
  cartLinesAdd: {
    cart: ShopifyCart | null
    userErrors: {
      field: string[]
      message: string
    }[]
  }
}

export interface CartLinesUpdateResponse {
  cartLinesUpdate: {
    cart: ShopifyCart | null
    userErrors: {
      field: string[]
      message: string
    }[]
  }
}

export interface CartLinesRemoveResponse {
  cartLinesRemove: {
    cart: ShopifyCart | null
    userErrors: {
      field: string[]
      message: string
    }[]
  }
}
