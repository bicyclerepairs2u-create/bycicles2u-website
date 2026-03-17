"use client"

import { useCompare } from "@/components/providers/compare-provider"
import { Scale, X, ChevronUp } from "lucide-react"
import Image from "next/image"

export function CompareBar() {
  const { compareItems, isCompareOpen, openCompare, removeFromCompare } = useCompare()

  if (compareItems.length === 0 || isCompareOpen) {
    return null
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[var(--theme-bg-secondary)] border-t border-[var(--theme-border)] shadow-lg animate-in slide-in-from-bottom duration-300">
      <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          {/* Selected items preview */}
          <div className="flex items-center gap-3 overflow-x-auto">
            <div className="flex items-center gap-2 shrink-0">
              <Scale className="w-5 h-5 text-[#00d4ff]" />
              <span className="text-sm font-semibold text-[var(--theme-text-primary)] uppercase tracking-wider">
                Compare
              </span>
              <span className="px-2 py-0.5 text-xs font-bold bg-[#00d4ff] text-black">
                {compareItems.length}/4
              </span>
            </div>

            <div className="flex items-center gap-2">
              {compareItems.map((product) => (
                <div
                  key={product.id}
                  className="relative group flex items-center gap-2 px-2 py-1.5 bg-[var(--theme-bg-tertiary)] shrink-0"
                >
                  <div className="relative w-10 h-10 bg-[var(--theme-bg-primary)] overflow-hidden">
                    {product.featuredImage ? (
                      <Image
                        src={product.featuredImage.url}
                        alt={product.title}
                        fill
                        className="object-cover"
                        sizes="40px"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <Scale className="w-4 h-4 text-[var(--theme-text-muted)]" />
                      </div>
                    )}
                  </div>
                  <span className="text-xs font-medium text-[var(--theme-text-primary)] max-w-[100px] truncate hidden sm:block">
                    {product.title}
                  </span>
                  <button
                    onClick={() => removeFromCompare(product.id)}
                    className="p-0.5 text-[var(--theme-text-muted)] hover:text-[#00d4ff] transition-colors"
                    aria-label={`Remove ${product.title} from compare`}
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Compare button */}
          <button
            onClick={openCompare}
            disabled={compareItems.length < 2}
            className="flex items-center gap-2 px-4 py-2 bg-[#00d4ff] text-black font-bold text-sm uppercase tracking-wider transition-all hover:bg-[#0099cc] disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
          >
            <span className="hidden sm:inline">Compare Now</span>
            <span className="sm:hidden">Compare</span>
            <ChevronUp className="w-4 h-4" />
          </button>
        </div>

        {compareItems.length < 2 && (
          <p className="mt-2 text-xs text-[var(--theme-text-muted)]">
            Select at least 2 bikes to compare
          </p>
        )}
      </div>
    </div>
  )
}
