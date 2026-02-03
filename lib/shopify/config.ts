// Shopify Storefront API Configuration

export const shopifyConfig = {
  storeDomain: process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || '',
  storefrontAccessToken: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN || '',
  apiVersion: process.env.NEXT_PUBLIC_SHOPIFY_API_VERSION || '2024-10',
}

export function getStorefrontApiUrl(): string {
  return `https://${shopifyConfig.storeDomain}/api/${shopifyConfig.apiVersion}/graphql.json`
}

export function getStorefrontHeaders(): HeadersInit {
  return {
    'Content-Type': 'application/json',
    'X-Shopify-Storefront-Access-Token': shopifyConfig.storefrontAccessToken,
  }
}

export function isShopifyConfigured(): boolean {
  return Boolean(
    shopifyConfig.storeDomain &&
    shopifyConfig.storefrontAccessToken
  )
}
