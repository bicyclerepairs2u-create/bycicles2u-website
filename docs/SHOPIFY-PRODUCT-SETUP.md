# Shopify Product Setup Guide

This guide explains how to configure your bikes in Shopify for optimal display on the website, including the Featured Bikes section and Compare functionality.

## Table of Contents

- [Product Tags](#product-tags)
- [Product Fields](#product-fields)
- [Featured Bikes](#featured-bikes)
- [Compare Functionality](#compare-functionality)
- [Example Product Setup](#example-product-setup)

---

## Product Tags

Tags are used to derive bike characteristics displayed in the compare drawer and featured bikes section. Add relevant tags to each product in Shopify.

### Bike Type / Recommended Use

The system checks tags (and Product Type) to determine what the bike is best suited for:

| Tag(s) | Displays As |
|--------|-------------|
| `triathlon`, `tt` | Triathlon / Time Trial |
| `race`, `racing`, `competition` | Racing / Competition |
| `endurance`, `gran fondo` | Endurance / Gran Fondo |
| `gravel` | Gravel / Adventure |
| `aero` | Aero Road Racing |
| *(no matching tag)* | Road Cycling |

### Frame Material

The system checks tags and product description for frame material:

| Tag | Displays As |
|-----|-------------|
| `carbon` | Carbon Fiber |
| `aluminum` or `aluminium` | Aluminum |
| `titanium` | Titanium |
| `steel` | Steel |
| *(no matching tag)* | Premium Frame |

### Weight

Weight can be specified in two ways:

1. **In the description**: Include weight like "7.2kg" or "7.2 kg" anywhere in the product description - it will be automatically extracted.

2. **Via tags**: Use these tags for general weight class:
   | Tag | Displays As |
   |-----|-------------|
   | `ultralight` | < 7.5 kg |
   | `lightweight` | < 7.5 kg |

### Additional Feature Tags

You can add any other tags to highlight features. The first 5 tags are displayed in the comparison view. Suggested tags:

- `disc-brakes`
- `rim-brakes`
- `electronic-shifting`
- `mechanical-shifting`
- `di2`
- `etap`
- `eps`
- `tubeless-ready`
- `aero`
- `climbing`
- `all-rounder`

---

## Product Fields

### Vendor (Brand)

Set the **Vendor** field to the bike brand. This displays prominently on:
- Product cards
- Featured bikes section
- Comparison table

Examples: `Specialized`, `Trek`, `Cervélo`, `Cannondale`, `Giant`, `Pinarello`

### Product Type

Set the **Product Type** to categorize the bike. This is used as a fallback for "Recommended For" and displays in comparisons.

Recommended values:
- `Road Bike`
- `Triathlon Bike`
- `TT Bike`
- `Time Trial Bike`
- `Gravel Bike`
- `Aero Road Bike`
- `Endurance Bike`

### Description

Include key specifications in the description. The system automatically extracts:
- **Weight**: Any mention of weight in kg format (e.g., "7.8kg", "7.8 kg")
- **Frame material**: Mentions of carbon, aluminum, titanium, or steel

---

## Featured Bikes

The Featured Bikes section on the homepage displays **3 bikes** from your Shopify store.

### Current Behavior

By default, the section fetches the first 6 products from Shopify and displays the top 3. The first bike receives a "Featured" badge.

### Controlling Featured Products

To control which bikes appear as featured:

1. **Option A - Product Order**: Ensure your most important bikes are listed first in your Shopify product list.

2. **Option B - Featured Collection** (Recommended): Create a collection called "Featured" in Shopify and contact your developer to update the API to pull from this collection.

---

## Compare Functionality

### How It Works

1. Users click the **Scale icon** on product cards to add bikes to compare
2. A **Compare Bar** appears at the bottom showing selected bikes
3. Users can compare **2-4 bikes** side-by-side
4. The comparison shows:
   - Product image and title
   - Price
   - Availability (In Stock / Sold Out)
   - Best For (derived from tags)
   - Frame Material (derived from tags/description)
   - Weight (derived from description/tags)
   - Product Type
   - Brand (Vendor)
   - Feature Tags (first 5)

### Comparison Attributes

| Attribute | Source | Fallback |
|-----------|--------|----------|
| Price | `priceRange.minVariantPrice` | - |
| Availability | `availableForSale` | - |
| Best For | Tags → Product Type | "Road Cycling" |
| Frame | Tags → Description | "Premium Frame" |
| Weight | Description → Tags | "Contact for details" |
| Type | `productType` | "Road Bike" |
| Brand | `vendor` | "Various" |
| Features | `tags` (first 5) | "No tags" |

---

## Example Product Setup

### Cervélo P5 Triathlon Bike

**Basic Fields:**
- **Title**: Cervélo P5 Disc Ultegra Di2
- **Vendor**: Cervélo
- **Product Type**: Triathlon Bike
- **Price**: $8,500.00

**Tags:**
```
triathlon, carbon, aero, race, disc-brakes, di2, electronic-shifting
```

**Description:**
```
The Cervélo P5 represents the pinnacle of triathlon bike design.
Featuring a full carbon fiber frame and fork, this bike is built for speed.

Weight: 7.8kg (size 54)

Specifications:
- Frame: P5 Carbon
- Groupset: Shimano Ultegra Di2
- Wheels: DT Swiss ARC 1100
- Brakes: Shimano hydraulic disc
```

**Result in Compare View:**
| Attribute | Value |
|-----------|-------|
| Best For | Triathlon / Time Trial |
| Frame | Carbon Fiber |
| Weight | 7.8 kg |
| Type | Triathlon Bike |
| Brand | Cervélo |
| Features | triathlon, carbon, aero, race, disc-brakes |

---

### Specialized Tarmac SL7 Road Bike

**Basic Fields:**
- **Title**: Specialized Tarmac SL7 Expert
- **Vendor**: Specialized
- **Product Type**: Road Bike
- **Price**: $6,500.00

**Tags:**
```
race, carbon, aero, lightweight, disc-brakes, all-rounder
```

**Description:**
```
The Tarmac SL7 is the ultimate all-around race bike.

Frame weight: 800g (size 56)
Complete bike weight: 7.2kg

Features:
- S-Works FACT 10r carbon frame
- Shimano Ultegra mechanical groupset
- Roval Rapide CLX wheels
```

**Result in Compare View:**
| Attribute | Value |
|-----------|-------|
| Best For | Racing / Competition |
| Frame | Carbon Fiber |
| Weight | 7.2 kg |
| Type | Road Bike |
| Brand | Specialized |
| Features | race, carbon, aero, lightweight, disc-brakes |

---

## Quick Reference

### Minimum Required Setup

For each bike, at minimum set:
1. **Title** - Descriptive product name
2. **Vendor** - Brand name
3. **Product Type** - Bike category
4. **At least one tag** - For bike type (e.g., `road`, `triathlon`, `gravel`)
5. **Featured Image** - High-quality product photo

### Recommended Setup

For the best comparison experience:
1. All minimum fields above
2. **Frame material tag** - `carbon`, `aluminum`, `titanium`, or `steel`
3. **Weight in description** - Include "X.Xkg" format
4. **3-5 feature tags** - Highlight key features
5. **Multiple product images** - Show different angles
