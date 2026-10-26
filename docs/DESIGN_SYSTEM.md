# CNS Beauty Design System v1.0

## 1. Brand Experience

Concept: **Premium Feminine Beauty Editorial**

The visual system translates CNS Beauty's positioning into a warm, sophisticated and emotionally engaging digital environment.

## 2. Color Tokens

The implementation tokens below mirror `src/app/globals.css` (light values —
that file is the source of truth for every hex; dark values are paired under
`html.dark` there):

```css
/* src/app/globals.css @theme (light values) */
--color-primary: #1f1f1f;
--color-on-primary: #ffffff;
--color-secondary: #f5f1ec;
--color-background: #ffffff;
--color-surface: #faf9f7;
--color-text-primary: #1f1f1f;
--color-text-secondary: #6b6863;
--color-text-muted: #9b9893;
--color-border: #e7e2dc;
--color-success: #3f6b50;
--color-warning: #a97832;
--color-error: #b84a4a;
--color-ai-surface: #f3f0ea;
--color-ai-accent: #8c7a64;

--color-brand-cocoa: #6b3328;
--color-brand-cocoa-dark: #43221b;
--color-brand-blush: #d98f88;
--color-brand-blush-soft: #f7dcd7;
--color-brand-peach: #f3c7b8;
--color-brand-cream: #fff9f5;
--color-brand-ivory: #faf7f3;
--color-brand-beige: #ede1d7;
--color-brand-gold: #c99a3d;
--color-brand-rose-gold: #c77b72;
```

Mapping dari nama spec lama: `--cns-*` → `--color-brand-*`, `--text-*` →
`--color-text-*`, `--surface` → `--color-background`, `--surface-soft` →
`--color-surface`, `--ai-*` → `--color-ai-*`, `--border` → `--color-border`.
Hex hanya di token; komponen memakai utility semantik. Dark pairing & rasio
kontras terukur: `docs/DESIGN_TOKENS.md`.

Color values are implementation tokens inspired by the approved illustration direction; final brand values should be reconciled with the official CNS brand identity.

## 3. Typography

Display:
`Cormorant Garamond`

Body:
`Inter`

Legion kit components render in `Nunito Sans` (see `docs/DESIGN_TOKENS.md`).

```css
--font-display: "Cormorant Garamond", serif;
--font-body: "Inter", sans-serif;
```

Scale:
- Display XL: 64px
- Display L: 52px
- H1: 44px
- H2: 36px
- H3: 28px
- H4: 22px
- Body L: 18px
- Body: 16px
- Body S: 14px
- Caption: 12px

Mobile:
- Display: 40px
- H1: 32px
- H2: 28px
- H3: 22px
- Body: 16px

## 4. Spacing

Base unit: 4px

4 / 8 / 12 / 16 / 20 / 24 / 32 / 40 / 48 / 64 / 80 / 96

Section:
- Mobile: 64px
- Desktop: 96–128px

## 5. Radius

- sm: 6px
- md: 10px
- lg: 16px
- xl: 24px
- pill: 999px

Product cards: lg.
Buttons: md.
AI launcher: pill/circle.

## 6. Shadows

Use restrained shadows. Premium aesthetic relies more on:
- whitespace
- border
- typography
- photography

than heavy shadows.

## 7. Buttons

Variants (`src/components/ui/button.tsx`):

- primary: filled, `bg-primary text-on-primary` (ink / white);
- brand: filled, `bg-brand-cocoa text-on-primary` (cocoa / white);
- secondary: outlined (`border-primary`), `text-text-primary`;
- ghost: text-only;
- ai: warm neutral surface (`bg-ai-surface`) with an `ai-accent` border;
- inverse / inverse-outline: for cocoa-dark surfaces.

Sizes sm / md / lg; md and lg meet the 44px touch target. Buttons wrap their
labels at narrow widths instead of forcing sideways scroll.

## 8. Product Cards

Anatomy:

```text
Image
Badge
Brand
Name
Short benefit
Rating
Price
CTA
```

Desktop hover:
- image scale ~1.03
- quick action
- AI recommendation CTA

Mobile:
- no hover dependency.

## 9. Hero

Use editorial split compositions:
- copy on left;
- model/product photography on right;
- product foreground;
- soft floral/water/stone environment;
- generous whitespace.

Hero should never sacrifice readability for decoration.

## 10. Photography

Preferred:
- soft natural light
- warm skin tones
- clean beauty portrait
- premium product closeups
- blush/peach/cream environments
- botanical accents
- marble/stone platforms
- subtle reflections/water

## 11. Iconography

Use:
- outline icons;
- thin strokes;
- rounded geometry;
- restrained blush/cocoa/gold.

Icons come from `@tabler/icons-react` (Legion profile). Decorative icons must
use `aria-hidden`; interactive icons need accessible labels.

## 12. Responsive

<640 mobile
640–1023 tablet
1024–1439 desktop
>=1440 large desktop

Product grid:
2 / 3 / 4 / 4–5 columns.

## 13. Accessibility

Target WCAG 2.2 AA. Measured contrast ratios for both modes:
`docs/DESIGN_TOKENS.md`; render + axe checks per mode: `tests/e2e/theme-render.spec.ts`.

Do not use color alone for:
- status
- validation
- selected state.

Focus states must be visible.

## 14. Motion

Motion should be subtle:
- 150–250ms UI transitions;
- 250–450ms section/image transitions;
- respect prefers-reduced-motion.

Avoid excessive parallax.

## 15. AI UI

Persistent entry point.

Desktop:
floating/side panel.

Mobile:
floating button → bottom sheet/full screen.

AI should visually feel part of CNS Beauty, not like an embedded third-party chatbot.

## 16. Dark Mode (Legion pattern)

Dark mode is a styling default: class-based (`html.dark`), activated from
`prefers-color-scheme` by the inline script in the root layout — no manual
toggle. Every core token and brand surface has a paired dark value in
`globals.css` (see `docs/DESIGN_TOKENS.md` for the full pairing and measured
WCAG 2.2 AA ratios); brand accents (blush, gold, rose-gold) stay constant
across modes. Components never hardcode colors, so no `dark:` variants are
needed for them.
