import { Suspense } from 'react'
import { getProducts, isShopifyConfigured } from '@/lib/shopify'
import { ShopFilters } from '@/components/shop/shop-filters'
import { CompareBar } from '@/components/shop/compare-bar'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'

export const metadata = {
  title: 'Shop | Bicycles2U',
  description: 'Browse our collection of premium road bikes and triathlon bikes.',
}

async function ProductList() {
  if (!isShopifyConfigured()) {
    return (
      <div className="border border-[var(--theme-border)] bg-[var(--theme-bg-secondary)] p-8 text-center">
        <h3 className="mb-2 text-lg font-semibold text-[var(--theme-text-primary)]">Shop Coming Soon</h3>
        <p className="text-[var(--theme-text-muted)]">
          Our online shop is being set up. In the meantime, check out our bikes on{' '}
          <a
            href="https://www.facebook.com/marketplace/profile/61551793451820"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-[#00d4ff] underline hover:text-[#0099cc]"
          >
            Facebook Marketplace
          </a>
          .
        </p>
      </div>
    )
  }

  const products = await getProducts(50)

  return <ShopFilters products={products} />
}

function ProductListSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="animate-pulse bg-[var(--theme-bg-secondary)]">
          <div className="aspect-[4/3] bg-[var(--theme-bg-tertiary)]" />
          <div className="p-5 space-y-3">
            <div className="h-3 w-1/4 rounded bg-[var(--theme-bg-tertiary)]" />
            <div className="h-5 w-2/3 rounded bg-[var(--theme-bg-tertiary)]" />
            <div className="h-6 w-1/3 rounded bg-[var(--theme-bg-tertiary)]" />
          </div>
        </div>
      ))}
    </div>
  )
}

export default function ShopPage() {
  return (
    <main className="bg-[var(--theme-bg-primary)]">
      <Navigation />

      {/* Hero Header - Full-width with diagonal accent */}
      <div
        className="relative flex items-center pt-24 pb-12 md:pt-32 md:pb-16 bg-[var(--theme-bg-primary)]"
        style={{
          background: 'linear-gradient(135deg, var(--theme-bg-primary) 0%, var(--theme-accent-glow) 100%)'
        }}
      >
        {/* Diagonal line pattern */}
        <div
          className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none dark:opacity-10"
          style={{
            backgroundImage: `repeating-linear-gradient(
              -45deg,
              #00d4ff,
              #00d4ff 1px,
              transparent 1px,
              transparent 40px
            )`
          }}
        />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-[var(--theme-text-primary)]">
            Shop
          </h1>
          <p className="mt-3 text-lg text-[var(--theme-text-muted)] max-w-xl">
            Premium road & triathlon machines built for speed.
          </p>
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
      <CompareBar />
    </main>
  )
}
