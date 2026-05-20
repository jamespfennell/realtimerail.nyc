# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

[realtimerail.nyc](https://realtimerail.nyc) is a React/TypeScript frontend for browsing real-time NYC subway information. It has no backend of its own — all data comes from a [Transiter](https://github.com/jamespfennell/transiter) instance via REST/protobuf at `/transiter/v0.6` with system ID `us-ny-subway`. The dev server proxies all backend requests to `https://staging.realtimerail.nyc`.

## Commands

```bash
npm start        # Dev server on port 3000 (proxies API to staging)
npm run build    # Production build
npm test         # Run tests (CI runs this inside Docker)
npm run prettier # Format code with Prettier
npx eslint src   # Lint
```

There is no single-test command wired up; `npm test` runs all tests via react-scripts (Jest). The test suite is minimal — most behavior is verified by running the dev server manually.

## Architecture

**Routing** (`src/App.tsx`): React Router 6 with these routes:
- `/` — route grid home page
- `/stops/:stopId` — stop details and arrival times
- `/routes/:routeId` — route details and service map
- `/routes/:routeId/:tripId` — trip details
- `/favorites` — saved stops
- `/nearby` — geolocation-based nearby stops
- `/settings`, `/about`

**API layer** (`src/api/`):
- `api.ts` — URL builder functions for Transiter endpoints
- `types.ts` — TypeScript types generated from protobufs via `ts-proto`

**Data fetching** (`src/hooks/http.tsx`): The `useHttpData<T>` hook is the single mechanism for all API calls. It polls on a configurable interval and pauses when the browser tab loses focus. When a request fails it preserves the last successful response so the UI doesn't flicker. The hook accepts a `deserialize` callback and supports chained requests (passing an empty-string URL acts as a no-op to delay fetching until a dependency is ready).

**State management**: Hooks only — no Redux or Context API. Persistent state lives in `localStorage` under the `rtr.*` namespace (`rtr.favorites`, `rtr.settings`), managed by `src/hooks/localstorage.ts`, `favorites.ts`, and `settings.ts`.

**Pages vs. Elements**: `src/pages/` contains route-level components that own data fetching. `src/elements/` contains presentational components. Each component has a co-located `.css` file for scoped styles.

**`BasicPage`** (`src/elements/BasicPage.tsx`): The standard page shell — handles loading spinner, error state with retry, and wraps content once data arrives. Nearly every page uses it.

## Deployment

The Docker image (multi-stage) builds with Node 18, runs `npm test`, then serves the output via Caddy. `Caddyfile` sets a 1-year cache on `/static` (content-hashed filenames) and no-cache on everything else, with SPA fallback routing (`try_files {path} /index.html`).
