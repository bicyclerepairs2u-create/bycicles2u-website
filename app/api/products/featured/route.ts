import { NextResponse } from 'next/server'
import { getProducts, isShopifyConfigured } from '@/lib/shopify'

export async function GET() {
  if (!isShopifyConfigured()) {
    return NextResponse.json({ products: [] })
  }

  try {
    const products = await getProducts(6)
    return NextResponse.json({ products })
  } catch (error) {
    console.error('Error fetching featured products:', error)
    return NextResponse.json({ products: [] })
  }
}
