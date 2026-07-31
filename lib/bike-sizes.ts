// Shared bike size definitions — single source of truth
// Used by: bike sizing calculator, admin upload form, shop filters, tag generator

export type SizeCategory = 'XXS' | 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL'

export interface SizeDefinition {
  category: SizeCategory
  minFrame: number    // inclusive lower bound in cm
  maxFrame: number    // exclusive upper bound in cm (Infinity for XXL)
  typicalFrame: number // representative frame size in cm (midpoint of frameSizeRange), for height-only estimates
  heightRange: string
  inseamRange: string
  frameSizeRange: string
  fitNotes: string
  tag: string         // Shopify tag, e.g. "size-m"
}

export const SIZE_DEFINITIONS: SizeDefinition[] = [
  {
    category: 'XXS',
    minFrame: 0,
    maxFrame: 50,
    heightRange: '<155',
    inseamRange: '<72',
    frameSizeRange: '47-49',
    fitNotes: 'Extra extra small frame. Suitable for riders under 155 cm.',
    typicalFrame: 48,
    tag: 'size-xxs',
  },
  {
    category: 'XS',
    minFrame: 50,
    maxFrame: 52,
    heightRange: '155-165',
    inseamRange: '72-78',
    frameSizeRange: '48-52',
    fitNotes: 'Extra small frame. Suitable for riders 155-165 cm.',
    typicalFrame: 50,
    tag: 'size-xs',
  },
  {
    category: 'S',
    minFrame: 52,
    maxFrame: 54,
    heightRange: '162-170',
    inseamRange: '77-81',
    frameSizeRange: '52-53',
    fitNotes: 'Small frame. Suitable for riders 162-170 cm.',
    typicalFrame: 52.5,
    tag: 'size-s',
  },
  {
    category: 'M',
    minFrame: 54,
    maxFrame: 56,
    heightRange: '170-178',
    inseamRange: '80-84',
    frameSizeRange: '54-55',
    fitNotes: 'Medium frame. Suitable for riders 170-178 cm.',
    typicalFrame: 54.5,
    tag: 'size-m',
  },
  {
    category: 'L',
    minFrame: 56,
    maxFrame: 58,
    heightRange: '178-185',
    inseamRange: '83-87',
    frameSizeRange: '56-57',
    fitNotes: 'Large frame. Suitable for riders 178-185 cm.',
    typicalFrame: 56.5,
    tag: 'size-l',
  },
  {
    category: 'XL',
    minFrame: 58,
    maxFrame: 60,
    heightRange: '185-193',
    inseamRange: '86-92',
    frameSizeRange: '58-59',
    fitNotes: 'Extra large frame. Suitable for riders 185-193 cm.',
    typicalFrame: 58.5,
    tag: 'size-xl',
  },
  {
    category: 'XXL',
    minFrame: 60,
    maxFrame: Infinity,
    heightRange: '193+',
    inseamRange: '91+',
    frameSizeRange: '60+',
    fitNotes: 'Extra extra large frame. Suitable for riders 193+ cm.',
    typicalFrame: 61,
    tag: 'size-xxl',
  },
]

/** Given a frame size in cm, return the matching SizeDefinition, or null */
export function getSizeFromFrame(frameSizeCm: number): SizeDefinition | null {
  return (
    SIZE_DEFINITIONS.find(
      (s) => frameSizeCm >= s.minFrame && frameSizeCm < s.maxFrame
    ) ?? null
  )
}

/** All size categories in order, for filter dropdowns */
export const SIZE_CATEGORIES: SizeCategory[] = SIZE_DEFINITIONS.map((s) => s.category)

/** Map from category to Shopify tag */
export const SIZE_TAG_MAP: Record<SizeCategory, string> = Object.fromEntries(
  SIZE_DEFINITIONS.map((s) => [s.category, s.tag])
) as Record<SizeCategory, string>
