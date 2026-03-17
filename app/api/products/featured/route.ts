import { NextResponse } from 'next/server'
import { getProducts, isShopifyConfigured } from '@/lib/shopify'

export async function GET() {
  if (!isShopifyConfigured()) {
    return NextResponse.json({ products: [] })
  }

  try {
    // Fetch more products to filter from
    const allProducts = await getProducts(50)

    // Filter for products with "featured" tag (case-insensitive)
    const featuredProducts = allProducts.filter(product =>
      product.tags.some(tag => tag.toLowerCase() === 'featured')
    )

    // If we have enough featured products, return them
    if (featuredProducts.length >= 3) {
      return NextResponse.json({ products: featuredProducts.slice(0, 6) })
    }

    // Otherwise, fill remaining slots with newest non-featured products
    const nonFeaturedProducts = allProducts
      .filter(product => !product.tags.some(tag => tag.toLowerCase() === 'featured'))
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

    const combined = [
      ...featuredProducts,
      ...nonFeaturedProducts.slice(0, 6 - featuredProducts.length)
    ]

    return NextResponse.json({ products: combined })
  } catch (error) {
    console.error('Error fetching featured products:', error)
    return NextResponse.json({ products: [] })
  }
}
