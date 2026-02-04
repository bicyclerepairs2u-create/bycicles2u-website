"use client"

import { useCompare } from "@/components/providers/compare-provider"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { formatPrice, type ShopifyProduct } from "@/lib/shopify"
import Image from "next/image"
import Link from "next/link"
import { X, Check, Minus, Target, Weight, Zap, DollarSign, Tag, ExternalLink, Trash2 } from "lucide-react"

function getRecommendedFor(product: ShopifyProduct): string {
  const tags = product.tags.map((t) => t.toLowerCase())
  const productType = product.productType.toLowerCase()

  if (tags.includes("triathlon") || productType.includes("triathlon") || productType.includes("tt")) {
    return "Triathlon / Time Trial"
  }
  if (tags.includes("race") || tags.includes("racing") || tags.includes("competition")) {
    return "Racing / Competition"
  }
  if (tags.includes("endurance") || tags.includes("gran fondo")) {
    return "Endurance / Gran Fondo"
  }
  if (tags.includes("gravel") || productType.includes("gravel")) {
    return "Gravel / Adventure"
  }
  if (tags.includes("aero") || productType.includes("aero")) {
    return "Aero Road Racing"
  }
  return "Road Cycling"
}

function getFrameMaterial(product: ShopifyProduct): string {
  const tags = product.tags.map((t) => t.toLowerCase())
  const description = product.description.toLowerCase()

  if (tags.includes("carbon") || description.includes("carbon")) {
    return "Carbon Fiber"
  }
  if (tags.includes("aluminum") || tags.includes("aluminium") || description.includes("aluminum") || description.includes("aluminium")) {
    return "Aluminum"
  }
  if (tags.includes("titanium") || description.includes("titanium")) {
    return "Titanium"
  }
  if (tags.includes("steel") || description.includes("steel")) {
    return "Steel"
  }
  return "Premium Frame"
}

function getWeight(product: ShopifyProduct): string {
  const tags = product.tags.map((t) => t.toLowerCase())
  const description = product.description.toLowerCase()

  // Look for weight in description (e.g., "7.5kg" or "7.5 kg")
  const weightMatch = description.match(/(\d+\.?\d*)\s*kg/i)
  if (weightMatch) {
    return `${weightMatch[1]} kg`
  }

  // Infer from tags
  if (tags.includes("ultralight") || tags.includes("lightweight")) {
    return "< 7.5 kg"
  }
  return "Contact for details"
}

interface CompareRowProps {
  label: string
  icon: React.ReactNode
  items: ShopifyProduct[]
  getValue: (product: ShopifyProduct) => React.ReactNode
}

function CompareRow({ label, icon, items, getValue }: CompareRowProps) {
  return (
    <div className="border-b border-[var(--theme-border)]">
      <div className="flex">
        <div className="w-32 shrink-0 bg-[var(--theme-bg-tertiary)] p-3 flex items-center gap-2">
          {icon}
          <span className="text-xs font-semibold uppercase tracking-wider text-[var(--theme-text-muted)]">
            {label}
          </span>
        </div>
        <div className="flex flex-1">
          {items.map((product) => (
            <div
              key={product.id}
              className="flex-1 p-3 text-sm text-[var(--theme-text-secondary)] border-l border-[var(--theme-border)] flex items-center"
            >
              {getValue(product)}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function CompareDrawer() {
  const { compareItems, isCompareOpen, closeCompare, removeFromCompare, clearCompare } = useCompare()

  return (
    <Sheet open={isCompareOpen} onOpenChange={closeCompare}>
      <SheetContent
        side="bottom"
        className="h-[85vh] bg-[var(--theme-bg-primary)] border-t border-[var(--theme-border)] p-0 overflow-hidden"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <SheetHeader className="px-6 py-4 border-b border-[var(--theme-border)] bg-[var(--theme-bg-secondary)]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <SheetTitle className="text-xl font-bold uppercase tracking-tight text-[var(--theme-text-primary)]">
                  Compare Bikes
                </SheetTitle>
                <span className="px-2 py-0.5 text-xs font-bold bg-[#ff1744] text-black">
                  {compareItems.length} / 4
                </span>
              </div>
              {compareItems.length > 0 && (
                <button
                  onClick={clearCompare}
                  className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--theme-text-muted)] hover:text-[#ff1744] transition-colors"
                >
                  <Trash2 size={14} />
                  Clear All
                </button>
              )}
            </div>
          </SheetHeader>

          {/* Content */}
          <div className="flex-1 overflow-auto">
            {compareItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center px-6">
                <div className="text-5xl mb-4 text-[#ff1744]">
                  <i className="fi fi-rr-scale"></i>
                </div>
                <h3 className="text-xl font-bold uppercase tracking-tight text-[var(--theme-text-primary)] mb-2">
                  No bikes to compare
                </h3>
                <p className="text-[var(--theme-text-muted)] max-w-md">
                  Add bikes to compare by clicking the compare button on product cards in the shop.
                </p>
              </div>
            ) : (
              <div className="min-w-[800px]">
                {/* Product Headers */}
                <div className="flex border-b border-[var(--theme-border)] sticky top-0 bg-[var(--theme-bg-primary)] z-10">
                  <div className="w-32 shrink-0 bg-[var(--theme-bg-tertiary)]" />
                  <div className="flex flex-1">
                    {compareItems.map((product) => (
                      <div
                        key={product.id}
                        className="flex-1 p-4 border-l border-[var(--theme-border)]"
                      >
                        <div className="relative">
                          <button
                            onClick={() => removeFromCompare(product.id)}
                            className="absolute -top-1 -right-1 p-1 bg-[var(--theme-bg-tertiary)] text-[var(--theme-text-muted)] hover:text-[#ff1744] hover:bg-[#ff1744]/10 transition-colors z-10"
                            aria-label="Remove from compare"
                          >
                            <X size={16} />
                          </button>
                          <div className="relative aspect-[4/3] mb-3 bg-[var(--theme-bg-secondary)] overflow-hidden">
                            {product.featuredImage ? (
                              <Image
                                src={product.featuredImage.url}
                                alt={product.featuredImage.altText || product.title}
                                fill
                                className="object-cover"
                                sizes="200px"
                              />
                            ) : (
                              <div className="flex h-full items-center justify-center">
                                <span className="text-[var(--theme-text-muted)] text-xs">No image</span>
                              </div>
                            )}
                          </div>
                          <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#ff1744] mb-1">
                            {product.vendor || "Bicycles2U"}
                          </p>
                          <h3 className="text-sm font-bold text-[var(--theme-text-primary)] line-clamp-2 mb-2">
                            {product.title}
                          </h3>
                          <Link
                            href={`/shop/${product.handle}`}
                            onClick={closeCompare}
                            className="inline-flex items-center gap-1 text-xs font-semibold text-[#ff1744] hover:underline"
                          >
                            View Details <ExternalLink size={12} />
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Comparison Rows */}
                <CompareRow
                  label="Price"
                  icon={<DollarSign size={14} className="text-[#ff1744]" />}
                  items={compareItems}
                  getValue={(product) => (
                    <span className="font-bold text-[#ff1744]">
                      {formatPrice(product.priceRange.minVariantPrice)}
                    </span>
                  )}
                />

                <CompareRow
                  label="Available"
                  icon={<Check size={14} className="text-[#ff1744]" />}
                  items={compareItems}
                  getValue={(product) =>
                    product.availableForSale ? (
                      <span className="flex items-center gap-1 text-green-500">
                        <Check size={14} /> In Stock
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-[var(--theme-text-muted)]">
                        <Minus size={14} /> Sold Out
                      </span>
                    )
                  }
                />

                <CompareRow
                  label="Best For"
                  icon={<Target size={14} className="text-[#ff1744]" />}
                  items={compareItems}
                  getValue={(product) => getRecommendedFor(product)}
                />

                <CompareRow
                  label="Frame"
                  icon={<Weight size={14} className="text-[#ff1744]" />}
                  items={compareItems}
                  getValue={(product) => getFrameMaterial(product)}
                />

                <CompareRow
                  label="Weight"
                  icon={<Zap size={14} className="text-[#ff1744]" />}
                  items={compareItems}
                  getValue={(product) => getWeight(product)}
                />

                <CompareRow
                  label="Type"
                  icon={<Tag size={14} className="text-[#ff1744]" />}
                  items={compareItems}
                  getValue={(product) => product.productType || "Road Bike"}
                />

                <CompareRow
                  label="Brand"
                  icon={<Tag size={14} className="text-[#ff1744]" />}
                  items={compareItems}
                  getValue={(product) => product.vendor || "Various"}
                />

                {/* Tags Row */}
                <div className="border-b border-[var(--theme-border)]">
                  <div className="flex">
                    <div className="w-32 shrink-0 bg-[var(--theme-bg-tertiary)] p-3 flex items-start gap-2">
                      <Tag size={14} className="text-[#ff1744] mt-0.5" />
                      <span className="text-xs font-semibold uppercase tracking-wider text-[var(--theme-text-muted)]">
                        Features
                      </span>
                    </div>
                    <div className="flex flex-1">
                      {compareItems.map((product) => (
                        <div
                          key={product.id}
                          className="flex-1 p-3 border-l border-[var(--theme-border)]"
                        >
                          <div className="flex flex-wrap gap-1">
                            {product.tags.slice(0, 5).map((tag) => (
                              <span
                                key={tag}
                                className="px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider bg-[var(--theme-bg-tertiary)] text-[var(--theme-text-muted)]"
                              >
                                {tag}
                              </span>
                            ))}
                            {product.tags.length === 0 && (
                              <span className="text-xs text-[var(--theme-text-muted)]">
                                No tags
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
