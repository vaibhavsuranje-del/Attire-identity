# ATTIRE IDENTITY — Website

Production-ready static site. Pure HTML5 / modern CSS / vanilla JS — no frameworks, no build step.

## Files
- `index.html` — all page markup + inline SVG icon sprite + SEO/schema tags
- `style.css` — design tokens, layout, animations
- `script.js` — header, mobile nav, reveal-on-scroll, counters, testimonial slider, FAQ accordion, WhatsApp quote form, cursor, back-to-top, progress bar
- `assets/images/logo.jpeg` — brand logo (used in header, footer, favicon, Open Graph)
- `robots.txt` — crawler rules

## Before you launch
1. **Phone number** — replace every `910000000000` (WhatsApp links) in `index.html` and `script.js` with your real WhatsApp Business number in international format, no `+` or spaces.
2. **Contact details** — update the phone, email and address in the Footer and Schema.org block (`<script type="application/ld+json">` in `<head>`).
3. **Domain** — replace `https://attireidentity.com/` in the canonical link, Open Graph tags and `robots.txt` with your real domain.
4. **Photography** — the hero and solutions-grid images are stock placeholders from Unsplash (free to use, but swap in real product photography before launch for authenticity).
5. **Social links** — the Instagram/LinkedIn icons in the footer point to `#`; add real profile URLs.

## Deploying to GitHub Pages
1. Push this folder to a GitHub repository (root, or a `/docs` folder).
2. Repo → Settings → Pages → Source: select the branch/folder containing `index.html`.
3. Your site will be live at `https://<username>.github.io/<repo>/` (or your custom domain if configured via a `CNAME` file).

## Notes
- The signature "stitched seam" motif (dashed line in the hero + final CTA, loader animation) is intentional brand styling tying back to garment construction — keep it if you rebrand sections.
- All animations respect `prefers-reduced-motion`.
- Colour system is strictly neutral (black / charcoal / graphite / white / paper) per brand guidelines — no accent colour was introduced.
