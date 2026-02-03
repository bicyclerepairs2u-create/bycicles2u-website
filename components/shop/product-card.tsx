"use client"

import Image from 'next/image'
import Link from 'next/link'
import { ShopifyProduct, formatPrice, getFirstVariant } from '@/lib/shopify'
import { useCart } from '@/components/providers/cart-provider'
import { ShoppingCart, Weight, Zap } from 'lucide-react'

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
      <div
        className="group relative bg-neutral-900 overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,23,68,0.15)]"
        style={{
          clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%)',
        }}
      >
        {/* Angular accent corner */}
        <div className="absolute top-0 right-0 w-24 h-1 bg-[#ff1744] z-20" />
        <div className="absolute top-0 right-0 w-1 h-16 bg-[#ff1744] z-20" />

        {/* Image area */}
        <div className="relative aspect-[4/3] bg-neutral-800 overflow-hidden">
          {product.featuredImage ? (
            <Image
              src={product.featuredImage.url}
              alt={product.featuredImage.altText || product.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-neutral-800">
              <span className="text-neutral-600 text-sm">No image</span>
            </div>
          )}

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent z-10" />

          {/* Sold out overlay */}
          {!product.availableForSale && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/70 z-30">
              <span className="bg-white px-4 py-2 text-sm font-bold uppercase tracking-wider text-black">
                Sold Out
              </span>
            </div>
          )}

          {/* Hover overlay with specs */}
          <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 flex flex-col justify-end p-4">
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <Weight className="w-3.5 h-3.5 text-[#ff1744]" />
                <span className="text-neutral-300">Premium Carbon Frame</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-3.5 h-3.5 text-[#ff1744]" />
                <span className="text-neutral-300">Race Ready</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <p className="text-[10px] uppercase tracking-[0.2em] font-semibold mb-1 text-[#ff1744]">
            {product.vendor || 'Bicycles2U'}
          </p>
          <h3 className="text-lg font-bold text-white mb-3 leading-tight line-clamp-2">
            {product.title}
          </h3>
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-[#ff1744]">
              {formatPrice(price)}
            </span>
            {product.availableForSale && firstVariant && (
              <button
                onClick={handleAddToCart}
                disabled={isLoading}
                className="p-2.5 bg-[#ff1744] text-black transition-all duration-200 hover:bg-[#d50032] disabled:opacity-50"
                aria-label="Add to cart"
              >
                <ShoppingCart className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
