// Tag Generation Logic for Bike Uploads
// Follows conventions from docs/SHOPIFY-PRODUCT-SETUP.md

import type { BikeUploadFormData } from './admin-types'
import { getSizeFromFrame } from '@/lib/bike-sizes'

export interface GeneratedTags {
  categoryTags: string[]
  materialTags: string[]
  weightTags: string[]
  groupsetTags: string[]
  brakeTags: string[]
  sizeTags: string[]
  featureTags: string[]
  specialTags: string[]
  customTags: string[]
  allTags: string[]
}

// Map bike category to display name (for reference)
export const CATEGORY_DISPLAY_MAP: Record<string, string> = {
  triathlon: 'Triathlon / Time Trial',
  tt: 'Triathlon / Time Trial',
  race: 'Racing / Competition',
  racing: 'Racing / Competition',
  competition: 'Racing / Competition',
  endurance: 'Endurance / Gran Fondo',
  'gran fondo': 'Endurance / Gran Fondo',
  gravel: 'Gravel / Adventure',
  aero: 'Aero Road Racing',
}

// Map frame material to display name
export const MATERIAL_DISPLAY_MAP: Record<string, string> = {
  carbon: 'Carbon Fiber',
  aluminum: 'Aluminum',
  aluminium: 'Aluminum',
  titanium: 'Titanium',
  steel: 'Steel',
}

export function generateTags(formData: Partial<BikeUploadFormData>): GeneratedTags {
  const categoryTags: string[] = []
  const materialTags: string[] = []
  const weightTags: string[] = []
  const groupsetTags: string[] = []
  const brakeTags: string[] = []
  const featureTags: string[] = []

  // 1. Category tags based on bike type selection
  if (formData.bikeCategory) {
    categoryTags.push(formData.bikeCategory)

    // Add secondary tags for better matching per SHOPIFY-PRODUCT-SETUP.md
    if (formData.bikeCategory === 'triathlon') {
      categoryTags.push('tt')
    }
    if (formData.bikeCategory === 'race') {
      categoryTags.push('racing', 'competition')
    }
  }

  // 2. Frame material tag
  if (formData.frameMaterial) {
    materialTags.push(formData.frameMaterial)
  }

  // 3. Weight tags - determine from weight value
  if (formData.weight) {
    const weightKg = parseFloat(formData.weight)
    if (!isNaN(weightKg)) {
      if (weightKg < 7.0) {
        weightTags.push('ultralight')
      } else if (weightKg < 7.5) {
        weightTags.push('lightweight')
      }
    }
  }

  // 4. Groupset tags
  if (formData.groupsetType) {
    groupsetTags.push(formData.groupsetType)

    // Add electronic-shifting for electronic groupsets
    if (['di2', 'etap', 'eps'].includes(formData.groupsetType)) {
      groupsetTags.push('electronic-shifting')
    } else {
      groupsetTags.push('mechanical-shifting')
    }
  }

  // 5. Brake tags
  if (formData.brakeType) {
    brakeTags.push(formData.brakeType)
  }

  // 6. Size tags from frame size
  const sizeTags: string[] = []
  if (formData.frameSize) {
    const frameCm = parseFloat(formData.frameSize)
    if (!isNaN(frameCm) && frameCm > 0) {
      sizeTags.push(`frame-${Math.round(frameCm)}cm`)
      const sizeMatch = getSizeFromFrame(frameCm)
      if (sizeMatch) {
        sizeTags.push(sizeMatch.tag)
      }
    }
  }

  // 7. Additional feature tags from checkboxes
  if (formData.features && formData.features.length > 0) {
    // Filter out tags already added by other selections
    const existingTags = new Set([...groupsetTags, ...weightTags])

    formData.features.forEach((feature) => {
      if (!existingTags.has(feature)) {
        featureTags.push(feature)
      }
    })
  }

  // 7. Custom tags from user input
  const customTags: string[] = []
  if (formData.customTags) {
    const parsed = formData.customTags
      .split(',')
      .map((tag) => tag.trim().toLowerCase())
      .filter((tag) => tag.length > 0)
    customTags.push(...parsed)
  }

  // 8. Featured tag if product is marked as featured
  const specialTags: string[] = []
  if (formData.isFeatured) {
    specialTags.push('featured')
  }

  // Combine all tags and deduplicate
  const allTags = [
    ...new Set([
      ...categoryTags,
      ...materialTags,
      ...weightTags,
      ...groupsetTags,
      ...brakeTags,
      ...sizeTags,
      ...featureTags,
      ...specialTags,
      ...customTags,
    ]),
  ]

  return {
    categoryTags,
    materialTags,
    weightTags,
    groupsetTags,
    brakeTags,
    sizeTags,
    featureTags,
    specialTags,
    customTags,
    allTags,
  }
}

// Generate description with weight in proper format for auto-extraction
export function generateDescription(formData: Partial<BikeUploadFormData>): string {
  const lines: string[] = []

  // User's custom description first
  if (formData.description?.trim()) {
    lines.push(formData.description.trim())
    lines.push('')
  }

  // Add weight if specified (critical for comparison feature)
  if (formData.weight) {
    lines.push(`Weight: ${formData.weight}kg`)
    lines.push('')
  }

  // Add specifications section
  lines.push('Specifications:')

  if (formData.frameSize) {
    const frameCm = parseFloat(formData.frameSize)
    if (!isNaN(frameCm)) {
      const sizeMatch = getSizeFromFrame(frameCm)
      const sizeLabel = sizeMatch ? ` (${sizeMatch.category})` : ''
      lines.push(`- Frame Size: ${Math.round(frameCm)}cm${sizeLabel}`)
    }
  }

  if (formData.frameMaterial) {
    lines.push(
      `- Frame: ${MATERIAL_DISPLAY_MAP[formData.frameMaterial] || formData.frameMaterial}`
    )
  }

  if (formData.groupsetType) {
    const groupsetName =
      formData.groupsetType === 'di2'
        ? 'Shimano Di2'
        : formData.groupsetType === 'etap'
          ? 'SRAM eTap'
          : formData.groupsetType === 'eps'
            ? 'Campagnolo EPS'
            : 'Mechanical'
    lines.push(`- Groupset: ${groupsetName}`)
  }

  if (formData.brakeType) {
    const brakeDesc =
      formData.brakeType === 'disc-brakes' ? 'Disc brakes' : 'Rim brakes'
    lines.push(`- Brakes: ${brakeDesc}`)
  }

  return lines.join('\n')
}

// Generate HTML description for Shopify
export function generateDescriptionHtml(
  formData: Partial<BikeUploadFormData>
): string {
  const description = generateDescription(formData)
  return description.replace(/\n/g, '<br>')
}
