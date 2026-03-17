#!/usr/bin/env npx tsx
// scripts/check-duplicates.ts
// Pull all products from Shopify and check for duplicates against batch 2 manifest

import * as path from 'path'
import dotenv from 'dotenv'

dotenv.config({ path: path.resolve(__dirname, '../.env.local') })
dotenv.config({ path: path.resolve(__dirname, '../.env') })

async function main() {
  const { getProducts } = await import('../lib/shopify/index')

  console.log('Fetching all products from Shopify...\n')

  // Fetch up to 250 products (pagination if needed)
  let allProducts: { title: string; handle: string; vendor: string }[] = []
  const products = await getProducts(250)
  allProducts = products.map((p) => ({
    title: p.title,
    handle: p.handle,
    vendor: p.vendor,
  }))

  console.log(`Found ${allProducts.length} products on Shopify:\n`)
  allProducts.forEach((p, i) => {
    console.log(`  ${i + 1}. ${p.title} (${p.vendor}) — ${p.handle}`)
  })

  // Batch 2 bikes (titles as they'd be generated)
  const batch2Titles = [
    'Giant Defy WSD — 48cm',
    'Merida Scultura 6000 — 50cm',
    'Cannondale Synapse — 51cm',
    'S-Works SL3 — 52cm',
    'Orbea M40 — 53cm',
    'Pinarello FP Uno — 53cm',
    'Specialized Roubaix SL2 — 54cm',
    'Trek Madone SL7 Project One — 54cm',
    'Trek Emonda SL 6 — 54cm',
    'Trek Domane Four Series WSD — 54cm', // #27
    'Trek Domane Four Series WSD — 54cm', // #28
    'Dedacciai Scuro 25 — 54cm',
    'Focus Cayo — 54cm',
    'Trek Madone Seven Series — 54cm',
    'Bianchi Sempre — 55cm',
    'Trek Domane Series 4 — 55cm',
    'Giant Defy Advanced 2 Disc — 55cm',
    'Giant Revolt Advanced — 55cm',
    'Colnago C68 — 550cm',
    'S-Works Shiv — 56cm',
    'Trek Domane — 56cm',
    'Boardman Time Trial TTE — 56cm',
    'Focus Izalco MAX 9.9 — 56cm',
    'Merida Scultura 5000 — 56cm', // Dark Grey
    'Merida Scultura 5000 — 56cm', // Cream
    'Merida Scultura 5000 — 56cm', // White
    'Cervelo S3 Triathlon — 56cm',
    'Scott Addict RC PRO — 56cm',
    'Cervelo S2 — 56cm',
    'Boardman AIR TT 9.0 Elite — 56cm',
    'Specialized SL2 — 58cm',
    'Trek Madone Series 6 — 56cm',
  ]

  console.log('\n\n=== DUPLICATE CHECK ===\n')

  const shopifyTitlesLower = allProducts.map((p) => p.title.toLowerCase())
  const shopifyHandles = allProducts.map((p) => p.handle)

  let dupeCount = 0
  batch2Titles.forEach((title, i) => {
    const titleLower = title.toLowerCase()
    // Check exact match
    const exactMatch = shopifyTitlesLower.findIndex((t) => t === titleLower)
    // Check partial match (brand + model without size)
    const partialKey = title.split(' — ')[0].toLowerCase()
    const partialMatches = allProducts.filter((p) =>
      p.title.toLowerCase().includes(partialKey)
    )

    if (exactMatch !== -1) {
      console.log(`  ❌ EXACT DUPLICATE #${i + 1}: "${title}" matches "${allProducts[exactMatch].title}"`)
      dupeCount++
    } else if (partialMatches.length > 0) {
      console.log(`  ⚠️  PARTIAL MATCH #${i + 1}: "${title}" ~ ${partialMatches.map((p) => `"${p.title}"`).join(', ')}`)
    } else {
      console.log(`  ✅ NEW #${i + 1}: "${title}"`)
    }
  })

  console.log(`\n${dupeCount} exact duplicates found.`)
  if (dupeCount > 0) {
    console.log('⚠️  Remove duplicates from batch 2 script before uploading!')
  } else {
    console.log('✅ No duplicates — safe to upload.')
  }
}

main().catch((err) => {
  console.error('Fatal error:', err)
  process.exit(1)
})
