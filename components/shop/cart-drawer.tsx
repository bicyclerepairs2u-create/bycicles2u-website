"use client"

import Image from 'next/image'
import { useCart } from '@/components/providers/cart-provider'
import { formatPrice } from '@/lib/shopify'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from '@/components/ui/sheet'
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react'

export function CartDrawer() {
  const { cart, isCartOpen, closeCart, updateItem, removeItem, isLoading } = useCart()

  const lineItems = cart?.lines.edges.map((edge) => edge.node) || []

  return (
    <Sheet open={isCartOpen} onOpenChange={closeCart}>
      <SheetContent className="flex w-full flex-col sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            Cart ({cart?.totalQuantity || 0})
          </SheetTitle>
        </SheetHeader>

        {lineItems.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4">
            <ShoppingBag className="h-16 w-16 text-gray-300" />
            <p className="text-gray-500">Your cart is empty</p>
            <Button onClick={closeCart} variant="outline">
              Continue Shopping
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto py-4">
              <div className="space-y-4">
                {lineItems.map((item) => (
                  <div key={item.id} className="flex gap-4 rounded-lg border p-3">
                    <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded bg-gray-100">
                      {item.merchandise.image ? (
                        <Image
                          src={item.merchandise.image.url}
                          alt={item.merchandise.image.altText || item.merchandise.product.title}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center">
                          <ShoppingBag className="h-8 w-8 text-gray-300" />
                        </div>
                      )}
                    </div>
                    <div className="flex flex-1 flex-col">
                      <h4 className="line-clamp-1 text-sm font-medium">
                        {item.merchandise.product.title}
                      </h4>
                      {item.merchandise.title !== 'Default Title' && (
                        <p className="text-xs text-gray-500">{item.merchandise.title}</p>
                      )}
                      <p className="mt-1 text-sm font-semibold text-[#0288d1]">
                        {formatPrice(item.merchandise.price)}
                      </p>
                      <div className="mt-auto flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Button
                            size="icon"
                            variant="outline"
                            className="h-7 w-7"
                            onClick={() => updateItem(item.id, item.quantity - 1)}
                            disabled={isLoading || item.quantity <= 1}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-6 text-center text-sm">{item.quantity}</span>
                          <Button
                            size="icon"
                            variant="outline"
                            className="h-7 w-7"
                            onClick={() => updateItem(item.id, item.quantity + 1)}
                            disabled={isLoading}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-7 w-7 text-red-500 hover:bg-red-50 hover:text-red-600"
                          onClick={() => removeItem(item.id)}
                          disabled={isLoading}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <SheetFooter className="border-t pt-4">
              <div className="w-full space-y-4">
                <div className="flex items-center justify-between text-lg font-semibold">
                  <span>Subtotal</span>
                  <span>{cart ? formatPrice(cart.cost.subtotalAmount) : '$0.00'}</span>
                </div>
                <p className="text-xs text-gray-500">
                  Shipping and taxes calculated at checkout.
                </p>
                <Button
                  className="w-full bg-[#0288d1] hover:bg-[#0277bd]"
                  size="lg"
                  asChild
                  disabled={isLoading}
                >
                  <a href={cart?.checkoutUrl} target="_blank" rel="noopener noreferrer">
                    Checkout
                  </a>
                </Button>
              </div>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
