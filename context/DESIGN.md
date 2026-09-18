# Design System & Guidelines

## Brand Identity
**Pakdeepan Kindergarten School** focuses on providing a premium, professional, and trustworthy early childhood education. The aesthetic is clean, modern, and high-end, instilling confidence in prospective families while maintaining a warm, nurturing atmosphere.

## Theme & Colors
We use a **white / light pink / light blue / deep navy** color scheme derived from the school's official branding and insignia.

### Color Palette
- **Primary (Light Pink / Coral):** `#f472b6` — The signature warm brand color used on primary CTA buttons, highlighted titles, brand badges, and uniform icon badges.
- **Primary Container:** `#fce7f3` — A soft, delicate pink for unified icon backgrounds, pills, and subtle tinted areas.
- **Secondary (Sky Blue):** `#38bdf8` — The vibrant accent color representing youth, sky, and boundless potential, used on accent tags, secondary buttons, and doodle highlights.
- **Secondary Container:** `#e0f2fe` — A light sky-blue background wash for hero sections and subtle gradients.
- **Heading Navy:** `#1e3a8a` — Authoritative deep navy blue for primary headlines (`h1`, `h2`, `h3`) ensuring high contrast and academic prestige.
- **Background / Surface:** `#ffffff` — Pure white for card surfaces and high-clarity content areas.
- **On-Background:** `#0f172a` — High-readability dark slate text.
- **On-Surface-Variant:** `#475569` — Balanced muted slate for descriptions and sub-labels.
- **Outline Variant:** `#cbd5e1` — Subtle borders and dividers.

### Design Principles
- **White Theme Dominance:** Surfaces stay white-based and spacious to maintain a clean, prestigious feeling.
- **Controlled Accents:** Light pink and sky blue are used as thoughtful accents and gentle washes—never overwhelming the user.
- **High Readability:** All body and headline text strictly passes WCAG AA contrast standards.

## Typography
A curated three-tier typography hierarchy:
1. **Headings & Display (`font-display-lg`, `font-serif`):** `Outfit`. A modern, geometric sans-serif that delivers clarity, elegance, and academic authority.
2. **Body & Interface (`font-body-md`, `font-sans`):** `Plus Jakarta Sans`. Highly legible, clean, and balanced for paragraphs, forms, and navigation.
3. **Signature Calligraphy & Curves (`font-sherlina`):** `Sherlina` (`Sherlina.ttf`). A handcrafted, authentic calligraphy script font used exclusively for inspirational school taglines and handwritten accents:
   - *"Learn ♡ Grow ♡ Build Your Future"* (Hero Header)
   - *"Small steps today, big dreams tomorrow ♡"* (About Section Photo Accent)
   - *"Together We Grow ♡"* (Action Banner)

## Iconography & The Single-Color Rule
- **Single-Color Uniformity Rule:** In all grids, cards, and stat blocks (such as the 5 Feature Cards and About Section Stats), icons **must use a single uniform brand color** (`text-primary` with `bg-primary/10`).
- **Prohibition of Multi-Color Rainbows:** Differing pastel colors across adjacent icons (e.g. pink, blue, yellow, green, purple) are strictly prohibited. Single-color icons maintain visual order, elegance, and a professional institutional image.
- **Library:** Phosphor Icons (`@phosphor-icons/react`). Use `weight="duotone"` or `weight="fill"` for feature and stat badges.

## Landing Page Component Guidelines
- **Hero Section:** Sky-blue gradient background (`from-[#e0f2fe] to-[#bae6fd]`) with wave divider transition into pure white. Sherlina tagline placed above the main headline.
- **Features Grid:** Overlaps the hero bottom with rounded-3xl cards. Every card features a uniform soft pink circle container (`bg-primary/10`) housing a pink icon (`text-primary`).
- **About Pakdeepan Section:**
  - Left column: Architectural Gateway layered composite frame (stately arched crown `rounded-t-[180px]` with softly curved base `rounded-b-[2rem]`, layered offset gradient backing `rounded-t-[190px]`, and floating trust badge). Free-flowing `Sherlina` quote tilted gracefully beside the base without an artificial container box.
  - Right column: Crisp heading with dual-tone text, narrative paragraph, horizontal stat row with 1-color icons, and a rounded pill CTA button.
  - Spacing: Tightened top padding (`pt-4 md:pt-6`) to ensure a seamless, cohesive vertical rhythm following the overlapping Features grid.
- **Action Banner:** Soft gradient container with polaroid photo accents, centered CTA, and curved Sherlina *"Together We Grow"* script.

## Accessibility (A11y)
- All interactive elements must maintain visible focus states (`focus-visible:ring-2 focus-visible:ring-primary`).
- Decorative graphic accents are set to `aria-hidden="true"` or `pointer-events-none`.
- Semantic HTML tags (`section`, `header`, `main`, `h1`-`h3`) are enforced across all templates.
