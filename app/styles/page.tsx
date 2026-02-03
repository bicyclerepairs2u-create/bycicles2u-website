"use client"

import { useState } from 'react'
import Image from 'next/image'
import { ShoppingCart, ChevronRight, Zap, Weight, Ruler } from 'lucide-react'

// ============================================================================
// COLOR THEMES - Easily swap accent colors
// ============================================================================
const colorThemes = {
  cyan: {
    name: 'Electric Cyan',
    accent: '#00d4ff',
    accentDark: '#0099cc',
    accentGlow: 'rgba(0, 212, 255, 0.3)',
  },
  orange: {
    name: 'Racing Orange',
    accent: '#ff6b35',
    accentDark: '#e55a2b',
    accentGlow: 'rgba(255, 107, 53, 0.3)',
  },
  lime: {
    name: 'Tri Lime',
    accent: '#b4ff39',
    accentDark: '#9ae62e',
    accentGlow: 'rgba(180, 255, 57, 0.3)',
  },
  blue: {
    name: 'Current Blue',
    accent: '#0288d1',
    accentDark: '#0277bd',
    accentGlow: 'rgba(2, 136, 209, 0.3)',
  },
  red: {
    name: 'Competition Red',
    accent: '#ff1744',
    accentDark: '#d50032',
    accentGlow: 'rgba(255, 23, 68, 0.3)',
  },
} as const

type ColorTheme = keyof typeof colorThemes

// Mock product for demonstrations
const mockProduct = {
  title: 'Cervélo P5 Disc',
  vendor: 'Cervélo',
  price: '$8,499',
  specs: {
    weight: '7.8kg',
    groupset: 'SRAM Red eTap AXS',
    wheels: 'Reserve 63/80',
  },
  image: '/IMG_6287.jpeg',
}

export default function StylesPage() {
  const [activeTheme, setActiveTheme] = useState<ColorTheme>('cyan')
  const theme = colorThemes[activeTheme]

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      {/* Header */}
      <div className="border-b border-neutral-800 bg-neutral-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <h1 className="text-2xl font-bold tracking-tight">Style Exploration</h1>
          <p className="text-sm text-neutral-400 mt-1">
            Testing elite triathlon/cycling aesthetic variations
          </p>
        </div>
      </div>

      {/* Color Theme Selector */}
      <div className="border-b border-neutral-800 bg-neutral-900/30">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="text-sm text-neutral-400 font-medium">Accent Color:</span>
            {Object.entries(colorThemes).map(([key, value]) => (
              <button
                key={key}
                onClick={() => setActiveTheme(key as ColorTheme)}
                className={`
                  flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium
                  transition-all duration-200
                  ${activeTheme === key
                    ? 'bg-white text-black'
                    : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                  }
                `}
              >
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: value.accent }}
                />
                {value.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-12 space-y-24">

        {/* ================================================================== */}
        {/* STYLE A: DARK CARBON - Technical, Angular, Performance-focused */}
        {/* ================================================================== */}
        <section>
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-2 flex items-center gap-3">
              <span
                className="w-8 h-8 rounded flex items-center justify-center text-sm font-bold"
                style={{ backgroundColor: theme.accent, color: '#000' }}
              >
                A
              </span>
              Dark Carbon
            </h2>
            <p className="text-neutral-400 text-sm">
              Technical, angular, performance-focused. Inspired by Canyon, Factor, and pro team aesthetics.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Card Style A */}
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="group relative bg-neutral-900 overflow-hidden"
                style={{
                  clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%)',
                }}
              >
                {/* Angular accent corner */}
                <div
                  className="absolute top-0 right-0 w-24 h-1"
                  style={{ backgroundColor: theme.accent }}
                />
                <div
                  className="absolute top-0 right-0 w-1 h-16"
                  style={{ backgroundColor: theme.accent }}
                />

                {/* Image area */}
                <div className="relative aspect-[4/3] bg-neutral-800 overflow-hidden">
                  <Image
                    src={mockProduct.image}
                    alt={mockProduct.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent z-10" />

                  {/* Hover overlay with specs */}
                  <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity z-20 flex flex-col justify-end p-4">
                    <div className="space-y-2 text-xs">
                      <div className="flex items-center gap-2">
                        <Weight className="w-3.5 h-3.5" style={{ color: theme.accent }} />
                        <span className="text-neutral-300">{mockProduct.specs.weight}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Zap className="w-3.5 h-3.5" style={{ color: theme.accent }} />
                        <span className="text-neutral-300">{mockProduct.specs.groupset}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <p
                    className="text-[10px] uppercase tracking-[0.2em] font-semibold mb-1"
                    style={{ color: theme.accent }}
                  >
                    {mockProduct.vendor}
                  </p>
                  <h3 className="text-lg font-bold text-white mb-3 leading-tight">
                    {mockProduct.title}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold" style={{ color: theme.accent }}>
                      {mockProduct.price}
                    </span>
                    <button
                      className="p-2 transition-colors"
                      style={{
                        backgroundColor: theme.accent,
                        color: '#000',
                      }}
                    >
                      <ShoppingCart className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>


        {/* ================================================================== */}
        {/* STYLE B: CLEAN MINIMAL - Rapha-inspired, Editorial, Photography-forward */}
        {/* ================================================================== */}
        <section>
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-2 flex items-center gap-3">
              <span
                className="w-8 h-8 rounded flex items-center justify-center text-sm font-bold"
                style={{ backgroundColor: theme.accent, color: '#000' }}
              >
                B
              </span>
              Clean Minimal
            </h2>
            <p className="text-neutral-400 text-sm">
              Editorial, photography-forward, sophisticated. Inspired by Rapha and premium fashion brands.
            </p>
          </div>

          {/* Light version of minimal */}
          <div className="bg-white rounded-lg p-8">
            <div className="grid md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="group">
                  {/* Clean image area */}
                  <div className="relative aspect-square bg-neutral-100 mb-6 overflow-hidden">
                    <Image
                      src={mockProduct.image}
                      alt={mockProduct.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Subtle hover effect */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ backgroundColor: theme.accentGlow }}
                    />
                  </div>

                  {/* Minimal content */}
                  <div className="space-y-2">
                    <p className="text-xs text-neutral-500 uppercase tracking-wider">
                      {mockProduct.vendor}
                    </p>
                    <h3 className="text-lg font-medium text-neutral-900">
                      {mockProduct.title}
                    </h3>
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-lg font-semibold text-neutral-900">
                        {mockProduct.price}
                      </span>
                      <button
                        className="text-sm font-medium flex items-center gap-1 transition-colors"
                        style={{ color: theme.accentDark }}
                      >
                        Add to cart
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* ================================================================== */}
        {/* STYLE C: BOLD ATHLETIC - Specialized-inspired, Dynamic, High Energy */}
        {/* ================================================================== */}
        <section>
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-2 flex items-center gap-3">
              <span
                className="w-8 h-8 rounded flex items-center justify-center text-sm font-bold"
                style={{ backgroundColor: theme.accent, color: '#000' }}
              >
                C
              </span>
              Bold Athletic
            </h2>
            <p className="text-neutral-400 text-sm">
              High energy, competitive, dynamic angles. Inspired by Specialized and athletic brands.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="group relative bg-gradient-to-br from-neutral-800 to-neutral-900 overflow-hidden transform hover:-translate-y-1 transition-transform"
              >
                {/* Diagonal accent stripe */}
                <div
                  className="absolute top-0 left-0 w-full h-1.5 transform -skew-x-12 origin-left"
                  style={{ backgroundColor: theme.accent }}
                />

                {/* Image with dynamic overlay */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={mockProduct.image}
                    alt={mockProduct.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Dynamic gradient overlay */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{
                      background: `linear-gradient(135deg, ${theme.accentGlow} 0%, transparent 60%)`
                    }}
                  />

                  {/* Price tag */}
                  <div
                    className="absolute top-4 right-0 px-4 py-2 text-black font-bold text-sm transform translate-x-2 group-hover:translate-x-0 transition-transform"
                    style={{ backgroundColor: theme.accent }}
                  >
                    {mockProduct.price}
                  </div>
                </div>

                {/* Content with diagonal cut */}
                <div className="relative p-5">
                  {/* Subtle diagonal line */}
                  <div
                    className="absolute top-0 left-0 w-12 h-0.5 transform -skew-x-12"
                    style={{ backgroundColor: theme.accent, opacity: 0.5 }}
                  />

                  <p className="text-xs text-neutral-500 uppercase tracking-wider font-semibold">
                    {mockProduct.vendor}
                  </p>
                  <h3 className="text-xl font-black text-white mt-1 uppercase tracking-tight">
                    {mockProduct.title}
                  </h3>

                  <button
                    className="mt-4 w-full py-3 font-bold text-sm uppercase tracking-wider transition-all transform hover:scale-[1.02]"
                    style={{
                      backgroundColor: theme.accent,
                      color: '#000',
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>


        {/* ================================================================== */}
        {/* STYLE D: HYBRID TECHNICAL - Combining best elements */}
        {/* ================================================================== */}
        <section>
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-2 flex items-center gap-3">
              <span
                className="w-8 h-8 rounded flex items-center justify-center text-sm font-bold"
                style={{ backgroundColor: theme.accent, color: '#000' }}
              >
                D
              </span>
              Hybrid Technical
            </h2>
            <p className="text-neutral-400 text-sm">
              Balanced approach: Dark background, clean layout, technical details on hover.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-px bg-neutral-800">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="group relative bg-neutral-950 overflow-hidden"
              >
                {/* Image area */}
                <div className="relative aspect-[4/3] bg-neutral-900 overflow-hidden">
                  <Image
                    src={mockProduct.image}
                    alt={mockProduct.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Bottom gradient */}
                  <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-neutral-950 to-transparent" />

                  {/* Hover: specs panel */}
                  <div className="absolute inset-x-0 bottom-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform bg-gradient-to-t from-black via-black/95 to-transparent pt-12">
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div>
                        <p className="text-[10px] text-neutral-500 uppercase">Weight</p>
                        <p className="text-sm font-bold" style={{ color: theme.accent }}>7.8kg</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-neutral-500 uppercase">Frame</p>
                        <p className="text-sm font-bold" style={{ color: theme.accent }}>Carbon</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-neutral-500 uppercase">Year</p>
                        <p className="text-sm font-bold" style={{ color: theme.accent }}>2024</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 border-l-2" style={{ borderColor: theme.accent }}>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[10px] text-neutral-500 uppercase tracking-wider">
                        {mockProduct.vendor}
                      </p>
                      <h3 className="text-base font-semibold text-white mt-0.5">
                        {mockProduct.title}
                      </h3>
                    </div>
                    <span
                      className="text-lg font-bold whitespace-nowrap"
                      style={{ color: theme.accent }}
                    >
                      {mockProduct.price}
                    </span>
                  </div>

                  <button
                    className="mt-4 w-full py-2.5 text-sm font-medium border transition-all"
                    style={{
                      borderColor: theme.accent,
                      color: theme.accent,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = theme.accent
                      e.currentTarget.style.color = '#000'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent'
                      e.currentTarget.style.color = theme.accent
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>


        {/* ================================================================== */}
        {/* PAGE LAYOUT EXAMPLES */}
        {/* ================================================================== */}
        <section className="border-t border-neutral-800 pt-16">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2">Page Header Variations</h2>
            <p className="text-neutral-400 text-sm">
              Different approaches to the shop page header/hero area
            </p>
          </div>

          {/* Header Style 1: Minimal with accent line */}
          <div className="mb-8 bg-neutral-900 p-8">
            <div className="max-w-4xl">
              <div
                className="w-16 h-1 mb-4"
                style={{ backgroundColor: theme.accent }}
              />
              <h1 className="text-4xl font-black uppercase tracking-tight mb-2">
                The Collection
              </h1>
              <p className="text-neutral-400 text-lg">
                Premium road & triathlon machines built for speed.
              </p>
            </div>
          </div>

          {/* Header Style 2: Bold split */}
          <div className="mb-8 bg-neutral-900 overflow-hidden">
            <div className="flex">
              <div className="flex-1 p-8">
                <p
                  className="text-xs uppercase tracking-[0.3em] font-semibold mb-2"
                  style={{ color: theme.accent }}
                >
                  Bicycles2U
                </p>
                <h1 className="text-5xl font-black uppercase leading-none">
                  Shop
                </h1>
              </div>
              <div
                className="w-1/3 flex items-center justify-center"
                style={{ backgroundColor: theme.accent }}
              >
                <span className="text-black text-sm font-bold uppercase tracking-wider">
                  6 Bikes Available
                </span>
              </div>
            </div>
          </div>

          {/* Header Style 3: Full-width hero */}
          <div
            className="relative h-64 flex items-center"
            style={{
              background: `linear-gradient(135deg, #0a0a0a 0%, ${theme.accent}15 100%)`
            }}
          >
            <div
              className="absolute top-0 right-0 w-1/2 h-full opacity-10"
              style={{
                backgroundImage: `repeating-linear-gradient(
                  -45deg,
                  ${theme.accent},
                  ${theme.accent} 1px,
                  transparent 1px,
                  transparent 40px
                )`
              }}
            />
            <div className="relative z-10 px-8">
              <h1 className="text-6xl font-black uppercase tracking-tighter">
                Shop
              </h1>
              <div className="flex items-center gap-4 mt-4">
                <span
                  className="px-3 py-1 text-xs font-semibold uppercase"
                  style={{ backgroundColor: theme.accent, color: '#000' }}
                >
                  Road
                </span>
                <span
                  className="px-3 py-1 text-xs font-semibold uppercase border"
                  style={{ borderColor: theme.accent, color: theme.accent }}
                >
                  Triathlon
                </span>
                <span
                  className="px-3 py-1 text-xs font-semibold uppercase border"
                  style={{ borderColor: theme.accent, color: theme.accent }}
                >
                  Time Trial
                </span>
              </div>
            </div>
          </div>
        </section>


        {/* ================================================================== */}
        {/* SUMMARY / NEXT STEPS */}
        {/* ================================================================== */}
        <section className="border-t border-neutral-800 pt-16">
          <h2 className="text-2xl font-bold mb-6">Summary & Recommendations</h2>
          <div className="grid md:grid-cols-2 gap-8 text-sm">
            <div className="bg-neutral-900 p-6 rounded-lg">
              <h3 className="font-bold mb-3" style={{ color: theme.accent }}>
                Key Design Principles
              </h3>
              <ul className="space-y-2 text-neutral-300">
                <li>• Dark backgrounds (carbon fiber aesthetic)</li>
                <li>• Angular elements reflecting bike geometry</li>
                <li>• Technical specs prominently displayed</li>
                <li>• High contrast accent colors</li>
                <li>• Minimal chrome, maximum impact</li>
                <li>• Photography-forward layouts</li>
              </ul>
            </div>
            <div className="bg-neutral-900 p-6 rounded-lg">
              <h3 className="font-bold mb-3" style={{ color: theme.accent }}>
                Typography Guidelines
              </h3>
              <ul className="space-y-2 text-neutral-300">
                <li>• Bold/Black weights for headings</li>
                <li>• Uppercase with tight tracking</li>
                <li>• Monospace for specs/data</li>
                <li>• Size hierarchy emphasizes product names</li>
                <li>• Brand names smaller, uppercase, tracked</li>
                <li>• Prices always prominent</li>
              </ul>
            </div>
          </div>
        </section>

      </div>
    </div>
  )
}
