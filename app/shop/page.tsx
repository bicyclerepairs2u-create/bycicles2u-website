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
      <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-6 text-center">
        <h3 className="mb-2 text-lg font-semibold text-yellow-800">Shop Coming Soon</h3>
        <p className="text-yellow-700">
          Our online shop is being set up. In the meantime, check out our bikes on{' '}
          <a
            href="https://www.facebook.com/marketplace/profile/61551793451820"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-[#0288d1] underline"
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
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="aspect-square rounded-lg bg-gray-200" />
          <div className="mt-4 space-y-2">
            <div className="h-4 w-1/3 rounded bg-gray-200" />
            <div className="h-5 w-2/3 rounded bg-gray-200" />
            <div className="h-6 w-1/4 rounded bg-gray-200" />
          </div>
        </div>
      ))}
    </div>
  )
}

export default function ShopPage() {
  return (
    <main>
      <Navigation />
      <div className="min-h-screen bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Shop</h1>
            <p className="mt-2 text-gray-600">
              Browse our collection of premium road bikes and triathlon bikes.
            </p>
          </div>
          <Suspense fallback={<ProductListSkeleton />}>
            <ProductList />
          </Suspense>
        </div>
      </div>
      <Footer />
    </main>
  )
}
