import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getProductByHandle, isShopifyConfigured, formatPrice } from '@/lib/shopify'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import { EnquireButton } from './enquire-button'
import { ProductImageGallery } from './product-image-gallery'
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
      <main className="bg-[var(--theme-bg-primary)]">
        <Navigation />
        <div className="min-h-screen">
          <div className="mx-auto max-w-7xl px-4 py-32 sm:px-6 lg:px-8">
            <p className="text-[var(--theme-text-muted)]">Shop is not configured yet.</p>
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
    <main className="bg-[var(--theme-bg-primary)]">
      <Navigation />
      <div className="min-h-screen pt-24">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <Link
            href="/shop"
            className="mb-8 inline-flex items-center gap-2 text-sm text-[var(--theme-text-muted)] hover:text-[#00d4ff] transition-colors uppercase tracking-wider font-semibold"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Shop
          </Link>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Product Images */}
            <ProductImageGallery images={images} title={product.title} />

            {/* Product Info */}
            <div className="space-y-6">
              {product.vendor && (
                <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#00d4ff]">
                  {product.vendor}
                </p>
              )}
              <h1 className="text-4xl font-black text-[var(--theme-text-primary)] uppercase tracking-tight">
                {product.title}
              </h1>

              <div className="flex items-baseline gap-4">
                <p className="text-3xl font-bold text-[#00d4ff]">
                  {formatPrice(product.priceRange.minVariantPrice)}
                </p>
                {firstVariant?.compareAtPrice && (
                  <p className="text-lg text-[var(--theme-text-muted)] line-through">
                    {formatPrice(firstVariant.compareAtPrice)}
                  </p>
                )}
              </div>

              {!product.availableForSale && (
                <div
                  className="bg-[#00d4ff]/10 border border-[#00d4ff]/30 px-4 py-3"
                  style={{
                    clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%)',
                  }}
                >
                  <p className="font-bold text-[#00d4ff] uppercase tracking-wider text-sm">
                    This item is currently sold out.
                  </p>
                </div>
              )}

              <EnquireButton
                productTitle={product.title}
                productPrice={formatPrice(product.priceRange.minVariantPrice)}
              />

              {product.descriptionHtml && (
                <div className="border-t border-[var(--theme-border)] pt-6">
                  <h2 className="mb-4 text-sm font-bold text-[var(--theme-text-primary)] uppercase tracking-wider">
                    Description
                  </h2>
                  <div
                    className="prose prose-sm max-w-none text-[var(--theme-text-secondary)]
                               prose-headings:text-[var(--theme-text-primary)] prose-headings:font-bold prose-headings:uppercase
                               prose-strong:text-[var(--theme-text-primary)] prose-a:text-[#00d4ff] prose-a:no-underline hover:prose-a:underline
                               dark:prose-invert"
                    dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
                  />
                </div>
              )}

              {product.tags.length > 0 && (
                <div className="border-t border-[var(--theme-border)] pt-6">
                  <h2 className="mb-4 text-sm font-bold text-[var(--theme-text-primary)] uppercase tracking-wider">
                    Tags
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {product.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-xs font-semibold text-[var(--theme-text-muted)] border border-[var(--theme-border-hover)] hover:border-[#00d4ff] hover:text-[#00d4ff] transition-colors uppercase tracking-wider"
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
