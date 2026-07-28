# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
[Inferred from README + existing code, not an interview — this redesign request came in fast and direct, so I'm carrying facts forward rather than pausing for confirmation.] Prospective commercial clients (brand marketers, agencies, restaurateurs, e-commerce sellers) evaluating HR20MEDIA to commission photography, and referring collaborators checking recent work.

## Product Purpose
HR20MEDIA's site showcases a commercial photography studio's portfolio (People, Products, Food & Beverages) and converts visitors into project enquiries. Success = a visitor understands the studio's quality and process, then starts a project via the contact form.

## Positioning
Full-service, concept-to-delivery commercial photography (pre-production through colour-graded final files) based in Bournemouth, UK, shooting on location and in-studio across three disciplines — not just a photo-taker but a managed production partner.

## Operating Context
- Next.js 16 (App Router) + Tailwind v4, Motion (Framer Motion) for animation, Lenis for smooth scroll.
- Routes: home (`/`, hero → work → studio → process → contact) and `/work/[category]` (People / Products / Food galleries, SSG).
- 63 real studio photos in `public/images/{people,products,food}`; `src/lib/gallery.ts` holds image data + category metadata (title, tagline, blurb, accent colour).
- Contact form composes a pre-filled `mailto:` — no backend.

## Capabilities and Constraints
- All photography is real studio work — never replace with stock or placeholder imagery.
- No CMS/backend; content changes mean editing `src/lib/gallery.ts` and component copy directly.
- Category accent colours (clay/sage/blush) are used as functional colour-coding across nav, work rows, and category pages — a durable identity element, not decoration to drop.

## Brand Commitments
- Name: HR20MEDIA. Tagline: "Inspiration into Reality."
- Three portfolio disciplines: People, Products, Food & Beverages.
- Process narrative: Pre-production → On-site execution → Technical post.
- Location: Bournemouth, United Kingdom.

## Evidence on Hand
- 63 real photographs already in the repo (`public/images/**`), organized by discipline.
- Studio copy, process steps, and contact details are real (`info@hr20media.com`, Bournemouth, UK).
- No absences beyond: no team bios/headshots, no client logos or testimonials, no pricing — none of these should be invented.

## Product Principles
1. The photography is the product — every design decision should make the real work read better, never compete with it.
2. Real content only — no fabricated testimonials, clients, or pricing.
3. Concept-to-completion is the studio's actual differentiator; the site's structure (work → studio/process → contact) should keep proving that, not just state it.
