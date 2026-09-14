# Adrenal-in.com — Improvement Plan for opencode

## Ground rules (apply to every phase)
- Do NOT introduce a new color palette, new fonts, or redesign layout blocks.
  Before any visual change: extract the existing color palette from the live
  theme CSS / Elementor global colors / logo, and re-use those exact values
  (hex codes) for any new UI element (buttons, banners, form fields).
- Work incrementally, one phase at a time.
- After completing each phase: STOP, summarize what changed (files touched,
  before/after), and explicitly WAIT for my validation before starting the
  next phase. Do not auto-continue.
- Keep every change reversible (git commit per phase, no destructive edits).
- No new paid plugins/services unless explicitly approved in that phase's
  validation step.

---

## Phase 0 — Audit & Palette Extraction
- Crawl the live site / theme files, list all Elementor global colors,
  font families, and button styles currently in use.
- Identify all instances of duplicated headings/paragraphs and duplicated
  nav markup.
- Identify broken/empty image `src` attributes.
- Output: a short report + the extracted palette (hex values) and font stack.
- STOP — present findings for validation.

## Phase 1 — Cleanup (no visual risk)
- Remove duplicated text blocks and duplicated DOM nav elements found in Phase 0.
- Fix broken/lazy-loaded image sources.
- Compress existing images (lossless/near-lossless), keep same filenames/alt text.
- STOP — present diff + screenshots before/after for validation.

## Phase 2 — Trust & Conversion elements
- Add a CTA button ("Réservez votre cours d'essai à 10€") using the EXTRACTED
  palette from Phase 0, placed near the hero section.
- Embed Google Maps (address already known) in the location section.
- Embed Google Reviews widget (free, official embed) replacing the
  "témoignages en cours de construction" placeholder.
- STOP — present for validation before publishing live.

## Phase 3 — Forms & Booking
- Add a native Elementor contact/trial-class request form (name, phone,
  class of interest) styled with the existing palette.
- Link it from the new CTA button.
- STOP — validate form fields/wording and test submission.

## Phase 4 — SEO & Technical
- Add LocalBusiness + Course schema (JSON-LD) with correct NAP (name,
  address, phone), opening structure, and course types.
- Audit and fix image alt text site-wide.
- STOP — validate schema via Google Rich Results Test output before publishing.

## Phase 5 — Legal & Content freshness
- Rewrite privacy policy to remove irrelevant WP boilerplate (comments,
  Gravatar, etc.), replace with content matching actual site behavior
  (cookies, contact form, no blog comments).
- Add dates to existing "Actualités" entries; propose a simple content
  calendar template for future updates.
- STOP — validate legal wording before publishing.

## Phase 6 (optional, only if approved) — Extras
- Add Instagram feed embed.
- Add video/testimonial placeholders ready for real content later.
- STOP — final validation and sign-off.