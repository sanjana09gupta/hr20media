# HR20MEDIA — Website

A remade site for **HR20MEDIA**, a commercial photography studio in Bournemouth, UK.
Built as a fast, animation-forward experience with a strong visual hierarchy and
smooth scrolling.

**Design language:** a muted warm-pastel palette (sand / clay / sage / blush)
rendered in an anime.js-inspired technical "blueprint" system — continuous side
rails, thin bordered panels, monospace UI micro-labels, and per-discipline colour
coding. Type is **Space Grotesk** (display) + **Geist** (body) + **Space Mono**
(UI labels). Palette tokens live in `src/app/globals.css`.

## Stack

- **Next.js 16** (App Router) + **React 19**
- **Tailwind CSS v4** (CSS-first tokens in `src/app/globals.css`)
- **Lenis** — buttery smooth scrolling (`src/components/SmoothScroll.tsx`)
- **Motion** (Framer Motion) — hero reveals, parallax, mobile menu, lightbox
- **next/image** — automatic WebP/AVIF optimization of the photography

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (all pages prerendered)
npm run start    # serve the production build
```

## Structure

```
src/
  app/
    layout.tsx               # fonts, metadata, smooth-scroll, header/footer
    page.tsx                 # home (hero → work → studio → process → contact)
    work/[category]/page.tsx # People / Products / Food galleries (SSG)
  components/                # Hero, WorkShowcase, Gallery (lightbox), etc.
  lib/gallery.ts             # image data + category metadata
public/images/               # 63 real photos pulled from the live site
  people/ products/ food/
```

## Content notes

- Copy and structure follow the original site (tagline *"Inspiration into
  Reality"*, the People / Products / Food & Beverages disciplines, and the
  concept-to-completion process). Refine as needed.
- The contact form composes a pre-filled email to `info@hr20media.com` — no
  backend required. Swap in a form service (Formspree, Resend, a route handler)
  when you're ready for server-side handling.
- Images are the real studio photos, optimized at build time. Replace files in
  `public/images/**` and update `src/lib/gallery.ts` to change the portfolios.

## Animation / motion

- Smooth scroll is disabled automatically for `prefers-reduced-motion`.
- Scroll reveals use an `IntersectionObserver` (`src/components/Reveal.tsx`)
  driving CSS transitions defined in `globals.css`.
- Parallax uses Motion's `useScroll` / `useTransform`.
