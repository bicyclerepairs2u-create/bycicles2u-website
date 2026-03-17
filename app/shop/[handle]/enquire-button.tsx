"use client"

import { useState } from "react"
import { Mail, X, Send, Loader2, Check } from "lucide-react"

interface EnquireButtonProps {
  productTitle: string
  productPrice: string
}

export function EnquireButton({ productTitle, productPrice }: EnquireButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState("")
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "I'm interested in viewing this bike. Is it still available?",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    try {
      const res = await fetch("/api/enquire", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          bikeTitle: productTitle,
          bikePrice: productPrice,
          bikeUrl: typeof window !== "undefined" ? window.location.href : "",
        }),
      })

      if (!res.ok) {
        throw new Error("Failed to send enquiry")
      }

      setIsSuccess(true)
      setTimeout(() => {
        setIsOpen(false)
        setIsSuccess(false)
        setForm({
          name: "",
          email: "",
          phone: "",
          message: "I'm interested in viewing this bike. Is it still available?",
        })
      }, 3000)
    } catch {
      setError("Something went wrong. Please try again or call us on 0402 880 242.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="w-full bg-[#00d4ff] hover:bg-[#0099cc] text-black font-bold uppercase tracking-wider py-3 px-6 transition-all duration-200 hover:shadow-[0_0_20px_rgba(0,212,255,0.3)] flex items-center justify-center gap-2"
      >
        <Mail className="h-5 w-5" />
        Enquire Now
      </button>

      {/* Modal overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsOpen(false)
          }}
        >
          <div
            className="relative w-full max-w-md bg-[var(--theme-bg-secondary)] border border-[var(--theme-border)] shadow-2xl"
            style={{
              clipPath:
                "polygon(0 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%)",
            }}
          >
            {/* Accent corners */}
            <div className="absolute top-0 right-0 w-20 h-1 bg-[#00d4ff]" />
            <div className="absolute top-0 right-0 w-1 h-12 bg-[#00d4ff]" />

            {/* Close button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-[var(--theme-text-muted)] hover:text-[#00d4ff] transition-colors z-10"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Bike info header */}
            <div className="border-b border-[var(--theme-border)] px-6 pt-6 pb-4">
              <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#00d4ff] mb-1">
                Enquire About
              </p>
              <h3 className="text-lg font-bold text-[var(--theme-text-primary)] leading-tight">
                {productTitle}
              </h3>
              <p className="text-xl font-bold text-[#00d4ff] mt-1">{productPrice}</p>
            </div>

            {isSuccess ? (
              <div className="px-6 py-12 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 rounded-full mb-4">
                  <Check className="h-8 w-8 text-emerald-500" />
                </div>
                <h4 className="text-lg font-bold text-[var(--theme-text-primary)] mb-2">
                  Enquiry Sent!
                </h4>
                <p className="text-sm text-[var(--theme-text-muted)]">
                  Check your email for a confirmation. We&apos;ll be in touch shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[var(--theme-text-muted)] uppercase tracking-wider mb-1.5">
                    Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-3 py-2.5 bg-[var(--theme-bg-primary)] border border-[var(--theme-border)] text-[var(--theme-text-primary)] text-sm focus:outline-none focus:border-[#00d4ff] transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[var(--theme-text-muted)] uppercase tracking-wider mb-1.5">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-3 py-2.5 bg-[var(--theme-bg-primary)] border border-[var(--theme-border)] text-[var(--theme-text-primary)] text-sm focus:outline-none focus:border-[#00d4ff] transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[var(--theme-text-muted)] uppercase tracking-wider mb-1.5">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full px-3 py-2.5 bg-[var(--theme-bg-primary)] border border-[var(--theme-border)] text-[var(--theme-text-primary)] text-sm focus:outline-none focus:border-[#00d4ff] transition-colors"
                    placeholder="04XX XXX XXX"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[var(--theme-text-muted)] uppercase tracking-wider mb-1.5">
                    Message
                  </label>
                  <textarea
                    rows={3}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-3 py-2.5 bg-[var(--theme-bg-primary)] border border-[var(--theme-border)] text-[var(--theme-text-primary)] text-sm focus:outline-none focus:border-[#00d4ff] transition-colors resize-none"
                  />
                </div>

                {error && (
                  <p className="text-sm text-red-500">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#00d4ff] hover:bg-[#0099cc] text-black font-bold uppercase tracking-wider py-3 transition-all duration-200 hover:shadow-[0_0_20px_rgba(0,212,255,0.3)] flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Send Enquiry
                    </>
                  )}
                </button>

                <p className="text-center text-xs text-[var(--theme-text-muted)]">
                  All viewings are in-person at Queens Park / Bondi Junction
                </p>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  )
}
