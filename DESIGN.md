---
name: Ethereal Nomad
colors:
  surface: '#f8f9fa'
  surface-dim: '#d9dadb'
  surface-bright: '#f8f9fa'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f4f5'
  surface-container: '#edeeef'
  surface-container-high: '#e7e8e9'
  surface-container-highest: '#e1e3e4'
  on-surface: '#191c1d'
  on-surface-variant: '#3d4949'
  inverse-surface: '#2e3132'
  inverse-on-surface: '#f0f1f2'
  outline: '#6d7979'
  outline-variant: '#bcc9c8'
  surface-tint: '#006a6a'
  primary: '#006767'
  on-primary: '#ffffff'
  primary-container: '#008282'
  on-primary-container: '#f3fffe'
  inverse-primary: '#6fd7d6'
  secondary: '#5d5e61'
  on-secondary: '#ffffff'
  secondary-container: '#e2e2e5'
  on-secondary-container: '#636467'
  tertiary: '#545d65'
  on-tertiary: '#ffffff'
  tertiary-container: '#6d767e'
  on-tertiary-container: '#fcfcff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#8cf3f3'
  primary-fixed-dim: '#6fd7d6'
  on-primary-fixed: '#002020'
  on-primary-fixed-variant: '#004f4f'
  secondary-fixed: '#e2e2e5'
  secondary-fixed-dim: '#c6c6c9'
  on-secondary-fixed: '#1a1c1e'
  on-secondary-fixed-variant: '#454749'
  tertiary-fixed: '#dbe4ed'
  tertiary-fixed-dim: '#bfc8d0'
  on-tertiary-fixed: '#141d23'
  on-tertiary-fixed-variant: '#3f484f'
  background: '#f8f9fa'
  on-background: '#191c1d'
  surface-variant: '#e1e3e4'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '600'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.4'
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 48px
---

## Brand & Style
The design system embodies a "High-End Concierge" aesthetic: natural, organic, and meticulously professional. It prioritizes the user's journey by removing visual friction through a minimalist framework punctuated by sophisticated glassmorphism. 

The emotional response should be one of calm clarity—reminiscent of a well-organized travel itinerary or a serene airport lounge. By leveraging heavy whitespace and a restricted color palette, the system ensures that travel imagery remains the hero, while the UI serves as a quiet, premium guide.

## Colors
The palette is anchored in a pure white background to maximize the "breathability" of the interface. 
- **Primary:** A refined, high-contrast Teal (#008B8B) used sparingly for calls to action and active states. It provides a vibrant, natural energy without overwhelming the composition.
- **Surface:** Deep Charcoal (#1A1C1E) is reserved for primary text to ensure AAA accessibility and a sense of grounded authority.
- **Neutrals:** Soft grays are used for subtle borders and secondary information, maintaining a low-contrast hierarchy for non-interactive elements.

## Typography
The system utilizes **Inter** exclusively to achieve a sophisticated, systematic look. 
- **Headlines:** Use tight letter-spacing and semi-bold weights to create a strong visual anchor.
- **Body Text:** Generous line-height (1.6) is applied to ensure legibility during long-form reading of itineraries or destination guides.
- **Labels:** Small caps or increased letter spacing should be used for metadata and overlines to distinguish them from body copy.

## Layout & Spacing
The layout follows a strict 8px grid system to maintain professional alignment. 
- **Grid:** A 12-column fluid grid for desktop, transitioning to a 4-column grid for mobile.
- **Whitespace:** Use "generous padding" as a functional tool—elements should have ample room to breathe, preventing the interface from feeling cluttered or "budget."
- **Alignment:** Content is primarily left-aligned to mirror editorial layouts, with centered layouts reserved for high-impact landing sections.

## Elevation & Depth
Depth is achieved through a combination of **Ambient Shadows** and **Subtle Glassmorphism**.
- **The Glass Effect:** Use backdrop blurs (12px - 20px) on headers and overlays with a 60-80% white opacity. This creates a sense of physical layers without the heaviness of solid blocks.
- **Shadows:** Avoid harsh blacks. Use soft, diffused shadows with a large blur radius and low opacity (e.g., `box-shadow: 0 10px 30px rgba(0, 0, 0, 0.04)`).
- **Borders:** Use ultra-thin (1px) borders in a very light gray (#E9ECEF) to define shapes where glassmorphism isn't appropriate, ensuring a clean, technical finish.

## Shapes
The shape language is "Softly Organic." Standard UI elements like buttons and input fields use a 0.5rem (8px) radius. Larger containers, such as cards and modal sheets, use 1rem (16px) to 1.5rem (24px) to emphasize a friendly, approachable nature. Avoid sharp corners entirely to maintain the "Natural" brand pillar.

## Components
- **Buttons:** Primary buttons use the vibrant Teal background with white text. Secondary buttons should be ghost-style with a subtle border or a very light teal tint.
- **Cards:** Utilize a pure white background or glass effect. Use a "subtle border + soft shadow" combo to lift them from the background.
- **Inputs:** Clean, bottom-border only or fully enclosed with a light gray stroke. Active states should transition the stroke to Teal.
- **Chips/Tags:** Used for travel categories (e.g., "Adventure," "Luxury"). Use a light gray background with Charcoal text; active tags toggle to the Teal primary color.
- **Lists:** High-density lists (like flight results) should use subtle horizontal dividers rather than boxes to maintain a clean, airy feel.
- **Navigation:** A sticky top-bar with a backdrop-blur effect, ensuring the UI remains present but unobtrusive as the user scrolls through imagery.