# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server
npm run build    # Production build
npm run lint     # ESLint
```

No test suite is configured.

## Architecture

**Rawify** is a cooking weight calculator — it converts cooked food weight back to raw weight for calorie tracking. Built with Next.js 16 App Router, React 19, TypeScript, Tailwind v4, Framer Motion, and `next-intl`.

### Routing & i18n

All pages live under `src/app/[locale]/`. The root `src/app/page.tsx` redirects to `/en`. Supported locales: `uk` (Ukrainian, default), `en`. Locale config is in `src/i18n/request.ts`; translation strings are in `messages/uk.json` and `messages/en.json`.

### Core data model

`src/data/products.ts` defines every product with its available cooking methods and coefficients:

```ts
{ value, label, category: 'meat' | 'fish' | 'eggs' | 'grains', methods: [{ value, label, coefficient }] }
```

The **coefficient** represents how the raw weight relates to the cooked weight (`raw / cooked`). For grains it is > 1 (they absorb water and gain weight); for meat/fish it is < 1 (they lose water). When the user enters both raw and cooked weight, the coefficient is computed directly; otherwise the preset method coefficient is used.

### Calculation logic

`src/components/Calculator.tsx` owns all state. Two calculation modes:
- **Containers** — divides total cooked weight evenly; `rawToLog = (cooked / containers) * coefficient`
- **Portion** — user weighs a portion; `rawToLog = portion * coefficient`

`src/utils/validation.ts` validates the entered raw/cooked pair against expected coefficient ranges per category and shows an inline error if the values are physiologically implausible.

### Translation keys

Product and method labels are looked up by their `value` string from the `products` / `methods` namespaces in the message files. When adding a new product or method to `products.ts`, add the matching key to both `messages/en.json` and `messages/uk.json`.

### Styling conventions

Background colour `#F2F2F7` (iOS system gray) is used as the page background and for inactive/disabled input fields. Cards use `bg-white rounded-3xl`. Inputs and selects use `bg-[#F2F2F7] rounded-2xl`. Animations use Framer Motion `AnimatePresence` + `motion.*`.
