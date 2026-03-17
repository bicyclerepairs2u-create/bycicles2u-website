"use client"

import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react'
import {
  createCart,
  addToCart,
  updateCartLine,
  removeFromCart,
  getCart,
  type ShopifyCart,
} from '@/lib/shopify'

const CART_ID_KEY = 'shopify_cart_id'

interface CartContextType {
  cart: ShopifyCart | null
  isLoading: boolean
  isCartOpen: boolean
  openCart: () => void
  closeCart: () => void
  toggleCart: () => void
  addItem: (variantId: string, quantity?: number) => Promise<void>
  updateItem: (lineId: string, quantity: number) => Promise<void>
  removeItem: (lineId: string) => Promise<void>
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<ShopifyCart | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)

  // Load cart from localStorage on mount
  useEffect(() => {
    const loadCart = async () => {
      const cartId = localStorage.getItem(CART_ID_KEY)
      if (cartId) {
        try {
          const existingCart = await getCart(cartId)
          if (existingCart) {
            setCart(existingCart)
          } else {
            localStorage.removeItem(CART_ID_KEY)
          }
        } catch (error) {
          console.error('Error loading cart:', error)
          localStorage.removeItem(CART_ID_KEY)
        }
      }
    }
    loadCart()
  }, [])

  const openCart = useCallback(() => setIsCartOpen(true), [])
  const closeCart = useCallback(() => setIsCartOpen(false), [])
  const toggleCart = useCallback(() => setIsCartOpen((prev) => !prev), [])

  const addItem = useCallback(async (variantId: string, quantity = 1) => {
    setIsLoading(true)
    try {
      let updatedCart: ShopifyCart | null

      if (cart?.id) {
        updatedCart = await addToCart(cart.id, [{ merchandiseId: variantId, quantity }])
      } else {
        updatedCart = await createCart([{ merchandiseId: variantId, quantity }])
        if (updatedCart?.id) {
          localStorage.setItem(CART_ID_KEY, updatedCart.id)
        }
      }

      if (updatedCart) {
        setCart(updatedCart)
        setIsCartOpen(true)
      }
    } catch (error) {
      console.error('Error adding item to cart:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }, [cart])

  const updateItem = useCallback(async (lineId: string, quantity: number) => {
    if (!cart?.id) return

    setIsLoading(true)
    try {
      const updatedCart = await updateCartLine(cart.id, [{ id: lineId, quantity }])
      if (updatedCart) {
        setCart(updatedCart)
      }
    } catch (error) {
      console.error('Error updating cart item:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }, [cart])

  const removeItem = useCallback(async (lineId: string) => {
    if (!cart?.id) return

    setIsLoading(true)
    try {
      const updatedCart = await removeFromCart(cart.id, [lineId])
      if (updatedCart) {
        setCart(updatedCart)
      }
    } catch (error) {
      console.error('Error removing cart item:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }, [cart])

  return (
    <CartContext.Provider
      value={{
        cart,
        isLoading,
        isCartOpen,
        openCart,
        closeCart,
        toggleCart,
        addItem,
        updateItem,
        removeItem,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
