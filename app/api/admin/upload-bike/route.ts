import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createAndPublishProduct } from '@/lib/shopify/admin'
import { generateTags, generateDescriptionHtml } from '@/lib/shopify/tag-generator'
import type { BikeUploadFormData } from '@/lib/shopify/admin-types'

// Verify admin session
async function verifyAdminSession(): Promise<boolean> {
  const cookieStore = await cookies()
  const session = cookieStore.get('admin_session')

  if (!session?.value) return false

  try {
    const decoded = Buffer.from(session.value, 'base64').toString()
    const [prefix, timestamp] = decoded.split(':')

    if (prefix !== 'admin') return false

    // Check if session is expired (24 hours)
    const sessionAge = Date.now() - parseInt(timestamp)
    if (sessionAge > 24 * 60 * 60 * 1000) return false

    return true
  } catch {
    return false
  }
}

export async function POST(request: NextRequest) {
  if (!(await verifyAdminSession())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { formData, imageUrls } = body as {
      formData: BikeUploadFormData
      imageUrls: string[]
    }

    // Validate required fields
    if (
      !formData.title ||
      !formData.vendor ||
      !formData.productType ||
      !formData.price
    ) {
      return NextResponse.json(
        { error: 'Missing required fields: title, vendor, productType, and price are required' },
        { status: 400 }
      )
    }

    if (!imageUrls || imageUrls.length === 0) {
      return NextResponse.json(
        { error: 'At least one image is required' },
        { status: 400 }
      )
    }

    // Generate tags
    const { allTags } = generateTags(formData)

    // Generate description with weight
    const descriptionHtml = generateDescriptionHtml(formData)

    // Build Shopify product input
    const productInput = {
      title: formData.title,
      vendor: formData.vendor,
      productType: formData.productType,
      descriptionHtml,
      tags: allTags,
      status: 'ACTIVE',
    }

    // Create product, set price, and publish to Online Store
    const product = await createAndPublishProduct(
      productInput,
      imageUrls,
      formData.price
    )

    if (!product) {
      throw new Error('Product creation returned null')
    }

    const storeDomain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN

    return NextResponse.json({
      success: true,
      product: {
        id: product.id,
        handle: product.handle,
        title: product.title,
        shopUrl: storeDomain
          ? `https://${storeDomain}/products/${product.handle}`
          : null,
        adminUrl: storeDomain
          ? `https://${storeDomain}/admin/products/${product.id.split('/').pop()}`
          : null,
      },
      generatedTags: allTags,
    })
  } catch (error) {
    console.error('Product creation error:', error)
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : 'Failed to create product',
      },
      { status: 500 }
    )
  }
}
