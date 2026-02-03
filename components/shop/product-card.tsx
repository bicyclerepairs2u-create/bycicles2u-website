"use client"

import Image from 'next/image'
import Link from 'next/link'
import { ShopifyProduct, formatPrice, getFirstVariant } from '@/lib/shopify'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useCart } from '@/components/providers/cart-provider'
import { ShoppingCart } from 'lucide-react'

interface ProductCardProps {
  product: ShopifyProduct
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem, isLoading } = useCart()
  const firstVariant = getFirstVariant(product)
  const price = product.priceRange.minVariantPrice

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (firstVariant) {
      await addItem(firstVariant.id)
    }
  }

  return (
    <Link href={`/shop/${product.handle}`}>
      <Card className="group overflow-hidden rounded-none border-0 py-0 shadow-sm transition-all hover:shadow-lg">
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          {product.featuredImage ? (
            <Image
              src={product.featuredImage.url}
              alt={product.featuredImage.altText || product.title}
              fill
              className="object-cover transition-transform group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-gray-200">
              <span className="text-gray-400">No image</span>
            </div>
          )}
          {!product.availableForSale && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <span className="bg-white px-3 py-1 text-sm font-medium text-gray-900">
                Sold Out
              </span>
            </div>
          )}
        </div>
        <CardContent className="px-6 py-6">
          <div className="mb-3">
            {product.vendor && (
              <p className="text-xs uppercase tracking-wide text-gray-500">{product.vendor}</p>
            )}
            <h3 className="line-clamp-2 font-medium text-gray-900">{product.title}</h3>
          </div>
          <div className="flex items-center justify-between gap-3">
            <p className="text-lg font-semibold text-[#0288d1]">{formatPrice(price)}</p>
            {product.availableForSale && firstVariant && (
              <Button
                size="lg"
                variant="outline"
                onClick={handleAddToCart}
                disabled={isLoading}
                className="rounded-none px-4 py-2 opacity-0 transition-all group-hover:opacity-100"
              >
                <ShoppingCart className="h-5 w-5" />
                <span className="ml-2 hidden group-hover:inline">Add to Cart</span>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
