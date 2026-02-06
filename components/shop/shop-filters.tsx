"use client"

import { useState, useMemo } from 'react'
import { ShopifyProduct } from '@/lib/shopify'
import { ProductCard } from './product-card'
import { Search, X, ChevronDown } from 'lucide-react'

type BikeCategory = 'all' | 'road' | 'triathlon' | 'time-trial'
type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc'

interface ShopFiltersProps {
  products: ShopifyProduct[]
}

const categories: { id: BikeCategory; label: string }[] = [
  { id: 'all', label: 'All Bikes' },
  { id: 'road', label: 'Road' },
  { id: 'triathlon', label: 'Triathlon' },
  { id: 'time-trial', label: 'Time Trial' },
]

const sortOptions: { id: SortOption; label: string }[] = [
  { id: 'featured', label: 'Featured' },
  { id: 'price-asc', label: 'Price: Low to High' },
  { id: 'price-desc', label: 'Price: High to Low' },
  { id: 'name-asc', label: 'Name: A to Z' },
  { id: 'name-desc', label: 'Name: Z to A' },
]

export function ShopFilters({ products }: ShopFiltersProps) {
  const [activeCategory, setActiveCategory] = useState<BikeCategory>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<SortOption>('featured')

  const filteredProducts = useMemo(() => {
    let filtered = products

    // Filter by category
    if (activeCategory !== 'all') {
      filtered = filtered.filter((product) => {
        const productTypeLower = product.productType?.toLowerCase() || ''
        const tagsLower = product.tags.map((tag) => tag.toLowerCase())
        const titleLower = product.title.toLowerCase()

        // Check productType, tags, and title for category match
        switch (activeCategory) {
          case 'road':
            return (
              productTypeLower.includes('road') ||
              tagsLower.some((tag) => tag.includes('road')) ||
              titleLower.includes('road')
            )
          case 'triathlon':
            return (
              productTypeLower.includes('triathlon') ||
              productTypeLower.includes('tri') ||
              tagsLower.some((tag) => tag.includes('triathlon') || tag.includes('tri')) ||
              titleLower.includes('triathlon') ||
              titleLower.includes('tri ')
            )
          case 'time-trial':
            return (
              productTypeLower.includes('time trial') ||
              productTypeLower.includes('tt') ||
              productTypeLower.includes('time-trial') ||
              tagsLower.some((tag) =>
                tag.includes('time trial') ||
                tag.includes('tt') ||
                tag.includes('time-trial')
              ) ||
              titleLower.includes('time trial') ||
              titleLower.includes(' tt ') ||
              titleLower.includes(' tt')
            )
          default:
            return true
        }
      })
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim()
      filtered = filtered.filter((product) => {
        return (
          product.title.toLowerCase().includes(query) ||
          product.vendor?.toLowerCase().includes(query) ||
          product.description?.toLowerCase().includes(query) ||
          product.tags.some((tag) => tag.toLowerCase().includes(query))
        )
      })
    }

    // Sort products
    const sorted = [...filtered]
    switch (sortBy) {
      case 'price-asc':
        sorted.sort((a, b) => {
          const priceA = parseFloat(a.priceRange.minVariantPrice.amount)
          const priceB = parseFloat(b.priceRange.minVariantPrice.amount)
          return priceA - priceB
        })
        break
      case 'price-desc':
        sorted.sort((a, b) => {
          const priceA = parseFloat(a.priceRange.minVariantPrice.amount)
          const priceB = parseFloat(b.priceRange.minVariantPrice.amount)
          return priceB - priceA
        })
        break
      case 'name-asc':
        sorted.sort((a, b) => a.title.localeCompare(b.title))
        break
      case 'name-desc':
        sorted.sort((a, b) => b.title.localeCompare(a.title))
        break
      case 'featured':
      default:
        // Keep original order
        break
    }

    return sorted
  }, [products, activeCategory, searchQuery, sortBy])

  return (
    <div className="space-y-8">
      {/* Filters Bar */}
      <div className="flex flex-col gap-4">
        {/* Top row: Categories and Search */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Category Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-1.5 text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                  activeCategory === category.id
                    ? 'bg-[#00d4ff] text-black'
                    : 'border border-[#00d4ff] text-[#00d4ff] hover:bg-[#00d4ff]/10'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          {/* Search and Sort */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--theme-text-muted)]" />
              <input
                type="text"
                placeholder="Search bikes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-10 py-2 bg-[var(--theme-bg-secondary)] border border-[var(--theme-border)] text-[var(--theme-text-primary)] placeholder:text-[var(--theme-text-muted)] focus:outline-none focus:border-[#00d4ff] transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--theme-text-muted)] hover:text-[var(--theme-text-primary)] transition-colors"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="relative w-full sm:w-48">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="w-full appearance-none px-4 py-2 pr-10 bg-[var(--theme-bg-secondary)] border border-[var(--theme-border)] text-[var(--theme-text-primary)] text-sm focus:outline-none focus:border-[#00d4ff] transition-colors cursor-pointer"
              >
                {sortOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--theme-text-muted)] pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between text-sm text-[var(--theme-text-muted)]">
        <span>
          {filteredProducts.length} {filteredProducts.length === 1 ? 'bike' : 'bikes'} found
          {activeCategory !== 'all' && ` in ${categories.find(c => c.id === activeCategory)?.label}`}
          {searchQuery && ` matching "${searchQuery}"`}
          {sortBy !== 'featured' && ` · Sorted by ${sortOptions.find(s => s.id === sortBy)?.label.toLowerCase()}`}
        </span>
        {(activeCategory !== 'all' || searchQuery || sortBy !== 'featured') && (
          <button
            onClick={() => {
              setActiveCategory('all')
              setSearchQuery('')
              setSortBy('featured')
            }}
            className="text-[#00d4ff] hover:underline"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="py-16 text-center">
          <p className="text-[var(--theme-text-muted)] mb-4">
            No bikes found matching your criteria.
          </p>
          <button
            onClick={() => {
              setActiveCategory('all')
              setSearchQuery('')
              setSortBy('featured')
            }}
            className="px-6 py-2 bg-[#00d4ff] text-black font-bold uppercase text-sm tracking-wider hover:bg-[#0099cc] transition-colors"
          >
            View All Bikes
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}
