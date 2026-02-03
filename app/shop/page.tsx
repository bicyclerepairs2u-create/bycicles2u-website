import { Suspense } from 'react'
import { getProducts, isShopifyConfigured } from '@/lib/shopify'
import { ProductGrid } from '@/components/shop'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'

export const metadata = {
  title: 'Shop | Bicycles2U',
  description: 'Browse our collection of premium road bikes and triathlon bikes.',
}

async function ProductList() {
  if (!isShopifyConfigured()) {
    return (
      <div className="rounded-lg border border-neutral-800 bg-neutral-900 p-8 text-center">
        <h3 className="mb-2 text-lg font-semibold text-white">Shop Coming Soon</h3>
        <p className="text-neutral-400">
          Our online shop is being set up. In the meantime, check out our bikes on{' '}
          <a
            href="https://www.facebook.com/marketplace/profile/61551793451820"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-[#ff1744] underline hover:text-[#d50032]"
          >
            Facebook Marketplace
          </a>
          .
        </p>
      </div>
    )
  }

  const products = await getProducts(20)

  return <ProductGrid products={products} />
}

function ProductListSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="animate-pulse bg-neutral-900">
          <div className="aspect-[4/3] bg-neutral-800" />
          <div className="p-5 space-y-3">
            <div className="h-3 w-1/4 rounded bg-neutral-800" />
            <div className="h-5 w-2/3 rounded bg-neutral-800" />
            <div className="h-6 w-1/3 rounded bg-neutral-800" />
          </div>
        </div>
      ))}
    </div>
  )
}

export default function ShopPage() {
  return (
    <main className="bg-[#0a0a0a]">
      <Navigation />

      {/* Hero Header - Full-width with diagonal accent */}
      <div
        className="relative flex items-center pt-24 pb-12 md:pt-32 md:pb-16"
        style={{
          background: 'linear-gradient(135deg, #0a0a0a 0%, rgba(255, 23, 68, 0.08) 100%)'
        }}
      >
        {/* Diagonal line pattern */}
        <div
          className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none"
          style={{
            backgroundImage: `repeating-linear-gradient(
              -45deg,
              #ff1744,
              #ff1744 1px,
              transparent 1px,
              transparent 40px
            )`
          }}
        />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white">
            Shop
          </h1>
          <p className="mt-3 text-lg text-neutral-400 max-w-xl">
            Premium road & triathlon machines built for speed.
          </p>
          <div className="flex items-center gap-3 mt-6">
            <span className="px-4 py-1.5 text-xs font-bold uppercase tracking-wider bg-[#ff1744] text-black">
              Road
            </span>
            <span className="px-4 py-1.5 text-xs font-bold uppercase tracking-wider border border-[#ff1744] text-[#ff1744]">
              Triathlon
            </span>
            <span className="px-4 py-1.5 text-xs font-bold uppercase tracking-wider border border-[#ff1744] text-[#ff1744]">
              Time Trial
            </span>
          </div>
        </div>
      </div>

      {/* Product Grid Section */}
      <div className="min-h-screen">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <Suspense fallback={<ProductListSkeleton />}>
            <ProductList />
          </Suspense>
        </div>
      </div>

      <Footer />
    </main>
  )
}
