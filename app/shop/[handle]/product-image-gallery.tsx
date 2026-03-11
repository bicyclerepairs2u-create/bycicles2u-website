'use client'

import { useState } from 'react'
import Image from 'next/image'

interface GalleryImage {
  url: string
  altText: string | null
  width?: number
  height?: number
}

interface ProductImageGalleryProps {
  images: GalleryImage[]
  title: string
}

export function ProductImageGallery({ images, title }: ProductImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const selectedImage = images[selectedIndex] || null

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div
        className="relative aspect-square overflow-hidden bg-[var(--theme-bg-secondary)] border border-[var(--theme-border)]"
        style={{
          clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0 100%)',
        }}
      >
        {/* Corner accent */}
        <div className="absolute top-0 right-0 w-24 h-1 bg-[#00d4ff] z-10" />
        <div className="absolute top-0 right-0 w-1 h-20 bg-[#00d4ff] z-10" />

        {selectedImage ? (
          <Image
            src={selectedImage.url}
            alt={selectedImage.altText || title}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="text-[var(--theme-text-muted)]">No image available</span>
          </div>
        )}
      </div>

      {/* Thumbnail Grid */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-4">
          {images.map((image, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setSelectedIndex(index)}
              className={`relative aspect-square overflow-hidden bg-[var(--theme-bg-secondary)] border transition-colors ${
                index === selectedIndex
                  ? 'border-[#00d4ff] ring-1 ring-[#00d4ff]'
                  : 'border-[var(--theme-border)] hover:border-[#00d4ff]/50'
              }`}
            >
              <Image
                src={image.url}
                alt={image.altText || `${title} ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
