"use client"

import { useState } from 'react'
import { useCart } from '@/components/providers/cart-provider'
import { Button } from '@/components/ui/button'
import { ShoppingCart, Check, Loader2 } from 'lucide-react'

interface AddToCartButtonProps {
  variantId: string
}

export function AddToCartButton({ variantId }: AddToCartButtonProps) {
  const { addItem, isLoading } = useCart()
  const [isAdded, setIsAdded] = useState(false)

  const handleAddToCart = async () => {
    try {
      await addItem(variantId)
      setIsAdded(true)
      setTimeout(() => setIsAdded(false), 2000)
    } catch (error) {
      console.error('Error adding to cart:', error)
    }
  }

  return (
    <Button
      onClick={handleAddToCart}
      disabled={isLoading}
      size="lg"
      className="w-full bg-[#ff1744] hover:bg-[#d50032] text-black font-bold uppercase tracking-wider rounded-none transition-all duration-200 hover:shadow-[0_0_20px_rgba(255,23,68,0.3)]"
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          Adding...
        </>
      ) : isAdded ? (
        <>
          <Check className="mr-2 h-5 w-5" />
          Added to Cart
        </>
      ) : (
        <>
          <ShoppingCart className="mr-2 h-5 w-5" />
          Add to Cart
        </>
      )}
    </Button>
  )
}
