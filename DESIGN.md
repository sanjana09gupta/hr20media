---
name: HR20MEDIA — Broadsheet
description: An editorial newspaper front page rebuilt as a photography studio site — serif headlines, hairline column rules, and boxed, captioned photography on real newsprint.
colors:
  ink: "#171310"
  ink-2: "#433c34"
  muted: "#726a5c"
  paper: "#f2ecdd"
  oat: "#e9e0cc"
  sand: "#e2d8c2"
  night: "#141210"
  line: "rgba(23, 19, 16, 0.82)"
  line-soft: "rgba(23, 19, 16, 0.16)"
  clay: "#bd7550"
  sage: "#869072"
  blush: "#c1928a"
  sky: "#8a9aa1"
typography:
  display:
    fontFamily: "'Libre Caslon Display', Georgia, serif"
    fontSize: "clamp(2.75rem, 9vw, 8rem)"
    fontWeight: 400
    lineHeight: 0.92
    letterSpacing: "-0.01em"
  body:
    fontFamily: "'Libre Caslon Text', Georgia, serif"
    fontSize: "1.05rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  label:
    fontFamily: "var(--font-space-mono), monospace"
    fontSize: "0.68rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "0.16em"
rounded:
  none: "0px"
spacing:
  sm: "16px"
  md: "32px"
  lg: "64px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "14px 32px"
  button-primary-hover:
    backgroundColor: "{colors.clay}"
    textColor: "{colors.paper}"
    rounded: "{rounded.none}"
    padding: "14px 32px"
  card-photo:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "0px"
---

# Design System: HR20MEDIA — Broadsheet

## Overview

**Creative North Star: "The Broadsheet Front Page"**

HR20MEDIA now reads like the front page of a serious photography broadsheet: black ink on real newsprint, serif headlines set the way a masthead sets them, hairline rules doing the work that borders and shadows used to do, and every photograph treated as a boxed, captioned plate rather than a loose background image. This is a full replacement of the previous "warm-pastel blueprint" identity (soft rounded pills, translucent hero overlays, mono registration marks) — that system is now evidence of what the studio is, not authority over how it looks. The rejected instinct is the soft-tech-blueprint look; the newspaper commits instead to hard rules, print proportions, and text that never floats unprotected over an image.

**Key Characteristics:**
- Real newsprint paper tone as the page ground — never white, never a saturated card.
- Solid, near-black ink for all rules, borders, and primary text; no soft translucent greys.
- Every photograph lives in a bordered, captioned frame — a "plate" — never overlaid with unprotected text.
- Zero border-radius anywhere: buttons, photo frames, tags, inputs are all flat rectangles.
- Category colours (clay/sage/blush) act as section flags — small solid tabs and rules, not gradients or glows.

## Colors

Black ink on warm newsprint, with each portfolio discipline carrying one small flag colour.

### Primary
- **Broadsheet Ink** (`#171310`): headlines, rules, primary buttons, nameplate. This is the newspaper's "colour" — used at page scale on rules and text, not as a rare accent.

### Secondary
- **Clay** (`#bd7550`) / **Sage** (`#869072`) / **Blush** (`#c1928a`): section-flag colours for People / Products / Food & Beverages respectively, used on small tabs, hover states, and category headline colour — never covering more than a flag-sized area.

### Neutral
- **Newsprint** (`#f2ecdd`): the page ground everywhere — this is the paper, not a white card.
- **Oat** (`#e9e0cc`): alternating section ground (slightly deeper than Newsprint), used the way a paper shades a sidebar or classifieds block.
- **Sand** (`#e2d8c2`): the outermost page margin behind the rail — the "desk" the paper sits on.
- **Ink-2** (`#433c34`) / **Muted** (`#726a5c`): secondary and tertiary text — body copy that isn't the lead, captions, metadata.
- **Broadsheet Night** (`#141210`): the colophon/footer block — printed in reverse, like a paper's masthead bar repeated at the foot.

### Named Rules
**The Newsprint Rule.** The page ground is always Newsprint or Oat — never pure white or a bright card surface. This is paper, not a screen.

## Typography

**Display Font:** Libre Caslon Display (with Georgia, serif fallback)
**Body Font:** Libre Caslon Text (with Georgia, serif fallback)
**Label/Mono Font:** Space Mono (existing, retained — reads as the wire-service/typewriter credit line)

**Character:** Caslon is the definitive print-newspaper serif — dense, ink-trap details, real body optical weight. Display and Text are the same family's headline and reading-size optical cuts, so the pairing is a single voice at two scales, exactly the way a paper's headline and body copy share one house face.

### Hierarchy
- **Display** (400, `clamp(2.75rem, 9vw, 8rem)`, line-height 0.92): the nameplate, hero headline, section-front headlines. Always serif, always tight, italic used sparingly for one emphasised word per headline (a paper's own convention for emphasis).
- **Headline** (400, `clamp(1.75rem, 4vw, 3rem)`, line-height 1.0): sub-heads inside a section (work-row titles, process step titles).
- **Body** (400, 1–1.1rem, line-height 1.6): running copy. Libre Caslon Text, sentence case, 60–70ch measure; long passages may split into a two-column newspaper layout at desktop width.
- **Label** (700, 0.65–0.75rem, letter-spacing 0.16em, uppercase): kickers, datelines, bylines, captions, form labels, footer credits. Space Mono uppercase — the paper's classified/credit-line voice.

### Named Rules
**The One Headline Voice Rule.** Libre Caslon Display only ever sets headlines and the nameplate. Body copy, captions, and labels never borrow it — legibility at reading size belongs to Libre Caslon Text and Space Mono.

## Layout

Column-driven, like a broadsheet grid: content sits inside a bordered `rail` (existing `max-width: 1400px`, `border-inline`), with major sections separated by full-width horizontal rules rather than soft spacing alone. Multi-column layouts (work rows, process steps, contact split) keep visible vertical rules between columns — a paper's column rule, not a gap. Long-form body copy (Studio section) may run in a genuine CSS multi-column block above the `md` breakpoint, collapsing to one column on mobile. Spacing is generous between major sections (`{spacing.lg}`, 64px+) but tight within a column (`{spacing.sm}`–`{spacing.md}`).

## Elevation & Depth

Flat. No ambient shadows anywhere — depth comes entirely from ink rules, solid fills, and the contrast between Newsprint and Oat grounds. The one exception is the lightbox/photo-viewer overlay, which uses a solid near-black scrim (never a blurred glass panel) to isolate the plate being viewed.

### Named Rules
**The No-Shadow Rule.** If something needs to separate from its ground, give it a rule or a fill change, never a `box-shadow`. A newspaper has no drop shadows.

## Shapes

Zero radius, everywhere — photo frames, buttons, tags, form fields, category flags. Every shape is a flat rectangle bounded by a hairline or heavier rule. The only curved forms permitted are the small solid category-flag dots already used to mark a discipline (People/Products/Food), which read as a printer's registration dot, not decoration.

## Components

### Buttons
- **Shape:** flat rectangle, 0 radius, 2px ink border on ghost variants.
- **Primary:** Ink fill, Newsprint text, Space Mono uppercase label, generous horizontal padding.
- **Hover / Focus:** fill shifts to the active section's flag colour (clay/sage/blush) rather than a generic accent; focus-visible gets a 2px ink outline offset.
- **Secondary / Ghost:** transparent fill, 2px ink border, fills solid ink on hover.

### Photo Plates (signature component)
Every photograph sits inside a hairline-bordered frame (no radius, no shadow) with an optional Space Mono caption/credit line beneath or overlaid at the corner (frame number, category tag) — the paper's own photo-credit convention. Full-bleed, unprotected text-over-photo is never used; any headline that must sit near a photo sits on solid ink or paper ground beside or below it, not on top of it.

### Cards / Containers
- **Corner Style:** 0 radius.
- **Background:** Newsprint or Oat, never a bright white card.
- **Shadow Strategy:** none — see Elevation & Depth.
- **Border:** 1px `{colors.line}` for minor separations, 2px for major column/section rules.
- **Internal Padding:** `{spacing.md}`–`{spacing.lg}`.

### Inputs / Fields
- **Style:** Newsprint/Oat fill, 1px ink-line border, 0 radius, Space Mono uppercase placeholder.
- **Focus:** border shifts to Ink at 2px, no glow.

### Navigation
- Nameplate "HR20MEDIA" in Libre Caslon Display, flanked by a printed dateline strip (edition/location) beneath a heavy double rule — the paper's own masthead block. Section links are Space Mono uppercase, flat, with an ink underline on hover/active rather than a pill background.

## Do's and Don'ts

### Do:
- **Do** keep every page ground Newsprint or Oat (`#f2ecdd` / `#e9e0cc`) — never bright white.
- **Do** box every photograph in a hairline ink frame; caption or flag it the way a paper credits a photo.
- **Do** set the nameplate and headlines in Libre Caslon Display; keep everything readable in Libre Caslon Text or Space Mono.
- **Do** use flat, 0-radius rectangles for every interactive element and container.

### Don't:
- **Don't** set body text, captions, or labels in the display serif — it's a headline-only face.
- **Don't** overlay headline text directly on an unprotected photograph; give it solid ground first.
- **Don't** add rounded corners, pill shapes, or box-shadows anywhere — depth comes from rules and fills only.
- **Don't** reintroduce the previous soft-blueprint motifs (registration-mark `+` corners, translucent rounded nav pills) — that identity is retired.
