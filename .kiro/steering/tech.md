# Tech Stack

## Framework & Runtime
- **Angular 21** (standalone components, SSR via `@angular/ssr`)
- **TypeScript 5.9** with strict mode enabled
- **Node.js / Express 5** for the SSR server and REST API

## Styling
- **Tailwind CSS v4** via `@tailwindcss/postcss`
- Single global stylesheet: `src/styles.css`
- Custom primary color: `--color-primary: #8650F4`
- Dark mode via `.dark` class on `<html>` (toggled by ThemeService)

## Testing
- **Vitest** (configured via `@angular/build:unit-test`)
- Test files use `.spec.ts` suffix, co-located with source files

## Package Manager
- **pnpm** (v10.33) — always use `pnpm`, never `npm` or `yarn`

## Code Formatting
- **Prettier** — print width 100, single quotes, Angular HTML parser for templates

## Containerization
- Multi-stage **Docker** build; production image runs `node server/server.mjs` on port 4000

## Common Commands

```bash
# Development server (do NOT run via agent — start manually)
pnpm start          # ng serve → http://localhost:4200

# Production build
pnpm run build      # outputs to dist/ivan-portfolio/

# Run tests (single pass)
pnpm test           # ng test (Vitest)

# Serve SSR build
pnpm run serve:ssr:ivan-portfolio   # node dist/ivan-portfolio/server/server.mjs

# Docker
docker build -t ivan-portfolio .
docker-compose up
```

## Key Libraries
| Package | Purpose |
|---|---|
| `@angular/router` | Lazy-loaded routing |
| `@angular/common/http` | HTTP client (fetch backend) |
| `@angular/forms` | Reactive forms |
| `rxjs ~7.8` | Async/reactive patterns |
| `express ^5` | SSR + REST API server |
