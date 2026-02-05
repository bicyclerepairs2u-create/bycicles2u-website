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
        {/* STYLE E: MODERN AERO - Full Mock Website */}
        {/* ================================================================== */}
        <section>
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-2 flex items-center gap-3">
              <span
                className="w-8 h-8 rounded flex items-center justify-center text-sm font-bold"
                style={{ backgroundColor: '#FF5722', color: '#fff' }}
              >
                E
              </span>
              Modern Aero — Full Site Preview
            </h2>
            <p className="text-neutral-400 text-sm">
              Performance & Speed. High-contrast technical aesthetic designed to look fast. Matte Black + Reflective Silver + Electric Orange.
            </p>
            <div className="flex gap-3 mt-3">
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded" style={{ backgroundColor: '#2B2B2B', border: '1px solid #555' }} />
                <span className="text-xs text-neutral-500">Matte Charcoal #2B2B2B</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded" style={{ backgroundColor: '#F0F0F0' }} />
                <span className="text-xs text-neutral-500">Reflective Silver #F0F0F0</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded" style={{ backgroundColor: '#FF5722' }} />
                <span className="text-xs text-neutral-500">Electric Orange #FF5722</span>
              </div>
            </div>
          </div>

          {/* Mock Website Container */}
          <div className="rounded-lg overflow-hidden border border-neutral-700" style={{ backgroundColor: '#1a1a1a' }}>

            {/* Navigation Bar */}
            <nav className="flex items-center justify-between px-8 py-4" style={{ backgroundColor: '#2B2B2B', borderBottom: '1px solid #3a3a3a' }}>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded" style={{ backgroundColor: '#FF5722' }} />
                <span className="text-lg font-black uppercase tracking-tight" style={{ color: '#F0F0F0' }}>
                  Bicycles<span style={{ color: '#FF5722' }}>2U</span>
                </span>
              </div>
              <div className="flex items-center gap-8">
                {['Shop', 'Services', 'About', 'Contact'].map((item) => (
                  <span
                    key={item}
                    className="text-sm font-medium uppercase tracking-wider cursor-pointer transition-colors hover:text-white"
                    style={{ color: '#999' }}
                  >
                    {item}
                  </span>
                ))}
                <button
                  className="px-4 py-2 text-sm font-bold uppercase tracking-wide"
                  style={{ backgroundColor: '#FF5722', color: '#fff' }}
                >
                  Book Service
                </button>
              </div>
            </nav>

            {/* Hero Section */}
            <div className="relative h-96 overflow-hidden" style={{ backgroundColor: '#2B2B2B' }}>
              {/* Speed lines background pattern */}
              <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                  backgroundImage: `repeating-linear-gradient(
                    -45deg,
                    #F0F0F0,
                    #F0F0F0 2px,
                    transparent 2px,
                    transparent 20px
                  )`
                }}
              />
              {/* Gradient overlay */}
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(135deg, rgba(43,43,43,0.95) 0%, rgba(43,43,43,0.7) 50%, rgba(255,87,34,0.1) 100%)'
                }}
              />

              <div className="relative z-10 h-full flex items-center px-12">
                <div className="max-w-2xl">
                  <div className="w-16 h-1 mb-6" style={{ backgroundColor: '#FF5722' }} />
                  <h1 className="text-5xl font-black uppercase leading-none mb-4" style={{ color: '#F0F0F0' }}>
                    Built for
                    <br />
                    <span style={{ color: '#FF5722' }}>Speed</span>
                  </h1>
                  <p className="text-lg mb-8" style={{ color: '#999' }}>
                    Premium road and triathlon bikes. Expert repairs. Uncompromising performance.
                  </p>
                  <div className="flex gap-4">
                    <button
                      className="px-8 py-3 text-sm font-bold uppercase tracking-wider"
                      style={{ backgroundColor: '#FF5722', color: '#fff' }}
                    >
                      Shop Now
                    </button>
                    <button
                      className="px-8 py-3 text-sm font-bold uppercase tracking-wider border"
                      style={{ borderColor: '#F0F0F0', color: '#F0F0F0', backgroundColor: 'transparent' }}
                    >
                      Our Services
                    </button>
                  </div>
                </div>
              </div>

              {/* Decorative corner accent */}
              <div className="absolute top-0 right-0 w-64 h-64">
                <div className="absolute top-0 right-0 w-48 h-1" style={{ backgroundColor: '#FF5722' }} />
                <div className="absolute top-0 right-0 w-1 h-48" style={{ backgroundColor: '#FF5722' }} />
              </div>
            </div>

            {/* Products Section */}
            <div className="px-12 py-16" style={{ backgroundColor: '#1a1a1a' }}>
              <div className="flex items-end justify-between mb-8">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] font-bold mb-2" style={{ color: '#FF5722' }}>
                    Featured Machines
                  </p>
                  <h2 className="text-3xl font-black uppercase" style={{ color: '#F0F0F0' }}>
                    The Collection
                  </h2>
                </div>
                <button className="text-sm font-medium flex items-center gap-2" style={{ color: '#FF5722' }}>
                  View All <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid md:grid-cols-4 gap-6">
                {[
                  { name: 'Cervélo P5 Disc', brand: 'Cervélo', price: '$8,499' },
                  { name: 'S-Works Tarmac SL8', brand: 'Specialized', price: '$12,500' },
                  { name: 'SystemSix Hi-MOD', brand: 'Cannondale', price: '$9,200' },
                  { name: 'Aeroad CFR', brand: 'Canyon', price: '$7,999' },
                ].map((bike, i) => (
                  <div
                    key={i}
                    className="group relative overflow-hidden"
                    style={{ backgroundColor: '#2B2B2B' }}
                  >
                    <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: 'linear-gradient(90deg, #FF5722 0%, #FF5722 30%, transparent 100%)' }} />
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image src={mockProduct.image} alt={bike.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(43,43,43,0) 0%, rgba(43,43,43,0.9) 100%)' }} />
                    </div>
                    <div className="p-4">
                      <p className="text-[10px] uppercase tracking-[0.25em] font-bold mb-1" style={{ color: '#FF5722' }}>{bike.brand}</p>
                      <h3 className="text-sm font-bold mb-2" style={{ color: '#F0F0F0' }}>{bike.name}</h3>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-black" style={{ color: '#F0F0F0' }}>{bike.price}</span>
                        <button className="p-2" style={{ backgroundColor: '#FF5722' }}>
                          <ShoppingCart className="w-4 h-4 text-white" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Services Section */}
            <div className="px-12 py-16" style={{ backgroundColor: '#2B2B2B' }}>
              <div className="text-center mb-12">
                <p className="text-xs uppercase tracking-[0.3em] font-bold mb-2" style={{ color: '#FF5722' }}>Expert Care</p>
                <h2 className="text-3xl font-black uppercase" style={{ color: '#F0F0F0' }}>Service Packages</h2>
              </div>

              <div className="grid md:grid-cols-4 gap-4">
                {[
                  { name: 'Basic Tune', price: '$59', features: ['Safety check', 'Brake adjustment', 'Gear tuning'] },
                  { name: 'Standard', price: '$119', features: ['Full inspection', 'Chain clean', 'Wheel true'] },
                  { name: 'Deluxe', price: '$159', features: ['Deep clean', 'Cable replace', 'Bearing check'], featured: true },
                  { name: 'Ultimate', price: '$299', features: ['Complete overhaul', 'All bearings', 'Premium lube'] },
                ].map((service, i) => (
                  <div
                    key={i}
                    className="p-6 relative"
                    style={{
                      backgroundColor: service.featured ? '#FF5722' : '#1a1a1a',
                      border: service.featured ? 'none' : '1px solid #3a3a3a'
                    }}
                  >
                    {service.featured && (
                      <span className="absolute top-0 right-0 px-2 py-1 text-[10px] font-bold uppercase bg-black text-white">
                        Popular
                      </span>
                    )}
                    <h3 className="text-lg font-bold uppercase mb-2" style={{ color: service.featured ? '#fff' : '#F0F0F0' }}>
                      {service.name}
                    </h3>
                    <p className="text-3xl font-black mb-4" style={{ color: service.featured ? '#fff' : '#FF5722' }}>
                      {service.price}
                    </p>
                    <ul className="space-y-2 text-sm" style={{ color: service.featured ? 'rgba(255,255,255,0.8)' : '#999' }}>
                      {service.features.map((f, j) => (
                        <li key={j} className="flex items-center gap-2">
                          <Zap className="w-3 h-3" style={{ color: service.featured ? '#fff' : '#FF5722' }} />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <button
                      className="w-full mt-6 py-2 text-sm font-bold uppercase tracking-wide"
                      style={{
                        backgroundColor: service.featured ? '#fff' : 'transparent',
                        color: service.featured ? '#FF5722' : '#F0F0F0',
                        border: service.featured ? 'none' : '1px solid #F0F0F0'
                      }}
                    >
                      Book Now
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <footer className="px-12 py-12" style={{ backgroundColor: '#141414', borderTop: '1px solid #2B2B2B' }}>
              <div className="grid md:grid-cols-4 gap-8">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-6 h-6 rounded" style={{ backgroundColor: '#FF5722' }} />
                    <span className="text-sm font-black uppercase" style={{ color: '#F0F0F0' }}>Bicycles2U</span>
                  </div>
                  <p className="text-xs" style={{ color: '#666' }}>Premium road & triathlon bikes. Expert service.</p>
                </div>
                {[
                  { title: 'Shop', links: ['Road Bikes', 'TT Bikes', 'Accessories'] },
                  { title: 'Services', links: ['Basic Tune', 'Full Service', 'Custom Builds'] },
                  { title: 'Contact', links: ['0402 880 242', 'Queens Park NSW', 'By Appointment'] },
                ].map((col, i) => (
                  <div key={i}>
                    <h4 className="text-xs font-bold uppercase tracking-wider mb-4" style={{ color: '#FF5722' }}>{col.title}</h4>
                    <ul className="space-y-2">
                      {col.links.map((link, j) => (
                        <li key={j} className="text-xs" style={{ color: '#666' }}>{link}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </footer>
          </div>
        </section>


        {/* ================================================================== */}
        {/* STYLE F: HERITAGE RACING - Full Mock Website */}
        {/* ================================================================== */}
        <section>
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-2 flex items-center gap-3">
              <span
                className="w-8 h-8 rounded flex items-center justify-center text-sm font-bold"
                style={{ backgroundColor: '#B8860B', color: '#fff' }}
              >
                F
              </span>
              Heritage Racing — Full Site Preview
            </h2>
            <p className="text-neutral-400 text-sm">
              Classic & Timeless. Premium heritage feel reflecting traditional racing elegance. British Racing Green + Cream + Metallic Gold.
            </p>
            <div className="flex gap-3 mt-3">
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded" style={{ backgroundColor: '#004225' }} />
                <span className="text-xs text-neutral-500">Racing Green #004225</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded" style={{ backgroundColor: '#F5F5DC' }} />
                <span className="text-xs text-neutral-500">Cream #F5F5DC</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded" style={{ backgroundColor: '#B8860B' }} />
                <span className="text-xs text-neutral-500">Metallic Gold #B8860B</span>
              </div>
            </div>
          </div>

          {/* Mock Website Container */}
          <div className="rounded-lg overflow-hidden border" style={{ backgroundColor: '#F5F5DC', borderColor: 'rgba(184, 134, 11, 0.3)' }}>

            {/* Navigation Bar */}
            <nav className="flex items-center justify-between px-8 py-5" style={{ backgroundColor: '#004225' }}>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ border: '2px solid #B8860B' }}>
                  <span className="text-xs font-bold" style={{ color: '#B8860B' }}>B2U</span>
                </div>
                <span className="text-lg font-semibold tracking-wide" style={{ color: '#F5F5DC', fontFamily: 'Georgia, serif' }}>
                  Bicycles2U
                </span>
              </div>
              <div className="flex items-center gap-8">
                {['Collection', 'Services', 'Heritage', 'Contact'].map((item) => (
                  <span
                    key={item}
                    className="text-sm tracking-wider cursor-pointer transition-colors"
                    style={{ color: 'rgba(245, 245, 220, 0.7)', fontFamily: 'Georgia, serif' }}
                  >
                    {item}
                  </span>
                ))}
                <button
                  className="px-5 py-2 text-sm font-medium tracking-wide"
                  style={{ backgroundColor: '#B8860B', color: '#fff' }}
                >
                  Book Consultation
                </button>
              </div>
            </nav>

            {/* Hero Section */}
            <div className="relative h-[420px] overflow-hidden" style={{ backgroundColor: '#004225' }}>
              {/* Elegant pattern overlay */}
              <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                  backgroundImage: `radial-gradient(circle at 20px 20px, #B8860B 1px, transparent 1px)`,
                  backgroundSize: '40px 40px'
                }}
              />

              <div className="relative z-10 h-full flex items-center px-12">
                <div className="max-w-xl">
                  {/* Decorative gold line */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-[1px]" style={{ backgroundColor: '#B8860B' }} />
                    <span className="text-xs uppercase tracking-[0.3em]" style={{ color: '#B8860B' }}>Est. Queens Park</span>
                  </div>
                  <h1 className="text-5xl leading-tight mb-6" style={{ color: '#F5F5DC', fontFamily: 'Georgia, serif', fontWeight: 400 }}>
                    The Art of
                    <br />
                    <span className="italic" style={{ color: '#B8860B' }}>Fine Cycling</span>
                  </h1>
                  <p className="text-lg mb-8 leading-relaxed" style={{ color: 'rgba(245, 245, 220, 0.7)' }}>
                    Curated road and triathlon bicycles. Meticulous craftsmanship. A tradition of excellence.
                  </p>
                  <div className="flex gap-4">
                    <button
                      className="px-8 py-3 text-sm tracking-wider transition-colors"
                      style={{ backgroundColor: '#B8860B', color: '#fff' }}
                    >
                      View Collection
                    </button>
                    <button
                      className="px-8 py-3 text-sm tracking-wider border"
                      style={{ borderColor: '#B8860B', color: '#B8860B', backgroundColor: 'transparent' }}
                    >
                      Our Story
                    </button>
                  </div>
                </div>

                {/* Decorative frame element */}
                <div className="absolute right-12 top-1/2 -translate-y-1/2 w-72 h-72" style={{ border: '1px solid rgba(184, 134, 11, 0.3)' }}>
                  <div className="absolute -top-2 -left-2 w-4 h-4" style={{ borderTop: '2px solid #B8860B', borderLeft: '2px solid #B8860B' }} />
                  <div className="absolute -top-2 -right-2 w-4 h-4" style={{ borderTop: '2px solid #B8860B', borderRight: '2px solid #B8860B' }} />
                  <div className="absolute -bottom-2 -left-2 w-4 h-4" style={{ borderBottom: '2px solid #B8860B', borderLeft: '2px solid #B8860B' }} />
                  <div className="absolute -bottom-2 -right-2 w-4 h-4" style={{ borderBottom: '2px solid #B8860B', borderRight: '2px solid #B8860B' }} />
                </div>
              </div>
            </div>

            {/* Products Section */}
            <div className="px-12 py-16" style={{ backgroundColor: '#F5F5DC' }}>
              <div className="text-center mb-12">
                <div className="flex items-center justify-center gap-4 mb-4">
                  <div className="w-16 h-[1px]" style={{ backgroundColor: '#B8860B' }} />
                  <span className="text-xs uppercase tracking-[0.3em]" style={{ color: '#B8860B' }}>Curated Selection</span>
                  <div className="w-16 h-[1px]" style={{ backgroundColor: '#B8860B' }} />
                </div>
                <h2 className="text-3xl" style={{ color: '#004225', fontFamily: 'Georgia, serif' }}>
                  The Collection
                </h2>
              </div>

              <div className="grid md:grid-cols-4 gap-6">
                {[
                  { name: 'Cervélo P5 Disc', brand: 'Cervélo', price: '$8,499' },
                  { name: 'Tarmac SL8', brand: 'Specialized', price: '$12,500' },
                  { name: 'SystemSix Hi-MOD', brand: 'Cannondale', price: '$9,200' },
                  { name: 'Aeroad CFR', brand: 'Canyon', price: '$7,999' },
                ].map((bike, i) => (
                  <div
                    key={i}
                    className="group bg-white overflow-hidden"
                    style={{ boxShadow: '0 4px 20px rgba(0, 66, 37, 0.08)' }}
                  >
                    <div className="h-[2px]" style={{ backgroundColor: '#B8860B' }} />
                    <div className="relative aspect-square overflow-hidden m-4 mb-0">
                      <div className="absolute inset-0 z-10" style={{ border: '1px solid rgba(184, 134, 11, 0.2)' }} />
                      <Image src={mockProduct.image} alt={bike.name} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                    </div>
                    <div className="p-5">
                      <div className="w-8 h-[1px] mb-3" style={{ backgroundColor: '#B8860B' }} />
                      <p className="text-[10px] uppercase tracking-[0.2em] mb-1" style={{ color: '#004225' }}>{bike.brand}</p>
                      <h3 className="text-base mb-3" style={{ color: '#004225', fontFamily: 'Georgia, serif' }}>{bike.name}</h3>
                      <div className="flex items-center justify-between pt-3" style={{ borderTop: '1px solid rgba(184, 134, 11, 0.2)' }}>
                        <span className="font-semibold" style={{ color: '#004225' }}>{bike.price}</span>
                        <span className="text-xs uppercase tracking-wider cursor-pointer" style={{ color: '#B8860B' }}>View</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Services Section */}
            <div className="px-12 py-16" style={{ backgroundColor: '#fff' }}>
              <div className="flex items-center justify-between mb-12">
                <div>
                  <div className="flex items-center gap-4 mb-2">
                    <div className="w-8 h-[1px]" style={{ backgroundColor: '#B8860B' }} />
                    <span className="text-xs uppercase tracking-[0.3em]" style={{ color: '#B8860B' }}>Craftsmanship</span>
                  </div>
                  <h2 className="text-2xl" style={{ color: '#004225', fontFamily: 'Georgia, serif' }}>Service Atelier</h2>
                </div>
              </div>

              <div className="grid md:grid-cols-4 gap-6">
                {[
                  { name: 'Essential Care', price: '$59', desc: 'Safety inspection & adjustments' },
                  { name: 'Classic Service', price: '$119', desc: 'Complete tune & cleaning' },
                  { name: 'Prestige', price: '$159', desc: 'Full restoration service', featured: true },
                  { name: 'Bespoke', price: '$299', desc: 'Complete overhaul & rebuild' },
                ].map((service, i) => (
                  <div
                    key={i}
                    className="p-6 relative text-center"
                    style={{
                      backgroundColor: service.featured ? '#004225' : 'transparent',
                      border: service.featured ? 'none' : '1px solid rgba(184, 134, 11, 0.3)'
                    }}
                  >
                    {service.featured && (
                      <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-3 py-1 text-[10px] uppercase tracking-wider" style={{ backgroundColor: '#B8860B', color: '#fff' }}>
                        Recommended
                      </span>
                    )}
                    <h3 className="text-sm uppercase tracking-wider mb-2" style={{ color: service.featured ? '#B8860B' : '#004225' }}>
                      {service.name}
                    </h3>
                    <p className="text-3xl mb-3" style={{ color: service.featured ? '#F5F5DC' : '#004225', fontFamily: 'Georgia, serif' }}>
                      {service.price}
                    </p>
                    <p className="text-xs mb-6" style={{ color: service.featured ? 'rgba(245,245,220,0.7)' : '#666' }}>
                      {service.desc}
                    </p>
                    <button
                      className="w-full py-2.5 text-xs uppercase tracking-wider transition-colors"
                      style={{
                        backgroundColor: service.featured ? '#B8860B' : 'transparent',
                        color: service.featured ? '#fff' : '#004225',
                        border: service.featured ? 'none' : '1px solid #004225'
                      }}
                    >
                      Reserve
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Testimonial Banner */}
            <div className="px-12 py-12 text-center" style={{ backgroundColor: '#004225' }}>
              <div className="max-w-2xl mx-auto">
                <div className="text-4xl mb-4" style={{ color: '#B8860B' }}>&ldquo;</div>
                <p className="text-xl italic mb-4" style={{ color: '#F5F5DC', fontFamily: 'Georgia, serif' }}>
                  Exceptional craftsmanship and attention to detail. A true artisan of the cycling world.
                </p>
                <p className="text-xs uppercase tracking-wider" style={{ color: '#B8860B' }}>— Satisfied Client, Sydney</p>
              </div>
            </div>

            {/* Footer */}
            <footer className="px-12 py-12" style={{ backgroundColor: '#003319' }}>
              <div className="grid md:grid-cols-4 gap-8">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ border: '1px solid #B8860B' }}>
                      <span className="text-[10px] font-semibold" style={{ color: '#B8860B' }}>B2U</span>
                    </div>
                    <span className="text-sm" style={{ color: '#F5F5DC', fontFamily: 'Georgia, serif' }}>Bicycles2U</span>
                  </div>
                  <p className="text-xs leading-relaxed" style={{ color: 'rgba(245,245,220,0.5)' }}>
                    Purveyors of fine cycling machines since establishment in Queens Park.
                  </p>
                </div>
                {[
                  { title: 'Collection', links: ['Road Bicycles', 'Triathlon', 'Accessories'] },
                  { title: 'Atelier', links: ['Essential Care', 'Full Service', 'Bespoke Builds'] },
                  { title: 'Visit', links: ['167/171 Bronte Rd', 'Queens Park NSW', 'By Appointment'] },
                ].map((col, i) => (
                  <div key={i}>
                    <h4 className="text-xs uppercase tracking-wider mb-4" style={{ color: '#B8860B' }}>{col.title}</h4>
                    <ul className="space-y-2">
                      {col.links.map((link, j) => (
                        <li key={j} className="text-xs" style={{ color: 'rgba(245,245,220,0.5)', fontFamily: 'Georgia, serif' }}>{link}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <div className="mt-8 pt-8 flex items-center justify-between" style={{ borderTop: '1px solid rgba(184, 134, 11, 0.2)' }}>
                <p className="text-[10px]" style={{ color: 'rgba(245,245,220,0.3)' }}>© 2024 Bicycles2U. All rights reserved.</p>
                <div className="flex items-center gap-4">
                  <span className="text-xs" style={{ color: '#B8860B' }}>0402 880 242</span>
                </div>
              </div>
            </footer>
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
