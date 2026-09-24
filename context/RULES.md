# Coding & Implementation Rules

## Core Principles
All code written for the Pakdeepan Kindergarten platform must adhere to the following software engineering principles:

1. **SOLID Principles:**
   - **Single Responsibility:** A component, hook, or utility function should have one specific job. Do not mix data fetching, complex business logic, and UI rendering in a single massive component.
   - **Open/Closed:** Build UI components (like `Button`, `Card`) so they can be extended via props (`className`, `variant`) without modifying their source code.
   - **Dependency Inversion:** Depend on abstractions (like generic API fetchers or ORM wrappers) rather than concrete implementations directly in the UI.

2. **DRY (Don't Repeat Yourself):**
   - If a UI pattern, utility function, or API service is used **4 times or more**, it MUST be abstracted into a reusable module or component.
   - Design tokens and colors must only be defined once in `packages/ui/theme.css` and referenced via Tailwind classes.

3. **KISS (Keep It Simple, Stupid):**
   - Avoid over-engineering. Do not introduce Redux or global state management tools if React's built-in state or URL search parameters suffice.
   - Keep business logic straightforward.

## React & Next.js Guidelines
- **Server Components by Default:** Use React Server Components (RSC) for data fetching and static rendering. Only use `"use client"` when interactivity, hooks (`useState`, `useEffect`), or context is strictly required (e.g., forms, animations, tooltips).
- **Colocation:** Keep related files together. If a component is only used by the `Homepage`, put it in `src/app/(home)/_components/` rather than the global `packages/ui` library.
- **Type Safety:** TypeScript is mandatory. Avoid `any`. Use Zod for runtime validation of all external data (forms, API responses).
- **Imports:** Use absolute paths (`@/components/...` or `@pakdeepan/ui/...`) instead of relative hell (`../../../../components`).
- **No Dead or Placeholder Links:** Public marketing and landing pages must never display placeholder links (`href="#"`) or unbuilt out-of-scope features (e.g. Parent Portal, Student Resources). All interactive cards and CTA links must route to real, active pages.

## Styling Rules
- **Tailwind CSS:** Use Tailwind utility classes for all styling.
- **Utility Combiner:** Always use the `cn()` utility (`clsx` + `tailwind-merge`) when exposing a `className` prop on a custom component to prevent class conflicts.
- **No Inline Styles:** Do not use `style={{ ... }}` unless calculating dynamic values (like Framer Motion animations) that Tailwind cannot handle.
- **Single-Color Iconography Rule:** In any icon grid, feature cards, or stat block, icons MUST use a single uniform brand color (`text-primary` with `bg-primary/10`). Multi-colored rainbow pastels across repeated cards are strictly prohibited to preserve high-end brand professionalism. **Enforced via Impeccable automated design audits (`npx impeccable detect`).**
- **Color Discipline on Navigation & Pathways:** Public marketing and navigation links must strictly adhere to the unified brand palette (white surfaces, deep navy `#1e3a8a`, slate neutrals, and uniform brand pink `primary` accents). Introducing arbitrary auxiliary colors (e.g. green or secondary blue status pills) on standard marketing links is strictly prohibited.
- **Hero Viewport & Spacing Optimization:** The public landing page hero section must scale comfortably on standard desktop and laptop screens (768p-1080p) without gratuitous empty vertical padding or excessive `min-h-[90vh+]` scaling. Key brand value propositions, primary CTAs, campus visuals, and the floating feature dock must be directly visible above the fold.
- **GSAP ScrollTrigger Video Scrubbing & Lifecycle:** Interactive video scrubbing must be orchestrated via GSAP's `ScrollTrigger` with `scrub: 1` smooth inertia. Section pinning must strictly release and proceed once `currentTime` reaches completion (`100%` duration). Always clean up ScrollTrigger animations inside React's `useEffect` or `useGSAP` cleanup (`ctx.revert()`). Video tags must declare `muted playsInline preload="auto"`.
- **Feature Dock Architecture:** Multi-pillar institutional values (e.g. the 5 educational pillars) must be housed within a unified, continuous architectural container with internal hairline dividers rather than disconnected, repeated AI/vibecoded widget boxes with giant icon circles.
- **Signature Calligraphy Typography:** The `font-sherlina` token (`Sherlina.ttf`) must be reserved exclusively for inspirational decorative quotes and signature school taglines. Ensure adequate sizing (`text-2xl` through `text-5xl`) and avoid enclosing script in heavy boxes.

## Currency & Financial Rules (Thai Baht - THB)
- **Standard Currency:** All financial figures, tuition fees, application deposits, and payment slips must strictly use **Thai Baht (`THB` / `฿`)**.
- **Unified Formatter (`formatTHB`):** Never hardcode currency strings like `"25000 THB"` or `"฿ 25,000"`. Always use the centralized `formatTHB(amount, { locale })` utility in `src/utils/currency.ts`.
- **Zero-Decimal Display:** For standard tuition fees (e.g. ฿25,000), omit cents/satang (`decimals: 0`) to maintain clean, modern visual appeal. Only display decimals when displaying itemized transaction invoices or receipts.
- **Bilingual Intervals:** Fee intervals must adapt to the active locale (`/ ภาคเรียน` for Thai, `/ term` for English).

## CMS & Bilingual (EN / TH) Rules
- **Field-Level Localization:** All public-facing text fields in Payload CMS collections (titles, summaries, rich text bodies, captions) must include `localized: true`.
- **Cache Invalidation on Mutation:** Collections with user-facing data (`News`, `Events`, `GalleryImages`, `Programs`) must implement `afterChange` hooks calling `revalidateTag` to ensure instant cache invalidation without requiring server restarts.

## Git & Monorepo Workflow
- **Workspaces:** Ensure dependencies are added to the correct workspace (`apps/web` or `packages/ui`).
- **Formatting:** Code must be formatted via Prettier and pass TypeScript and ESLint checks before any commit.
- **Environment & Secrets Protection:** Never commit `.env*` files containing live credentials, API keys, or database pooler strings to Git. Always maintain sanitized `.env.example` files documenting required configuration keys for new developers.
- **Monorepo Git Exclusion:** The root `.gitignore` must strictly exclude all workspace `node_modules/`, Next.js build caches (`.next/`), Turborepo outputs (`.turbo/`), distribution builds (`dist/`, `build/`, `out/`), and Payload CMS local media uploads (`media/`, `uploads/`).
