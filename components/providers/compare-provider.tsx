"use client"

import { createContext, useContext, useState, useCallback, ReactNode } from 'react'
import type { ShopifyProduct } from '@/lib/shopify'

const MAX_COMPARE_ITEMS = 4

interface CompareContextType {
  compareItems: ShopifyProduct[]
  isCompareOpen: boolean
  openCompare: () => void
  closeCompare: () => void
  toggleCompare: () => void
  addToCompare: (product: ShopifyProduct) => void
  removeFromCompare: (productId: string) => void
  clearCompare: () => void
  isInCompare: (productId: string) => boolean
  canAddMore: boolean
}

const CompareContext = createContext<CompareContextType | undefined>(undefined)

export function CompareProvider({ children }: { children: ReactNode }) {
  const [compareItems, setCompareItems] = useState<ShopifyProduct[]>([])
  const [isCompareOpen, setIsCompareOpen] = useState(false)

  const openCompare = useCallback(() => setIsCompareOpen(true), [])
  const closeCompare = useCallback(() => setIsCompareOpen(false), [])
  const toggleCompare = useCallback(() => setIsCompareOpen((prev) => !prev), [])

  const addToCompare = useCallback((product: ShopifyProduct) => {
    setCompareItems((prev) => {
      if (prev.length >= MAX_COMPARE_ITEMS) return prev
      if (prev.some((p) => p.id === product.id)) return prev
      return [...prev, product]
    })
  }, [])

  const removeFromCompare = useCallback((productId: string) => {
    setCompareItems((prev) => prev.filter((p) => p.id !== productId))
  }, [])

  const clearCompare = useCallback(() => {
    setCompareItems([])
    setIsCompareOpen(false)
  }, [])

  const isInCompare = useCallback(
    (productId: string) => compareItems.some((p) => p.id === productId),
    [compareItems]
  )

  const canAddMore = compareItems.length < MAX_COMPARE_ITEMS

  return (
    <CompareContext.Provider
      value={{
        compareItems,
        isCompareOpen,
        openCompare,
        closeCompare,
        toggleCompare,
        addToCompare,
        removeFromCompare,
        clearCompare,
        isInCompare,
        canAddMore,
      }}
    >
      {children}
    </CompareContext.Provider>
  )
}

export function useCompare() {
  const context = useContext(CompareContext)
  if (context === undefined) {
    throw new Error('useCompare must be used within a CompareProvider')
  }
  return context
}
