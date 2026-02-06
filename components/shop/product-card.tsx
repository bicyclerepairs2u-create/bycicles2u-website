"use client"

import Image from 'next/image'
import Link from 'next/link'
import { ShopifyProduct, formatPrice, getFirstVariant } from '@/lib/shopify'
import { useCart } from '@/components/providers/cart-provider'
import { useCompare } from '@/components/providers/compare-provider'
import { ShoppingCart, Weight, Zap, Scale, Check, Star, Sparkles, Tag } from 'lucide-react'

interface ProductCardProps {
  product: ShopifyProduct
}

// Check if product has "featured" tag
function isFeatured(product: ShopifyProduct): boolean {
  return product.tags.some(tag => tag.toLowerCase() === 'featured')
}

// Check if product was listed within the last 14 days
function isNewListing(product: ShopifyProduct): boolean {
  if (!product.createdAt) return false
  const createdDate = new Date(product.createdAt)
  const fourteenDaysAgo = new Date()
  fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 14)
  return createdDate > fourteenDaysAgo
}

// Check if product is on sale (has compareAtPrice higher than current price)
function getSaleInfo(product: ShopifyProduct) {
  const firstVariant = product.variants.edges[0]?.node
  if (!firstVariant?.compareAtPrice) return null

  const currentPrice = parseFloat(firstVariant.price.amount)
  const comparePrice = parseFloat(firstVariant.compareAtPrice.amount)

  if (comparePrice > currentPrice) {
    const discount = Math.round(((comparePrice - currentPrice) / comparePrice) * 100)
    return {
      compareAtPrice: firstVariant.compareAtPrice,
      discountPercent: discount
    }
  }
  return null
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem, isLoading } = useCart()
  const { addToCompare, removeFromCompare, isInCompare, canAddMore } = useCompare()
  const firstVariant = getFirstVariant(product)
  const price = product.priceRange.minVariantPrice
  const inCompare = isInCompare(product.id)
  const featured = isFeatured(product)
  const newListing = isNewListing(product)
  const saleInfo = getSaleInfo(product)

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (firstVariant) {
      await addItem(firstVariant.id)
    }
  }

  const handleToggleCompare = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (inCompare) {
      removeFromCompare(product.id)
    } else if (canAddMore) {
      addToCompare(product)
    }
  }

  return (
    <Link href={`/shop/${product.handle}`}>
      <div
        className="group relative bg-[var(--theme-bg-secondary)] overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_var(--theme-accent-glow)]"
        style={{
          clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%)',
        }}
      >
        {/* Angular accent corner */}
        <div className="absolute top-0 right-0 w-24 h-1 bg-[#00d4ff] z-20" />
        <div className="absolute top-0 right-0 w-1 h-16 bg-[#00d4ff] z-20" />

        {/* Product badges */}
        <div className="absolute top-2 left-2 z-30 flex flex-col gap-1">
          {saleInfo && (
            <div className="flex items-center gap-1 px-2 py-1 bg-red-500 text-white text-[10px] font-bold uppercase tracking-wider">
              <Tag className="w-3 h-3" />
              {saleInfo.discountPercent}% Off
            </div>
          )}
          {featured && (
            <div className="flex items-center gap-1 px-2 py-1 bg-amber-500 text-black text-[10px] font-bold uppercase tracking-wider">
              <Star className="w-3 h-3 fill-current" />
              Featured
            </div>
          )}
          {newListing && !featured && !saleInfo && (
            <div className="flex items-center gap-1 px-2 py-1 bg-emerald-500 text-white text-[10px] font-bold uppercase tracking-wider">
              <Sparkles className="w-3 h-3" />
              New
            </div>
          )}
          {inCompare && (
            <div className="flex items-center gap-1 px-2 py-1 bg-[#00d4ff] text-black text-[10px] font-bold uppercase tracking-wider">
              <Check className="w-3 h-3" />
              Comparing
            </div>
          )}
        </div>

        {/* Image area */}
        <div className="relative aspect-[4/3] bg-[var(--theme-bg-tertiary)] overflow-hidden">
          {product.featuredImage ? (
            <Image
              src={product.featuredImage.url}
              alt={product.featuredImage.altText || product.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-[var(--theme-bg-tertiary)]">
              <span className="text-[var(--theme-text-muted)] text-sm">No image</span>
            </div>
          )}

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--theme-bg-secondary)] via-transparent to-transparent z-10" />

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
                <Weight className="w-3.5 h-3.5 text-[#00d4ff]" />
                <span className="text-neutral-300">Premium Carbon Frame</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-3.5 h-3.5 text-[#00d4ff]" />
                <span className="text-neutral-300">Race Ready</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <p className="text-[10px] uppercase tracking-[0.2em] font-semibold mb-1 text-[#00d4ff]">
            {product.vendor || 'Bicycles2U'}
          </p>
          <h3 className="text-lg font-bold text-[var(--theme-text-primary)] mb-3 leading-tight line-clamp-2">
            {product.title}
          </h3>
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              {saleInfo ? (
                <>
                  <span className="text-xl font-bold text-red-500">
                    {formatPrice(price)}
                  </span>
                  <span className="text-sm text-[var(--theme-text-muted)] line-through">
                    {formatPrice(saleInfo.compareAtPrice)}
                  </span>
                </>
              ) : (
                <span className="text-xl font-bold text-[#00d4ff]">
                  {formatPrice(price)}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              {/* Compare button */}
              <button
                onClick={handleToggleCompare}
                disabled={!inCompare && !canAddMore}
                className={`p-2.5 transition-all duration-200 ${
                  inCompare
                    ? 'bg-[#00d4ff] text-black hover:bg-[#0099cc]'
                    : 'border border-[var(--theme-border-hover)] text-[var(--theme-text-muted)] hover:border-[#00d4ff] hover:text-[#00d4ff]'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
                aria-label={inCompare ? 'Remove from compare' : 'Add to compare'}
                title={inCompare ? 'Remove from compare' : canAddMore ? 'Add to compare' : 'Compare limit reached (4)'}
              >
                <Scale className="w-4 h-4" />
              </button>
              {/* Cart button */}
              {product.availableForSale && firstVariant && (
                <button
                  onClick={handleAddToCart}
                  disabled={isLoading}
                  className="p-2.5 bg-[#00d4ff] text-black transition-all duration-200 hover:bg-[#0099cc] disabled:opacity-50"
                  aria-label="Add to cart"
                >
                  <ShoppingCart className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
