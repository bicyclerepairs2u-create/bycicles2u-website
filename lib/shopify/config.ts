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

// Shopify Admin API Configuration (server-side only - no NEXT_PUBLIC prefix)
// Uses OAuth Client Credentials Grant for Dev Dashboard apps
export const shopifyAdminConfig = {
  storeDomain: process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || '',
  clientId: process.env.SHOPIFY_CLIENT_ID || '',
  clientSecret: process.env.SHOPIFY_CLIENT_SECRET || '',
  apiVersion: process.env.NEXT_PUBLIC_SHOPIFY_API_VERSION || '2024-10',
}

export function getAdminApiUrl(): string {
  return `https://${shopifyAdminConfig.storeDomain}/admin/api/${shopifyAdminConfig.apiVersion}/graphql.json`
}

export function getOAuthTokenUrl(): string {
  return `https://${shopifyAdminConfig.storeDomain}/admin/oauth/access_token`
}

export function getAdminHeaders(accessToken: string): HeadersInit {
  return {
    'Content-Type': 'application/json',
    'X-Shopify-Access-Token': accessToken,
  }
}

export function isAdminConfigured(): boolean {
  return Boolean(
    shopifyAdminConfig.storeDomain &&
    shopifyAdminConfig.clientId &&
    shopifyAdminConfig.clientSecret
  )
}
