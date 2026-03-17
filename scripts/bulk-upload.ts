#!/usr/bin/env npx tsx
// scripts/bulk-upload.ts
// Bulk upload bikes to Shopify from hardcoded manifest
// Usage:
//   npx tsx scripts/bulk-upload.ts --dry-run   # Preview all bikes
//   npx tsx scripts/bulk-upload.ts              # Upload all bikes

import * as fs from 'fs'
import * as path from 'path'
import dotenv from 'dotenv'

// Load environment variables BEFORE any Shopify imports (they read process.env at import time)
dotenv.config({ path: path.resolve(__dirname, '../.env.local') })
dotenv.config({ path: path.resolve(__dirname, '../.env') })

// Types only (no runtime import)
type BikeUploadFormData = import('../lib/shopify/admin-types').BikeUploadFormData
type StagedUploadTarget = import('../lib/shopify/admin-types').StagedUploadTarget

// Shopify modules loaded dynamically inside main() so env vars are set first
let createStagedUploads: typeof import('../lib/shopify/admin').createStagedUploads
let createAndPublishProduct: typeof import('../lib/shopify/admin').createAndPublishProduct
let generateTags: typeof import('../lib/shopify/tag-generator').generateTags

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface BulkBikeData {
  imageFolder: string
  brand: string
  model: string
  frameSize: string
  sizeLabel: string // e.g. "XS", "M", "L", "XL"
  recommendedHeight: string // e.g. "150cm - 160cm OR 4'11\" to 5'3\""
  colour: string
  groupsetDisplay: string
  bikeCategory: string
  frameMaterial: 'carbon' | 'aluminum'
  groupsetType: 'mechanical' | 'di2'
  brakeType: 'rim-brakes' | 'disc-brakes'
  price: string
  compareAtPrice: string
  cosmetic: string
  mechanical: string
  description: string
  chainring: string
  cassette: string
  barWidth: string
  stemLength: string
  crankLength: string
  barModel: string
  wheelset: string
  tyres: string
  saddle: string
  upgrades: string
  partsNew: string
  productType: string
  features: string[]
  customTags: string
  isFeatured: boolean
  weight: string
}

// ---------------------------------------------------------------------------
// Image folder base path
// ---------------------------------------------------------------------------

const IMAGE_BASE = '/Users/dash/Downloads/Selling Stuff'

// ---------------------------------------------------------------------------
// Hardcoded bike manifest (26 bikes — manually verified from CSV)
// Excluded: sold bikes (Merida Ride 500, Trek Domane Series 4 58XL)
// Corrections: "Roubiax" → "Roubaix", EROX emoji stripped
// ---------------------------------------------------------------------------

const BIKES: BulkBikeData[] = [
  // 1. Argon 18 KR36 — road
  {
    imageFolder: 'Argon18-KR36-49XS-1055700-03',
    brand: 'Argon 18',
    model: 'KR36',
    frameSize: '49',
    sizeLabel: 'XS',
    recommendedHeight: '150cm - 160cm OR 4\'11" to 5\'3"',
    colour: 'Black Red',
    groupsetDisplay: '5700 Shimano 105, 10 SPD',
    bikeCategory: 'road',
    frameMaterial: 'carbon',
    groupsetType: 'mechanical',
    brakeType: 'rim-brakes',
    price: '1299.00',
    compareAtPrice: '',
    cosmetic: '10',
    mechanical: '10',
    description: 'The Argon 18 KR36 is an excellent choice for those seeking a reliable and high-performance road bike. Perfect for both competitive riders and cycling enthusiasts, it offers a smooth ride and is ideal for those within the height range specified.',
    chainring: '50/34',
    cassette: '11-25',
    barWidth: '380',
    stemLength: '100',
    crankLength: '170',
    barModel: 'FSA Compact Alloy',
    wheelset: 'Mavic Ksyrium SL',
    tyres: 'Continental Gatorskin 700x25c',
    saddle: 'Prologo Kappa Evo',
    upgrades: '',
    partsNew: 'Bar tape',
    productType: 'Road Bike',
    features: [],
    customTags: '',
    isFeatured: false,
    weight: '',
  },

  // 2. Cannondale Slice — triathlon
  {
    imageFolder: 'Cannondale-Slice-53M-Ult6800-15',
    brand: 'Cannondale',
    model: 'Slice',
    frameSize: '53',
    sizeLabel: 'M',
    recommendedHeight: '165cm - 170cm OR 5\'5" to 5\'7"',
    colour: 'White Red',
    groupsetDisplay: '6800 Shimano Ultegra, 11 SPD',
    bikeCategory: 'triathlon',
    frameMaterial: 'carbon',
    groupsetType: 'mechanical',
    brakeType: 'rim-brakes',
    price: '1449.00',
    compareAtPrice: '',
    cosmetic: '',
    mechanical: '',
    description: 'High-performance Cannondale Slice, perfect for competitive riders seeking speed and precision. Excellent for medium-sized riders.',
    chainring: '54/36',
    cassette: '11-28',
    barWidth: '430',
    stemLength: '90',
    crankLength: '175',
    barModel: '3T Aura Carbon Pro Cockpit',
    wheelset: 'Mavic Aksium Race',
    tyres: 'Schwalbe Durano OO 700x25c',
    saddle: 'Selle Italia NT1',
    upgrades: '',
    partsNew: '',
    productType: 'Triathlon Bike',
    features: ['aero'],
    customTags: '',
    isFeatured: false,
    weight: '',
  },

  // 3. Cannondale Super Six — race
  {
    imageFolder: 'Cannondale-SuperSix-56L-Ult6700-51',
    brand: 'Cannondale',
    model: 'SuperSix',
    frameSize: '56',
    sizeLabel: 'L',
    recommendedHeight: '175cm - 180cm OR 5\'9" to 5\'11"',
    colour: '',
    groupsetDisplay: '6700 Shimano Ultegra, 10 SPD',
    bikeCategory: 'race',
    frameMaterial: 'carbon',
    groupsetType: 'mechanical',
    brakeType: 'rim-brakes',
    price: '1499.00',
    compareAtPrice: '',
    cosmetic: '',
    mechanical: '',
    description: 'The Cannondale Super Six is an excellent choice for avid cyclists looking for a reliable and competitive ride. Crafted for both performance and comfort, it\'s perfect for your next race or long-distance ride.',
    chainring: '50/34',
    cassette: '11-28',
    barWidth: '440',
    stemLength: '120',
    crankLength: '175',
    barModel: 'Cannondale Alloy',
    wheelset: 'Fulcrum Racing 3 Black',
    tyres: 'Specialized Roubaix Pro 700x25c',
    saddle: '',
    upgrades: '',
    partsNew: 'Saddle, chain, cables, bar tape, brake pads, rear brake caliper',
    productType: 'Road Bike',
    features: [],
    customTags: '',
    isFeatured: false,
    weight: '',
  },

  // 4. Cannondale Synapse — endurance
  {
    imageFolder: 'Cannondale-Synapse-54M-1055800-22',
    brand: 'Cannondale',
    model: 'Synapse',
    frameSize: '54',
    sizeLabel: 'M',
    recommendedHeight: '170cm - 175cm OR 5\'7" to 5\'9"',
    colour: '',
    groupsetDisplay: '5800 Shimano 105, 11 SPD',
    bikeCategory: 'endurance',
    frameMaterial: 'carbon',
    groupsetType: 'mechanical',
    brakeType: 'rim-brakes',
    price: '1399.00',
    compareAtPrice: '',
    cosmetic: '',
    mechanical: '',
    description: 'Cannondale Synapse is perfect for an enthusiastic road cyclist. With its balanced geometry, it\'s ideal for riders seeking a mix of comfort and performance.',
    chainring: '50/34',
    cassette: '11-32',
    barWidth: '420',
    stemLength: '110',
    crankLength: '172.5',
    barModel: 'Cannondale Alloy',
    wheelset: 'Shimano RS',
    tyres: 'Schwalbe Lugano 700x25c',
    saddle: 'Cannondale',
    upgrades: '',
    partsNew: '',
    productType: 'Endurance Bike',
    features: [],
    customTags: '',
    isFeatured: false,
    weight: '',
  },

  // 5. Cell Victor — road
  {
    imageFolder: 'Cell-Victor-54M-Ult6600-18',
    brand: 'Cell',
    model: 'Victor',
    frameSize: '54',
    sizeLabel: 'M',
    recommendedHeight: '170cm - 175cm OR 5\'7" to 5\'9"',
    colour: 'Light Blue',
    groupsetDisplay: '6600 Shimano Ultegra, 10 SPD',
    bikeCategory: 'road',
    frameMaterial: 'carbon',
    groupsetType: 'mechanical',
    brakeType: 'rim-brakes',
    price: '699.00',
    compareAtPrice: '',
    cosmetic: '',
    mechanical: '',
    description: 'The Cell Victor offers a great ride experience. Durable and reliable with a Shimano Ultegra groupset, perfect for everyday commutes or leisurely rides.',
    chainring: '',
    cassette: '',
    barWidth: '',
    stemLength: '',
    crankLength: '',
    barModel: '',
    wheelset: '',
    tyres: '',
    saddle: '',
    upgrades: '',
    partsNew: '',
    productType: 'Road Bike',
    features: [],
    customTags: '',
    isFeatured: false,
    weight: '',
  },

  // 6. Colnago CLX 3.0 — race
  {
    imageFolder: 'Colnago-CLX3-54M-Ult6800-23',
    brand: 'Colnago',
    model: 'CLX 3.0',
    frameSize: '54',
    sizeLabel: 'M',
    recommendedHeight: '170cm - 175cm OR 5\'7" to 5\'9"',
    colour: 'Black White',
    groupsetDisplay: '6800 Shimano Ultegra, 11 SPD',
    bikeCategory: 'race',
    frameMaterial: 'carbon',
    groupsetType: 'mechanical',
    brakeType: 'rim-brakes',
    price: '1399.00',
    compareAtPrice: '',
    cosmetic: '',
    mechanical: '',
    description: 'The Colnago CLX 3.0 is a versatile road bike designed for both performance and comfort. With its high-quality Shimano Ultegra groupset and reliable wheelset, it\'s perfect for both competitive and leisure rides.',
    chainring: '',
    cassette: '',
    barWidth: '400',
    stemLength: '100',
    crankLength: '170',
    barModel: 'Deda Alloy',
    wheelset: 'Mavic Ksyrium / Fulcrum Racing 3',
    tyres: 'Continental GP4000 700x23c',
    saddle: 'Montrose Elite',
    upgrades: '',
    partsNew: '',
    productType: 'Road Bike',
    features: [],
    customTags: '',
    isFeatured: false,
    weight: '',
  },

  // 7. EROX Team Special — road
  {
    imageFolder: 'EROX-TeamSpecial-58XL-MS10-63',
    brand: 'EROX',
    model: 'Team Special',
    frameSize: '58',
    sizeLabel: 'XL',
    recommendedHeight: '180cm - 185cm OR 5\'11" to 6\'1"',
    colour: 'Black Red',
    groupsetDisplay: 'MicroShift, 10 SPD',
    bikeCategory: 'road',
    frameMaterial: 'carbon',
    groupsetType: 'mechanical',
    brakeType: 'rim-brakes',
    price: '899.00',
    compareAtPrice: '',
    cosmetic: '',
    mechanical: '',
    description: 'The EROX Team Special is a versatile road bike ideal for riders seeking a reliable and smooth ride. Perfect for those looking for performance without breaking the bank.',
    chainring: '',
    cassette: '',
    barWidth: '',
    stemLength: '',
    crankLength: '',
    barModel: '',
    wheelset: '',
    tyres: '',
    saddle: '',
    upgrades: '',
    partsNew: '',
    productType: 'Road Bike',
    features: [],
    customTags: '',
    isFeatured: false,
    weight: '',
  },

  // 8. Focus Parlane — endurance
  {
    imageFolder: 'Focus-Parlane-56L-1057020D-46',
    brand: 'Focus',
    model: 'Parlane',
    frameSize: '56',
    sizeLabel: 'L',
    recommendedHeight: '175cm - 180cm OR 5\'9" to 5\'11"',
    colour: 'Black',
    groupsetDisplay: '7020 Shimano 105, 11 SPD, Hydraulic Disc',
    bikeCategory: 'endurance',
    frameMaterial: 'aluminum',
    groupsetType: 'mechanical',
    brakeType: 'disc-brakes',
    price: '1599.00',
    compareAtPrice: '',
    cosmetic: '',
    mechanical: '',
    description: 'The Focus Parlane is perfect for riders seeking a balanced and responsive experience on the road. It features a quality Shimano 105 groupset for smooth shifting and reliable disc brakes for confident stopping power.',
    chainring: '50/34',
    cassette: '11-30',
    barWidth: '410',
    stemLength: '115',
    crankLength: '172.5',
    barModel: 'Syncros Alloy',
    wheelset: 'Shimano RS',
    tyres: 'Continental GP5000 700x28c',
    saddle: 'Merida Comp SL',
    upgrades: '',
    partsNew: '',
    productType: 'Endurance Bike',
    features: [],
    customTags: '',
    isFeatured: false,
    weight: '',
  },

  // 9. Fuji Altamira (52S) — road
  {
    imageFolder: 'Fuji-Altamira-52S-Vel10-13',
    brand: 'Fuji',
    model: 'Altamira',
    frameSize: '52',
    sizeLabel: 'S',
    recommendedHeight: '165cm - 170cm OR 5\'5" to 5\'7"',
    colour: 'Grey White',
    groupsetDisplay: 'Campagnolo Veloce, 10 SPD',
    bikeCategory: 'road',
    frameMaterial: 'carbon',
    groupsetType: 'mechanical',
    brakeType: 'rim-brakes',
    price: '1099.00',
    compareAtPrice: '',
    cosmetic: '',
    mechanical: '',
    description: 'The Fuji Altamira offers a smooth ride. With a Campagnolo Veloce groupset, this bike is perfect for both casual and competitive use.',
    chainring: '53/39',
    cassette: '11-25',
    barWidth: '390',
    stemLength: '90',
    crankLength: '',
    barModel: '',
    wheelset: '',
    tyres: '',
    saddle: '',
    upgrades: '',
    partsNew: '',
    productType: 'Road Bike',
    features: [],
    customTags: '',
    isFeatured: false,
    weight: '',
  },

  // 10. Fuji Altamira (54M) — road
  {
    imageFolder: 'Fuji-Altamira-54M-Ult6800-21',
    brand: 'Fuji',
    model: 'Altamira',
    frameSize: '54',
    sizeLabel: 'M',
    recommendedHeight: '170cm - 175cm OR 5\'7" to 5\'9"',
    colour: '',
    groupsetDisplay: '6800 Shimano Ultegra, 11 SPD',
    bikeCategory: 'road',
    frameMaterial: 'carbon',
    groupsetType: 'mechanical',
    brakeType: 'rim-brakes',
    price: '1399.00',
    compareAtPrice: '',
    cosmetic: '',
    mechanical: '',
    description: 'The Fuji Altamira is a versatile road bike perfect for enthusiasts seeking both performance and comfort. It offers a smooth and responsive ride, making it suitable for both training and leisurely rides.',
    chainring: '50/34',
    cassette: '11-28',
    barWidth: '410',
    stemLength: '100',
    crankLength: '172.5',
    barModel: 'Oval Alloy',
    wheelset: 'Oval Concept',
    tyres: '',
    saddle: 'Oval',
    upgrades: '',
    partsNew: 'Tyres, bar tape',
    productType: 'Road Bike',
    features: [],
    customTags: '',
    isFeatured: false,
    weight: '',
  },

  // 11. Fuji Transonic Two.3 — aero
  {
    imageFolder: 'Fuji-Transonic2.3-51S-Ult8000-11',
    brand: 'Fuji',
    model: 'Transonic Two.3',
    frameSize: '51',
    sizeLabel: 'S',
    recommendedHeight: '160cm - 165cm OR 5\'3" to 5\'5"',
    colour: 'Black Red',
    groupsetDisplay: '8000 Shimano Ultegra, 11 SPD',
    bikeCategory: 'aero',
    frameMaterial: 'carbon',
    groupsetType: 'mechanical',
    brakeType: 'rim-brakes',
    price: '1399.00',
    compareAtPrice: '',
    cosmetic: '',
    mechanical: '',
    description: 'Ideal for dedicated cyclists, the Fuji Transonic Two.3 offers a seamless blend of performance and comfort. Perfect for riders seeking a smooth ride and responsive handling.',
    chainring: '50/34',
    cassette: '11-28',
    barWidth: '420',
    stemLength: '70',
    crankLength: '170',
    barModel: 'Merida X-Comp Alloy',
    wheelset: 'Campagnolo Zonda',
    tyres: 'GP5000 TR 700x25c',
    saddle: 'Fizik Wing Flex',
    upgrades: '',
    partsNew: 'Bar tape, cables, tubes',
    productType: 'Aero Road Bike',
    features: ['aero'],
    customTags: '',
    isFeatured: false,
    weight: '',
  },

  // 12. Giant Defy SL0 — endurance (Di2)
  {
    imageFolder: 'Giant-DefySL0-58XL-Ulte6870-61',
    brand: 'Giant',
    model: 'Defy SL0',
    frameSize: '58',
    sizeLabel: 'XL',
    recommendedHeight: '180cm - 185cm OR 5\'11" to 6\'1"',
    colour: 'Black White',
    groupsetDisplay: '6870 Shimano Ultegra Di2, 11 SPD',
    bikeCategory: 'endurance',
    frameMaterial: 'carbon',
    groupsetType: 'di2',
    brakeType: 'rim-brakes',
    price: '1299.00',
    compareAtPrice: '',
    cosmetic: '',
    mechanical: '',
    description: 'The Giant Defy SL0 is a high-performance road bike ideal for riders seeking speed and comfort. Perfect for medium to long rides, it offers smooth handling and precision with its Ultegra Di2 groupset.',
    chainring: '52/36',
    cassette: '11-25',
    barWidth: '440',
    stemLength: '100',
    crankLength: '175',
    barModel: 'LT PRO Alloy',
    wheelset: 'Giant PSL',
    tyres: 'Continental GP4000',
    saddle: '',
    upgrades: '',
    partsNew: 'Saddle, brake pads, brake cables, tyres, bar tape',
    productType: 'Endurance Bike',
    features: [],
    customTags: '',
    isFeatured: false,
    weight: '',
  },

  // 13. Merida Scultura 400 Disc — endurance
  {
    imageFolder: 'Merida-Scultura400Disc-56L-Tia4720D-43',
    brand: 'Merida',
    model: 'Scultura 400 Disc',
    frameSize: '56',
    sizeLabel: 'L',
    recommendedHeight: '175cm - 180cm OR 5\'9" to 5\'11"',
    colour: '',
    groupsetDisplay: '4720 Shimano Tiagra, 10 SPD, Hydraulic Disc',
    bikeCategory: 'endurance',
    frameMaterial: 'aluminum',
    groupsetType: 'mechanical',
    brakeType: 'disc-brakes',
    price: '1299.00',
    compareAtPrice: '',
    cosmetic: '',
    mechanical: '',
    description: 'The Merida Scultura 400 Disc is designed for those who seek a comfortable yet agile ride. This bike features reliable Shimano components and hydraulic disc brakes for enhanced stopping power.',
    chainring: '',
    cassette: '',
    barWidth: '',
    stemLength: '',
    crankLength: '',
    barModel: '',
    wheelset: '',
    tyres: '',
    saddle: '',
    upgrades: '',
    partsNew: '',
    productType: 'Endurance Bike',
    features: [],
    customTags: '',
    isFeatured: false,
    weight: '',
  },

  // 14. Merida Scultura 400 Rim — endurance
  {
    imageFolder: 'Merida-Scultura400Rim-56L-1057000-37',
    brand: 'Merida',
    model: 'Scultura 400',
    frameSize: '56',
    sizeLabel: 'L',
    recommendedHeight: '175cm - 180cm OR 5\'9" to 5\'11"',
    colour: 'Navy Blue',
    groupsetDisplay: '7000 Shimano 105, 11 SPD',
    bikeCategory: 'endurance',
    frameMaterial: 'aluminum',
    groupsetType: 'mechanical',
    brakeType: 'rim-brakes',
    price: '1199.00',
    compareAtPrice: '',
    cosmetic: '',
    mechanical: '',
    description: 'The Merida Scultura 400 is perfect for dedicated road cyclists looking for performance and reliability. Its lightweight design and superior handling make it ideal for both competitive and recreational riders.',
    chainring: '50/34',
    cassette: '11-28',
    barWidth: '420',
    stemLength: '120',
    crankLength: '175',
    barModel: 'Merida Comp Alloy',
    wheelset: 'Alex Rims Comp',
    tyres: 'Pirelli Cinturato Velo 700x28c',
    saddle: 'Merida Comp SL',
    upgrades: '',
    partsNew: '',
    productType: 'Endurance Bike',
    features: [],
    customTags: '',
    isFeatured: false,
    weight: '',
  },

  // 15. Merida Scultura 7000E — race
  {
    imageFolder: 'Merida-Scultura7000E-57L-1055800-60',
    brand: 'Merida',
    model: 'Scultura 7000E',
    frameSize: '57',
    sizeLabel: 'L',
    recommendedHeight: '175cm - 180cm OR 5\'9" to 5\'11"',
    colour: '',
    groupsetDisplay: '5800 Shimano 105, 11 SPD',
    bikeCategory: 'race',
    frameMaterial: 'carbon',
    groupsetType: 'mechanical',
    brakeType: 'rim-brakes',
    price: '1499.00',
    compareAtPrice: '',
    cosmetic: '',
    mechanical: '',
    description: 'The Merida Scultura 7000E is a perfect choice for those seeking a performance road bike. Ideal for riders who appreciate precision handling and a smooth ride.',
    chainring: '',
    cassette: '',
    barWidth: '420',
    stemLength: '120',
    crankLength: '175',
    barModel: 'Syncros RR 2.0 Alloy',
    wheelset: 'Fulcrum / Mavic',
    tyres: '',
    saddle: '',
    upgrades: '',
    partsNew: '',
    productType: 'Road Bike',
    features: [],
    customTags: '',
    isFeatured: false,
    weight: '',
  },

  // 16. Merida Scultura 904 — race
  {
    imageFolder: 'Merida-Scultura904-52SM-1055700-14',
    brand: 'Merida',
    model: 'Scultura 904',
    frameSize: '52',
    sizeLabel: 'S/M',
    recommendedHeight: '165cm - 170cm OR 5\'5" to 5\'7"',
    colour: 'White Blue',
    groupsetDisplay: '5700 Shimano 105, 10 SPD',
    bikeCategory: 'race',
    frameMaterial: 'carbon',
    groupsetType: 'mechanical',
    brakeType: 'rim-brakes',
    price: '1199.00',
    compareAtPrice: '',
    cosmetic: '',
    mechanical: '',
    description: 'The Merida Scultura 904 is a versatile road bike perfect for both competitive races and daily rides. Known for its smooth handling and reliability.',
    chainring: '50/34',
    cassette: '11-28',
    barWidth: '420',
    stemLength: '100',
    crankLength: '172.5',
    barModel: 'Control Tech Alloy',
    wheelset: 'Fulcrum Racing Pro',
    tyres: 'Specialized Turbo 700x25c',
    saddle: '',
    upgrades: '',
    partsNew: '',
    productType: 'Road Bike',
    features: [],
    customTags: '',
    isFeatured: false,
    weight: '',
  },

  // 17. Merida Scultura 905 — race
  {
    imageFolder: 'Merida-Scultura905-60XL-Ult6800-72',
    brand: 'Merida',
    model: 'Scultura 905',
    frameSize: '60',
    sizeLabel: 'XL',
    recommendedHeight: '185cm - 190cm OR 6\'1" to 6\'3"',
    colour: '',
    groupsetDisplay: '6800 Shimano Ultegra, 11 SPD',
    bikeCategory: 'race',
    frameMaterial: 'carbon',
    groupsetType: 'mechanical',
    brakeType: 'rim-brakes',
    price: '1299.00',
    compareAtPrice: '',
    cosmetic: '',
    mechanical: '',
    description: 'The Merida Scultura 905 is perfect for seasoned cyclists seeking performance and comfort. Its lightweight frame and reliable components promise an engaging ride on any terrain.',
    chainring: '52/36',
    cassette: '11-28',
    barWidth: '430',
    stemLength: '90',
    crankLength: '175',
    barModel: 'FSA Compact Alloy',
    wheelset: 'Fulcrum Racing Comp',
    tyres: 'Vittoria Zaffiro Pro 700x25c',
    saddle: 'Prologo Kappa Evo',
    upgrades: '',
    partsNew: 'Front 52T chainring',
    productType: 'Road Bike',
    features: [],
    customTags: '',
    isFeatured: false,
    weight: '',
  },

  // 18. Planet X Pro Carbon — road
  {
    imageFolder: 'PlanetX-ProCarbon-51S-Ult6800-09',
    brand: 'Planet X',
    model: 'Pro Carbon',
    frameSize: '51',
    sizeLabel: 'S',
    recommendedHeight: '160cm - 165cm OR 5\'3" to 5\'5"',
    colour: 'Black',
    groupsetDisplay: '6800 Shimano Ultegra, 11 SPD',
    bikeCategory: 'road',
    frameMaterial: 'carbon',
    groupsetType: 'mechanical',
    brakeType: 'rim-brakes',
    price: '1099.00',
    compareAtPrice: '',
    cosmetic: '',
    mechanical: '',
    description: 'The Planet X Pro Carbon is designed for road enthusiasts looking for a blend of performance and comfort. This bike promises a reliable ride.',
    chainring: '52/36',
    cassette: '',
    barWidth: '420',
    stemLength: '110',
    crankLength: '172.5',
    barModel: 'Selle Zeta Alloy',
    wheelset: 'Mavic Aksium Race',
    tyres: 'WD 700x25c',
    saddle: 'X3',
    upgrades: '',
    partsNew: 'Chain, cassette, cables, wheels painted, brake pads, bar tape',
    productType: 'Road Bike',
    features: [],
    customTags: '',
    isFeatured: false,
    weight: '',
  },

  // 19. Ridley Liz — road
  {
    imageFolder: 'Ridley-Liz-50XS-Rvl22-07',
    brand: 'Ridley',
    model: 'Liz',
    frameSize: '50',
    sizeLabel: 'XS',
    recommendedHeight: '150cm - 160cm OR 4\'11" to 5\'3"',
    colour: '',
    groupsetDisplay: 'SRAM Rival 22, 11 SPD',
    bikeCategory: 'road',
    frameMaterial: 'carbon',
    groupsetType: 'mechanical',
    brakeType: 'rim-brakes',
    price: '1199.00',
    compareAtPrice: '',
    cosmetic: '',
    mechanical: '',
    description: 'The Ridley Liz is a versatile road bike, perfect for women riders looking for performance and comfort. It provides a smooth ride with its quality components.',
    chainring: '50/34',
    cassette: '11-28',
    barWidth: '390',
    stemLength: '100',
    crankLength: '170',
    barModel: 'Zipp Alloy',
    wheelset: 'Colnago Artemis CW32CL',
    tyres: 'Continental Grand Sport 700x23c',
    saddle: '',
    upgrades: '',
    partsNew: 'Chain, FD tune, brake pads',
    productType: 'Road Bike',
    features: [],
    customTags: '',
    isFeatured: false,
    weight: '',
  },

  // 20. Ridley Noah — aero
  {
    imageFolder: 'Ridley-Noah-48XS-Rec10-02',
    brand: 'Ridley',
    model: 'Noah',
    frameSize: '48',
    sizeLabel: 'XS',
    recommendedHeight: '150cm - 160cm OR 4\'11" to 5\'3"',
    colour: 'White',
    groupsetDisplay: 'Campagnolo Record, 10 SPD',
    bikeCategory: 'aero',
    frameMaterial: 'carbon',
    groupsetType: 'mechanical',
    brakeType: 'rim-brakes',
    price: '1099.00',
    compareAtPrice: '',
    cosmetic: '8',
    mechanical: '9',
    description: 'Ideal for riders who love classic race bikes, sharp handling, and pure road feel. Perfect for enthusiasts or collectors who value Campagnolo heritage, rim brakes, and old-school performance.',
    chainring: '50/34',
    cassette: '10-25',
    barWidth: '360',
    stemLength: '80',
    crankLength: '170',
    barModel: '3T Alloy',
    wheelset: 'Campagnolo Eurus',
    tyres: 'Continental Ultra Sport 700x25c',
    saddle: 'Giant Contact SL',
    upgrades: '',
    partsNew: 'Bar tape, stem bolts',
    productType: 'Aero Road Bike',
    features: ['aero'],
    customTags: '',
    isFeatured: false,
    weight: '',
  },

  // 21. Scott Addict — race
  {
    imageFolder: 'Scott-Addict-56L-DA7900-45',
    brand: 'Scott',
    model: 'Addict',
    frameSize: '56',
    sizeLabel: 'L',
    recommendedHeight: '175cm - 180cm OR 5\'9" to 5\'11"',
    colour: 'Black White',
    groupsetDisplay: '7900 Shimano Dura-Ace, 10 SPD',
    bikeCategory: 'race',
    frameMaterial: 'carbon',
    groupsetType: 'mechanical',
    brakeType: 'rim-brakes',
    price: '1499.00',
    compareAtPrice: '',
    cosmetic: '',
    mechanical: '',
    description: 'The Scott Addict is a top-performing road bike designed for enthusiasts and competitive cyclists. With its reliable Shimano Dura-Ace groupset, it\'s perfect for long rides and races.',
    chainring: '',
    cassette: '',
    barWidth: '',
    stemLength: '',
    crankLength: '',
    barModel: '',
    wheelset: '',
    tyres: '',
    saddle: '',
    upgrades: '',
    partsNew: '',
    productType: 'Road Bike',
    features: [],
    customTags: '',
    isFeatured: false,
    weight: '',
  },

  // 22. Scott CR1 — endurance
  {
    imageFolder: 'Scott-CR1-57L-Ult6700-58',
    brand: 'Scott',
    model: 'CR1',
    frameSize: '57',
    sizeLabel: 'L',
    recommendedHeight: '175cm - 180cm OR 5\'9" to 5\'11"',
    colour: 'Grey',
    groupsetDisplay: '6700 Shimano Ultegra, 10 SPD',
    bikeCategory: 'endurance',
    frameMaterial: 'carbon',
    groupsetType: 'mechanical',
    brakeType: 'rim-brakes',
    price: '1199.00',
    compareAtPrice: '',
    cosmetic: '',
    mechanical: '',
    description: 'The Scott CR1 is designed for performance-oriented road riders. Well-suited for those seeking a responsive and smooth ride feel.',
    chainring: '50/34',
    cassette: '11-26',
    barWidth: '420',
    stemLength: '120',
    crankLength: '175',
    barModel: 'Carbon',
    wheelset: 'Syncros DT Swiss Alloy',
    tyres: '',
    saddle: '',
    upgrades: '',
    partsNew: 'Tyres, bar tape, pedals',
    productType: 'Endurance Bike',
    features: [],
    customTags: '',
    isFeatured: false,
    weight: '',
  },

  // 23. Specialized Roubaix (Force) — endurance
  {
    imageFolder: 'Specialized-Roubaix-58XL-Fce10-65',
    brand: 'Specialized',
    model: 'Roubaix',
    frameSize: '58',
    sizeLabel: 'XL',
    recommendedHeight: '180cm - 185cm OR 5\'11" to 6\'1"',
    colour: 'Black Red',
    groupsetDisplay: 'SRAM Force, 10 SPD',
    bikeCategory: 'endurance',
    frameMaterial: 'carbon',
    groupsetType: 'mechanical',
    brakeType: 'rim-brakes',
    price: '1299.00',
    compareAtPrice: '',
    cosmetic: '',
    mechanical: '',
    description: 'The Specialized Roubaix offers a smooth ride ideal for performance-oriented cyclists. Perfect for riders seeking comfort and speed.',
    chainring: '53/39',
    cassette: '11-26',
    barWidth: '440',
    stemLength: '90',
    crankLength: '172.5',
    barModel: '',
    wheelset: 'Easton EA70',
    tyres: 'Specialized 700x25c',
    saddle: '',
    upgrades: '',
    partsNew: '',
    productType: 'Endurance Bike',
    features: [],
    customTags: '',
    isFeatured: false,
    weight: '',
  },

  // 24. Specialized Roubaix (Ultegra) — endurance
  {
    imageFolder: 'Specialized-Roubaix-58XL-Ult6800-62',
    brand: 'Specialized',
    model: 'Roubaix',
    frameSize: '58',
    sizeLabel: 'XL',
    recommendedHeight: '180cm - 185cm OR 5\'11" to 6\'1"',
    colour: 'Black Aqua',
    groupsetDisplay: '6800 Shimano Ultegra, 11 SPD',
    bikeCategory: 'endurance',
    frameMaterial: 'carbon',
    groupsetType: 'mechanical',
    brakeType: 'rim-brakes',
    price: '1399.00',
    compareAtPrice: '',
    cosmetic: '',
    mechanical: '',
    description: 'The Specialized Roubaix is designed for riders who value comfort and performance. This model provides a smooth ride experience for both seasoned cyclists and newcomers.',
    chainring: '',
    cassette: '',
    barWidth: '',
    stemLength: '',
    crankLength: '',
    barModel: '',
    wheelset: '',
    tyres: '',
    saddle: '',
    upgrades: '',
    partsNew: '',
    productType: 'Endurance Bike',
    features: [],
    customTags: '',
    isFeatured: false,
    weight: '',
  },

  // 25. Specialized Roubaix Expert SL4 — endurance
  {
    imageFolder: 'Specialized-RoubaixSL4-54M-Fce10-20',
    brand: 'Specialized',
    model: 'Roubaix Expert SL4',
    frameSize: '54',
    sizeLabel: 'M',
    recommendedHeight: '170cm - 175cm OR 5\'7" to 5\'9"',
    colour: '',
    groupsetDisplay: 'SRAM Force, 10 SPD',
    bikeCategory: 'endurance',
    frameMaterial: 'carbon',
    groupsetType: 'mechanical',
    brakeType: 'rim-brakes',
    price: '1199.00',
    compareAtPrice: '',
    cosmetic: '',
    mechanical: '',
    description: 'This Specialized Roubaix Expert SL4 is crafted for the serious cyclist seeking performance and comfort. It\'s suited for riders looking to excel on challenging roads with ease and control.',
    chainring: '50/34',
    cassette: '11-25',
    barWidth: '420',
    stemLength: '100',
    crankLength: '172.5',
    barModel: 'Specialized Alloy',
    wheelset: 'Mavic CXP22',
    tyres: 'Specialized Endurance Pro 700x23c',
    saddle: 'Specialized Riva',
    upgrades: '',
    partsNew: 'Chain, clear coat touchup, pedals',
    productType: 'Endurance Bike',
    features: [],
    customTags: '',
    isFeatured: false,
    weight: '',
  },

  // 26. Trek Domane Four Series (Womens) — endurance
  {
    imageFolder: 'Trek-Domane4W-54M-1055700-19',
    brand: 'Trek',
    model: 'Domane Four Series WSD',
    frameSize: '54',
    sizeLabel: 'M',
    recommendedHeight: '170cm - 175cm OR 5\'7" to 5\'9"',
    colour: 'White Black',
    groupsetDisplay: '5700 Shimano 105, 10 SPD',
    bikeCategory: 'endurance',
    frameMaterial: 'carbon',
    groupsetType: 'mechanical',
    brakeType: 'rim-brakes',
    price: '1199.00',
    compareAtPrice: '',
    cosmetic: '',
    mechanical: '',
    description: 'The Trek Domane Four Series is a versatile road bike ideal for those seeking a reliable and smooth ride. Perfect for riders who value quality and performance.',
    chainring: '50/34',
    cassette: '11-28',
    barWidth: '400',
    stemLength: '80',
    crankLength: '172.5',
    barModel: 'Bontrager Race Alloy',
    wheelset: 'Bontrager',
    tyres: 'Bontrager R1',
    saddle: 'Bontrager',
    upgrades: '',
    partsNew: 'Paint spokes, bar tape',
    productType: 'Endurance Bike',
    features: [],
    customTags: '',
    isFeatured: false,
    weight: '',
  },

  // 27. Trek Madone (Three Series) — road
  {
    imageFolder: 'Trek-Madone3-60XL-1055700-70',
    brand: 'Trek',
    model: 'Madone Three Series',
    frameSize: '60',
    sizeLabel: 'XL',
    recommendedHeight: '185cm - 190cm OR 6\'1" to 6\'3"',
    colour: 'Black Grey',
    groupsetDisplay: '5700 Shimano 105, 10 SPD',
    bikeCategory: 'road',
    frameMaterial: 'carbon',
    groupsetType: 'mechanical',
    brakeType: 'rim-brakes',
    price: '1199.00',
    compareAtPrice: '',
    cosmetic: '',
    mechanical: '',
    description: 'The Trek Madone Three Series is perfect for taller riders seeking a performance-oriented road bike. Ideal for enthusiasts or those aiming to cover long distances with ease.',
    chainring: '50/34',
    cassette: '11-28',
    barWidth: '450',
    stemLength: '90',
    crankLength: '175',
    barModel: 'Bontrager Alloy',
    wheelset: 'Bontrager',
    tyres: 'Bontrager 23c',
    saddle: 'Bontrager Affinity',
    upgrades: '',
    partsNew: 'Paint spokes',
    productType: 'Road Bike',
    features: [],
    customTags: '',
    isFeatured: false,
    weight: '',
  },
]

// ---------------------------------------------------------------------------
// Description builder — matches the CSV Ad format
// ---------------------------------------------------------------------------

const SERVICE_FOOTER = `ALL bikes are serviced before sale with a drivetrain degrease/re-lube, drivetrain tune and brake tune as well as a safety check.
Sold & Serviced by Bicycles2U, a reputable second hand bicycle dealer based in Queens Park / Bondi Junction that specialises in high quality Road, Race and TT bicycles that are meticulously serviced before being sold.`

function buildDescriptionHtml(bike: BulkBikeData): string {
  const lines: string[] = []

  // Condition (if available)
  if (bike.cosmetic) lines.push(`Cosmetic Condition: ${bike.cosmetic}/10`)
  if (bike.mechanical) lines.push(`Mechanical Condition: ${bike.mechanical}/10`)

  // Size & fit
  lines.push(`Size: ${bike.frameSize}cm (${bike.sizeLabel})`)
  lines.push(`Recommended: ${bike.recommendedHeight}`)

  // Groupset & wheelset header
  // Avoid redundancy: if groupsetDisplay already mentions "Disc", don't append "Disc Brake"
  const alreadyMentionsDisc = /disc/i.test(bike.groupsetDisplay)
  const brakeLabel = bike.brakeType === 'disc-brakes' && !alreadyMentionsDisc ? ', Disc Brake' : bike.brakeType === 'rim-brakes' ? ', Rim Brake' : ''
  lines.push(`Groupset: ${bike.groupsetDisplay}${brakeLabel}`)
  if (bike.wheelset) lines.push(`Wheelset: ${bike.wheelset}`)

  // Description blurb
  if (bike.description) {
    lines.push('')
    lines.push(bike.description)
  }

  // Features / specs
  const features: string[] = []
  if (bike.tyres) features.push(`Tyres: ${bike.tyres}`)
  if (bike.barModel) features.push(`Handlebar Model: ${bike.barModel}`)
  if (bike.saddle) features.push(`Saddle: ${bike.saddle}`)
  if (bike.chainring) features.push(`Front Chainring: ${bike.chainring}T`)
  if (bike.cassette) features.push(`Cassette: ${bike.cassette}T`)
  if (bike.barWidth) features.push(`Handlebar Width: ${bike.barWidth}mm`)
  if (bike.stemLength) features.push(`Stem Length: ${bike.stemLength}mm`)
  if (bike.crankLength) features.push(`Crank Length: ${bike.crankLength}mm`)

  if (features.length > 0) {
    lines.push('')
    lines.push('Features:')
    features.forEach((f) => lines.push(f))
  }

  // Service / new parts
  if (bike.partsNew) {
    const serviceItems: string[] = []
    bike.partsNew.split(',').forEach((part) => {
      let trimmed = part.trim()
      if (!trimmed) return
      // Strip leading "New " to avoid "New tyres (new)" redundancy
      trimmed = trimmed.replace(/^new\s+/i, '')
      // Strip leading "Service " prefix (e.g. "Service bartape" → "Bar tape")
      trimmed = trimmed.replace(/^service\s+/i, '')
      // Skip if the item is just "Service" alone
      if (/^service$/i.test(trimmed)) return
      // Capitalize first letter
      trimmed = trimmed.charAt(0).toUpperCase() + trimmed.slice(1)
      serviceItems.push(`- ${trimmed} (new)`)
    })
    if (serviceItems.length > 0) {
      lines.push('')
      lines.push('Service:')
      serviceItems.forEach((item) => lines.push(item))
    }
  }

  // Footer
  lines.push('')
  lines.push(SERVICE_FOOTER)

  // Convert to HTML
  return lines
    .map((line) => (line === '' ? '<br>' : `<p>${line}</p>`))
    .join('\n')
}

// ---------------------------------------------------------------------------
// Image handling
// ---------------------------------------------------------------------------

function getImageFiles(folderName: string): string[] {
  const folderPath = path.join(IMAGE_BASE, folderName)

  if (!fs.existsSync(folderPath)) {
    console.error(`  Image folder not found: ${folderPath}`)
    return []
  }

  const files = fs.readdirSync(folderPath)
  const imageFiles = files
    .filter((f) => /\.(jpe?g|png|webp|heic)$/i.test(f))
    .sort() // Consistent ordering
    .map((f) => path.join(folderPath, f))

  return imageFiles
}

function getMimeType(filePath: string): string {
  const ext = path.extname(filePath).toLowerCase()
  const mimeMap: Record<string, string> = {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.webp': 'image/webp',
    '.heic': 'image/heic',
  }
  return mimeMap[ext] || 'image/jpeg'
}

async function uploadImages(imagePaths: string[]): Promise<string[]> {
  // Prepare file info for staged uploads
  const fileInfos = imagePaths.map((p) => {
    const stat = fs.statSync(p)
    return {
      filename: path.basename(p),
      mimeType: getMimeType(p),
      fileSize: stat.size,
    }
  })

  // Get staged upload targets
  const stagedTargets = await createStagedUploads(fileInfos)

  const resourceUrls: string[] = []

  // Upload each image individually
  for (let i = 0; i < imagePaths.length; i++) {
    const filePath = imagePaths[i]
    const target = stagedTargets[i]

    await uploadFileToStaged(filePath, target)
    resourceUrls.push(target.resourceUrl)

    // Small delay between uploads to avoid rate limiting
    if (i < imagePaths.length - 1) {
      await sleep(300)
    }
  }

  return resourceUrls
}

async function uploadFileToStaged(
  filePath: string,
  target: StagedUploadTarget
): Promise<void> {
  const fileBuffer = fs.readFileSync(filePath)
  const blob = new Blob([fileBuffer], { type: getMimeType(filePath) })

  const formData = new FormData()
  target.parameters.forEach((param) => {
    formData.append(param.name, param.value)
  })
  formData.append('file', blob, path.basename(filePath))

  const response = await fetch(target.url, {
    method: 'POST',
    body: formData,
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Failed to upload ${path.basename(filePath)}: ${errorText}`)
  }
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function buildTitle(bike: BulkBikeData): string {
  return `${bike.brand} ${bike.model} — ${bike.frameSize}cm`
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  // Dynamic imports so env vars are loaded before Shopify config reads them
  const adminModule = await import('../lib/shopify/admin')
  createStagedUploads = adminModule.createStagedUploads
  createAndPublishProduct = adminModule.createAndPublishProduct
  const tagModule = await import('../lib/shopify/tag-generator')
  generateTags = tagModule.generateTags

  const isDryRun = process.argv.includes('--dry-run')
  const storeDomain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN

  // --only N to upload only bike at index N (1-based)
  const onlyIdx = process.argv.indexOf('--only')
  const onlyBike = onlyIdx !== -1 ? parseInt(process.argv[onlyIdx + 1]) : null

  const bikesToProcess = onlyBike
    ? [BIKES[onlyBike - 1]]
    : BIKES

  if (onlyBike && !BIKES[onlyBike - 1]) {
    console.error(`Invalid --only index: ${onlyBike} (must be 1-${BIKES.length})`)
    process.exit(1)
  }

  console.log('='.repeat(60))
  console.log(`Bicycles2U Bulk Upload — ${bikesToProcess.length} of ${BIKES.length} bikes`)
  console.log(isDryRun ? 'MODE: DRY RUN (no uploads)' : 'MODE: LIVE UPLOAD')
  console.log('='.repeat(60))
  console.log()

  let successCount = 0
  let errorCount = 0
  let skippedCount = 0
  const errors: { title: string; error: string }[] = []

  for (let i = 0; i < bikesToProcess.length; i++) {
    const bike = bikesToProcess[i]
    const title = buildTitle(bike)
    const num = `[${i + 1}/${bikesToProcess.length}]`

    console.log(`${num} ${title}`)

    // Check for images
    const imagePaths = getImageFiles(bike.imageFolder)
    if (imagePaths.length === 0) {
      console.log(`  SKIPPED — no images found in ${bike.imageFolder}`)
      skippedCount++
      console.log()
      continue
    }

    // Build form data for tag generation
    const formData: Partial<BikeUploadFormData> = {
      title,
      vendor: bike.brand,
      productType: bike.productType,
      price: bike.price,
      compareAtPrice: bike.compareAtPrice,
      bikeCategory: bike.bikeCategory,
      frameMaterial: bike.frameMaterial,
      groupsetType: bike.groupsetType,
      brakeType: bike.brakeType,
      frameSize: bike.frameSize,
      weight: bike.weight,
      features: bike.features as BikeUploadFormData['features'],
      customTags: bike.customTags,
      isFeatured: bike.isFeatured,
      description: bike.description,
    }

    // Generate tags
    const { allTags } = generateTags(formData)

    // Build description
    const descriptionHtml = buildDescriptionHtml(bike)

    if (isDryRun) {
      console.log(`  Price: $${bike.price}`)
      console.log(`  Category: ${bike.bikeCategory} | Material: ${bike.frameMaterial}`)
      console.log(`  Groupset: ${bike.groupsetDisplay}`)
      console.log(`  Brakes: ${bike.brakeType}`)
      console.log(`  Frame: ${bike.frameSize}cm`)
      console.log(`  Images: ${imagePaths.length} files`)
      console.log(`  Tags: ${allTags.join(', ')}`)
      console.log(`  Type: ${bike.productType}`)
      console.log()
      console.log('  --- Description HTML (plain text preview) ---')
      console.log(descriptionHtml.replace(/<br>/g, '').replace(/<\/?p>/g, '').split('\n').map(l => `  ${l}`).join('\n'))
      console.log('  --- End Description ---')
      successCount++
      console.log()
      continue
    }

    // --- LIVE UPLOAD ---
    try {
      // Upload images
      process.stdout.write(`  Uploading ${imagePaths.length} images...`)
      const mediaUrls = await uploadImages(imagePaths)
      console.log(' done')

      // Build product input
      const productInput = {
        title,
        vendor: bike.brand,
        productType: bike.productType,
        descriptionHtml,
        tags: allTags,
        status: 'ACTIVE',
      }

      // Create, price, and publish
      process.stdout.write('  Creating product...')
      const product = await createAndPublishProduct(
        productInput,
        mediaUrls,
        bike.price,
        bike.compareAtPrice || undefined
      )
      console.log(' done')

      if (product) {
        const shopUrl = storeDomain
          ? `https://${storeDomain}/products/${product.handle}`
          : product.handle
        console.log(`  SUCCESS: ${shopUrl}`)
        successCount++
      } else {
        throw new Error('Product creation returned null')
      }

      // Delay between products to avoid rate limiting
      if (i < bikesToProcess.length - 1) {
        await sleep(2000)
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err)
      console.log(`  ERROR: ${msg}`)
      errors.push({ title, error: msg })
      errorCount++
    }

    console.log()
  }

  // Summary
  console.log('='.repeat(60))
  console.log('SUMMARY')
  console.log(`  Success: ${successCount}`)
  console.log(`  Errors:  ${errorCount}`)
  console.log(`  Skipped: ${skippedCount}`)

  if (errors.length > 0) {
    console.log()
    console.log('Failed bikes:')
    errors.forEach(({ title, error }) => {
      console.log(`  - ${title}: ${error}`)
    })
  }

  console.log('='.repeat(60))
}

main().catch((err) => {
  console.error('Fatal error:', err)
  process.exit(1)
})
