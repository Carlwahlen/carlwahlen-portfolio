# Design System Analysis: Qura.law & Quartr.com

## Key Patterns from Qura.law

### 1. Information Architecture
- **Clean header**: Minimal navigation with clear hierarchy
- **Hero sections**: Large typography with subtle subcopy
- **Section rhythm**: Consistent spacing with alternating light backgrounds
- **Scannable content**: Short paragraphs, bullet points, clear CTAs

### 2. Layout System
- **Container widths**: Max-width with generous padding
- **Grid system**: 2-3 column layouts for cards, single column for content
- **Vertical rhythm**: Consistent section padding (py-16/24)
- **Card design**: White backgrounds, soft shadows, rounded corners

### 3. Typography
- **Hierarchy**: Clear h1-h6 with consistent sizing
- **Body text**: Comfortable line-height, readable font sizes
- **Links**: Subtle underlines with hover states
- **Headings**: Bold weights with proper spacing

### 4. Color System
- **Primary**: White backgrounds (#FFFFFF)
- **Text**: Dark grays (#0F0F0F, #374151, #6B7280)
- **Accents**: Minimal use of brand colors
- **Borders**: Light grays (#E5E7EB) instead of harsh lines

### 5. Components
- **Cards**: White bg, soft shadows, rounded-2xl
- **Buttons**: Solid (black/white) and outline variants
- **Forms**: Clean inputs with proper focus states
- **Navigation**: Sticky header with subtle backdrop blur

### 6. Micro-interactions
- **Hover states**: Subtle elevation changes
- **Focus rings**: Visible accessibility indicators
- **Transitions**: Smooth 150-200ms ease-out
- **Link animations**: Underline offset animations

## Implementation Strategy

### Design Tokens
```css
/* Colors */
--bg-primary: #FFFFFF
--text-primary: #0F0F0F
--text-secondary: #374151
--text-muted: #6B7280
--border-light: #E5E7EB
--accent-emerald: #10B981

/* Spacing */
--section-padding: 4rem 0 (md: 6rem 0)
--container-padding: 1rem (md: 1.5rem)
--card-padding: 1.5rem

/* Typography */
--font-size-h1: 2.25rem (md: 3.75rem)
--font-size-h2: 1.875rem (md: 2.25rem)
--font-size-body: 0.9375rem
--line-height-comfortable: 1.6
```

### Component Patterns
1. **Hero sections**: Large headlines, minimal subcopy, clear CTAs
2. **Service cards**: Icon + title + description + features
3. **Case studies**: Project overview + tech stack + results
4. **Contact forms**: Accessible inputs with clear validation
5. **Footer**: Light background with organized links

### Accessibility Features
- **Contrast**: AA minimum (4.5:1) for all text
- **Focus management**: Visible focus rings
- **Semantic HTML**: Proper landmark roles
- **Form labels**: Clear associations with inputs
- **Keyboard navigation**: Full keyboard support

## Applied Changes

### Global Theme
- White backgrounds throughout
- Dark text on light surfaces
- Minimal accent color usage
- Soft shadows instead of borders
- Consistent spacing scale

### Component Updates
- Header: Sticky with backdrop blur
- Cards: White with soft elevation
- Buttons: Solid and outline variants
- Forms: Accessible with clear states
- Footer: Light background with subtle border

### Page-Specific Refinements
- **Home**: Tightened hero, added trust indicators
- **Services**: Removed pricing, clean service cards
- **Case**: Light cards with clear project details
- **About**: Structured story with method steps
- **Contact**: Accessible form with success states
- **Notes**: Simple article list with light dividers
