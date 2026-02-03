import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getProductByHandle, isShopifyConfigured, formatPrice } from '@/lib/shopify'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import { AddToCartButton } from './add-to-cart-button'
import { ArrowLeft } from 'lucide-react'

interface ProductPageProps {
  params: Promise<{ handle: string }>
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { handle } = await params

  if (!isShopifyConfigured()) {
    return { title: 'Product | Bicycles2U' }
  }

  const product = await getProductByHandle(handle)

  if (!product) {
    return { title: 'Product Not Found | Bicycles2U' }
  }

  return {
    title: `${product.title} | Bicycles2U`,
    description: product.description,
    openGraph: {
      images: product.featuredImage ? [product.featuredImage.url] : [],
    },
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { handle } = await params

  if (!isShopifyConfigured()) {
    return (
      <main>
        <Navigation />
        <div className="min-h-screen bg-white">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <p className="text-gray-500">Shop is not configured yet.</p>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  const product = await getProductByHandle(handle)

  if (!product) {
    notFound()
  }

  const images = product.images.edges.map((edge) => edge.node)
  const variants = product.variants.edges.map((edge) => edge.node)
  const firstVariant = variants[0]

  return (
    <main>
      <Navigation />
      <div className="min-h-screen bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <Link
            href="/shop"
            className="mb-8 inline-flex items-center gap-2 text-sm text-gray-600 hover:text-[#0288d1]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Shop
          </Link>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
                {product.featuredImage ? (
                  <Image
                    src={product.featuredImage.url}
                    alt={product.featuredImage.altText || product.title}
                    fill
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <span className="text-gray-400">No image available</span>
                  </div>
                )}
              </div>
              {images.length > 1 && (
                <div className="grid grid-cols-4 gap-4">
                  {images.slice(0, 4).map((image, index) => (
                    <div
                      key={index}
                      className="relative aspect-square overflow-hidden rounded-lg bg-gray-100"
                    >
                      <Image
                        src={image.url}
                        alt={image.altText || `${product.title} ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              {product.vendor && (
                <p className="text-sm uppercase tracking-wide text-gray-500">{product.vendor}</p>
              )}
              <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>

              <div className="flex items-baseline gap-4">
                <p className="text-2xl font-bold text-[#0288d1]">
                  {formatPrice(product.priceRange.minVariantPrice)}
                </p>
                {firstVariant?.compareAtPrice && (
                  <p className="text-lg text-gray-500 line-through">
                    {formatPrice(firstVariant.compareAtPrice)}
                  </p>
                )}
              </div>

              {!product.availableForSale && (
                <div className="rounded-lg bg-red-50 px-4 py-3">
                  <p className="font-medium text-red-800">This item is currently sold out.</p>
                </div>
              )}

              {product.availableForSale && firstVariant && (
                <AddToCartButton variantId={firstVariant.id} />
              )}

              {product.descriptionHtml && (
                <div className="border-t pt-6">
                  <h2 className="mb-4 text-lg font-semibold text-gray-900">Description</h2>
                  <div
                    className="prose prose-sm text-gray-600"
                    dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
                  />
                </div>
              )}

              {product.tags.length > 0 && (
                <div className="border-t pt-6">
                  <h2 className="mb-4 text-lg font-semibold text-gray-900">Tags</h2>
                  <div className="flex flex-wrap gap-2">
                    {product.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
