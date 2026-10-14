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
- **Navigation Bar (Scroll-Aware Glassmorphic Header):** Compact 64px height (`h-16`). Starts fully transparent when at the top of the page, then smoothly transitions to a frosted-glass state (`backdrop-blur-xl`, `bg-white/82`, subtle border + shadow) as the user scrolls past 20px. Active link uses a pill-shaped background highlight (`bg-primary/8 rounded-full`) with a `layoutId` spring animation for smooth transitions between links. All interactive elements use `active:scale-[0.97]` for tactile feedback. Mobile menu is a full-screen frosted overlay with staggered entry animations. Design principles sourced from **Impeccable Design System**.
- **Hero Section (Official Emblem Animation & Responsive Hero Video):** Features a bold typographic narrative on the left and the official Pakdeepan School logo animation (`PAKDEEPAN LOGO.mp4`, optimized as `/videos/pakdeepan-logo.webm` and `/videos/pakdeepan-logo.mp4` with high-res WebP poster fallback `/videos/pakdeepan-logo-poster.webp`) on the right. The video showcases the full 3D school seal (soaring dove, open book, school motto "ฉลาดคิด สนุกเรียนรู้", and circular Thai typography "โรงเรียนภักดีพรรณ" with the Chonburi district address). Key engineering standards:
  - **White-Point Calibration:** Processed via curve level normalization (`curves=all='0/0 0.89/1 1/1'`), lifting the studio gradient to pure `#ffffff` to eliminate rectangular bounding box artifacts.
  - **FastStart & Codec Dual-Streaming:** Container optimized with `-movflags +faststart` placing index metadata at file header for instantaneous web streaming; audio stripped (`-an`) to eliminate 140KB of unnecessary mobile payload. Dual-sourced in modern WebM (VP9) and MP4 (H.264).
  - **Responsive Layout & Visual Watermark:** On desktop (`lg+`), the video occupies the right half (`lg:w-[52%] xl:w-[50%]`) with calibrated scaling (`scale-[1.0] lg:scale-[1.12] xl:scale-[1.18]`) and a feathered linear gradient mask (`maskImage: linear-gradient(to right, transparent 0%, black 20%, black 100%)`), guaranteeing zero clipping of the outer circular seal text. On mobile and tablet (`< lg`), the animation adapts as an ambient watermark (`opacity-25 sm:opacity-35`) behind the text to preserve 100% WCAG AA text contrast.
  - **Ambient Dual-Tone Lighting:** Positioned over subtle radial glow fields (`bg-primary/10` and `bg-secondary/15` with `blur-[100px]`) echoing the pink and blue wings of the soaring dove emblem.
- **Infinite Scrolling Marquee:** Positioned immediately below the hero in deep navy (`#1e3a8a`) with subtle white/primary star separators, continuously streaming institutional core values: *Bilingual Excellence ✦ Global Mindset ✦ Nurturing Empathy ✦ Creative Inquiry ✦ Joyful Curiosity*.
- **Philosophy Teaser (Impeccable Overlap Layout):** Massive high-resolution campus photography block (`rounded-[2rem] md:rounded-[3rem]`, subtle hover zoom) overlapped by an offset frosted glass typography card (`bg-white/95 backdrop-blur-xl`, `border border-white/50`, `shadow-2xl`) with signature Sherlina script (*"Small steps today, big dreams tomorrow"*) and authoritative narrative.
- **Educational Pathways (Interactive Editorial Index):** Clean typographic index layout with numerical indicators (`01`, `02`, `03`), bold Outfit headlines (`text-[32px] md:text-[48px] lg:text-[64px]`), smooth hover color transitions to brand primary (`#f472b6`), and rotating circular 45-degree arrow affordances linking directly to `/programs`, `/admissions`, and `/campus-life`.
- **Action Banner:** Soft gradient container with polaroid photo accents, centered CTA, and curved Sherlina *"Together We Grow"* script.
- **Footer (Premium Dark Navy):** Rich dark navy (`#0f1d3a`) background with subtle ambient glows. Structured as: (1) Brand block with Sherlina script + newsletter email CTA at the top, (2) 5-column grid of organized link categories (School, Admissions, Legal) + contact details with icon badges (`w-8 h-8 rounded-lg bg-white/8`), (3) Bottom bar with copyright + social icon row. All text uses `white/60` with `hover:text-white`. Single accent color (primary pink) for icons and interactive states. Social icons use pill-shaped hover targets with `active:scale-[0.95]` tactile feedback.

## Accessibility (A11y)
- All interactive elements must maintain visible focus states (`focus-visible:ring-2 focus-visible:ring-primary`).
- Decorative graphic accents are set to `aria-hidden="true"` or `pointer-events-none`.
- Semantic HTML tags (`section`, `header`, `main`, `h1`-`h3`) are enforced across all templates.
