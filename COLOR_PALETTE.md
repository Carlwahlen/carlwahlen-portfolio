# Färgpalett - Carl Wahlen Portfolio

## Anpassade färger (tailwind.config.js)

### Lux Green (Emerald/Green scale)
- `lux-green-50`: `#ecfdf5`
- `lux-green-100`: `#d1fae5`
- `lux-green-200`: `#a7f3d0`
- `lux-green-300`: `#6ee7b7`
- `lux-green-400`: `#34d399`
- `lux-green-500`: `#10b981` (Primary accent)
- `lux-green-600`: `#059669`
- `lux-green-700`: `#047857`
- `lux-green-800`: `#065f46`

### Dark Green (Custom)
- `dark-green`: `#093D29` (Primary button color)
- `dark-green-600`: `#093D29`
- `dark-green-700`: `#072820`

### Icon Hover
- `icon-hover`: `#037839`

## Tailwind Standard Gray Scale (används mycket)
- `gray-50`: `#f9fafb`
- `gray-100`: `#f3f4f6`
- `gray-200`: `#e5e7eb`
- `gray-300`: `#d1d5db`
- `gray-400`: `#9ca3af`
- `gray-500`: `#6b7280`
- `gray-600`: `#4b5563`
- `gray-700`: `#374151`
- `gray-800`: `#1f2937`
- `gray-900`: `#111827`

## Bakgrundsfärger (index.css)

### Hero Gradient
- `hero-gradient`: `#f8f8f8`

### Card Gradient
- `card-gradient`: `linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)`
  - Start: `#ffffff` (White)
  - End: `#f8fafc` (Slate-50)

### Accent Gradient
- `accent-gradient`: `linear-gradient(135deg, #10b981 0%, #059669 100%)`
  - Start: `#10b981` (lux-green-500)
  - End: `#059669` (lux-green-600)

### Animated Gradient
- `animated-gradient`: `linear-gradient(-45deg, #f8fafc, #e2e8f0, #f1f5f9, #e2e8f0)`
  - `#f8fafc` (Slate-50)
  - `#e2e8f0` (Slate-200)
  - `#f1f5f9` (Slate-100)
  - `#e2e8f0` (Slate-200)

## RGBA-värden (används i inline styles)

### Borders
- `rgba(0,0,0,0.08)` - Ljus border (8% opacity svart)
- `rgba(0,0,0,0.07)` - Shadow soft (7% opacity)
- `rgba(0,0,0,0.04)` - Shadow soft (4% opacity)
- `rgba(0,0,0,0.1)` - Shadow elevation (10% opacity)

### Backgrounds
- `bg-white/90` - Vit bakgrund med 90% opacity (glass effect)
- `border-gray-200/50` - Grå border med 50% opacity

## Primära användningsområden

### Textfärger
- **Huvudtext**: `text-gray-900` (`#111827`)
- **Sekundär text**: `text-gray-600` (`#4b5563`)
- **Muted text**: `text-gray-500` (`#6b7280`)
- **Ljus text**: `text-gray-700` (`#374151`)

### Bakgrundsfärger
- **Huvudbakgrund**: `bg-white` (`#ffffff`)
- **Sekundär bakgrund**: `bg-gray-50` (`#f9fafb`)
- **Hero bakgrund**: `#f8f8f8`
- **Card bakgrund**: `bg-white` med soft shadow

### Accentfärger
- **Primär knapp**: `dark-green` (`#093D29`)
- **Hover knapp**: `dark-green-700` (`#072820`)
- **Sekundär knapp**: `border-gray-300` (`#d1d5db`) med `text-gray-700`
- **Links**: `lux-green-500` (`#10b981`) på hover

### Borders
- **Standard border**: `border-gray-200` (`#e5e7eb`)
- **Ljus border**: `rgba(0,0,0,0.08)`
- **Focus border**: `border-gray-900` (`#111827`)

