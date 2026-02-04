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
      <SheetContent className="flex w-full flex-col sm:max-w-lg bg-[var(--theme-bg-primary)] border-l border-[var(--theme-border)]">
        <SheetHeader className="border-b border-[var(--theme-border)] pb-4">
          <SheetTitle className="flex items-center gap-2 text-[var(--theme-text-primary)] uppercase tracking-wider font-bold">
            <ShoppingBag className="h-5 w-5 text-[#ff1744]" />
            Cart ({cart?.totalQuantity || 0})
          </SheetTitle>
        </SheetHeader>

        {lineItems.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4">
            <ShoppingBag className="h-16 w-16 text-[var(--theme-text-muted)]" />
            <p className="text-[var(--theme-text-muted)]">Your cart is empty</p>
            <Button
              onClick={closeCart}
              variant="outline"
              className="border-[#ff1744] text-[#ff1744] hover:bg-[#ff1744] hover:text-black rounded-none uppercase tracking-wider font-bold"
            >
              Continue Shopping
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto py-4">
              <div className="space-y-4">
                {lineItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 border border-[var(--theme-border)] p-3 bg-[var(--theme-bg-secondary)] transition-all duration-200 hover:border-[#ff1744]/30"
                    style={{
                      clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%)',
                    }}
                  >
                    <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden bg-[var(--theme-bg-tertiary)]">
                      {item.merchandise.image ? (
                        <Image
                          src={item.merchandise.image.url}
                          alt={item.merchandise.image.altText || item.merchandise.product.title}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center">
                          <ShoppingBag className="h-8 w-8 text-[var(--theme-text-muted)]" />
                        </div>
                      )}
                    </div>
                    <div className="flex flex-1 flex-col">
                      <h4 className="line-clamp-1 text-sm font-bold text-[var(--theme-text-primary)] uppercase tracking-wide">
                        {item.merchandise.product.title}
                      </h4>
                      {item.merchandise.title !== 'Default Title' && (
                        <p className="text-xs text-[var(--theme-text-muted)]">{item.merchandise.title}</p>
                      )}
                      <p className="mt-1 text-sm font-bold text-[#ff1744]">
                        {formatPrice(item.merchandise.price)}
                      </p>
                      <div className="mt-auto flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <Button
                            size="icon"
                            variant="outline"
                            className="h-7 w-7 rounded-none border-[var(--theme-border-hover)] text-[var(--theme-text-muted)] hover:border-[#ff1744] hover:text-[#ff1744] hover:bg-transparent"
                            onClick={() => updateItem(item.id, item.quantity - 1)}
                            disabled={isLoading || item.quantity <= 1}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center text-sm text-[var(--theme-text-primary)] font-bold">{item.quantity}</span>
                          <Button
                            size="icon"
                            variant="outline"
                            className="h-7 w-7 rounded-none border-[var(--theme-border-hover)] text-[var(--theme-text-muted)] hover:border-[#ff1744] hover:text-[#ff1744] hover:bg-transparent"
                            onClick={() => updateItem(item.id, item.quantity + 1)}
                            disabled={isLoading}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-7 w-7 text-[var(--theme-text-muted)] hover:bg-[#ff1744]/10 hover:text-[#ff1744]"
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

            <SheetFooter className="border-t border-[var(--theme-border)] pt-4">
              <div className="w-full space-y-4">
                <div className="flex items-center justify-between text-lg font-bold">
                  <span className="text-[var(--theme-text-primary)] uppercase tracking-wider">Subtotal</span>
                  <span className="text-[#ff1744]">{cart ? formatPrice(cart.cost.subtotalAmount) : '$0.00'}</span>
                </div>
                <p className="text-xs text-[var(--theme-text-muted)]">
                  Shipping and taxes calculated at checkout.
                </p>
                <Button
                  className="w-full bg-[#ff1744] hover:bg-[#d50032] text-black font-bold uppercase tracking-wider rounded-none"
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
