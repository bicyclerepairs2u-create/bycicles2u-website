"use client"

import { useState } from 'react'
import Image from 'next/image'
import { ShoppingCart, ChevronRight, Zap, Weight, Ruler, Check } from 'lucide-react'

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
        {/* STYLE G: PERFORMANCE ART - Luxury meets Performance (Porsche-inspired) */}
        {/* ================================================================== */}
        <section>
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-2 flex items-center gap-3">
              <span
                className="w-8 h-8 rounded flex items-center justify-center text-sm font-bold"
                style={{ backgroundColor: '#1B5E3A', color: '#fff' }}
              >
                G
              </span>
              Performance Art — Full Site Preview
            </h2>
            <p className="text-neutral-400 text-sm">
              Luxury meets Performance. Racing heritage refinement with technical precision. Clean, sophisticated, premium.
            </p>
            <div className="flex gap-3 mt-3">
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded" style={{ backgroundColor: '#0a0a0a', border: '1px solid #333' }} />
                <span className="text-xs text-neutral-500">Obsidian Black #0A0A0A</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded" style={{ backgroundColor: '#FAFAFA', border: '1px solid #ddd' }} />
                <span className="text-xs text-neutral-500">Platinum White #FAFAFA</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded" style={{ backgroundColor: '#1B5E3A' }} />
                <span className="text-xs text-neutral-500">Racing Green #1B5E3A</span>
              </div>
            </div>
          </div>

          {/* Mock Website Container */}
          <div className="rounded-lg overflow-hidden" style={{ backgroundColor: '#0a0a0a', border: '1px solid #1a1a1a' }}>

            {/* Navigation Bar - Clean & Minimal */}
            <nav className="flex items-center justify-between px-10 py-5" style={{ backgroundColor: '#0a0a0a', borderBottom: '1px solid #1a1a1a' }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ border: '2px solid #1B5E3A' }}>
                  <span className="text-xs font-semibold tracking-tight" style={{ color: '#FAFAFA' }}>B2U</span>
                </div>
                <div>
                  <span className="text-base font-medium tracking-wide" style={{ color: '#FAFAFA' }}>
                    Bicycles2U
                  </span>
                  <span className="block text-[9px] uppercase tracking-[0.2em]" style={{ color: '#666' }}>Performance Cycling</span>
                </div>
              </div>
              <div className="flex items-center gap-10">
                {['Collection', 'Performance', 'Atelier', 'Contact'].map((item, idx) => (
                  <span
                    key={item}
                    className="text-sm tracking-wide cursor-pointer transition-colors relative"
                    style={{ color: idx === 0 ? '#FAFAFA' : '#666' }}
                  >
                    {item}
                    {idx === 0 && <div className="absolute -bottom-1 left-0 right-0 h-[1px]" style={{ backgroundColor: '#1B5E3A' }} />}
                  </span>
                ))}
                <button
                  className="px-6 py-2.5 text-sm tracking-wide transition-all"
                  style={{ backgroundColor: '#1B5E3A', color: '#FAFAFA' }}
                >
                  Configure
                </button>
              </div>
            </nav>

            {/* Hero Section - Cinematic & Premium */}
            <div className="relative h-[500px] overflow-hidden" style={{ backgroundColor: '#0a0a0a' }}>
              {/* Subtle gradient overlay */}
              <div
                className="absolute inset-0"
                style={{
                  background: 'radial-gradient(ellipse at 70% 50%, rgba(200, 8, 21, 0.08) 0%, transparent 50%)'
                }}
              />
              {/* Fine grid pattern */}
              <div
                className="absolute inset-0 opacity-[0.02]"
                style={{
                  backgroundImage: `linear-gradient(#FAFAFA 1px, transparent 1px), linear-gradient(90deg, #FAFAFA 1px, transparent 1px)`,
                  backgroundSize: '60px 60px'
                }}
              />

              <div className="relative z-10 h-full flex items-center px-16">
                <div className="max-w-2xl">
                  <p className="text-xs uppercase tracking-[0.4em] mb-6" style={{ color: '#1B5E3A' }}>
                    Precision Engineering
                  </p>
                  <h1 className="text-6xl font-light leading-[1.1] mb-6" style={{ color: '#FAFAFA', letterSpacing: '-0.02em' }}>
                    Where Performance
                    <br />
                    <span className="font-medium">Becomes Art</span>
                  </h1>
                  <p className="text-lg mb-10 max-w-md leading-relaxed" style={{ color: '#888' }}>
                    Meticulously curated machines for those who understand that excellence is not a destination, but a pursuit.
                  </p>
                  <div className="flex gap-4 items-center">
                    <button
                      className="px-8 py-4 text-sm tracking-wider transition-all"
                      style={{ backgroundColor: '#FAFAFA', color: '#0a0a0a' }}
                    >
                      Explore Collection
                    </button>
                    <button
                      className="px-8 py-4 text-sm tracking-wider border transition-all flex items-center gap-3"
                      style={{ borderColor: '#333', color: '#FAFAFA', backgroundColor: 'transparent' }}
                    >
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#1B5E3A' }} />
                      Watch Film
                    </button>
                  </div>
                </div>

                {/* Stats sidebar */}
                <div className="absolute right-16 top-1/2 -translate-y-1/2 space-y-8">
                  {[
                    { value: '6.8', unit: 'kg', label: 'Lightest Build' },
                    { value: '156', unit: 'W', label: 'Power Saved' },
                    { value: '99.9', unit: '%', label: 'Precision' },
                  ].map((stat, i) => (
                    <div key={i} className="text-right">
                      <div className="flex items-baseline justify-end gap-1">
                        <span className="text-3xl font-light" style={{ color: '#FAFAFA' }}>{stat.value}</span>
                        <span className="text-sm" style={{ color: '#1B5E3A' }}>{stat.unit}</span>
                      </div>
                      <p className="text-[10px] uppercase tracking-wider mt-1" style={{ color: '#555' }}>{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-0 right-0 h-[1px]" style={{ background: 'linear-gradient(90deg, transparent 0%, #1B5E3A 50%, transparent 100%)' }} />
            </div>

            {/* Featured Section - Editorial Layout (Dark) */}
            <div className="px-16 py-20" style={{ backgroundColor: '#111' }}>
              <div className="flex items-end justify-between mb-12">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] mb-2" style={{ color: '#1B5E3A' }}>The Collection</p>
                  <h2 className="text-4xl font-light" style={{ color: '#FAFAFA', letterSpacing: '-0.02em' }}>
                    Curated Excellence
                  </h2>
                </div>
                <div className="flex gap-2">
                  <button className="w-10 h-10 flex items-center justify-center border transition-colors" style={{ borderColor: '#333', color: '#FAFAFA' }}>
                    <ChevronRight className="w-4 h-4 rotate-180" />
                  </button>
                  <button className="w-10 h-10 flex items-center justify-center transition-colors" style={{ backgroundColor: '#1B5E3A', color: '#FAFAFA' }}>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-12 gap-6">
                {/* Featured large card */}
                <div className="col-span-6 group">
                  <div className="relative aspect-[4/3] overflow-hidden mb-6" style={{ backgroundColor: '#1a1a1a' }}>
                    <Image src={mockProduct.image} alt="Featured Bike" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute top-4 left-4 px-3 py-1 text-[10px] uppercase tracking-wider" style={{ backgroundColor: '#1B5E3A', color: '#fff' }}>
                      Featured
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="px-6 py-2 text-sm" style={{ backgroundColor: '#1B5E3A', color: '#FAFAFA' }}>
                        Configure
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.2em] mb-1" style={{ color: '#1B5E3A' }}>Cervélo</p>
                      <h3 className="text-xl font-medium mb-1" style={{ color: '#FAFAFA' }}>P5 Disc — Ultegra Di2</h3>
                      <p className="text-sm" style={{ color: '#666' }}>The pinnacle of time trial engineering</p>
                    </div>
                    <span className="text-xl font-light" style={{ color: '#1B5E3A' }}>$8,499</span>
                  </div>
                </div>

                {/* Smaller cards */}
                <div className="col-span-6 grid grid-cols-2 gap-6">
                  {[
                    { name: 'Tarmac SL8', brand: 'Specialized', price: '$12,500', tag: 'Aero Road' },
                    { name: 'SystemSix Hi-MOD', brand: 'Cannondale', price: '$9,200', tag: 'Speed' },
                    { name: 'Aeroad CFR', brand: 'Canyon', price: '$7,999', tag: 'Lightweight' },
                    { name: 'Madone SLR', brand: 'Trek', price: '$11,200', tag: 'Race' },
                  ].map((bike, i) => (
                    <div key={i} className="group">
                      <div className="relative aspect-square overflow-hidden mb-4" style={{ backgroundColor: '#1a1a1a' }}>
                        <Image src={mockProduct.image} alt={bike.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                        <div className="absolute top-3 right-3 px-2 py-0.5 text-[9px] uppercase tracking-wider" style={{ backgroundColor: '#1B5E3A', color: '#FAFAFA' }}>
                          {bike.tag}
                        </div>
                      </div>
                      <p className="text-[9px] uppercase tracking-[0.2em] mb-0.5" style={{ color: '#1B5E3A' }}>{bike.brand}</p>
                      <div className="flex justify-between items-baseline">
                        <h3 className="text-sm font-medium" style={{ color: '#FAFAFA' }}>{bike.name}</h3>
                        <span className="text-sm" style={{ color: '#888' }}>{bike.price}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Services Section - Dark & Premium */}
            <div className="px-16 py-20" style={{ backgroundColor: '#0a0a0a' }}>
              <div className="grid grid-cols-12 gap-12">
                <div className="col-span-4">
                  <p className="text-xs uppercase tracking-[0.3em] mb-3" style={{ color: '#1B5E3A' }}>The Atelier</p>
                  <h2 className="text-3xl font-light mb-6" style={{ color: '#FAFAFA', letterSpacing: '-0.02em' }}>
                    Precision Service
                  </h2>
                  <p className="text-sm leading-relaxed mb-8" style={{ color: '#666' }}>
                    Every component inspected. Every adjustment measured. Every ride perfected.
                  </p>
                  <button className="text-sm tracking-wide flex items-center gap-3 group" style={{ color: '#FAFAFA' }}>
                    View All Services
                    <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>

                <div className="col-span-8 grid grid-cols-2 gap-px" style={{ backgroundColor: '#1a1a1a' }}>
                  {[
                    { name: 'Performance Tune', price: '$159', time: '3-4 hours', desc: 'Complete drivetrain optimization and precision adjustment' },
                    { name: 'Race Preparation', price: '$299', time: '1 day', desc: 'Competition-ready setup with aerodynamic tuning' },
                    { name: 'Full Restoration', price: '$499', time: '3-5 days', desc: 'Complete overhaul with premium components' },
                    { name: 'Custom Build', price: 'POA', time: 'Consultation', desc: 'Bespoke builds tailored to your specifications' },
                  ].map((service, i) => (
                    <div
                      key={i}
                      className="p-8 group cursor-pointer transition-colors"
                      style={{ backgroundColor: '#0a0a0a' }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#111'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#0a0a0a'}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-base font-medium" style={{ color: '#FAFAFA' }}>{service.name}</h3>
                        <span className="text-lg font-light" style={{ color: '#1B5E3A' }}>{service.price}</span>
                      </div>
                      <p className="text-xs mb-4 leading-relaxed" style={{ color: '#666' }}>{service.desc}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] uppercase tracking-wider" style={{ color: '#444' }}>{service.time}</span>
                        <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: '#1B5E3A' }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quote Section */}
            <div className="relative py-20 px-16" style={{ backgroundColor: '#111' }}>
              <div className="max-w-3xl mx-auto text-center">
                <div className="w-12 h-[1px] mx-auto mb-8" style={{ backgroundColor: '#1B5E3A' }} />
                <p className="text-2xl font-light italic leading-relaxed mb-6" style={{ color: '#FAFAFA' }}>
                  &ldquo;The difference between good and great is attention to detail. We obsess over every gram, every watt, every millimeter.&rdquo;
                </p>
                <p className="text-xs uppercase tracking-[0.3em]" style={{ color: '#666' }}>Philosophy</p>
              </div>
            </div>

            {/* Footer - Refined */}
            <footer className="px-16 py-16" style={{ backgroundColor: '#0a0a0a', borderTop: '1px solid #1a1a1a' }}>
              <div className="grid grid-cols-12 gap-8">
                <div className="col-span-4">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ border: '1px solid #333' }}>
                      <span className="text-xs" style={{ color: '#FAFAFA' }}>B2U</span>
                    </div>
                    <div>
                      <span className="text-sm" style={{ color: '#FAFAFA' }}>Bicycles2U</span>
                      <span className="block text-[9px] uppercase tracking-wider" style={{ color: '#444' }}>Est. Queens Park</span>
                    </div>
                  </div>
                  <p className="text-xs leading-relaxed max-w-xs" style={{ color: '#555' }}>
                    Curating exceptional cycling machines for discerning riders. Where performance meets artistry.
                  </p>
                </div>

                <div className="col-span-8 grid grid-cols-4 gap-8">
                  {[
                    { title: 'Collection', links: ['Road', 'Triathlon', 'Time Trial', 'Gravel'] },
                    { title: 'Atelier', links: ['Service Menu', 'Custom Builds', 'Consultations', 'Fitting'] },
                    { title: 'Experience', links: ['Our Story', 'Philosophy', 'Journal', 'Events'] },
                    { title: 'Connect', links: ['167/171 Bronte Rd', 'Queens Park NSW', '0402 880 242', 'By Appointment'] },
                  ].map((col, i) => (
                    <div key={i}>
                      <h4 className="text-[10px] uppercase tracking-[0.2em] mb-4" style={{ color: '#666' }}>{col.title}</h4>
                      <ul className="space-y-2">
                        {col.links.map((link, j) => (
                          <li key={j} className="text-xs cursor-pointer transition-colors hover:text-white" style={{ color: '#888' }}>{link}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-16 pt-8 flex items-center justify-between" style={{ borderTop: '1px solid #1a1a1a' }}>
                <p className="text-[10px]" style={{ color: '#333' }}>© 2024 Bicycles2U. All rights reserved.</p>
                <div className="flex items-center gap-6">
                  <span className="text-[10px] uppercase tracking-wider cursor-pointer" style={{ color: '#555' }}>Privacy</span>
                  <span className="text-[10px] uppercase tracking-wider cursor-pointer" style={{ color: '#555' }}>Terms</span>
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#1B5E3A' }} />
                </div>
              </div>
            </footer>
          </div>
        </section>


        {/* ================================================================== */}
        {/* STYLE H: CLASSIC BIKE SHOP - Clean, Accessible, Mainstream */}
        {/* ================================================================== */}
        <section>
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-2 flex items-center gap-3">
              <span
                className="w-8 h-8 rounded flex items-center justify-center text-sm font-bold"
                style={{ backgroundColor: '#0066CC', color: '#fff' }}
              >
                H
              </span>
              Classic Bike Shop — Full Site Preview
            </h2>
            <p className="text-neutral-400 text-sm">
              Clean & Accessible. Typical mainstream bike shop aesthetic. Trustworthy, approachable, functional.
            </p>
            <div className="flex gap-3 mt-3">
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded" style={{ backgroundColor: '#FFFFFF', border: '1px solid #ddd' }} />
                <span className="text-xs text-neutral-500">Clean White #FFFFFF</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded" style={{ backgroundColor: '#0066CC' }} />
                <span className="text-xs text-neutral-500">Trust Blue #0066CC</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded" style={{ backgroundColor: '#333333' }} />
                <span className="text-xs text-neutral-500">Charcoal #333333</span>
              </div>
            </div>
          </div>

          {/* Mock Website Container */}
          <div className="rounded-lg overflow-hidden border" style={{ backgroundColor: '#fff', borderColor: '#e5e5e5' }}>

            {/* Top Bar */}
            <div className="flex items-center justify-between px-6 py-2 text-xs" style={{ backgroundColor: '#f8f9fa', color: '#666', borderBottom: '1px solid #e5e5e5' }}>
              <div className="flex items-center gap-4">
                <span>Free shipping on orders over $100</span>
              </div>
              <div className="flex items-center gap-4">
                <span>Queens Park, NSW</span>
                <span style={{ color: '#ccc' }}>|</span>
                <span style={{ color: '#0066CC', fontWeight: 500 }}>0402 880 242</span>
              </div>
            </div>

            {/* Navigation Bar */}
            <nav className="flex items-center justify-between px-6 py-4" style={{ backgroundColor: '#fff', borderBottom: '1px solid #e5e5e5' }}>
              <div className="flex items-center gap-8">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#0066CC' }}>
                    <span className="text-white text-xs font-bold">B2U</span>
                  </div>
                  <span className="text-xl font-bold" style={{ color: '#333' }}>Bicycles2U</span>
                </div>
                <div className="flex items-center gap-6">
                  {['Bikes', 'Services', 'About Us', 'Contact'].map((item, idx) => (
                    <span
                      key={item}
                      className="text-sm font-medium cursor-pointer transition-colors"
                      style={{ color: idx === 0 ? '#0066CC' : '#666' }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-4">
                <button
                  className="px-5 py-2.5 text-sm font-semibold rounded-md transition-colors"
                  style={{ backgroundColor: '#0066CC', color: '#fff' }}
                >
                  Book a Service
                </button>
              </div>
            </nav>

            {/* Hero Section */}
            <div className="relative h-[400px] overflow-hidden" style={{ backgroundColor: '#f8f9fa' }}>
              <div className="absolute inset-0 flex">
                <div className="w-1/2 flex items-center px-12">
                  <div>
                    <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full mb-4" style={{ backgroundColor: '#e6f0ff', color: '#0066CC' }}>
                      Premium Road & Triathlon Bikes
                    </span>
                    <h1 className="text-4xl font-bold leading-tight mb-4" style={{ color: '#333' }}>
                      Your Local Cycling Experts
                    </h1>
                    <p className="text-lg mb-6" style={{ color: '#666' }}>
                      Quality second-hand bikes, expert repairs, and custom builds. Serving Sydney cyclists since day one.
                    </p>
                    <div className="flex gap-3">
                      <button
                        className="px-6 py-3 text-sm font-semibold rounded-md"
                        style={{ backgroundColor: '#0066CC', color: '#fff' }}
                      >
                        Browse Bikes
                      </button>
                      <button
                        className="px-6 py-3 text-sm font-semibold rounded-md border"
                        style={{ borderColor: '#0066CC', color: '#0066CC', backgroundColor: '#fff' }}
                      >
                        Our Services
                      </button>
                    </div>
                  </div>
                </div>
                <div className="w-1/2 relative">
                  <Image src={mockProduct.image} alt="Featured Bike" fill className="object-cover" />
                </div>
              </div>
            </div>

            {/* Features Bar */}
            <div className="grid grid-cols-4" style={{ borderBottom: '1px solid #e5e5e5' }}>
              {[
                { title: 'Expert Repairs', desc: 'All makes & models' },
                { title: 'Quality Guaranteed', desc: 'Fully inspected bikes' },
                { title: 'Local Service', desc: 'Queens Park NSW' },
                { title: 'Book Today', desc: 'By appointment' },
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-3 px-6 py-5" style={{ backgroundColor: '#fff', borderRight: i < 3 ? '1px solid #e5e5e5' : 'none' }}>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#e6f0ff' }}>
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#0066CC' }} />
                  </div>
                  <div>
                    <p className="font-semibold text-sm" style={{ color: '#333' }}>{feature.title}</p>
                    <p className="text-xs" style={{ color: '#666' }}>{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Products Section */}
            <div className="px-12 py-16" style={{ backgroundColor: '#fff' }}>
              <div className="flex items-end justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold mb-2" style={{ color: '#333' }}>Featured Bikes</h2>
                  <p style={{ color: '#666' }}>Quality pre-owned road and triathlon bikes</p>
                </div>
                <button className="text-sm font-semibold flex items-center gap-1" style={{ color: '#0066CC' }}>
                  View All Bikes <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid md:grid-cols-4 gap-6">
                {[
                  { name: 'Cervélo P5 Disc', brand: 'Cervélo', price: '$8,499', condition: 'Excellent' },
                  { name: 'S-Works Tarmac SL8', brand: 'Specialized', price: '$12,500', condition: 'Like New' },
                  { name: 'SystemSix Hi-MOD', brand: 'Cannondale', price: '$9,200', condition: 'Good' },
                  { name: 'Aeroad CFR', brand: 'Canyon', price: '$7,999', condition: 'Excellent' },
                ].map((bike, i) => (
                  <div
                    key={i}
                    className="group rounded-lg overflow-hidden border transition-shadow hover:shadow-lg"
                    style={{ borderColor: '#e5e5e5' }}
                  >
                    <div className="relative aspect-square overflow-hidden" style={{ backgroundColor: '#f8f9fa' }}>
                      <Image src={mockProduct.image} alt={bike.name} fill className="object-cover transition-transform duration-300 group-hover:scale-105" />
                      <span className="absolute top-3 left-3 px-2 py-1 text-xs font-medium rounded" style={{ backgroundColor: '#e6f0ff', color: '#0066CC' }}>
                        {bike.condition}
                      </span>
                    </div>
                    <div className="p-4">
                      <p className="text-xs font-medium mb-1" style={{ color: '#888' }}>{bike.brand}</p>
                      <h3 className="font-semibold mb-2" style={{ color: '#333' }}>{bike.name}</h3>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold" style={{ color: '#0066CC' }}>{bike.price}</span>
                        <button className="px-3 py-1.5 text-xs font-semibold rounded" style={{ backgroundColor: '#0066CC', color: '#fff' }}>
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Services Section */}
            <div className="px-12 py-16" style={{ backgroundColor: '#f8f9fa' }}>
              <div className="text-center mb-10">
                <h2 className="text-2xl font-bold mb-2" style={{ color: '#333' }}>Our Services</h2>
                <p style={{ color: '#666' }}>Professional bike servicing for all makes and models</p>
              </div>

              <div className="grid md:grid-cols-4 gap-6">
                {[
                  { name: 'Basic Tune-Up', price: '$59', desc: 'Safety check, brake & gear adjustment', time: '1-2 hours' },
                  { name: 'Standard Service', price: '$119', desc: 'Full inspection, cleaning, wheel true', time: '2-3 hours' },
                  { name: 'Full Service', price: '$159', desc: 'Complete overhaul, new cables, bearings check', popular: true, time: '4-6 hours' },
                  { name: 'Premium Rebuild', price: '$299', desc: 'Frame-up rebuild, all new consumables', time: '1-2 days' },
                ].map((service, i) => (
                  <div
                    key={i}
                    className="rounded-lg p-6 relative"
                    style={{
                      backgroundColor: '#fff',
                      border: service.popular ? '2px solid #0066CC' : '1px solid #e5e5e5'
                    }}
                  >
                    {service.popular && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 text-xs font-semibold rounded-full" style={{ backgroundColor: '#0066CC', color: '#fff' }}>
                        Most Popular
                      </span>
                    )}
                    <h3 className="font-bold text-lg mb-2" style={{ color: '#333' }}>{service.name}</h3>
                    <p className="text-3xl font-bold mb-3" style={{ color: '#0066CC' }}>{service.price}</p>
                    <p className="text-sm mb-4" style={{ color: '#666' }}>{service.desc}</p>
                    <p className="text-xs mb-4" style={{ color: '#888' }}>Typical time: {service.time}</p>
                    <button
                      className="w-full py-2.5 text-sm font-semibold rounded-md transition-colors"
                      style={{
                        backgroundColor: service.popular ? '#0066CC' : '#fff',
                        color: service.popular ? '#fff' : '#0066CC',
                        border: service.popular ? 'none' : '1px solid #0066CC'
                      }}
                    >
                      Book Now
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Why Choose Us */}
            <div className="px-12 py-16" style={{ backgroundColor: '#fff' }}>
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-2xl font-bold mb-6" style={{ color: '#333' }}>Why Choose Bicycles2U?</h2>
                  <ul className="space-y-4">
                    {[
                      'Specialized in road and triathlon bikes only',
                      'Every bike fully inspected and serviced before sale',
                      'Expert mechanical knowledge and honest advice',
                      'Convenient location in Queens Park',
                      'Flexible appointment times to suit your schedule',
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: '#0066CC' }}>
                          <Check className="w-3 h-3 text-white" />
                        </span>
                        <span style={{ color: '#555' }}>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                  <Image src={mockProduct.image} alt="Workshop" fill className="object-cover" />
                </div>
              </div>
            </div>

            {/* CTA Banner */}
            <div className="px-12 py-12" style={{ backgroundColor: '#0066CC' }}>
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-2 text-white">Ready to ride?</h2>
                  <p className="text-white opacity-80">Book your service or come visit our workshop today.</p>
                </div>
                <div className="flex gap-3">
                  <button className="px-6 py-3 text-sm font-semibold rounded-md" style={{ backgroundColor: '#fff', color: '#0066CC' }}>
                    Book a Service
                  </button>
                  <button className="px-6 py-3 text-sm font-semibold rounded-md border border-white text-white" style={{ backgroundColor: 'transparent' }}>
                    Get Directions
                  </button>
                </div>
              </div>
            </div>

            {/* Footer */}
            <footer className="px-12 py-12" style={{ backgroundColor: '#333' }}>
              <div className="grid md:grid-cols-4 gap-8">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: '#0066CC' }}>
                      <span className="text-white text-xs font-bold">B2U</span>
                    </div>
                    <span className="text-lg font-bold text-white">Bicycles2U</span>
                  </div>
                  <p className="text-sm" style={{ color: '#999' }}>
                    Your local cycling experts. Quality bikes and professional service in Queens Park.
                  </p>
                </div>
                {[
                  { title: 'Bikes', links: ['Road Bikes', 'Triathlon Bikes', 'All Bikes'] },
                  { title: 'Services', links: ['Basic Tune-Up', 'Full Service', 'Custom Builds'] },
                  { title: 'Contact', links: ['167/171 Bronte Rd', 'Queens Park NSW 2022', '0402 880 242'] },
                ].map((col, i) => (
                  <div key={i}>
                    <h4 className="font-semibold mb-4 text-white">{col.title}</h4>
                    <ul className="space-y-2">
                      {col.links.map((link, j) => (
                        <li key={j} className="text-sm cursor-pointer transition-colors hover:text-white" style={{ color: '#999' }}>{link}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <div className="mt-8 pt-8 flex items-center justify-between" style={{ borderTop: '1px solid #444' }}>
                <p className="text-sm" style={{ color: '#666' }}>© 2024 Bicycles2U. All rights reserved.</p>
                <p className="text-sm" style={{ color: '#666' }}>By appointment only</p>
              </div>
            </footer>
          </div>
        </section>


        {/* ================================================================== */}
        {/* STYLE I: MONOCHROME MINIMAL - Clean Black & White Professional */}
        {/* ================================================================== */}
        <section>
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-2 flex items-center gap-3">
              <span
                className="w-8 h-8 rounded flex items-center justify-center text-sm font-bold"
                style={{ backgroundColor: '#000', color: '#fff' }}
              >
                I
              </span>
              Monochrome Minimal — Full Site Preview
            </h2>
            <p className="text-neutral-400 text-sm">
              Clean & Professional. Sophisticated black and white palette. Timeless, elegant, focused on content.
            </p>
            <div className="flex gap-3 mt-3">
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded" style={{ backgroundColor: '#000' }} />
                <span className="text-xs text-neutral-500">Pure Black #000000</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded" style={{ backgroundColor: '#fff', border: '1px solid #ddd' }} />
                <span className="text-xs text-neutral-500">Pure White #FFFFFF</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded" style={{ backgroundColor: '#666' }} />
                <span className="text-xs text-neutral-500">Mid Gray #666666</span>
              </div>
            </div>
          </div>

          {/* Mock Website Container */}
          <div className="rounded-lg overflow-hidden" style={{ backgroundColor: '#fff', border: '1px solid #e0e0e0' }}>

            {/* Navigation Bar - Ultra Clean */}
            <nav className="flex items-center justify-between px-10 py-5" style={{ backgroundColor: '#fff', borderBottom: '1px solid #e0e0e0' }}>
              <div className="flex items-center gap-3">
                <span className="text-xl font-semibold tracking-tight" style={{ color: '#000' }}>
                  Bicycles2U
                </span>
              </div>
              <div className="flex items-center gap-10">
                {['Shop', 'Services', 'About', 'Contact'].map((item, idx) => (
                  <span
                    key={item}
                    className="text-sm tracking-wide cursor-pointer transition-colors"
                    style={{ color: idx === 0 ? '#000' : '#666' }}
                  >
                    {item}
                  </span>
                ))}
                <button
                  className="px-5 py-2.5 text-sm tracking-wide transition-all"
                  style={{ backgroundColor: '#000', color: '#fff' }}
                >
                  Book Service
                </button>
              </div>
            </nav>

            {/* Hero Section - Editorial Clean */}
            <div className="relative" style={{ backgroundColor: '#fafafa' }}>
              <div className="grid grid-cols-2">
                <div className="flex items-center px-16 py-24">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] mb-4" style={{ color: '#999' }}>
                      Premium Cycling
                    </p>
                    <h1 className="text-5xl font-light leading-[1.15] mb-6" style={{ color: '#000', letterSpacing: '-0.02em' }}>
                      Expert Service.
                      <br />
                      <span className="font-medium">Quality Bikes.</span>
                    </h1>
                    <p className="text-base mb-8 leading-relaxed max-w-md" style={{ color: '#666' }}>
                      Specializing in premium road and triathlon bicycles. Professional repairs and curated second-hand machines.
                    </p>
                    <div className="flex gap-4">
                      <button
                        className="px-8 py-3.5 text-sm tracking-wide"
                        style={{ backgroundColor: '#000', color: '#fff' }}
                      >
                        View Collection
                      </button>
                      <button
                        className="px-8 py-3.5 text-sm tracking-wide border"
                        style={{ borderColor: '#000', color: '#000', backgroundColor: 'transparent' }}
                      >
                        Our Services
                      </button>
                    </div>
                  </div>
                </div>
                <div className="relative aspect-[4/3]">
                  <Image src={mockProduct.image} alt="Featured Bike" fill className="object-cover" />
                </div>
              </div>
            </div>

            {/* Trust Bar - Minimal */}
            <div className="grid grid-cols-4" style={{ borderBottom: '1px solid #e0e0e0' }}>
              {[
                { title: 'Expert Repairs', desc: 'All makes & models' },
                { title: 'Quality Assured', desc: 'Fully inspected' },
                { title: 'Local Service', desc: 'Queens Park NSW' },
                { title: 'By Appointment', desc: 'Flexible scheduling' },
              ].map((item, i) => (
                <div
                  key={i}
                  className="px-8 py-6 text-center"
                  style={{ backgroundColor: '#fff', borderRight: i < 3 ? '1px solid #e0e0e0' : 'none' }}
                >
                  <p className="text-sm font-medium mb-1" style={{ color: '#000' }}>{item.title}</p>
                  <p className="text-xs" style={{ color: '#999' }}>{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Products Section - Grid Clean */}
            <div className="px-16 py-20" style={{ backgroundColor: '#fff' }}>
              <div className="flex items-end justify-between mb-12">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] mb-2" style={{ color: '#999' }}>Collection</p>
                  <h2 className="text-3xl font-light" style={{ color: '#000', letterSpacing: '-0.01em' }}>
                    Featured Bikes
                  </h2>
                </div>
                <button className="text-sm flex items-center gap-2 group" style={{ color: '#000' }}>
                  View All <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>

              <div className="grid grid-cols-4 gap-8">
                {[
                  { name: 'Cervélo P5 Disc', brand: 'Cervélo', price: '$8,499', condition: 'Excellent' },
                  { name: 'Tarmac SL8', brand: 'Specialized', price: '$12,500', condition: 'Like New' },
                  { name: 'SystemSix Hi-MOD', brand: 'Cannondale', price: '$9,200', condition: 'Good' },
                  { name: 'Aeroad CFR', brand: 'Canyon', price: '$7,999', condition: 'Excellent' },
                ].map((bike, i) => (
                  <div key={i} className="group">
                    <div className="relative aspect-square overflow-hidden mb-4" style={{ backgroundColor: '#f5f5f5' }}>
                      <Image src={mockProduct.image} alt={bike.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                      <div className="absolute top-4 left-4 px-2 py-1 text-[10px] uppercase tracking-wider" style={{ backgroundColor: '#fff', color: '#000' }}>
                        {bike.condition}
                      </div>
                    </div>
                    <p className="text-[10px] uppercase tracking-[0.2em] mb-1" style={{ color: '#999' }}>{bike.brand}</p>
                    <h3 className="text-sm font-medium mb-2" style={{ color: '#000' }}>{bike.name}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-base font-medium" style={{ color: '#000' }}>{bike.price}</span>
                      <button className="text-xs underline underline-offset-2" style={{ color: '#666' }}>
                        View
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Services Section - Clean Cards */}
            <div className="px-16 py-20" style={{ backgroundColor: '#fafafa' }}>
              <div className="text-center mb-12">
                <p className="text-xs uppercase tracking-[0.3em] mb-2" style={{ color: '#999' }}>Services</p>
                <h2 className="text-3xl font-light" style={{ color: '#000', letterSpacing: '-0.01em' }}>
                  Professional Care
                </h2>
              </div>

              <div className="grid grid-cols-4 gap-6">
                {[
                  { name: 'Basic Tune', price: '$59', desc: 'Safety check & adjustments', time: '1-2 hrs' },
                  { name: 'Standard Service', price: '$119', desc: 'Full inspection & cleaning', time: '2-3 hrs' },
                  { name: 'Complete Service', price: '$159', desc: 'Comprehensive overhaul', featured: true, time: '4-6 hrs' },
                  { name: 'Full Rebuild', price: '$299', desc: 'Frame-up restoration', time: '1-2 days' },
                ].map((service, i) => (
                  <div
                    key={i}
                    className="p-8 relative"
                    style={{
                      backgroundColor: service.featured ? '#000' : '#fff',
                      border: service.featured ? 'none' : '1px solid #e0e0e0'
                    }}
                  >
                    {service.featured && (
                      <span className="absolute top-0 left-0 right-0 py-1 text-[10px] uppercase tracking-wider text-center" style={{ backgroundColor: '#333', color: '#fff' }}>
                        Recommended
                      </span>
                    )}
                    <div className={service.featured ? 'pt-4' : ''}>
                      <p className="text-xs uppercase tracking-wider mb-3" style={{ color: service.featured ? '#999' : '#999' }}>
                        {service.time}
                      </p>
                      <h3 className="text-base font-medium mb-2" style={{ color: service.featured ? '#fff' : '#000' }}>
                        {service.name}
                      </h3>
                      <p className="text-2xl font-light mb-3" style={{ color: service.featured ? '#fff' : '#000' }}>
                        {service.price}
                      </p>
                      <p className="text-sm mb-6" style={{ color: service.featured ? '#999' : '#666' }}>
                        {service.desc}
                      </p>
                      <button
                        className="w-full py-3 text-sm tracking-wide transition-colors"
                        style={{
                          backgroundColor: service.featured ? '#fff' : '#000',
                          color: service.featured ? '#000' : '#fff'
                        }}
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* About Section - Split Layout */}
            <div className="grid grid-cols-2" style={{ backgroundColor: '#fff' }}>
              <div className="relative aspect-[4/3]">
                <Image src={mockProduct.image} alt="Workshop" fill className="object-cover" />
              </div>
              <div className="flex items-center px-16 py-20">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] mb-4" style={{ color: '#999' }}>About Us</p>
                  <h2 className="text-3xl font-light mb-6" style={{ color: '#000', letterSpacing: '-0.01em' }}>
                    Why Bicycles2U?
                  </h2>
                  <ul className="space-y-4 mb-8">
                    {[
                      'Specialized in road and triathlon bikes',
                      'Every bike fully inspected before sale',
                      'Expert mechanical knowledge',
                      'Convenient Queens Park location',
                      'Flexible appointment scheduling',
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#000' }} />
                        <span className="text-sm" style={{ color: '#444' }}>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <button className="text-sm flex items-center gap-2 group" style={{ color: '#000' }}>
                    Learn More <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            </div>

            {/* CTA Section - Bold Black */}
            <div className="px-16 py-16" style={{ backgroundColor: '#000' }}>
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-light mb-2" style={{ color: '#fff' }}>Ready to ride?</h2>
                  <p className="text-sm" style={{ color: '#999' }}>Book a service or browse our collection today.</p>
                </div>
                <div className="flex gap-4">
                  <button className="px-6 py-3 text-sm tracking-wide" style={{ backgroundColor: '#fff', color: '#000' }}>
                    Book Service
                  </button>
                  <button className="px-6 py-3 text-sm tracking-wide border" style={{ borderColor: '#fff', color: '#fff', backgroundColor: 'transparent' }}>
                    Contact Us
                  </button>
                </div>
              </div>
            </div>

            {/* Footer - Clean Minimal */}
            <footer className="px-16 py-16" style={{ backgroundColor: '#fafafa', borderTop: '1px solid #e0e0e0' }}>
              <div className="grid grid-cols-5 gap-8">
                <div className="col-span-2">
                  <span className="text-lg font-semibold mb-4 block" style={{ color: '#000' }}>Bicycles2U</span>
                  <p className="text-sm leading-relaxed max-w-xs" style={{ color: '#666' }}>
                    Your local cycling experts. Premium road and triathlon bikes, professional service.
                  </p>
                </div>
                {[
                  { title: 'Shop', links: ['Road Bikes', 'Triathlon', 'All Bikes'] },
                  { title: 'Services', links: ['Basic Tune', 'Full Service', 'Custom Builds'] },
                  { title: 'Contact', links: ['167/171 Bronte Rd', 'Queens Park NSW', '0402 880 242'] },
                ].map((col, i) => (
                  <div key={i}>
                    <h4 className="text-xs uppercase tracking-wider mb-4" style={{ color: '#999' }}>{col.title}</h4>
                    <ul className="space-y-2">
                      {col.links.map((link, j) => (
                        <li key={j} className="text-sm cursor-pointer transition-colors hover:text-black" style={{ color: '#666' }}>{link}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <div className="mt-12 pt-8 flex items-center justify-between" style={{ borderTop: '1px solid #e0e0e0' }}>
                <p className="text-xs" style={{ color: '#999' }}>© 2024 Bicycles2U. All rights reserved.</p>
                <p className="text-xs" style={{ color: '#999' }}>By appointment only</p>
              </div>
            </footer>
          </div>
        </section>


        {/* ================================================================== */}
        {/* STYLE J: REFINED PERFORMANCE - Claude's Recommended Design */}
        {/* ================================================================== */}
        <section>
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-2 flex items-center gap-3">
              <span
                className="w-8 h-8 rounded flex items-center justify-center text-sm font-bold"
                style={{ backgroundColor: '#00d4ff', color: '#111827' }}
              >
                J
              </span>
              Dark Mode with Electric Blue
            </h2>
            <p className="text-neutral-400 text-sm">
              A dark mode theme using electric blue as the accent color.
            </p>
            <div className="flex gap-3 mt-3">
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded" style={{ backgroundColor: '#111827' }} />
                <span className="text-xs text-neutral-500">Background: #111827</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded" style={{ backgroundColor: '#f9fafb', border: '1px solid #ddd' }} />
                <span className="text-xs text-neutral-500">Text: #f9fafb</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded" style={{ backgroundColor: '#00d4ff' }} />
                <span className="text-xs text-neutral-500">Accent: #00d4ff</span>
              </div>
            </div>
          </div>

          {/* Mock Website Container */}
          <div className="rounded-lg overflow-hidden" style={{ backgroundColor: '#111827', border: '1px solid #374151' }}>

            {/* Top Announcement Bar */}
            <div className="text-center py-2 text-xs" style={{ backgroundColor: '#1f2937', color: '#d1d5db' }}>
              <span style={{ color: '#00d4ff' }}>★</span>
              {' '}Trusted by Sydney&apos;s serious cyclists since establishment{' '}
              <span style={{ color: '#00d4ff' }}>★</span>
            </div>

            {/* Navigation Bar */}
            <nav className="flex items-center justify-between px-12 py-5" style={{ backgroundColor: '#111827', borderBottom: '1px solid #374151' }}>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#00d4ff' }}>
                    <span className="text-xs font-semibold" style={{ color: '#111827' }}>B2U</span>
                  </div>
                  <div>
                    <span className="text-lg font-semibold" style={{ color: '#f9fafb' }}>Bicycles2U</span>
                    <span className="block text-[10px] tracking-wide" style={{ color: '#9ca3af' }}>Performance Specialists</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-10">
                {['Collection', 'Services', 'About', 'Contact'].map((item, idx) => (
                  <span
                    key={item}
                    className="text-sm cursor-pointer transition-colors relative pb-1"
                    style={{ color: idx === 0 ? '#f9fafb' : '#9ca3af' }}
                  >
                    {item}
                    {idx === 0 && <div className="absolute bottom-0 left-0 right-0 h-0.5" style={{ backgroundColor: '#00d4ff' }} />}
                  </span>
                ))}
                <button
                  className="px-6 py-2.5 text-sm font-medium transition-all rounded-sm"
                  style={{ backgroundColor: '#00d4ff', color: '#111827' }}
                >
                  Book Service
                </button>
              </div>
            </nav>

            {/* Hero Section - Warm & Inviting */}
            <div className="relative overflow-hidden" style={{ backgroundColor: '#111827' }}>
              {/* Subtle blue gradient */}
              <div
                className="absolute inset-0"
                style={{
                  background: 'radial-gradient(ellipse at 80% 50%, rgba(0, 212, 255, 0.15) 0%, transparent 60%)'
                }}
              />

              <div className="relative z-10 grid grid-cols-12 min-h-[520px]">
                <div className="col-span-5 flex items-center px-12 py-16">
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-8 h-[1px]" style={{ backgroundColor: '#00d4ff' }} />
                      <span className="text-xs uppercase tracking-[0.25em]" style={{ color: '#00d4ff' }}>Queens Park, Sydney</span>
                    </div>
                    <h1 className="text-5xl font-light leading-[1.15] mb-6" style={{ color: '#f9fafb', letterSpacing: '-0.02em' }}>
                      Precision Machines.
                      <br />
                      <span className="font-medium" style={{ color: '#00d4ff' }}>Expert Care.</span>
                    </h1>
                    <p className="text-base mb-8 leading-relaxed" style={{ color: '#9ca3af' }}>
                      Curated road and triathlon bicycles, meticulously inspected and serviced. Where serious cyclists find their next ride.
                    </p>
                    <div className="flex gap-4 mb-10">
                      <button
                        className="px-8 py-4 text-sm font-medium tracking-wide transition-all rounded-sm"
                        style={{ backgroundColor: '#00d4ff', color: '#111827' }}
                      >
                        Browse Collection
                      </button>
                      <button
                        className="px-8 py-4 text-sm font-medium tracking-wide transition-all rounded-sm border"
                        style={{ borderColor: '#374151', color: '#f9fafb', backgroundColor: 'transparent' }}
                      >
                        Our Services
                      </button>
                    </div>

                    {/* Trust indicators */}
                    <div className="flex items-center gap-6 pt-6" style={{ borderTop: '1px solid #374151' }}>
                      {[
                        { value: '500+', label: 'Bikes Sold' },
                        { value: '15+', label: 'Years Experience' },
                        { value: '100%', label: 'Satisfaction' },
                      ].map((stat, i) => (
                        <div key={i}>
                          <span className="text-xl font-light" style={{ color: '#00d4ff' }}>{stat.value}</span>
                          <p className="text-[10px] uppercase tracking-wider mt-1" style={{ color: '#9ca3af' }}>{stat.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="col-span-7 relative">
                  <Image src={mockProduct.image} alt="Featured Bike" fill className="object-cover" />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, #1A1A1A 0%, transparent 30%)' }} />
                </div>
              </div>
            </div>

            {/* Value Props - Dark Cards */}
            <div className="px-12 py-6" style={{ backgroundColor: '#111827', borderBottom: '1px solid #374151' }}>
              <div className="grid grid-cols-4 gap-6">
                {[
                  { title: 'Expert Selection', desc: 'Hand-picked premium bikes only' },
                  { title: 'Fully Inspected', desc: 'Every bike serviced before sale' },
                  { title: 'Professional Service', desc: 'Factory-trained mechanics' },
                  { title: 'Personal Approach', desc: 'By appointment for your convenience' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 py-4">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(0, 212, 255, 0.1)' }}>
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#00d4ff' }} />
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-1" style={{ color: '#f9fafb' }}>{item.title}</p>
                      <p className="text-xs" style={{ color: '#9ca3af' }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Products Section */}
            <div className="px-12 py-20" style={{ backgroundColor: '#111827' }}>
              <div className="flex items-end justify-between mb-12">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-6 h-[1px]" style={{ backgroundColor: '#00d4ff' }} />
                    <span className="text-xs uppercase tracking-[0.25em]" style={{ color: '#00d4ff' }}>The Collection</span>
                  </div>
                  <h2 className="text-3xl font-light" style={{ color: '#f9fafb', letterSpacing: '-0.01em' }}>
                    Currently Available
                  </h2>
                </div>
                <button className="text-sm flex items-center gap-2 group font-medium" style={{ color: '#00d4ff' }}>
                  View All <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>

              <div className="grid grid-cols-4 gap-8">
                {[
                  { name: 'Cervélo P5 Disc', brand: 'Cervélo', price: '$8,499', condition: 'Excellent', year: '2023' },
                  { name: 'S-Works Tarmac SL8', brand: 'Specialized', price: '$12,500', condition: 'Like New', year: '2024' },
                  { name: 'SystemSix Hi-MOD', brand: 'Cannondale', price: '$9,200', condition: 'Very Good', year: '2022' },
                  { name: 'Aeroad CFR', brand: 'Canyon', price: '$7,999', condition: 'Excellent', year: '2023' },
                ].map((bike, i) => (
                  <div key={i} className="group">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-sm mb-5" style={{ backgroundColor: '#1f2937' }}>
                      <Image src={mockProduct.image} alt={bike.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                      <div className="absolute top-4 left-4 flex gap-2">
                        <span className="px-2 py-1 text-[10px] uppercase tracking-wide rounded-sm" style={{ backgroundColor: '#111827', color: '#f9fafb' }}>
                          {bike.year}
                        </span>
                        <span className="px-2 py-1 text-[10px] uppercase tracking-wide rounded-sm" style={{ backgroundColor: '#00d4ff', color: '#111827' }}>
                          {bike.condition}
                        </span>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="w-full py-2.5 text-sm font-medium rounded-sm" style={{ backgroundColor: '#00d4ff', color: '#111827' }}>
                          View Details
                        </button>
                      </div>
                    </div>
                    <p className="text-[10px] uppercase tracking-[0.2em] mb-1" style={{ color: '#00d4ff' }}>{bike.brand}</p>
                    <h3 className="text-base font-medium mb-2" style={{ color: '#f9fafb' }}>{bike.name}</h3>
                    <span className="text-lg font-medium" style={{ color: '#f9fafb' }}>{bike.price}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Services Section - Dark Background */}
            <div className="px-12 py-20" style={{ backgroundColor: '#1f2937' }}>
              <div className="text-center mb-12">
                <div className="flex items-center justify-center gap-3 mb-3">
                  <div className="w-6 h-[1px]" style={{ backgroundColor: '#00d4ff' }} />
                  <span className="text-xs uppercase tracking-[0.25em]" style={{ color: '#00d4ff' }}>Services</span>
                  <div className="w-6 h-[1px]" style={{ backgroundColor: '#00d4ff' }} />
                </div>
                <h2 className="text-3xl font-light" style={{ color: '#f9fafb', letterSpacing: '-0.01em' }}>
                  Expert Care for Your Machine
                </h2>
              </div>

              <div className="grid grid-cols-4 gap-6">
                {[
                  { name: 'Essential Tune', price: '$59', features: ['Safety inspection', 'Brake & gear adjustment', 'Tyre check & inflation'], time: '1-2 hours' },
                  { name: 'Performance Service', price: '$119', features: ['Full drivetrain clean', 'Wheel truing', 'Cable inspection'], time: '2-3 hours' },
                  { name: 'Complete Overhaul', price: '$159', features: ['Deep component clean', 'Bearing inspection', 'Full tune & test'], time: '4-6 hours', featured: true },
                  { name: 'Race Prep / Build', price: '$299+', features: ['Frame-up service', 'All new consumables', 'Position optimization'], time: '1-2 days' },
                ].map((service, i) => (
                  <div
                    key={i}
                    className="p-8 rounded-sm relative"
                    style={{
                      backgroundColor: service.featured ? '#00d4ff' : '#111827',
                      border: service.featured ? 'none' : '1px solid #374151'
                    }}
                  >
                    {service.featured && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 text-[10px] uppercase tracking-wider rounded-sm" style={{ backgroundColor: '#111827', color: '#00d4ff' }}>
                        Most Popular
                      </span>
                    )}
                    <p className="text-[10px] uppercase tracking-wider mb-3" style={{ color: service.featured ? 'rgba(17, 24, 39, 0.6)' : '#9ca3af' }}>
                      {service.time}
                    </p>
                    <h3 className="text-lg font-medium mb-2" style={{ color: service.featured ? '#111827' : '#f9fafb' }}>
                      {service.name}
                    </h3>
                    <p className="text-3xl font-light mb-4" style={{ color: service.featured ? '#111827' : '#00d4ff' }}>
                      {service.price}
                    </p>
                    <ul className="space-y-2 mb-6">
                      {service.features.map((f, j) => (
                        <li key={j} className="flex items-center gap-2 text-sm" style={{ color: service.featured ? 'rgba(17, 24, 39, 0.8)' : '#d1d5db' }}>
                          <Check className="w-3.5 h-3.5" style={{ color: service.featured ? '#111827' : '#00d4ff' }} />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <button
                      className="w-full py-3 text-sm font-medium tracking-wide rounded-sm transition-colors"
                      style={{
                        backgroundColor: service.featured ? '#111827' : 'transparent',
                        color: service.featured ? '#00d4ff' : '#f9fafb',
                        border: service.featured ? 'none' : '1px solid #374151'
                      }}
                    >
                      Book Now
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Testimonial */}
            <div className="px-12 py-16" style={{ backgroundColor: '#111827' }}>
              <div className="max-w-3xl mx-auto text-center">
                <div className="text-4xl mb-6" style={{ color: '#00d4ff' }}>&ldquo;</div>
                <p className="text-xl font-light italic leading-relaxed mb-6" style={{ color: '#f9fafb' }}>
                  Finally found someone who understands what serious cyclists need. The attention to detail on my P5 service was exceptional. Won&apos;t go anywhere else now.
                </p>
                <div className="flex items-center justify-center gap-3">
                  <div className="w-10 h-10 rounded-full" style={{ backgroundColor: '#00d4ff' }} />
                  <div className="text-left">
                    <p className="text-sm font-medium" style={{ color: '#f9fafb' }}>Michael R.</p>
                    <p className="text-xs" style={{ color: '#9ca3af' }}>Triathlete, Bondi</p>
                  </div>
                </div>
              </div>
            </div>

            {/* About / Why Us Section */}
            <div className="grid grid-cols-2" style={{ backgroundColor: '#1f2937' }}>
              <div className="relative aspect-[4/3]">
                <Image src={mockProduct.image} alt="Workshop" fill className="object-cover" />
              </div>
              <div className="flex items-center px-16 py-16">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-6 h-[1px]" style={{ backgroundColor: '#00d4ff' }} />
                    <span className="text-xs uppercase tracking-[0.25em]" style={{ color: '#00d4ff' }}>Why Us</span>
                  </div>
                  <h2 className="text-3xl font-light mb-6" style={{ color: '#f9fafb', letterSpacing: '-0.01em' }}>
                    Built on Trust & Expertise
                  </h2>
                  <p className="text-base mb-8 leading-relaxed" style={{ color: '#d1d5db' }}>
                    We&apos;re not a big box retailer. We&apos;re cyclists who specialize exclusively in premium road and triathlon machines. Every bike we sell is hand-selected, thoroughly inspected, and professionally serviced.
                  </p>
                  <ul className="space-y-4 mb-8">
                    {[
                      'Road & triathlon specialists — it&apos;s all we do',
                      'Every bike inspected & serviced before sale',
                      'Honest advice from experienced cyclists',
                      'Appointment-based for personalized service',
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ backgroundColor: '#00d4ff' }}>
                          <Check className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-sm" style={{ color: '#d1d5db' }}>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <button className="px-8 py-3.5 text-sm font-medium rounded-sm" style={{ backgroundColor: '#111827', color: '#f9fafb' }}>
                    Learn More About Us
                  </button>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="px-12 py-16" style={{ backgroundColor: '#00d4ff' }}>
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-light mb-2" style={{ color: '#111827' }}>Ready to find your next machine?</h2>
                  <p className="text-sm" style={{ color: 'rgba(17, 24, 39, 0.7)' }}>Book an appointment or browse our current collection.</p>
                </div>
                <div className="flex gap-4">
                  <button className="px-8 py-3.5 text-sm font-medium rounded-sm" style={{ backgroundColor: '#111827', color: '#f9fafb' }}>
                    Book Appointment
                  </button>
                  <button className="px-8 py-3.5 text-sm font-medium rounded-sm border" style={{ borderColor: '#111827', color: '#111827', backgroundColor: 'transparent' }}>
                    View Collection
                  </button>
                </div>
              </div>
            </div>

            {/* Footer */}
            <footer className="px-12 py-16" style={{ backgroundColor: '#111827' }}>
              <div className="grid grid-cols-12 gap-8 mb-12">
                <div className="col-span-4">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#1f2937' }}>
                      <span className="text-xs font-semibold" style={{ color: '#00d4ff' }}>B2U</span>
                    </div>
                    <div>
                      <span className="text-base font-semibold" style={{ color: '#f9fafb' }}>Bicycles2U</span>
                      <span className="block text-[10px] tracking-wide" style={{ color: '#9ca3af' }}>Performance Specialists</span>
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed mb-6" style={{ color: '#9ca3af' }}>
                    Your trusted source for premium road and triathlon bicycles. Expert service by cyclists, for cyclists.
                  </p>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium" style={{ color: '#00d4ff' }}>0402 880 242</span>
                  </div>
                </div>

                <div className="col-span-8 grid grid-cols-4 gap-8">
                  {[
                    { title: 'Collection', links: ['Road Bikes', 'Triathlon Bikes', 'All Available', 'Sell Your Bike'] },
                    { title: 'Services', links: ['Essential Tune', 'Performance Service', 'Complete Overhaul', 'Custom Builds'] },
                    { title: 'Information', links: ['About Us', 'Our Process', 'Bike Sizing', 'FAQs'] },
                    { title: 'Visit Us', links: ['167/171 Bronte Rd', 'Queens Park NSW 2022', 'By Appointment Only', 'Get Directions'] },
                  ].map((col, i) => (
                    <div key={i}>
                      <h4 className="text-[10px] uppercase tracking-[0.2em] mb-4" style={{ color: '#00d4ff' }}>{col.title}</h4>
                      <ul className="space-y-2.5">
                        {col.links.map((link, j) => (
                          <li key={j} className="text-sm cursor-pointer transition-colors hover:text-white" style={{ color: '#9ca3af' }}>{link}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-8 flex items-center justify-between" style={{ borderTop: '1px solid #374151' }}>
                <p className="text-xs" style={{ color: '#6b7280' }}>© 2024 Bicycles2U. All rights reserved.</p>
                <div className="flex items-center gap-6">
                  <span className="text-xs cursor-pointer" style={{ color: '#9ca3af' }}>Privacy Policy</span>
                  <span className="text-xs cursor-pointer" style={{ color: '#9ca3af' }}>Terms of Service</span>
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
