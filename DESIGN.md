---
name: Retail Professional
colors:
  surface: '#f9f9f9'
  surface-dim: '#dadada'
  surface-bright: '#f9f9f9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3f3'
  surface-container: '#eeeeee'
  surface-container-high: '#e8e8e8'
  surface-container-highest: '#e2e2e2'
  on-surface: '#1a1c1c'
  on-surface-variant: '#44474c'
  inverse-surface: '#2f3131'
  inverse-on-surface: '#f1f1f1'
  outline: '#75777c'
  outline-variant: '#c5c6cc'
  surface-tint: '#535f70'
  primary: '#0e1a28'
  on-primary: '#ffffff'
  primary-container: '#232f3e'
  on-primary-container: '#8a97a9'
  inverse-primary: '#bbc7db'
  secondary: '#8a5100'
  on-secondary: '#ffffff'
  secondary-container: '#fe9800'
  on-secondary-container: '#643900'
  tertiary: '#001d23'
  on-tertiary: '#ffffff'
  tertiary-container: '#00333d'
  on-tertiary-container: '#4ca0b6'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d7e3f7'
  primary-fixed-dim: '#bbc7db'
  on-primary-fixed: '#101c2b'
  on-primary-fixed-variant: '#3c4858'
  secondary-fixed: '#ffdcbd'
  secondary-fixed-dim: '#ffb86f'
  on-secondary-fixed: '#2c1600'
  on-secondary-fixed-variant: '#693c00'
  tertiary-fixed: '#adecff'
  tertiary-fixed-dim: '#80d2e9'
  on-tertiary-fixed: '#001f26'
  on-tertiary-fixed-variant: '#004e5d'
  background: '#f9f9f9'
  on-background: '#1a1c1c'
  surface-variant: '#e2e2e2'
typography:
  headline-lg:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 34px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 22px
    fontWeight: '700'
    lineHeight: 28px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '700'
    lineHeight: 26px
  headline-sm:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '700'
    lineHeight: 20px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  label-price:
    fontFamily: Inter
    fontSize: 21px
    fontWeight: '500'
    lineHeight: 21px
    letterSpacing: -0.01em
  label-badge:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 12px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  container-max: 1500px
  gutter: 12px
  section-padding: 20px
  stack-compact: 4px
  stack-default: 8px
  stack-loose: 16px
---

## Brand & Style

The design system is engineered for high-velocity commerce, prioritizing utility, trust, and information density. It is designed for a diverse target audience ranging from casual shoppers to power users who require efficient navigation through vast catalogs. 

The aesthetic is **Corporate Modern with a focus on High-Density Utility**. It avoids unnecessary ornamentation in favor of clear functional hierarchies. The emotional response should be one of reliability and "frictionless intent"—the UI stays out of the way of the transaction while providing all necessary data points (price, rating, availability) at a glance. Visual depth is achieved through subtle tonal layering rather than aggressive shadows, maintaining a clean, professional "warehouse-to-door" efficiency.

## Colors

The palette is anchored by **Deep Navy (#232F3E)** for primary navigation and headers, establishing a foundation of institutional trust. **Action Orange (#FF9900)** is reserved strictly for primary conversion points—buttons and critical call-to-actions. 

- **Primary Navigation:** Use Deep Navy for the global header and footer.
- **Action/Commitment:** Use Action Orange for "Add to Cart" or "Buy Now."
- **Information Links:** Use Tertiary Teal (#007185) for text links and secondary navigation to distinguish from static text.
- **Surface Strategy:** Use Pure White (#FFFFFF) for product cards and primary content areas. Use Light Gray (#F3F3F3) for page backgrounds and to separate distinct horizontal sections.
- **Price & Urgency:** Use Dark Red (#B12704) for pricing and "Low Stock" alerts to ensure immediate visibility.

## Typography

This design system utilizes **Inter** for its exceptional legibility at small sizes and high x-height, which is critical for data-heavy product grids. 

- **Information Density:** Body-md (14px) is the default for product descriptions and specifications to maximize the amount of information visible above the fold.
- **Pricing Hierarchy:** Prices use a dedicated `label-price` token. For fractional pricing (cents), use `body-sm` with a vertical-align super-script style.
- **Semantic Weight:** Use Bold (700) weights for product titles in listings to ensure they stand out against metadata. 
- **Links:** All interactive text elements should use `body-md` or `body-sm` with the tertiary color and an underline on hover.

## Layout & Spacing

The layout utilizes a **12-column Fluid Grid** that snaps to a maximum width of 1500px. This design system prioritizes a high-density vertical stack.

- **Grid Logic:** Use a 12px gutter to keep product cards tightly packed, emphasizing a "catalog" feel.
- **Mobile Reflow:** On mobile devices, product grids should transition from 4-5 columns to a 2-column "masonry" or "balanced card" view.
- **Density Control:** Vertical spacing between elements within a card (Title, Rating, Price) should use `stack-compact` (4px). Spacing between distinct sections on a landing page should use `stack-loose` (16px) or `section-padding` (20px).
- **Safe Areas:** Maintain a 16px outer margin on mobile and a 20px margin on tablet/desktop to ensure content does not hit the edge of the viewport.

## Elevation & Depth

Hierarchy is established primarily through **Tonal Layers** and **Subtle Outlines** rather than heavy shadows.

- **Level 0 (Background):** Light Gray (#F3F3F3) used for the main canvas.
- **Level 1 (Cards):** Pure White (#FFFFFF) surfaces with a 1px solid border (#DDD) to define boundaries without adding visual weight.
- **Level 2 (Interactive):** On hover, cards may transition from a 1px border to a subtle ambient shadow (0px 2px 8px rgba(0,0,0,0.1)) to indicate clickability.
- **Sticky Elements:** Global navigation uses a flat Deep Navy fill with 0 elevation; depth is created by the contrast against the light content below.

## Shapes

The shape language is **Soft and Precise**. A consistent corner radius prevents the UI from feeling "sharp" or "aggressive" while maintaining a professional, structured look.

- **Small Components:** Checkboxes, inputs, and small badges use a 4px radius (`rounded-sm`).
- **Standard Components:** Product cards, "Add to Cart" buttons, and containers use an 8px radius (`rounded-lg`).
- **Badges:** Specialized badges like "Best Seller" use a "Half-Pill" shape (rounded on the right side only) or a standard 2px radius for a more editorial feel.

## Components

### Buttons
- **Primary:** Action Orange (#FF9900) background, black text. High-contrast, rounded-lg.
- **Secondary:** Light Yellow (#FFD814) background. Used for "Add to Cart" when "Buy Now" is the primary.
- **Tertiary:** White background with 1px #D5D9D9 border. Used for "Add to List" or quantity selectors.

### Badges & Indicators
- **Best Seller:** Orange background (#E47911) with white `label-badge` text. Usually positioned at the top-left of product images.
- **Shipping (Prime-style):** Use a custom checkmark icon + "prime" logo in Navy/Blue. Indicates 1-2 day delivery eligibility.
- **Price Tags:** Displayed in `label-price` (Dark Red #B12704). Previous price (MSRP) should be `body-sm`, gray, and strikethrough.

### Inputs & Selectors
- **Search Bar:** Large white field with a 2px Action Orange border when focused. The search icon should be contained in an Orange square button at the trailing edge.
- **Lists:** High-density vertical lists with 1px horizontal separators (#EEE). Use 8px padding between list items.

### Cards
- **Product Card:** White background, 1px border (#DDD). Fixed aspect ratio for images (1:1). Content is center-aligned for search results, or left-aligned for recommendation carousels.