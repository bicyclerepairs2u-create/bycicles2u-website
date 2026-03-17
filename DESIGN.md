# Bicycles2U Design System

## Brand Aesthetic: Dark Carbon

A premium, technical aesthetic inspired by professional cycling and triathlon equipment. The design evokes the precision of carbon fiber frames, the intensity of competition, and the pursuit of speed.

---

## Brand Philosophy

**Elite. Technical. Fast.**

- **Elite**: Premium positioning for serious cyclists, not casual riders
- **Technical**: Precision-focused, data-driven, performance-oriented
- **Fast**: Dynamic, aggressive, forward-moving energy

---

## Color Palette

### Primary Colors

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| **Electric Cyan** | `#00d4ff` | rgb(0, 212, 255) | Primary accent, CTAs, highlights, prices |
| **Electric Cyan Dark** | `#0099cc` | rgb(0, 153, 204) | Hover states, active states |
| **Electric Cyan Glow** | `rgba(0, 212, 255, 0.3)` | — | Shadows, glows, overlays |

### Dark Carbon Scale

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| **Carbon 950** | `#0a0a0a` | rgb(10, 10, 10) | Primary backgrounds |
| **Carbon 900** | `#171717` | rgb(23, 23, 23) | Card backgrounds, elevated surfaces |
| **Carbon 800** | `#262626` | rgb(38, 38, 38) | Borders, dividers, secondary surfaces |
| **Carbon 700** | `#404040` | rgb(64, 64, 64) | Disabled states, subtle elements |

### Neutral Scale (for text)

| Name | Hex | Usage |
|------|-----|-------|
| **White** | `#ffffff` | Primary headings, important text |
| **Neutral 300** | `#d4d4d4` | Body text, descriptions |
| **Neutral 400** | `#a3a3a3` | Secondary text, captions |
| **Neutral 500** | `#737373` | Muted text, placeholders |
| **Neutral 600** | `#525252` | Disabled text |

### CSS Variables

```css
/* Shop accent - Electric Cyan */
--color-shop-accent: #00d4ff;
--color-shop-accent-dark: #0099cc;
--color-shop-accent-glow: rgba(0, 212, 255, 0.3);

/* Dark Carbon theme colors */
--color-carbon-950: #0a0a0a;
--color-carbon-900: #171717;
--color-carbon-800: #262626;
--color-carbon-700: #404040;
```

---

## Typography

### Font Family

**Primary**: Roboto (Google Fonts)
- Clean, geometric, technical feel
- Excellent readability at all sizes

### Type Scale

| Element | Size | Weight | Transform | Tracking |
|---------|------|--------|-----------|----------|
| **Hero H1** | 5rem (80px) / 7rem mobile | 900 (Black) | Uppercase | -0.05em (tight) |
| **Page H1** | 3rem (48px) | 900 (Black) | Uppercase | -0.04em |
| **Section H2** | 2rem (32px) | 700 (Bold) | Uppercase | -0.02em |
| **Card Title** | 1.125rem (18px) | 700 (Bold) | None | Normal |
| **Body** | 1rem (16px) | 400 (Regular) | None | Normal |
| **Caption/Label** | 0.625rem (10px) | 600 (Semibold) | Uppercase | 0.2em (wide) |
| **Price** | 1.25rem (20px) | 700 (Bold) | None | Normal |

### Typography Rules

1. **Headings**: Always bold/black weight, often uppercase
2. **Brand names**: Small, uppercase, wide letter-spacing (0.2em)
3. **Prices**: Bold, Electric Cyan color
4. **Body text**: Neutral 300-400 for readability on dark backgrounds
5. **No sentence case for UI labels** — use uppercase for tags, buttons, categories

```css
/* Example heading */
.heading-hero {
  font-size: 5rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: -0.05em;
  color: #ffffff;
}

/* Example brand label */
.brand-label {
  font-size: 0.625rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: #00d4ff;
}
```

---

## Component Patterns

### Cards (Product Cards)

**Angular Clipped Design**
- Bottom-right corner clipped at 45° (20px cut)
- Creates technical, aggressive silhouette

```css
clip-path: polygon(0 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%);
```

**Accent Lines**
- Top-right corner: horizontal line (24px wide, 1px tall)
- Top-right corner: vertical line (1px wide, 16px tall)
- Color: Electric Cyan

**Image Treatment**
- Aspect ratio: 4:3 for product cards
- Gradient overlay from bottom (Carbon 900 → transparent)
- Hover: 5% scale increase, 500ms transition

**Hover State**
- Cyan glow shadow: `0 0 30px rgba(0, 212, 255, 0.15)`
- Specs overlay fades in (black/80 background)

```jsx
// Card structure
<div className="group relative bg-neutral-900 overflow-hidden"
     style={{ clipPath: '...' }}>
  {/* Accent lines */}
  <div className="absolute top-0 right-0 w-24 h-1 bg-[#00d4ff]" />
  <div className="absolute top-0 right-0 w-1 h-16 bg-[#00d4ff]" />

  {/* Image with overlay */}
  <div className="relative aspect-[4/3]">
    <Image ... className="group-hover:scale-105 transition-transform duration-500" />
    <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent" />
  </div>

  {/* Content */}
  <div className="p-5">...</div>
</div>
```

### Buttons

**Primary (Solid)**
```css
background: #00d4ff;
color: #000000;
font-weight: 700;
text-transform: uppercase;
letter-spacing: 0.05em;
padding: 0.75rem 1.5rem;

/* Hover */
background: #0099cc;
```

**Secondary (Outline)**
```css
background: transparent;
border: 1px solid #00d4ff;
color: #00d4ff;
font-weight: 700;
text-transform: uppercase;

/* Hover */
background: #00d4ff;
color: #000000;
```

**Icon Button**
```css
background: #00d4ff;
color: #000000;
padding: 0.625rem;

/* Hover */
background: #0099cc;
```

### Tags / Badges

**Filled Tag**
```css
background: #00d4ff;
color: #000000;
padding: 0.375rem 1rem;
font-size: 0.75rem;
font-weight: 700;
text-transform: uppercase;
letter-spacing: 0.05em;
```

**Outline Tag**
```css
background: transparent;
border: 1px solid #00d4ff;
color: #00d4ff;
/* Same sizing as filled */
```

---

## Page Layouts

### Hero Headers

**Full-Width Gradient Hero**
```css
background: linear-gradient(135deg, #0a0a0a 0%, rgba(0, 212, 255, 0.08) 100%);
```

**Diagonal Line Pattern (decorative)**
```css
background-image: repeating-linear-gradient(
  -45deg,
  #00d4ff,
  #00d4ff 1px,
  transparent 1px,
  transparent 40px
);
opacity: 0.1;
```

**Hero Structure**
```
┌─────────────────────────────────────────────────────┐
│                                    ╲╲╲╲╲╲╲╲╲╲╲╲╲╲╲ │  ← Diagonal pattern (right side, 50% width)
│  SHOP                              ╲╲╲╲╲╲╲╲╲╲╲╲╲╲╲ │
│  Premium road & triathlon...       ╲╲╲╲╲╲╲╲╲╲╲╲╲╲╲ │
│                                    ╲╲╲╲╲╲╲╲╲╲╲╲╲╲╲ │
│  [Road] [Triathlon] [Time Trial]   ╲╲╲╲╲╲╲╲╲╲╲╲╲╲╲ │  ← Category tags
└─────────────────────────────────────────────────────┘
```

### Grid Layouts

**Product Grid**
- 3 columns on desktop (lg+)
- 2 columns on tablet (sm-lg)
- 1 column on mobile
- Gap: 1.5rem (24px)

```css
grid-template-columns: repeat(3, 1fr); /* desktop */
gap: 1.5rem;
```

### Spacing Scale

| Name | Value | Usage |
|------|-------|-------|
| **xs** | 0.25rem (4px) | Tight spacing, icon gaps |
| **sm** | 0.5rem (8px) | Inline elements |
| **md** | 1rem (16px) | Standard component padding |
| **lg** | 1.5rem (24px) | Section gaps, card padding |
| **xl** | 2rem (32px) | Between major sections |
| **2xl** | 3rem (48px) | Page sections |
| **3xl** | 4rem (64px) | Hero padding |

---

## Interactions & Animations

### Timing

| Type | Duration | Easing |
|------|----------|--------|
| **Hover (color)** | 200ms | ease |
| **Hover (transform)** | 300ms | ease-out |
| **Image zoom** | 500ms | ease-out |
| **Overlay fade** | 300ms | ease |
| **Page transitions** | 200ms | ease |

### Hover Effects

1. **Cards**: Red glow shadow + image zoom
2. **Buttons**: Background color shift
3. **Links**: Color transition to accent
4. **Images**: Scale 1.05

### Shadows

**Card Glow (hover)**
```css
box-shadow: 0 0 30px rgba(0, 212, 255, 0.15);
```

**Elevated Surface**
```css
box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
```

---

## Iconography

### Icon Library
**Lucide React** — Clean, consistent stroke icons

### Icon Sizing
| Context | Size |
|---------|------|
| Inline with text | 1rem (16px) |
| Button icons | 1rem (16px) |
| Card feature icons | 0.875rem (14px) |
| Navigation | 1.25rem (20px) |

### Icon Colors
- Default: Neutral 400
- Active/Accent: Electric Cyan
- On dark buttons: Black

---

## Accessibility

### Contrast Ratios
- White text on Carbon 950: **21:1** ✓
- Neutral 300 on Carbon 950: **12.6:1** ✓
- Electric Cyan on Carbon 950: **5.2:1** ✓ (for large text/icons)
- Black on Electric Cyan: **5.9:1** ✓

### Focus States
```css
outline: 2px solid #00d4ff;
outline-offset: 2px;
```

---

## Do's and Don'ts

### ✅ Do

- Use dark backgrounds consistently (Carbon 950 or 900)
- Apply the angular clip-path to cards
- Use Electric Cyan sparingly for maximum impact
- Keep typography bold and uppercase for headings
- Add subtle red glow on interactive hover states
- Use wide letter-spacing for brand labels

### ❌ Don't

- Mix light and dark backgrounds inconsistently
- Overuse Electric Cyan (it should feel special)
- Use rounded corners (keep things sharp/angular)
- Use thin font weights for headings
- Add too many accent colors (red is the only accent)
- Use lowercase for category tags or labels

---

## Implementation Checklist

When implementing the Dark Carbon aesthetic on a new page:

- [ ] Set page background to `#0a0a0a`
- [ ] Use hero header pattern with gradient + diagonal lines
- [ ] Apply angular clip-path to cards
- [ ] Add accent corner lines to cards
- [ ] Use Electric Cyan for prices, CTAs, and highlights
- [ ] Apply uppercase + tracking to labels and headings
- [ ] Add hover glow effect to interactive cards
- [ ] Ensure text uses the neutral scale for readability
- [ ] Test contrast ratios for accessibility

---

## File References

- **Colors defined in**: `app/globals.css` (CSS variables)
- **Shop page example**: `app/shop/page.tsx`
- **Product card example**: `components/shop/product-card.tsx`
- **Style exploration**: `app/styles/page.tsx`
