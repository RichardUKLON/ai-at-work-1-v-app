# AI at Work: The Judgement Game

A browser-based, scenario-driven game that teaches non-technical staff to use AI
at work with good judgement — when to trust it, when to check it, and when to
rely on a human. Built from `ai-at-work-app-specification.md` and
`ai-at-work-content-pack.md`, with the six hero illustrations from the
Midjourney prompt sheet.

## Run it

```bash
npm install      # already run for you; node_modules is present
npm run dev      # start the dev server (hot reload)
npm run build    # type-check + production build into dist/
npm run preview  # serve the production build locally
```

The production build in `dist/` is fully self-contained and uses relative paths,
so you can also just open `dist/index.html` directly in a browser.

## What's included

- **Five teaching missions + a finale.** Monday→Friday, each 3–5 minutes, plus
  the Friday Review (10 challenges drawn from a pool of 20, re-randomised on
  replay with guaranteed coverage of every concept).
- **The five-beat loop:** brief → decide → immediate feedback → reflect →
  debrief, with six interaction types (decisions, warm-up recall, Spot the Risk,
  Trust-or-Verify sorting, the four-part prompt builder, Choose the Better
  Prompt).
- **The Trust Meter** — the signature mechanic. It penalises both blind trust
  and blanket refusal; the goal is the calibrated middle.
- **Judgement Points, six badges, a glossary** (14 terms, in-context links),
  **My Progress**, and a **finale results / certificate** screen.
- **Accessibility (WCAG 2.1 AA):** semantic landmarks, full keyboard operation,
  a visible focus indicator everywhere, colour never used alone, an `aria-live`
  region for route and feedback announcements, the Trust Meter exposed as a
  labelled `meter`, rem-based type that survives 200% zoom, and
  `prefers-reduced-motion` support.

## How it's built

- **Stack:** React 18 + TypeScript + Vite, Tailwind CSS (design tokens for the
  spec palette/type scale), Lucide icons, Zustand for state.
- **Client-only, no backend.** All progress, scores and reflections persist to
  `localStorage` under a versioned key — nothing is ever transmitted.
- **Content is data.** Every learner-facing string lives in `src/content/*`
  (`missions.ts`, `finale.ts`, `glossary.ts`, `badges.ts`, `microcopy.ts`),
  fully separated from components so writers can edit scenarios — and
  translations can be added as parallel content packs — without touching code.

## Project layout

```
src/
  content/      missions, finale pool, glossary, badges, UI microcopy
  lib/          scoring & trust logic, finale selection, icon registry, glossary aliases
  components/   AppShell, TrustMeter, GlossaryPanel, FeedbackCard, ArtefactRenderer,
                BadgeToast, AvaMark, RichText, and the six step renderers (steps/)
  screens/      Home, MissionMap, MissionPlayer, FinalePlayer, Debrief, Progress,
                Results, About
  store.ts      Zustand store (+ localStorage persistence)
  types.ts      the content model
public/assets/illustrations/   the six mission hero images
```

## Notes / future work

- The two consequence spot illustrations (S3, S4) and the six badge medallions
  (S6a–f) from the prompt sheet are not yet generated; badges currently render
  as crisp Lucide marks and consequence scenes render as styled text cards. Drop
  the PNGs into `public/assets/illustrations/` to wire them in.
- Initial JS is ~85 KB gzipped. Per-mission code-splitting (spec §8.4) is a
  straightforward next optimisation if needed.
- An optional SCORM/xAPI wrapper (mission-complete + finale-score only) can be
  added later without touching the content model.
```
