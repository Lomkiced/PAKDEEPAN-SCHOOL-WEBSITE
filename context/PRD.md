# Product Requirements Document (PRD)

## Project Overview
**Pakdeepan Kindergarten School Website**
A comprehensive, premium web presence and administration platform for a high-end kindergarten school. The system serves three distinct audiences: prospective families, current parents, and students.

## Goals & Objectives
1. **Brand Elevation:** Establish a digital presence that reflects the premium, trustworthy, and modern nature of the school using its official light pink, sky blue, deep navy, and white branding, along with an authoritative typography system (Outfit, Plus Jakarta Sans, and authentic Sherlina Curve calligraphy script for signature school taglines) and a unified single-color iconography design standard.
2. **Lead Generation:** Streamline the admissions process through an easy-to-use, accessible enrollment form.
3. **Operational Efficiency:** Provide school staff with a low-friction, intuitive CMS to manage content without requiring IT assistance.
4. **Performance & Compliance:** Ensure lightning-fast page loads (SEO optimization) and strict compliance with data protection laws (e.g., PDPA/GDPR).

## Minimum Viable Product (MVP) Scope
### 1. Public Website (`apps/web`)
- **Homepage:** Premium hero section, community persona cards (3 audiences), and clear call-to-action (CTA).
- **About Us (Our Story):** School philosophy, Vision & Mission bento grid, principal's message, and core values.
- **Programs (Academics):** Overview of curriculum and academic levels (Kindergarten, Primary, Secondary, EP) with structured **Tuition & Fee Breakdowns in Thai Baht (`THB` / `฿`)**.
- **Admissions:** A validated enrollment application form (React Hook Form + Zod) capturing parent and child details with optional application fee and PromptPay/Bank Transfer slip verification.
- **Bilingual Experience (TH / EN):** Complete localization in Thai and English across all public routes, navigations, and CMS content.
- **Compliance:** Cookie consent banner and explicit data processing agreements on forms compliant with Thailand PDPA.

### 2. Content Management System (Payload CMS 3.x)
- **Payload CMS Integration:** Integrated directly with Next.js App Router and connected to Supabase PostgreSQL (Session Mode).
- **Content Collections:**
  - `Programs`: Academic curriculum with Thai Baht fee structures, bilingual titles/summaries, and syllabus downloads.
  - `News` & `Events`: Articles, announcements, and upcoming school calendar events.
  - `GalleryImages`: Campus life photo albums with bilingual captions.
  - `Inquiries` & `Admissions`: Inbound enrollment leads and inquiries.
- **Globals:** `SiteSettings` for school contact, office hours, and social media.
- **Auth:** Secure admin login for school staff.

## Currency & Financial Standard
- **Official Currency:** Thai Baht (`THB`, symbol `฿`).
- **Formatting Standards:** Rendered via `Intl.NumberFormat` (`th-TH` / `en-US`), displaying clean integer figures (e.g., `฿25,000 / ภาคเรียน` or `฿25,000 / term`) without unwanted decimal clutter, supporting bilingual interval notations.

## Technical Requirements
- **Performance:** Lighthouse score of 90+ across all metrics (Performance, Accessibility, Best Practices, SEO).
- **Responsiveness:** Flawless layout scaling from mobile (320px) up to ultra-wide desktop monitors.
- **Database:** PostgreSQL (Supabase) utilized via Payload CMS 3.x and Prisma ORM.

## Success Metrics
- **Conversion Rate:** Increase the number of submitted admission applications by 20% compared to the legacy process.
- **Bounce Rate:** Achieve a bounce rate of under 40% on the homepage through engaging UI and fast load times.
- **Admin Satisfaction:** Reduce the time it takes for staff to publish an announcement to under 2 minutes.

## Out of Scope (For Now)
- Full Parent Portal with real-time student grades/reports (planned for Phase 2).
- Staff portal and staff-specific resources (planned for Phase 2).
- E-commerce for school uniforms.
