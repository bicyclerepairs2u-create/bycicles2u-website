// Shopify Admin API Types

// Form data types for bike upload
// Using string types to allow custom inputs alongside predefined options
export interface BikeUploadFormData {
  // Basic fields
  title: string
  vendor: string
  productType: string // Allow custom product types
  price: string
  compareAtPrice: string // Original price for sale items (optional)

  // Tag generation fields (allow custom values)
  bikeCategory: string
  frameMaterial: string
  groupsetType: string
  brakeType: string

  // Weight
  weight: string

  // Frame size in cm (e.g. "54")
  frameSize: string

  // Featured product flag
  isFeatured: boolean

  // Feature checkboxes
  features: FeatureTag[]

  // Custom tags (comma-separated or array)
  customTags: string

  // Description
  description: string
}

export type BikeType =
  | 'Road Bike'
  | 'Triathlon Bike'
  | 'TT Bike'
  | 'Time Trial Bike'
  | 'Gravel Bike'
  | 'Aero Road Bike'
  | 'Endurance Bike'

export type BikeCategory =
  | 'triathlon'
  | 'tt'
  | 'race'
  | 'endurance'
  | 'gravel'
  | 'aero'
  | 'road'

export type FrameMaterial =
  | 'carbon'
  | 'aluminum'
  | 'titanium'
  | 'steel'

export type GroupsetType =
  | 'di2'
  | 'etap'
  | 'eps'
  | 'mechanical'

export type BrakeType =
  | 'disc-brakes'
  | 'rim-brakes'

export type FeatureTag =
  | 'tubeless-ready'
  | 'aero'
  | 'climbing'
  | 'all-rounder'

// Shopify Admin API response types
export interface StagedUploadTarget {
  url: string
  resourceUrl: string
  parameters: { name: string; value: string }[]
}

export interface StagedUploadsCreateResponse {
  stagedUploadsCreate: {
    stagedTargets: StagedUploadTarget[]
    userErrors: { field: string[]; message: string }[]
  }
}

export interface ProductCreateResponse {
  productCreate: {
    product: {
      id: string
      handle: string
      title: string
      variants?: {
        edges: {
          node: {
            id: string
            inventoryItem?: {
              id: string
            }
          }
        }[]
      }
    } | null
    userErrors: { field: string[]; message: string }[]
  }
}

export interface LocationsQueryResponse {
  locations: {
    edges: {
      node: {
        id: string
      }
    }[]
  }
}

export interface InventorySetQuantitiesResponse {
  inventorySetOnHandQuantities: {
    inventoryAdjustmentGroup: {
      id: string
    } | null
    userErrors: { field: string[]; message: string }[]
  }
}

export interface ProductVariantUpdateResponse {
  productVariantsBulkUpdate: {
    productVariants: {
      id: string
      price: string
    }[]
    userErrors: { field: string[]; message: string }[]
  }
}

export interface PublicationsQueryResponse {
  publications: {
    edges: {
      node: {
        id: string
        name: string
      }
    }[]
  }
}

export interface PublishablePublishResponse {
  publishablePublish: {
    publishable: {
      availablePublicationsCount: {
        count: number
      }
    } | null
    userErrors: { field: string[]; message: string }[]
  }
}

// Options for form dropdowns
export const BIKE_TYPES: BikeType[] = [
  'Road Bike',
  'Triathlon Bike',
  'TT Bike',
  'Time Trial Bike',
  'Gravel Bike',
  'Aero Road Bike',
  'Endurance Bike',
]

export const BIKE_CATEGORIES: { value: BikeCategory; label: string }[] = [
  { value: 'triathlon', label: 'Triathlon / Time Trial' },
  { value: 'race', label: 'Racing / Competition' },
  { value: 'endurance', label: 'Endurance / Gran Fondo' },
  { value: 'gravel', label: 'Gravel / Adventure' },
  { value: 'aero', label: 'Aero Road Racing' },
  { value: 'road', label: 'General Road Cycling' },
]

export const FRAME_MATERIALS: { value: FrameMaterial; label: string }[] = [
  { value: 'carbon', label: 'Carbon Fiber' },
  { value: 'aluminum', label: 'Aluminum' },
  { value: 'titanium', label: 'Titanium' },
  { value: 'steel', label: 'Steel' },
]

export const GROUPSET_TYPES: { value: GroupsetType; label: string }[] = [
  { value: 'di2', label: 'Shimano Di2 (Electronic)' },
  { value: 'etap', label: 'SRAM eTap (Electronic)' },
  { value: 'eps', label: 'Campagnolo EPS (Electronic)' },
  { value: 'mechanical', label: 'Mechanical' },
]

export const BRAKE_TYPES: { value: BrakeType; label: string }[] = [
  { value: 'disc-brakes', label: 'Disc Brakes' },
  { value: 'rim-brakes', label: 'Rim Brakes' },
]

export const FEATURE_OPTIONS: { value: FeatureTag; label: string }[] = [
  { value: 'tubeless-ready', label: 'Tubeless Ready' },
  { value: 'aero', label: 'Aero Optimized' },
  { value: 'climbing', label: 'Climbing Focused' },
  { value: 'all-rounder', label: 'All-Rounder' },
]

export const COMMON_BRANDS = [
  'Specialized',
  'Trek',
  'Cervelo',
  'Cannondale',
  'Giant',
  'Pinarello',
  'Bianchi',
  'Scott',
  'Canyon',
  'BMC',
  'Colnago',
  'Factor',
  'Felt',
  'Orbea',
  'Ridley',
  'Other',
]
