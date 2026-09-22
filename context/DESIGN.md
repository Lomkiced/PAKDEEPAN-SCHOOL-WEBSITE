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
- **Navigation Bar (Scroll-Aware Glassmorphic Header):** Compact 64px height (`h-16`). Starts fully transparent when at the top of the page, then smoothly transitions to a frosted-glass state (`backdrop-blur-xl`, `bg-white/82`, subtle border + shadow) as the user scrolls past 20px. Active link uses a pill-shaped background highlight (`bg-primary/8 rounded-full`) with a `layoutId` spring animation for smooth transitions between links. All interactive elements use `active:scale-[0.97]` for tactile feedback. Mobile menu is a full-screen frosted overlay with staggered entry animations. Design principles sourced from **taste-skill** (Anti-Slop Frontend Framework).
- **Hero Section (Static Split Layout):** A clean, highly performant half-and-half layout featuring a powerful static narrative on the left and a continuous, looping video (`PAKDEEPAN LOGO ANIMATION.mp4`) on the right. The video autoplays seamlessly without any restrictive boxes or shadow frames, using `object-contain` and `mix-blend-multiply` to melt beautifully into the hero's background color. This architecture completely eliminates complex scroll-jacking (GSAP), ensuring instantaneous load times and zero lag across all devices.
- **Features (Unified Floating Feature Dock):** Overlaps the hero bottom with a single continuous, bespoke white architectural dock (`rounded-[28px]` / `rounded-3xl`, `shadow-xl shadow-slate-200/60`, `border border-slate-100/90`) rather than disconnected floating AI/vibecoded widget boxes. Divided internally by delicate vertical hairline dividers (`divide-x divide-slate-100`). Each pillar features a compact, elegant icon badge (`w-11 h-11 rounded-2xl bg-primary/10 text-primary`), authoritative navy headline, and concise narrative, completely eliminating icon fatigue and preserving institutional prestige.
- **News & Events Section:**
  - Layout: High-end immersive glassmorphic cards (`h-[400px] md:h-[450px]`, `rounded-[2rem]`).
  - Imagery: Full-bleed absolute background images with slow, elegant hover zooms (`scale-110`).
  - Text Overlay: Pinned to the bottom with a dark, sophisticated gradient fade (`from-[#1e3a8a]/95 via-[#1e3a8a]/40`). Text is pure white.
  - Interaction: Hovering intensifies the gradient, slides the title up, and gracefully reveals a hidden "Read More" button.
- **About Pakdeepan Section:**
  - Layout: Immersive full-bleed background image spanning the entire section width and height, completely replacing restrictive container shapes.
  - Overlay: A smooth gradient fade (solid white on the text side to transparent on the image side) ensures perfect text legibility while letting the imagery shine through.
  - Typography: The signature `Sherlina` quote ("Small steps today, big dreams tomorrow") sits elegantly above the main heading, bridging the visual and the narrative.
  - Right column: Crisp heading with dual-tone text, narrative paragraph, horizontal stat row with 1-color icons, and a rounded pill CTA button.
  - Spacing: Tightened top padding (`pt-4 md:pt-6`) to ensure a seamless, cohesive vertical rhythm following the overlapping Features grid.
- **Educational Pathways (Explore Links):**
  - **Sleek & Compact Navigational Tiles:** Rather than oversized bento boxes with lengthy paragraphs and tag pills, pathways are formatted as compact, lightweight link tiles (~130-140px height) designed for swift scanning and frictionless navigation.
  - **Color Discipline:** Strictly single-color brand design. Auxiliary status colors (such as green or secondary blue badges) are strictly prohibited. All cards use pure white surfaces, deep navy text (`#1e3a8a`), slate descriptions, and uniform brand pink icon badges (`w-11 h-11 bg-primary/10 text-primary`).
  - **Structure:** Crisp icon badge on the top-left, subtle circular arrow affordance on the top-right, authoritative headline, and a concise 1-line description.
  - **Direct Routing:** All tiles strictly link to verified active routes (`/programs`, `/admissions`, `/campus-life`) with zero dead `#` placeholders.
- **Action Banner:** Soft gradient container with polaroid photo accents, centered CTA, and curved Sherlina *"Together We Grow"* script.
- **Footer (Premium Dark Navy):** Rich dark navy (`#0f1d3a`) background with subtle ambient glows. Structured as: (1) Brand block with Sherlina script + newsletter email CTA at the top, (2) 5-column grid of organized link categories (School, Admissions, Legal) + contact details with icon badges (`w-8 h-8 rounded-lg bg-white/8`), (3) Bottom bar with copyright + social icon row. All text uses `white/60` with `hover:text-white`. Single accent color (primary pink) for icons and interactive states. Social icons use pill-shaped hover targets with `active:scale-[0.95]` tactile feedback.

## Accessibility (A11y)
- All interactive elements must maintain visible focus states (`focus-visible:ring-2 focus-visible:ring-primary`).
- Decorative graphic accents are set to `aria-hidden="true"` or `pointer-events-none`.
- Semantic HTML tags (`section`, `header`, `main`, `h1`-`h3`) are enforced across all templates.
