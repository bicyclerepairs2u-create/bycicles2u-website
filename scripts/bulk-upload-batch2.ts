#!/usr/bin/env npx tsx
// scripts/bulk-upload-batch2.ts
// Bulk upload BATCH 2 bikes to Shopify from hardcoded manifest
// Usage:
//   npx tsx scripts/bulk-upload-batch2.ts --dry-run   # Preview all bikes
//   npx tsx scripts/bulk-upload-batch2.ts              # Upload all bikes
//   npx tsx scripts/bulk-upload-batch2.ts --only 5     # Upload only bike #5

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
// Image folder base path — BATCH 2 uses new folder
// ---------------------------------------------------------------------------

const IMAGE_BASE = '/Users/dash/Desktop/Selling Stuff 2'

// ---------------------------------------------------------------------------
// Hardcoded bike manifest — BATCH 2 (32 bikes from new CSV)
// All bikes have "Photos" status and matching image folders
// ---------------------------------------------------------------------------

const BIKES: BulkBikeData[] = [
  // 1. Giant (Womens) Defy — endurance
  {
    imageFolder: 'GiantW-Defy-48XS-Tia4600-01',
    brand: 'Giant',
    model: 'Defy WSD',
    frameSize: '48',
    sizeLabel: 'XS',
    recommendedHeight: '150cm - 160cm OR 4\'11" to 5\'3"',
    colour: 'Navy Blue',
    groupsetDisplay: '4600 Shimano Tiagra, 10 SPD',
    bikeCategory: 'endurance',
    frameMaterial: 'carbon',
    groupsetType: 'mechanical',
    brakeType: 'rim-brakes',
    price: '849.00',
    compareAtPrice: '',
    cosmetic: '10',
    mechanical: '10',
    description: 'Giant Defy with Shimano Tiagra 2x10 and rim brakes is a smooth, confidence-inspiring endurance road bike that\'s perfect for beginner riders wanting comfort, reliability, and an easy bike to enjoy from the first ride. Presents in exceptional condition and is ready for everything from weekend rides to longer days in the saddle.',
    chainring: '50/34',
    cassette: '11-28',
    barWidth: '410',
    stemLength: '100',
    crankLength: '170',
    barModel: 'Giant Contact Alloy',
    wheelset: 'Giant P-R2',
    tyres: 'Pirelli PZero Race 700x25c',
    saddle: 'Giant',
    upgrades: '',
    partsNew: 'Chainrings, brake pads, bartape, inner tubes',
    productType: 'Road Bike',
    features: [],
    customTags: '',
    isFeatured: false,
    weight: '8.4',
  },

  // 2. Merida Scultura 6000 — road
  {
    imageFolder: 'Merida-Scultura6000-50XS-Ulte8020D-08',
    brand: 'Merida',
    model: 'Scultura 6000',
    frameSize: '50',
    sizeLabel: 'XS',
    recommendedHeight: '155cm - 165cm OR 5\'1" to 5\'5"',
    colour: 'Red',
    groupsetDisplay: '8020 Shimano Ultegra, 11 SPD',
    bikeCategory: 'road',
    frameMaterial: 'carbon',
    groupsetType: 'mechanical',
    brakeType: 'disc-brakes',
    price: '2299.00',
    compareAtPrice: '',
    cosmetic: '10',
    mechanical: '10',
    description: 'Merida Scultura 6000 with Shimano Ultegra 2x11 hydraulic disc brakes is built for intermediate riders wanting a lightweight road bike that feels fast the moment the road points uphill. One-owner bike in exceptional condition.',
    chainring: '50/34',
    cassette: '11-30',
    barWidth: '400',
    stemLength: '60',
    crankLength: '170',
    barModel: 'Merida X-Comp Alloy',
    wheelset: 'Fulcrum Racing 700DB',
    tyres: 'Maxxis Detenator 700x30c',
    saddle: 'Merida Comp Saddle',
    upgrades: '',
    partsNew: '',
    productType: 'Road Bike',
    features: [],
    customTags: '',
    isFeatured: false,
    weight: '',
  },

  // 3. Cannondale Synapse — endurance
  {
    imageFolder: 'Cannondale-Synapse-51S-Ult6700-01',
    brand: 'Cannondale',
    model: 'Synapse',
    frameSize: '51',
    sizeLabel: 'S',
    recommendedHeight: '160cm - 168cm OR 5\'3" to 5\'6"',
    colour: 'White Green',
    groupsetDisplay: '6700 Shimano Ultegra, 10 SPD',
    bikeCategory: 'endurance',
    frameMaterial: 'carbon',
    groupsetType: 'mechanical',
    brakeType: 'rim-brakes',
    price: '1449.00',
    compareAtPrice: '',
    cosmetic: '10',
    mechanical: '10',
    description: 'Cannondale Synapse with Shimano Ultegra 2x10 and rim brakes is an ideal choice for beginner riders wanting endurance comfort without losing a fast and responsive road feel. As new, one owner, and hardly ridden.',
    chainring: '50/34',
    cassette: '11-30',
    barWidth: '380',
    stemLength: '60',
    crankLength: '170',
    barModel: 'Cannondale C3 Alloy',
    wheelset: 'Shimano R500 Alloy',
    tyres: 'Bontrager 700x26c',
    saddle: 'NEW Giant Contend',
    upgrades: '',
    partsNew: 'Saddle, Brake pads',
    productType: 'Endurance Bike',
    features: [],
    customTags: '',
    isFeatured: false,
    weight: '',
  },

  // 4. S-Works SL3 — race
  {
    imageFolder: 'SWorks-SL3-52S-SR11-12',
    brand: 'S-Works',
    model: 'SL3',
    frameSize: '52',
    sizeLabel: 'S',
    recommendedHeight: '163cm - 170cm OR 5\'4" to 5\'7"',
    colour: 'Aqua Blue',
    groupsetDisplay: 'Super Record 11 Campagnolo, 11 SPD',
    bikeCategory: 'race',
    frameMaterial: 'carbon',
    groupsetType: 'mechanical',
    brakeType: 'rim-brakes',
    price: '2399.00',
    compareAtPrice: '',
    cosmetic: '10',
    mechanical: '10',
    description: 'S-Works SL3 with Campagnolo Super Record 2x11 and rim brakes is a premium lightweight road bike for intermediate riders wanting a lively race feel and standout high-end spec. One owner, heavily upgraded, and presenting beautifully.',
    chainring: '50/34',
    cassette: '11-28',
    barWidth: '390',
    stemLength: '60',
    crankLength: '170',
    barModel: 'ROVAL Carbon',
    wheelset: 'Roval CL50 Rapide Carbon 50mm',
    tyres: 'Continental GP5000 700x26c',
    saddle: 'Bontrager Verge Comp',
    upgrades: 'Roval Carbon wheelset, Campagnolo SuperRecord Carbon Powermeter Crankset, 3T Carbon seatpost, R8000 Carbon pedals',
    partsNew: '',
    productType: 'Road Bike',
    features: [],
    customTags: '',
    isFeatured: true,
    weight: '7.01',
  },

  // 5. Orbea M40 — road
  {
    imageFolder: 'Orbea-M40-53M-Tia4700-16',
    brand: 'Orbea',
    model: 'M40',
    frameSize: '53',
    sizeLabel: 'M',
    recommendedHeight: '165cm - 170cm OR 5\'5" to 5\'7"',
    colour: 'Grey',
    groupsetDisplay: '4700 Shimano Tiagra, 10 SPD',
    bikeCategory: 'road',
    frameMaterial: 'carbon',
    groupsetType: 'mechanical',
    brakeType: 'rim-brakes',
    price: '2299.00',
    compareAtPrice: '',
    cosmetic: '10',
    mechanical: '10',
    description: 'Orbea M40 with Shimano Tiagra 2x10 and rim brakes is a smooth, confidence-inspiring road bike for intermediate riders wanting modern all-round performance in near-new condition. One-owner bike bought from new.',
    chainring: '50/34',
    cassette: '11-30',
    barWidth: '420',
    stemLength: '100',
    crankLength: '170',
    barModel: 'Orbea Alloy',
    wheelset: 'Axis Sport Alloy',
    tyres: 'Specialized Turbo 700x30c',
    saddle: 'Orbea SR',
    upgrades: 'Axis Sport wheelset',
    partsNew: 'Service',
    productType: 'Road Bike',
    features: [],
    customTags: '',
    isFeatured: false,
    weight: '',
  },

  // 6. Pinarello FP Uno — road
  {
    imageFolder: 'Pinarello-FPUno-53S-1055800-03',
    brand: 'Pinarello',
    model: 'FP Uno',
    frameSize: '53',
    sizeLabel: 'S',
    recommendedHeight: '165cm - 170cm OR 5\'5" to 5\'7"',
    colour: 'Black',
    groupsetDisplay: '5800 Shimano 105, 11 SPD',
    bikeCategory: 'road',
    frameMaterial: 'carbon',
    groupsetType: 'mechanical',
    brakeType: 'rim-brakes',
    price: '1449.00',
    compareAtPrice: '',
    cosmetic: '10',
    mechanical: '10',
    description: 'Pinarello FP Uno with Shimano 105 2x11 and rim brakes is a stylish carbon road bike that suits beginner riders wanting a smooth, confident all-round road feel with standout Italian design. One owner, well cared for.',
    chainring: '50/34',
    cassette: '11-28',
    barWidth: '390',
    stemLength: '60',
    crankLength: '170',
    barModel: 'MOST Alloy',
    wheelset: 'Mavic Askium',
    tyres: 'Pirelli P7 700x26c',
    saddle: 'Prologo Comp',
    upgrades: '',
    partsNew: 'Service, Tyres',
    productType: 'Road Bike',
    features: [],
    customTags: '',
    isFeatured: false,
    weight: '',
  },

  // 7. Specialized Roubaix SL2 — endurance
  {
    imageFolder: 'Specialized-RoubaixSL2-54M-Fce10-17',
    brand: 'Specialized',
    model: 'Roubaix SL2',
    frameSize: '54',
    sizeLabel: 'M',
    recommendedHeight: '170cm - 175cm OR 5\'7" to 5\'9"',
    colour: 'Black Red',
    groupsetDisplay: 'SRAM Force, 10 SPD',
    bikeCategory: 'endurance',
    frameMaterial: 'carbon',
    groupsetType: 'mechanical',
    brakeType: 'rim-brakes',
    price: '1199.00',
    compareAtPrice: '',
    cosmetic: '8',
    mechanical: '8',
    description: 'Specialized Roubaix SL2 with SRAM Force 2x10 and rim brakes is perfect for beginner riders wanting a smoother, more forgiving road bike that still feels quick and engaging. With its endurance-focused geometry, it\'s ideal for longer rides.',
    chainring: '50/34',
    cassette: '11-25',
    barWidth: '400',
    stemLength: '70',
    crankLength: '172.5',
    barModel: 'Specialized Alloy',
    wheelset: 'Fulcrum Quattro',
    tyres: '',
    saddle: 'Specialized Riva',
    upgrades: '',
    partsNew: 'Brake pads, Shift cable, 10spd chain',
    productType: 'Endurance Bike',
    features: [],
    customTags: '',
    isFeatured: false,
    weight: '',
  },

  // 8. Trek Madone SL7 Project One — aero road
  {
    imageFolder: 'Trek-MadoneSL7P1-54M-Ulte8020D-24',
    brand: 'Trek',
    model: 'Madone SL7 Project One',
    frameSize: '54',
    sizeLabel: 'M',
    recommendedHeight: '170cm - 175cm OR 5\'7" to 5\'9"',
    colour: 'Black',
    groupsetDisplay: '8070 Shimano Ultegra Di2, 11 SPD',
    bikeCategory: 'race',
    frameMaterial: 'carbon',
    groupsetType: 'di2',
    brakeType: 'disc-brakes',
    price: '3999.00',
    compareAtPrice: '',
    cosmetic: '8',
    mechanical: '10',
    description: 'Trek Madone SL7 Project One with Shimano Ultegra Di2 2x11 hydraulic disc brakes is built for advanced riders wanting aero speed, premium spec, and a true high-performance road bike with standout presence.',
    chainring: '52/36',
    cassette: '11-28',
    barWidth: '410',
    stemLength: '90',
    crankLength: '172.5',
    barModel: 'Bontrager Elite Aero Carbon Fiber',
    wheelset: 'Bontrager AEOLUS PRO 5 Carbon 50mm',
    tyres: 'Pirelli P Zero Race 4S 700x28c',
    saddle: 'Bontrager Montrose Elite',
    upgrades: 'Dura-Ace Crankset',
    partsNew: 'Service, Tyre sealant',
    productType: 'Road Bike',
    features: ['aero'],
    customTags: '',
    isFeatured: true,
    weight: '',
  },

  // 9. Trek Emonda SL 6 — road
  {
    imageFolder: 'Trek-EmondaSL6-54M-Ulte8070D-04',
    brand: 'Trek',
    model: 'Emonda SL 6',
    frameSize: '54',
    sizeLabel: 'M',
    recommendedHeight: '170cm - 175cm OR 5\'7" to 5\'9"',
    colour: 'Grey',
    groupsetDisplay: '8070 Shimano Ultegra Di2, 11 SPD',
    bikeCategory: 'road',
    frameMaterial: 'carbon',
    groupsetType: 'di2',
    brakeType: 'disc-brakes',
    price: '3299.00',
    compareAtPrice: '',
    cosmetic: '9',
    mechanical: '9',
    description: 'Trek Emonda SL 6 with Shimano Ultegra Di2 2x11 hydraulic disc brakes is made for intermediate riders who love a light, responsive bike that feels at home on climbs and spirited bunch rides. A fantastic all-rounder.',
    chainring: '52/36',
    cassette: '11-30',
    barWidth: '410',
    stemLength: '70',
    crankLength: '172.5',
    barModel: 'Bontrager Alloy',
    wheelset: 'Bontrager AEOLUS PRO Carbon 40mm',
    tyres: 'Continental GP5000 700x28c',
    saddle: 'Bontrager Aeolus Comp',
    upgrades: 'Bontrager AEOLUS PRO Carbon 40mm',
    partsNew: 'Brake bleed',
    productType: 'Road Bike',
    features: [],
    customTags: '',
    isFeatured: true,
    weight: '',
  },

  // 10. Trek Domane Four Series (Women's) #27
  {
    imageFolder: 'Trek-Domane4-LB-54M-1055700-27',
    brand: 'Trek',
    model: 'Domane Four Series WSD',
    frameSize: '54',
    sizeLabel: 'M',
    recommendedHeight: '170cm - 175cm OR 5\'7" to 5\'9"',
    colour: '',
    groupsetDisplay: '5700 Shimano 105, 10 SPD',
    bikeCategory: 'endurance',
    frameMaterial: 'carbon',
    groupsetType: 'mechanical',
    brakeType: 'rim-brakes',
    price: '1299.00',
    compareAtPrice: '',
    cosmetic: '10',
    mechanical: '10',
    description: 'Trek Domane Four Series with Shimano 105 2x10 and rim brakes is perfect for beginner riders wanting comfort, confidence, and a near-new endurance road bike. As new condition, one owner.',
    chainring: '50/34',
    cassette: '11-30',
    barWidth: '400',
    stemLength: '70',
    crankLength: '172.5',
    barModel: 'Bontrager Alloy',
    wheelset: 'Bontrager Alloy',
    tyres: 'Bontrager 700x25c',
    saddle: 'Bontrager',
    upgrades: '',
    partsNew: 'Bartape, brake pads',
    productType: 'Endurance Bike',
    features: [],
    customTags: '',
    isFeatured: false,
    weight: '',
  },

  // 11. Trek Domane Four Series (Women's) #28
  {
    imageFolder: 'Trek-Domane4-LB-54M-1055700-28',
    brand: 'Trek',
    model: 'Domane Four Series WSD',
    frameSize: '54',
    sizeLabel: 'M',
    recommendedHeight: '170cm - 175cm OR 5\'7" to 5\'9"',
    colour: '',
    groupsetDisplay: '5700 Shimano 105, 10 SPD',
    bikeCategory: 'endurance',
    frameMaterial: 'carbon',
    groupsetType: 'mechanical',
    brakeType: 'rim-brakes',
    price: '1299.00',
    compareAtPrice: '',
    cosmetic: '10',
    mechanical: '10',
    description: 'Trek Domane Four Series with Shimano 105 2x10 and rim brakes is perfect for beginner riders wanting a smooth, confidence-inspiring endurance road bike for longer rides and relaxed road miles. As new condition, one owner.',
    chainring: '50/34',
    cassette: '11-30',
    barWidth: '400',
    stemLength: '70',
    crankLength: '172.5',
    barModel: 'Bontrager Alloy',
    wheelset: 'Bontrager Alloy',
    tyres: 'Bontrager 700x25c',
    saddle: 'Bontrager',
    upgrades: '',
    partsNew: 'Bartape, brake pads',
    productType: 'Endurance Bike',
    features: [],
    customTags: '',
    isFeatured: false,
    weight: '',
  },

  // 12. Dedacciai Scuro 25 — road
  {
    imageFolder: 'Dedacciai-Scuro25-54M-DA9120D-29',
    brand: 'Dedacciai',
    model: 'Scuro 25',
    frameSize: '54',
    sizeLabel: 'M',
    recommendedHeight: '170cm - 175cm OR 5\'7" to 5\'9"',
    colour: 'Silver Black',
    groupsetDisplay: '9120 Shimano Dura-Ace, 11 SPD',
    bikeCategory: 'road',
    frameMaterial: 'carbon',
    groupsetType: 'mechanical',
    brakeType: 'disc-brakes',
    price: '3999.00',
    compareAtPrice: '',
    cosmetic: '10',
    mechanical: '10',
    description: 'Dedacciai Scuro 25 with Shimano Dura-Ace 2x11 hydraulic disc brakes is built for advanced riders wanting something rare, beautifully specified, and fast on every kind of road. One-owner bike bought from new.',
    chainring: '52/36',
    cassette: '11-28',
    barWidth: '420',
    stemLength: '100',
    crankLength: '172.5',
    barModel: 'Alanera Dedacciai',
    wheelset: 'Carbon URSUS C50 Disc',
    tyres: 'Continental GP5000 700x28c',
    saddle: 'San Marco',
    upgrades: 'Dedacciai Carbon bottle cages, Garmin Vector pedals',
    partsNew: 'Brake Bleed, Bar Tape, Inner Tubes',
    productType: 'Road Bike',
    features: [],
    customTags: '',
    isFeatured: true,
    weight: '',
  },

  // 13. Focus Cayo — road
  {
    imageFolder: 'Focus-Cayo-54M-1057020D-05',
    brand: 'Focus',
    model: 'Cayo',
    frameSize: '54',
    sizeLabel: 'M',
    recommendedHeight: '170cm - 175cm OR 5\'7" to 5\'9"',
    colour: 'Black Red',
    groupsetDisplay: '7020 Shimano 105, 11 SPD',
    bikeCategory: 'road',
    frameMaterial: 'carbon',
    groupsetType: 'mechanical',
    brakeType: 'disc-brakes',
    price: '1999.00',
    compareAtPrice: '',
    cosmetic: '8',
    mechanical: '8',
    description: 'Focus Cayo with Shimano 105 2x11 hydraulic disc brakes is a great choice for beginner riders wanting a dependable carbon road bike with a balanced, all-round feel. One-owner bike that has been regularly serviced.',
    chainring: '52/36',
    cassette: '11-28',
    barWidth: '410',
    stemLength: '100',
    crankLength: '172.5',
    barModel: 'Focus Alloy',
    wheelset: 'DT Swiss R522DB Alloy',
    tyres: 'Continental GP4000 700x28c',
    saddle: 'Focus',
    upgrades: 'Shimano RS550 Cleat pedals',
    partsNew: 'Chain, Bartape',
    productType: 'Road Bike',
    features: [],
    customTags: '',
    isFeatured: false,
    weight: '',
  },

  // 14. Trek Madone Seven Series — aero road
  {
    imageFolder: 'Trek-Madone7Series-54M-DA9000-06',
    brand: 'Trek',
    model: 'Madone Seven Series',
    frameSize: '54',
    sizeLabel: 'M',
    recommendedHeight: '170cm - 175cm OR 5\'7" to 5\'9"',
    colour: 'White Blue',
    groupsetDisplay: '9000 Shimano Dura-Ace, 11 SPD',
    bikeCategory: 'race',
    frameMaterial: 'carbon',
    groupsetType: 'mechanical',
    brakeType: 'rim-brakes',
    price: '1799.00',
    compareAtPrice: '',
    cosmetic: '8',
    mechanical: '10',
    description: 'Trek Madone Seven Series with Shimano Dura-Ace 2x11 and rim brakes is built for beginner riders who love a fast, aero race bike with a premium road feel. With strong mechanical presentation, it\'s an excellent entry into high-end road cycling.',
    chainring: '53/39',
    cassette: '11-25',
    barWidth: '400',
    stemLength: '70',
    crankLength: '172.5',
    barModel: '3T Ergo Carbon',
    wheelset: 'TokyoWheel Epic Carbon 60mm',
    tyres: 'Bontrager 700x23c',
    saddle: 'Giant Contend SL',
    upgrades: '3T Ergonova Carbon cockpit',
    partsNew: 'Inner shift & brake cables, Outer shift & brake cables, 11spd chain, tyres, saddle, brake pads, bartape, (full strip & rebuild)',
    productType: 'Road Bike',
    features: ['aero'],
    customTags: '',
    isFeatured: false,
    weight: '',
  },

  // 15. Bianchi Sempre — road
  {
    imageFolder: 'Bianchi-Sempre-55L-Vel10-07',
    brand: 'Bianchi',
    model: 'Sempre',
    frameSize: '55',
    sizeLabel: 'L',
    recommendedHeight: '175cm - 180cm OR 5\'9" to 5\'11"',
    colour: 'Aqua Blue',
    groupsetDisplay: 'Veloce 10 Campagnolo, 10 SPD',
    bikeCategory: 'road',
    frameMaterial: 'carbon',
    groupsetType: 'mechanical',
    brakeType: 'rim-brakes',
    price: '1299.00',
    compareAtPrice: '',
    cosmetic: '10',
    mechanical: '9',
    description: 'Bianchi Sempre with Campagnolo Veloce 2x10 and rim brakes is built for beginner riders wanting classic Bianchi style with a fast, race-inspired road feel. Barely used and presenting beautifully, trade-in bike.',
    chainring: '53/39',
    cassette: '11-26',
    barWidth: '400',
    stemLength: '100',
    crankLength: '175',
    barModel: 'Bianchi Corso Alloy',
    wheelset: 'Reparto Corso Alloy',
    tyres: 'Pirelli P7 700x26c',
    saddle: 'San Marco',
    upgrades: '',
    partsNew: 'Bartape, New 10spd chain, brake pads, tyres, inner tubes',
    productType: 'Road Bike',
    features: [],
    customTags: '',
    isFeatured: false,
    weight: '',
  },

  // 16. Trek Domane Series 4 (Di2) — endurance
  {
    imageFolder: 'Trek-Madone4-56L-Ulte6870-55',
    brand: 'Trek',
    model: 'Domane Series 4',
    frameSize: '55',
    sizeLabel: 'M/L',
    recommendedHeight: '173cm - 178cm OR 5\'8" to 5\'10"',
    colour: 'Red White',
    groupsetDisplay: '6870 Shimano Ultegra Di2, 11 SPD',
    bikeCategory: 'endurance',
    frameMaterial: 'carbon',
    groupsetType: 'di2',
    brakeType: 'rim-brakes',
    price: '1499.00',
    compareAtPrice: '',
    cosmetic: '10',
    mechanical: '10',
    description: 'Trek Domane Series 4 with Shimano Ultegra Di2 2x11 and rim brakes is perfect for beginner riders wanting a smooth, comfortable carbon road bike with premium electronic shifting. One-owner bike with full service history.',
    chainring: '50/34',
    cassette: '11-26',
    barWidth: '410',
    stemLength: '80',
    crankLength: '172.5',
    barModel: 'Bontrager Comp Alloy',
    wheelset: 'Bontrager RL Comp Alloy',
    tyres: 'Bontrager Comp 700x26c',
    saddle: 'Bontrager Nitro',
    upgrades: '',
    partsNew: 'Bartape, Chain, brake pads',
    productType: 'Endurance Bike',
    features: [],
    customTags: '',
    isFeatured: false,
    weight: '',
  },

  // 17. Giant Defy Advanced 2 Disc — endurance
  {
    imageFolder: 'Giant-DefyAdvanced2Disc-55ML-1055800CD-08',
    brand: 'Giant',
    model: 'Defy Advanced 2 Disc',
    frameSize: '55',
    sizeLabel: 'M/L',
    recommendedHeight: '173cm - 178cm OR 5\'8" to 5\'10"',
    colour: 'White Black',
    groupsetDisplay: '5800 Shimano 105, 11 SPD',
    bikeCategory: 'endurance',
    frameMaterial: 'carbon',
    groupsetType: 'mechanical',
    brakeType: 'disc-brakes',
    price: '1999.00',
    compareAtPrice: '',
    cosmetic: '10',
    mechanical: '10',
    description: 'Giant Defy Advanced 2 Disc with Shimano 105 2x11 cable disc brakes is ideal for beginner riders wanting endurance comfort, confident braking, and a smooth, efficient road bike for longer days in the saddle.',
    chainring: '50/34',
    cassette: '11-30',
    barWidth: '420',
    stemLength: '90',
    crankLength: '172.5',
    barModel: 'Giant Concept Alloy',
    wheelset: 'Giant PR-2 Disc',
    tyres: 'Continental Gatorskin 700x25c',
    saddle: 'New Giant Contend',
    upgrades: '',
    partsNew: 'Saddle',
    productType: 'Endurance Bike',
    features: [],
    customTags: '',
    isFeatured: false,
    weight: '',
  },

  // 18. Giant Revolt Advanced — gravel
  {
    imageFolder: 'Giant-RevoltAdvanced-55ML-Apex1x12D-09',
    brand: 'Giant',
    model: 'Revolt Advanced',
    frameSize: '55',
    sizeLabel: 'M/L',
    recommendedHeight: '173cm - 178cm OR 5\'8" to 5\'10"',
    colour: 'Purple',
    groupsetDisplay: 'SRAM Apex, 1x12 SPD',
    bikeCategory: 'road',
    frameMaterial: 'carbon',
    groupsetType: 'mechanical',
    brakeType: 'disc-brakes',
    price: '2499.00',
    compareAtPrice: '',
    cosmetic: '10',
    mechanical: '10',
    description: 'Giant Revolt Advanced with SRAM Apex 1x12 hydraulic disc brakes is perfect for intermediate riders wanting a versatile gravel bike that feels quick on the road, confident on mixed terrain, and ready for adventure.',
    chainring: '40',
    cassette: '11-44',
    barWidth: '440',
    stemLength: '80',
    crankLength: '172.5',
    barModel: 'Giant Contact XR D-Fuse',
    wheelset: 'Giant P-X2 Disc',
    tyres: 'Giant Crosscut Grip 700x45c Tubeless',
    saddle: 'Giant Approach',
    upgrades: '',
    partsNew: 'Bartape',
    productType: 'Gravel Bike',
    features: [],
    customTags: 'gravel',
    isFeatured: false,
    weight: '',
  },

  // 19. Colnago C68 — race
  {
    imageFolder: 'Colnago-C68-55ML-DA9170D-33',
    brand: 'Colnago',
    model: 'C68',
    frameSize: '55',
    sizeLabel: 'M/L',
    recommendedHeight: '173cm - 178cm OR 5\'8" to 5\'10"',
    colour: '',
    groupsetDisplay: '9170 Shimano Dura-Ace Di2, 11 SPD',
    bikeCategory: 'race',
    frameMaterial: 'carbon',
    groupsetType: 'di2',
    brakeType: 'disc-brakes',
    price: '12499.00',
    compareAtPrice: '',
    cosmetic: '10',
    mechanical: '10',
    description: 'Colnago C68 with Shimano Dura-Ace Di2 2x11 hydraulic disc brakes is built for advanced and pro-level riders wanting one of the most prestigious carbon road bikes on the market in true showroom condition.',
    chainring: '52/36',
    cassette: '11-30',
    barWidth: '410',
    stemLength: '60',
    crankLength: '170',
    barModel: 'Colnago Carbon Aero Cockpit',
    wheelset: 'ZIPP 303 Firecrest Carbon',
    tyres: 'Specialized Turbo 700x30c',
    saddle: 'Specialized PowerComp',
    upgrades: 'Dura-Ace Power Meter crankset',
    partsNew: '',
    productType: 'Road Bike',
    features: [],
    customTags: '',
    isFeatured: true,
    weight: '',
  },

  // 20. S-Works Shiv — triathlon
  {
    imageFolder: 'SWorks-Shiv-56L-Red10-47',
    brand: 'S-Works',
    model: 'Shiv',
    frameSize: '56',
    sizeLabel: 'L',
    recommendedHeight: '175cm - 180cm OR 5\'9" to 5\'11"',
    colour: '',
    groupsetDisplay: 'SRAM Red, 10 SPD',
    bikeCategory: 'triathlon',
    frameMaterial: 'carbon',
    groupsetType: 'mechanical',
    brakeType: 'rim-brakes',
    price: '1799.00',
    compareAtPrice: '',
    cosmetic: '10',
    mechanical: '10',
    description: 'S-Works Shiv with SRAM Red 2x10 and rim brakes is built for beginner riders chasing pure speed in triathlon and time-trial events. With its aggressive aerodynamic design and exceptional presentation, it\'s a standout TT machine.',
    chainring: '53/39',
    cassette: '11-25',
    barWidth: '400',
    stemLength: '90',
    crankLength: '175',
    barModel: 'Profile Design Carbon Cockpit',
    wheelset: 'Fulcrum Racing 1',
    tyres: 'Pirelli PZero 700x26c',
    saddle: 'Specialized TT',
    upgrades: 'Shiv onboard hydration bladder',
    partsNew: 'Bartape, Tyres, Tubes',
    productType: 'Triathlon Bike',
    features: ['aero'],
    customTags: '',
    isFeatured: false,
    weight: '',
  },

  // 21. Trek Domane (105 Disc) — endurance
  {
    imageFolder: 'Trek-Domane-56L-1057020D-48',
    brand: 'Trek',
    model: 'Domane',
    frameSize: '56',
    sizeLabel: 'L',
    recommendedHeight: '175cm - 180cm OR 5\'9" to 5\'11"',
    colour: 'Grey Red',
    groupsetDisplay: '7020 Shimano 105, 11 SPD',
    bikeCategory: 'endurance',
    frameMaterial: 'carbon',
    groupsetType: 'mechanical',
    brakeType: 'disc-brakes',
    price: '2299.00',
    compareAtPrice: '',
    cosmetic: '9',
    mechanical: '9',
    description: 'Trek Domane with Shimano 105 2x11 hydraulic disc brakes is perfect for intermediate riders wanting comfort, confidence, and modern disc-brake control without losing that fast road-bike feel. A brilliant all-rounder.',
    chainring: '52/36',
    cassette: '11-32',
    barWidth: '410',
    stemLength: '80',
    crankLength: '175',
    barModel: 'Bontrager Alloy',
    wheelset: 'Bontrager TLR Alloy',
    tyres: 'Continental GP5000 700x28c',
    saddle: 'Bontrager Nitro',
    upgrades: '',
    partsNew: 'Bartape, Shimano 11spd chain, brake pads',
    productType: 'Endurance Bike',
    features: [],
    customTags: '',
    isFeatured: false,
    weight: '',
  },

  // 22. Boardman Time Trial TTE — triathlon
  {
    imageFolder: 'Boardman-TT-56L-Ulte8050-49',
    brand: 'Boardman',
    model: 'Time Trial TTE',
    frameSize: '56',
    sizeLabel: 'L',
    recommendedHeight: '175cm - 180cm OR 5\'9" to 5\'11"',
    colour: 'Black Silver',
    groupsetDisplay: '8050 Shimano Ultegra Di2, 11 SPD',
    bikeCategory: 'triathlon',
    frameMaterial: 'carbon',
    groupsetType: 'di2',
    brakeType: 'rim-brakes',
    price: '2499.00',
    compareAtPrice: '',
    cosmetic: '9',
    mechanical: '10',
    description: 'Boardman Time Trial TTE with Shimano Ultegra Di2 2x11 and rim brakes is built for intermediate riders wanting an aerodynamic setup with premium electronic shifting and genuine race-day capability. One owner.',
    chainring: '52/36',
    cassette: '11-26',
    barWidth: '400',
    stemLength: '80',
    crankLength: '175',
    barModel: 'TTE Carbon Aero Cockpit',
    wheelset: 'Boardman ELITE NINE Aero',
    tyres: 'Continental GP5000 700x25c',
    saddle: 'Andiamo TT SL',
    upgrades: 'Dura-Ace 11 speed crankset',
    partsNew: '',
    productType: 'Triathlon Bike',
    features: ['aero'],
    customTags: '',
    isFeatured: false,
    weight: '',
  },

  // 23. Focus Izalco MAX 9.9 — race
  {
    imageFolder: 'Focus-Izalco-56L-DA9170D-50',
    brand: 'Focus',
    model: 'Izalco MAX 9.9',
    frameSize: '56',
    sizeLabel: 'L',
    recommendedHeight: '175cm - 180cm OR 5\'9" to 5\'11"',
    colour: 'Silver',
    groupsetDisplay: '9170 Shimano Dura-Ace Di2, 11 SPD',
    bikeCategory: 'race',
    frameMaterial: 'carbon',
    groupsetType: 'di2',
    brakeType: 'disc-brakes',
    price: '4249.00',
    compareAtPrice: '',
    cosmetic: '10',
    mechanical: '10',
    description: 'Focus Izalco MAX 9.9 with Shimano Dura-Ace Di2 2x11 hydraulic disc brakes is built for advanced riders wanting top-tier road performance with a light, sharp, race-ready feel. In exceptional condition.',
    chainring: '52/36',
    cassette: '11-28',
    barWidth: '420',
    stemLength: '90',
    crankLength: '172.5',
    barModel: 'Easton Carbon Cockpit',
    wheelset: 'DT Swiss ARC 1450 48mm',
    tyres: 'Pirelli PZero 700x28c',
    saddle: 'ProLogo PAS',
    upgrades: '',
    partsNew: 'Service, Tyres, Tubes',
    productType: 'Road Bike',
    features: [],
    customTags: '',
    isFeatured: true,
    weight: '',
  },

  // 24. Merida Scultura 5000 (Dark Grey) — road
  {
    imageFolder: 'Merida-Scultura5000-56L-Ulte8020D-10',
    brand: 'Merida',
    model: 'Scultura 5000',
    frameSize: '56',
    sizeLabel: 'L',
    recommendedHeight: '175cm - 180cm OR 5\'9" to 5\'11"',
    colour: 'Dark Grey',
    groupsetDisplay: '8020 Shimano Ultegra, 11 SPD',
    bikeCategory: 'road',
    frameMaterial: 'carbon',
    groupsetType: 'mechanical',
    brakeType: 'disc-brakes',
    price: '2399.00',
    compareAtPrice: '',
    cosmetic: '10',
    mechanical: '10',
    description: 'Merida Scultura 5000 with Shimano Ultegra 2x11 hydraulic disc brakes is perfect for intermediate riders wanting a lightweight, fast carbon road bike that climbs beautifully and still feels smooth and stable on longer rides.',
    chainring: '52/36',
    cassette: '11-28',
    barWidth: '430',
    stemLength: '100',
    crankLength: '175',
    barModel: 'Merida Alloy',
    wheelset: 'Fulcrum Racing Tubeless',
    tyres: 'Continental GP5000 700x28c',
    saddle: 'ProLogo PAS',
    upgrades: 'Shimano R8000 Carbon Cleat pedals',
    partsNew: 'Bartape',
    productType: 'Road Bike',
    features: [],
    customTags: '',
    isFeatured: false,
    weight: '',
  },

  // 25. Merida Scultura 5000 (Cream) — road
  {
    imageFolder: 'Merida-Scultura5000-56L-Ulte8020D-52',
    brand: 'Merida',
    model: 'Scultura 5000',
    frameSize: '56',
    sizeLabel: 'L',
    recommendedHeight: '175cm - 180cm OR 5\'9" to 5\'11"',
    colour: 'Cream',
    groupsetDisplay: '8020 Shimano Ultegra, 11 SPD',
    bikeCategory: 'road',
    frameMaterial: 'carbon',
    groupsetType: 'mechanical',
    brakeType: 'disc-brakes',
    price: '2149.00',
    compareAtPrice: '',
    cosmetic: '',
    mechanical: '',
    description: 'Merida Scultura 5000 with Shimano Ultegra 2x11 hydraulic disc brakes is built for intermediate riders who want strong climbing performance, quick acceleration, and a smooth all-round ride feel.',
    chainring: '52/36',
    cassette: '11-28',
    barWidth: '430',
    stemLength: '100',
    crankLength: '175',
    barModel: 'Merida Alloy',
    wheelset: 'Merida Expert Alloy',
    tyres: 'Continental Gatorskin 700x28c',
    saddle: 'Merida X-Comp',
    upgrades: '',
    partsNew: 'Bartape',
    productType: 'Road Bike',
    features: [],
    customTags: '',
    isFeatured: false,
    weight: '',
  },

  // 26. Merida Scultura 5000 (White) — road
  {
    imageFolder: 'Merida-Scultura5000-56L-Ulte8020D-53',
    brand: 'Merida',
    model: 'Scultura 5000',
    frameSize: '56',
    sizeLabel: 'L',
    recommendedHeight: '175cm - 180cm OR 5\'9" to 5\'11"',
    colour: 'White',
    groupsetDisplay: '8020 Shimano Ultegra, 11 SPD',
    bikeCategory: 'road',
    frameMaterial: 'carbon',
    groupsetType: 'mechanical',
    brakeType: 'disc-brakes',
    price: '2249.00',
    compareAtPrice: '',
    cosmetic: '9',
    mechanical: '9',
    description: 'Merida Scultura 5000 with Shimano Ultegra 2x11 hydraulic disc brakes is built for intermediate riders wanting a lively, lightweight road bike that feels quick on climbs and beautifully balanced on longer rides.',
    chainring: '52/36',
    cassette: '11-28',
    barWidth: '430',
    stemLength: '100',
    crankLength: '175',
    barModel: 'Merida Alloy',
    wheelset: 'Fulcrum Racing Tubeless',
    tyres: 'Maxxis Re-Fuse 700x28c',
    saddle: 'Merida X-Comp',
    upgrades: 'NEW Shimano Crankset',
    partsNew: 'Bartape',
    productType: 'Road Bike',
    features: [],
    customTags: '',
    isFeatured: false,
    weight: '',
  },

  // 27. Cervelo S3 Triathlon — triathlon
  {
    imageFolder: 'Cervelo-S3-56L-Ulte6870-57',
    brand: 'Cervelo',
    model: 'S3 Triathlon',
    frameSize: '56',
    sizeLabel: 'L',
    recommendedHeight: '175cm - 180cm OR 5\'9" to 5\'11"',
    colour: 'Red',
    groupsetDisplay: '6870 Shimano Ultegra Di2, 11 SPD',
    bikeCategory: 'triathlon',
    frameMaterial: 'carbon',
    groupsetType: 'di2',
    brakeType: 'rim-brakes',
    price: '2699.00',
    compareAtPrice: '',
    cosmetic: '10',
    mechanical: '10',
    description: 'Cervelo S3 Triathlon with Shimano Ultegra Di2 2x11 and rim brakes is made for intermediate riders who love aero speed, sharp handling, and a true race-bike feel. One owner and in exceptional condition.',
    chainring: '52/36',
    cassette: '11-26',
    barWidth: '410',
    stemLength: '90',
    crankLength: '175',
    barModel: '3T Alloy Comp',
    wheelset: 'Zipp 303s Carbon (alloy braking surface)',
    tyres: 'Continental GP4000 700x25c',
    saddle: 'Selle TT',
    upgrades: 'Profile Design Carbon TT Bars',
    partsNew: 'Bartape',
    productType: 'Triathlon Bike',
    features: ['aero'],
    customTags: '',
    isFeatured: false,
    weight: '',
  },

  // 28. Scott Addict RC PRO — race
  {
    imageFolder: 'Scott-AddictRCPRO-56L-Ulte8170D-11',
    brand: 'Scott',
    model: 'Addict RC PRO',
    frameSize: '56',
    sizeLabel: 'L',
    recommendedHeight: '175cm - 180cm OR 5\'9" to 5\'11"',
    colour: 'Black Blue',
    groupsetDisplay: '8170 Shimano Ultegra Di2, 12 SPD',
    bikeCategory: 'race',
    frameMaterial: 'carbon',
    groupsetType: 'di2',
    brakeType: 'disc-brakes',
    price: '4999.00',
    compareAtPrice: '',
    cosmetic: '10',
    mechanical: '10',
    description: 'Scott Addict RC Pro with Shimano Ultegra Di2 2x12 hydraulic disc brakes is built for advanced and pro-level riders wanting a premium lightweight race bike with explosive acceleration, crisp handling, and top-tier spec.',
    chainring: '52/36',
    cassette: '11-28',
    barWidth: '410',
    stemLength: '80',
    crankLength: '175',
    barModel: 'Combo Syncros Creston iC SL Carbon',
    wheelset: 'Carbon Syncros Capital 1.0 40mm',
    tyres: 'Pirelli PZero 700x30c',
    saddle: 'Syncros Tofino Regular 2.0 Channel',
    upgrades: '4iii Power meter crankset',
    partsNew: 'Ultegra Front Derailleur, 12Spd Shimano Chain, 12Spd 11-30 Cassette, Tyres, Bartape, Brake pads',
    productType: 'Road Bike',
    features: [],
    customTags: '',
    isFeatured: true,
    weight: '7.8',
  },

  // 29. Cervelo S2 — aero road
  {
    imageFolder: 'Cervelo-S2-56L-1057000-12',
    brand: 'Cervelo',
    model: 'S2',
    frameSize: '56',
    sizeLabel: 'L',
    recommendedHeight: '175cm - 180cm OR 5\'9" to 5\'11"',
    colour: 'Black Blue',
    groupsetDisplay: '7000 Shimano 105, 11 SPD',
    bikeCategory: 'road',
    frameMaterial: 'carbon',
    groupsetType: 'mechanical',
    brakeType: 'rim-brakes',
    price: '2299.00',
    compareAtPrice: '',
    cosmetic: '9',
    mechanical: '10',
    description: 'Cervelo S2 with Shimano 105 2x11 and rim brakes is perfect for beginner riders wanting an aero road bike that feels fast on the flats, direct under power, and beautifully suited to spirited bunch riding.',
    chainring: '52/36',
    cassette: '11-28',
    barWidth: '410',
    stemLength: '60',
    crankLength: '175',
    barModel: 'Concept Alloy',
    wheelset: 'SuperTeam 50mm Carbon',
    tyres: 'Continental Gatorskin 700x28c',
    saddle: 'Adamo TT',
    upgrades: 'SuperTeam Carbon 50mm',
    partsNew: '',
    productType: 'Road Bike',
    features: ['aero'],
    customTags: '',
    isFeatured: false,
    weight: '',
  },

  // 30. Boardman AIR TT 9.0 Elite — triathlon
  {
    imageFolder: 'Boardman-AIRTT9Elite-56ML-Rvl10-13',
    brand: 'Boardman',
    model: 'AIR TT 9.0 Elite',
    frameSize: '56',
    sizeLabel: 'M/L',
    recommendedHeight: '173cm - 178cm OR 5\'8" to 5\'10"',
    colour: 'Red Yellow',
    groupsetDisplay: 'SRAM Rival, 10 SPD',
    bikeCategory: 'triathlon',
    frameMaterial: 'carbon',
    groupsetType: 'mechanical',
    brakeType: 'rim-brakes',
    price: '1199.00',
    compareAtPrice: '',
    cosmetic: '9',
    mechanical: '8',
    description: 'Boardman AIR TT 9.0 Elite with SRAM Rival 2x10 and rim brakes is a great entry-level TT bike for beginner riders wanting an aerodynamic setup that makes getting into time trialling or triathlon simple and accessible.',
    chainring: '52/36',
    cassette: '11-25',
    barWidth: '400',
    stemLength: '70',
    crankLength: '175',
    barModel: 'Vision Carbon',
    wheelset: 'Mavic Ksyrium SL Elite',
    tyres: 'Continental Gatorskin 700x25c',
    saddle: 'Prologo SL',
    upgrades: 'Mavic Ksyrium SL',
    partsNew: 'Bartape, Cassette, 10 Speed chain, Brake pads, Pedals',
    productType: 'Triathlon Bike',
    features: ['aero'],
    customTags: '',
    isFeatured: false,
    weight: '',
  },

  // 31. Specialized SL2 — road
  {
    imageFolder: 'Specialized-SL2-58XL-1055700-69',
    brand: 'Specialized',
    model: 'SL2',
    frameSize: '58',
    sizeLabel: 'XL',
    recommendedHeight: '180cm - 185cm OR 5\'11" to 6\'1"',
    colour: 'White',
    groupsetDisplay: '5700 Shimano 105, 10 SPD',
    bikeCategory: 'road',
    frameMaterial: 'carbon',
    groupsetType: 'mechanical',
    brakeType: 'rim-brakes',
    price: '1349.00',
    compareAtPrice: '',
    cosmetic: '10',
    mechanical: '10',
    description: 'Specialized SL2 with Shimano 105 2x10 and rim brakes is a beautifully presented lightweight road bike that suits beginner riders wanting a responsive performance feel with minimal wear. One owner with low kilometres.',
    chainring: '52/36',
    cassette: '11-26',
    barWidth: '410',
    stemLength: '100',
    crankLength: '175',
    barModel: 'Specialized Comp Alloy',
    wheelset: 'Axis Alloy',
    tyres: 'Bontrager 700x26c',
    saddle: 'Specialized Romia',
    upgrades: '',
    partsNew: '',
    productType: 'Road Bike',
    features: [],
    customTags: '',
    isFeatured: false,
    weight: '',
  },

  // 32. Trek Madone Series 6 — aero road
  {
    imageFolder: 'Trek-MadoneSeries6-56L-Red10-16',
    brand: 'Trek',
    model: 'Madone Series 6',
    frameSize: '56',
    sizeLabel: 'L',
    recommendedHeight: '175cm - 180cm OR 5\'9" to 5\'11"',
    colour: 'Orange White',
    groupsetDisplay: 'SRAM Red, 10 SPD',
    bikeCategory: 'race',
    frameMaterial: 'carbon',
    groupsetType: 'mechanical',
    brakeType: 'rim-brakes',
    price: '1499.00',
    compareAtPrice: '',
    cosmetic: '8',
    mechanical: '9',
    description: 'Trek Madone Series 6 with SRAM Red 2x10 and rim brakes is made for beginner riders who enjoy a fast aero road bike with sharp handling and genuine race-bike character. This one suits an enthusiast wanting a high-end frame at a great price.',
    chainring: '52/36',
    cassette: '11-25',
    barWidth: '400',
    stemLength: '70',
    crankLength: '175',
    barModel: 'Bontrager Alloy',
    wheelset: 'Bontrager R1 Alloy',
    tyres: 'Bontrager 700x26c',
    saddle: 'New Giant Contend',
    upgrades: '',
    partsNew: 'Brake pads, Shifter hoods, Bartape, Saddle',
    productType: 'Road Bike',
    features: ['aero'],
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

  // Upgrades
  if (bike.upgrades) {
    lines.push('')
    lines.push('Upgrades:')
    bike.upgrades.split(',').forEach((u) => {
      const trimmed = u.trim()
      if (trimmed) lines.push(`- ${trimmed}`)
    })
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
  console.log(`Bicycles2U Bulk Upload BATCH 2 — ${bikesToProcess.length} of ${BIKES.length} bikes`)
  console.log(isDryRun ? 'MODE: DRY RUN (no uploads)' : 'MODE: LIVE UPLOAD')
  console.log(`Image source: ${IMAGE_BASE}`)
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
      console.log(`  Frame: ${bike.frameSize}cm (${bike.sizeLabel})`)
      console.log(`  Colour: ${bike.colour || '(not specified)'}`)
      console.log(`  Images: ${imagePaths.length} files`)
      console.log(`  Tags: ${allTags.join(', ')}`)
      console.log(`  Type: ${bike.productType}`)
      if (bike.upgrades) console.log(`  Upgrades: ${bike.upgrades}`)
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
