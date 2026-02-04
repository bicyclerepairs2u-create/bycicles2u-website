// Shopify OAuth Token Manager
// Handles Client Credentials Grant flow for Dev Dashboard apps
// Tokens expire every 24 hours and are automatically refreshed

import { shopifyAdminConfig, getOAuthTokenUrl } from './config'

interface TokenCache {
  accessToken: string
  expiresAt: number // Unix timestamp in milliseconds
}

// In-memory token cache (persists across requests in the same server instance)
let tokenCache: TokenCache | null = null

// Buffer time before expiry to refresh token (1 hour before expiry)
const REFRESH_BUFFER_MS = 60 * 60 * 1000

interface TokenResponse {
  access_token: string
  scope: string
  expires_in: number
}

/**
 * Get a valid access token, fetching or refreshing as needed
 */
export async function getAccessToken(): Promise<string> {
  // Check if we have a cached token that's still valid
  if (tokenCache && tokenCache.expiresAt > Date.now() + REFRESH_BUFFER_MS) {
    return tokenCache.accessToken
  }

  // Need to fetch a new token
  const token = await fetchNewToken()
  return token
}

/**
 * Fetch a new access token using Client Credentials Grant
 */
async function fetchNewToken(): Promise<string> {
  const { clientId, clientSecret } = shopifyAdminConfig

  if (!clientId || !clientSecret) {
    throw new Error(
      'Shopify OAuth not configured. Please set SHOPIFY_CLIENT_ID and SHOPIFY_CLIENT_SECRET environment variables.'
    )
  }

  const tokenUrl = getOAuthTokenUrl()

  const response = await fetch(tokenUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: clientId,
      client_secret: clientSecret,
    }),
  })

  if (!response.ok) {
    const errorText = await response.text()
    console.error('Token fetch failed:', response.status, errorText)
    throw new Error(`Failed to get Shopify access token: ${response.status} - ${errorText}`)
  }

  const data: TokenResponse = await response.json()

  // Cache the token
  tokenCache = {
    accessToken: data.access_token,
    // expires_in is in seconds, convert to milliseconds and add to current time
    expiresAt: Date.now() + data.expires_in * 1000,
  }

  console.log(
    `Shopify access token acquired, expires in ${Math.round(data.expires_in / 3600)} hours`
  )

  return data.access_token
}

/**
 * Clear the token cache (useful for testing or forced refresh)
 */
export function clearTokenCache(): void {
  tokenCache = null
}

/**
 * Check if the token manager is properly configured
 */
export function isTokenManagerConfigured(): boolean {
  return Boolean(
    shopifyAdminConfig.storeDomain &&
    shopifyAdminConfig.clientId &&
    shopifyAdminConfig.clientSecret
  )
}
