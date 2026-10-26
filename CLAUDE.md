# CNS Beauty Commerce — Engineering Constitution

## 1. Product Context

CNS Beauty is a premium beauty commerce platform built around three experience layers:

1. Brand Experience — story, education, journal, community
2. AI Beauty Experience — discover, consult, recommend, personalize
3. Commerce Experience — product, cart, checkout, order, loyalty

The AI Beauty Concierge is a persistent interaction layer and the primary discovery/consultation interface. It is not merely a decorative chatbot.

## 2. Technology Baseline

- Next.js App Router
- TypeScript strict
- Supabase
- Vercel
- Tailwind CSS
- Motion for React (`motion`)
- TanStack Query
- Zustand
- React Hook Form
- Zod
- Supabase Auth
- SSE/streaming for AI responses

Do not introduce another framework or state-management library unless there is a documented architectural reason.

## 3. Repository Principles

Before modifying code:

1. Inspect the existing repository.
2. Read this file.
3. Read the relevant skill under `.claude/skills/`.
4. Read the relevant specification under `docs/`.
5. Reuse existing components/services before creating new ones.
6. Make the smallest coherent change that satisfies the requirement.

Never rewrite working architecture without a clear reason.

## 4. Rendering Architecture

Use Server Components by default.

Use Client Components only when required for:

- user interaction
- browser APIs
- interactive filters
- cart interactions
- checkout interactions
- AI chat/streaming
- interactive Skin Quiz
- account/reseller interactions
- client-side animation requiring state

Keep marketing, product, category, journal and SEO content server-rendered where practical.

## 5. State Architecture

Keep three categories separate:

### Server State
- Supabase/API data
- TanStack Query cache

### UI State
- Zustand
- modal/drawer/menu/filter state

### AI State
- conversation
- messages
- intent
- confidence
- recommendations
- streaming/tool state

The frontend cart is not the authoritative source of truth. Backend quote/cart data is authoritative.

## 6. CNS Beauty Design System

Follow the centralized CNS Beauty design tokens.

### Color

- Primary: `#1F1F1F`
- Secondary: `#F5F1EC`
- Background: `#FFFFFF`
- Surface: `#FAF9F7`
- Text primary: `#1F1F1F`
- Text secondary: `#6B6863`
- Text muted: `#9B9893`
- Border: `#E7E2DC`
- Success: `#3F6B50`
- Warning: `#A97832`
- Error: `#B84A4A`
- AI surface: `#F3F0EA`
- AI accent: `#8C7A64`

### Typography

- Display: `Cormorant Garamond`
- Body: `Inter`

### Radius

- sm: 6px
- md: 10px
- lg: 16px
- xl: 24px
- pill: 999px

Avoid excessive rounding.

### Spacing

Use a 4px base unit and centralized spacing tokens.

### Visual Direction

Premium beauty:
- editorial
- elegant
- minimal
- high whitespace
- restrained shadows
- strong imagery
- readable typography
- subtle interaction

Do not use arbitrary colors, typography, spacing or shadows.

## 7. Motion

All meaningful UI animation must follow:

`docs/CNS_BEAUTY_MOTION_SYSTEM.md`

Motion must:
- communicate hierarchy
- reinforce interaction
- remain subtle
- respect reduced motion
- avoid blocking content
- avoid unnecessary animation
- preserve performance

Never expose internal AI reasoning through animation or UI copy.

## 8. AI Beauty Concierge

AI is contextual.

Page context may include:
- pageType
- productId
- categoryId
- orderId
- campaignId

Page context is NOT authorization context.

On product pages, the AI assistant should receive the current product context without requiring the customer to repeat it.

AI UI should support:
- streaming
- thinking indicator
- tool status
- recommendation cards
- confidence where appropriate
- error fallback
- human handoff
- accessible live messages

Do not expose chain-of-thought or internal reasoning.

## 9. Commerce Security

Never expose client-side:
- `SUPABASE_SERVICE_ROLE_KEY`
- LLM secrets
- payment secrets
- webhook secrets
- admin secrets

Sensitive flow:

Browser
→ Next.js API/server action
→ authorization
→ business service
→ Supabase/provider

Frontend must not calculate authoritative checkout totals. Display backend quote results.

## 10. Accessibility

Target WCAG 2.2 AA.

Every interactive experience must consider:
- semantic HTML
- keyboard navigation
- visible focus
- accessible modal/drawer
- ARIA labels
- contrast
- alt text
- screen readers
- reduced motion

AI streaming messages should use an appropriate polite live-region strategy.

## 11. Responsive Rules

Breakpoints from the CNS frontend specification:

- Mobile: `<640px`
- Tablet: `640–1023px`
- Desktop: `1024–1439px`
- Large desktop: `>=1440px`

Product grid:
- mobile: 2 columns
- tablet: 3 columns
- desktop: 4 columns
- large desktop: 4–5 columns

Do not depend on hover for essential mobile interactions.

## 12. SEO

Marketing/product/content pages should remain SEO-first.

Use:
- metadata
- Open Graph
- structured data
- Product schema
- Breadcrumb schema
- canonical URL
- sitemap
- robots
- semantic headings

AI chat does not replace indexable SEO content.

## 13. Image Strategy

Use:
- `next/image`
- responsive sizes
- WebP/AVIF where supported
- lazy loading
- priority only above the fold

Do not ship original-resolution assets unnecessarily.

## 14. Analytics

Use the CNS event vocabulary consistently, including:

- `PAGE_VIEWED`
- `PRODUCT_VIEWED`
- `PRODUCT_SEARCHED`
- `PRODUCT_RECOMMENDATION_VIEWED`
- `AI_OPENED`
- `AI_MESSAGE_SENT`
- `AI_RECOMMENDATION_ACCEPTED`
- `ADD_TO_CART`
- `REMOVE_FROM_CART`
- `CHECKOUT_STARTED`
- `PAYMENT_STARTED`
- `ORDER_CREATED`
- `ORDER_DELIVERED`
- `REVIEW_CREATED`
- `SKIN_QUIZ_STARTED`
- `SKIN_QUIZ_COMPLETED`
- `LOYALTY_VIEWED`
- `VOUCHER_APPLIED`
- `RESELLER_AI_USED`

Events must be anonymous-safe, PII-minimized and versioned.

## 15. Required UI States

Every data-driven page/component must account for:

- loading
- empty
- error
- success

Critical journeys must include failure states.

## 16. Definition of Done

A feature is complete only when applicable items below are satisfied:

### Functional
- responsive
- API integrated
- loading state
- empty state
- error state
- authentication state
- authorization state

### UI
- design tokens
- typography
- spacing
- responsive behavior
- accessibility
- keyboard navigation

### AI-enabled
- contextual AI
- streaming
- recommendation card
- tool status
- error fallback
- human handoff

### Technical
- TypeScript strict
- Zod validation
- no secrets client-side
- analytics events
- unit tests
- integration tests where applicable
- E2E coverage for critical paths
- successful production build

## 17. Priority

P0:
- Homepage
- Shop
- Product Detail
- Cart
- Checkout
- Account
- AI Chat

P1:
- Skin Quiz
- Beauty Concierge
- Loyalty
- Journal
- Reseller Portal

P2:
- Voice AI
- Personalized Routine
- Predictive Reorder
- AI Reseller Copilot
- Agentic Commerce

## 18. Working Method

For each task:

1. Understand requirement.
2. Identify affected architecture.
3. Inspect existing implementation.
4. State a concise implementation plan.
5. Implement incrementally.
6. Run typecheck/lint/tests/build as relevant.
7. Verify responsive and accessibility behavior.
8. Review for unnecessary dependencies and duplicated components.
9. Summarize files changed, validation performed and remaining risks.

Do not claim a feature is complete if validation was not performed.

### Stage Discipline (Legion planning method)

Adapted from Legion Kit `rules/planning.md` for Next.js App Router + Tailwind v4.

Size the task first:

- Small task (single screen, <5 files): do NOT decompose — one direct pass.
- Large task (multi-screen/multi-feature): decompose into ordered stages, each
  with `name`, `files` (exact relative paths), `components` rendered (max 7),
  `routes` registered, and `description` (goal + end result in 1 sentence).

Per-stage limits:

- MAX 1 large page (`src/app/**/page.tsx`) + 1 supporting file per stage.
- Small files (components/utils/config): max 4 per stage.
- When in doubt whether a page is "large" → split.

Ordering invariants (violations cause repair loops):

- Foundation ONLY first: `src/app/globals.css` (`@theme` tokens),
  `src/app/layout.tsx`, provider wiring, `postcss.config.mjs`. No pages and no
  visual components (Header/Footer/Navbar) in the foundation stage — they
  consume tokens created in the same stage; mixing them in causes token drift.
- A file must exist before any file that imports it is written.
- A page and its entry point (CTA/nav link) land in the same stage or earlier —
  never leave a dead-end link.
- Delete a file and clean ALL its importers in the SAME stage.
- The routing plan is the single source of truth: `src/app/**/page.tsx` paths
  and nav paths must match it; do not rename routes mid-work.
- Every stage leaves the app runnable — `npm run build` passes after each stage.
- Dark mode is a foundation styling concern (paired variables in
  `globals.css`), never its own stage. Polish (empty/loading/error states) is
  the final stage.

### Context Checklist Before Writing (Legion context method)

Adapted from Legion Kit `rules/context.md`. NEVER write a file in isolation.
Before writing stage N, load into working context:

| Stage kind | REQUIRED in context before writing |
|---|---|
| Foundation (stage 1) | requirement + plan only (no files exist yet) |
| Any later stage | `src/app/globals.css`, `package.json` (dep list), `src/app/layout.tsx`, active group layout |
| Stage touching shell/nav | `src/components/layout/site-header.tsx` / `site-footer.tsx` / `nav-links.tsx` |
| Stage writing page X | every file page X imports, esp. `states.tsx` and features from earlier stages |
| Modifying existing file F | the CURRENT content of F (never edit from memory) |

1. List the files that exist NOW.
2. Read every file the stage will import or modify — only then write.
3. A needed file that does not exist is a PLANNING gap: create it in this
   stage or fix the plan. Never import a file merely assumed to exist.

After each stage: every import must resolve to a file on disk NOW, and every
token used in `className` must exist in `globals.css` `@theme`. Re-inject
changed files into context for the next stage that touches them — stale
context is worse than none.

### Repair Rounds (max 3, Legion repair method)

Adapted from Legion Kit `rules/repair.md`. On build/runtime failure:

1. DIAGNOSE PER-FILE before concluding anything. Name the file and the exact
   construct that fails. Never jump from one symptom to "files are missing" or
   "regenerate everything".
2. Fix the ROOT signature, not the symptom. Re-running the same failed approach
   without a new diagnosis is waste.
3. Max 3 repair rounds with genuinely different diagnoses — then stop and
   report honestly what was tried. Do not loop.
4. After ANY fix, verify with a fresh `npm run build` / `npm run validate`
   before claiming success.

Common signatures (Next.js + Tailwind v4):

- Unstyled app but healthy build: `globals.css` missing `@import "tailwindcss"`
  or not reached by the layout chain — check CSS output markers first.
- Dead utility class: token missing from `@theme`, or dynamic template-string
  class (`text-${var}`) — use a literal class; never raw hex in components.
- "X is not defined" / module not found after a stage: missing import or wrong
  relative path — list the directory before rewriting anything.
- Hydration mismatch: server/client render difference (locale/time formatting,
  `window` access) — format in one place only.

Report format (mandatory):

```
symptom: <exact error/build output>
diagnosis: <file + construct, verified by reading the file>
action: <minimal fix applied>
verified: <fresh build/validate result>
```

### Example Stage Plan

Illustrative plan for a feature that does not exist yet (Journal), showing the
shape every stage must report:

```
stage 1 — listing page + entry point (same stage — no dead-end link):
          src/app/(storefront)/journal/page.tsx
          + src/components/journal/journal-list.tsx
          + nav entry in src/components/layout/nav-links.tsx
          routes: /journal            components: journal-list, states
          → 1 large page + 1 supporting file; browseable index
stage 2 — detail page + its entry links (same stage):
          src/app/(storefront)/journal/[slug]/page.tsx
          + src/components/journal/journal-entry.tsx
          routes: /journal/[slug]     components: journal-entry
          → listing items link here; entry links land with the page
stage 3 — polish: loading/empty/error wiring in src/components/ui/states.tsx
          → all four UI states covered (CLAUDE.md §15)
```

Tokens live in `src/app/globals.css` and are never a separate stage; each
stage ends with `npm run build` green.
