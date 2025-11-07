# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 website for Bicycles2U, a bicycle shop specializing in premium road and triathlon bikes. The site is built with React 19, TypeScript, and Tailwind CSS v4, using the App Router architecture.

## Development Commands

```bash
# Start development server (localhost:3000)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## Tech Stack & Architecture

### Core Technologies
- **Next.js 15.5** with App Router (React Server Components enabled)
- **React 19.1** (React Server Components + Client Components)
- **TypeScript 5** with strict mode
- **Tailwind CSS v4** with PostCSS
- **shadcn/ui** component library (New York style variant)

### UI Component Libraries
- **Material-UI 7.3** (primary component library)
- **Radix UI** (headless UI primitives)
- **Lucide React** (icon library)
- Form handling: **react-hook-form** with **Zod** validation
- Theming: **next-themes** (dark mode support)

## Project Structure

```
app/
  layout.tsx          # Root layout with Roboto font, metadata
  page.tsx            # Home page (single-page app structure)
  globals.css         # Tailwind v4 + CSS variables for theming

components/
  # Page section components (all used in app/page.tsx)
  navigation.tsx
  hero-section.tsx
  about-sam.tsx
  about-company.tsx
  bike-showcase.tsx
  testimonials.tsx
  brands-section.tsx
  services-section.tsx
  contact-section.tsx
  footer.tsx
  theme-provider.tsx

  ui/                 # shadcn/ui components (40+ components)
    button.tsx
    card.tsx
    dialog.tsx
    # ... etc

lib/
  utils.ts            # cn() utility for className merging

hooks/
  use-mobile.ts
  use-toast.ts
```

## Key Architecture Patterns

### Single-Page Application Structure
The main page (`app/page.tsx`) is a client component that imports and renders all section components in sequence. The site functions as a single-page scrolling experience.

### Component Architecture
- **Section Components**: Top-level components in `/components` directory represent page sections
- **UI Components**: Reusable primitives in `/components/ui` (shadcn/ui based)
- **Client Components**: Most components use `"use client"` directive since the site is interactive
- **Material-UI Integration**: MUI components are used alongside Radix UI and shadcn/ui

### Styling Approach
- **Tailwind v4** with `@import "tailwindcss"` in globals.css
- CSS variables for theming (light/dark mode via `--background`, `--foreground`, etc.)
- `cn()` utility function (clsx + tailwind-merge) for conditional classes
- Material-UI uses Emotion for CSS-in-JS

### Path Aliases
```typescript
"@/components"  → ./components
"@/lib"         → ./lib
"@/hooks"       → ./hooks
"@/components/ui" → ./components/ui
```

## Important Configuration Details

### shadcn/ui Configuration
- Style: **New York** variant
- Base color: **neutral**
- CSS variables enabled
- Icon library: **lucide**
- RSC (React Server Components): enabled

### TypeScript Configuration
- Target: ES2017
- Strict mode enabled
- Path alias: `@/*` maps to project root
- Includes Next.js plugin for type checking

### Git Branch Structure
- Main branch: **main**
- Development branch: **dev** (current branch)

## Working with Components

### Adding shadcn/ui Components
Components are pre-configured with the New York style. To add new components, they should follow the existing patterns in `/components/ui`.

### Material-UI Components
MUI components are available and use Emotion for styling. When mixing MUI with Tailwind classes, use the `cn()` utility to merge classes properly.

### Creating New Section Components
New page sections should:
1. Be placed in `/components` directory
2. Use `"use client"` directive if interactive
3. Import and use UI components from `@/components/ui`
4. Be added to `app/page.tsx` in the desired order

## Styling Guidelines

### Tailwind v4 Syntax
This project uses Tailwind CSS v4 with the new PostCSS-based architecture. Import syntax in CSS:
```css
@import "tailwindcss";
```

### Theme Variables
Colors and theme values are defined as CSS custom properties in `app/globals.css` using OKLCH color space. Dark mode uses the `@custom-variant dark (&:is(.dark *))` variant.

### Animation Library
The project includes `tw-animate-css` for Tailwind-based animations.

## Business Context

This is a website for Bicycles2U, a bicycle shop that:
- Specializes in premium road and triathlon bikes
- Offers expert repairs and custom builds
- Sells quality second-hand bikes
- Focuses on lightweight, fast bicycles for serious cyclists
