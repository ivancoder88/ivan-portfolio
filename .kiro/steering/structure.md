# Project Structure

## Root Layout
```
src/
  app/
    core/              # App-wide singleton services (e.g. PlatformService)
    homepage/          # Public-facing portfolio page
    dashboard/         # Protected admin area
  main.ts              # Browser bootstrap
  main.server.ts       # SSR bootstrap
  server.ts            # Express server + REST API
  styles.css           # Global Tailwind styles
public/                # Static assets served as-is
```

## Homepage (`src/app/homepage/`)
```
homepage.ts                        # Root page component
components/                        # Section components (hero, navbar, contact, etc.)
  <section-name>/
    <section-name>.ts
    <section-name>.spec.ts         # Co-located tests
services/                          # language, theme, scroll services
shared/
  components/section/              # Reusable <app-section> wrapper
  directives/reveal.directive.ts   # Intersection Observer scroll-reveal
```

## Dashboard (`src/app/dashboard/`)
```
dashboard.ts / dashboard.routes.ts
core/
  auth.service.ts                  # Signal-based auth state + HTTP calls
  auth.guard.ts                    # Functional route guard
login/ register/                   # Public auth pages
overview/ messages/ page-customization/   # Protected child routes
```

## Server (`src/server.ts`)
Express app co-located with Angular SSR. Provides REST endpoints:
- `POST /api/auth/register|login|logout`, `GET /api/auth/me`
- `POST /api/contact`, `GET /api/messages` (auth required)
- `GET /api/content`, `PUT /api/content` (auth required)

Data is persisted as JSON files in the server dist directory (`messages.json`, `users.json`, `sessions.json`, `content.json`).

## Conventions

### Components
- Always **standalone** (`standalone: true`)
- Always use `ChangeDetectionStrategy.OnPush`
- Inline templates preferred for small components; `templateUrl` for larger ones
- Use `inject()` for dependency injection, not constructor injection
- Use Angular signals (`signal`, `computed`, `effect`) for reactive state
- Use `input()` / `input.required()` for component inputs (not `@Input`)
- Use modern control flow syntax: `@if`, `@for`, `@switch` (not `*ngIf`, `*ngFor`)
- Component class names are PascalCase without a `Component` suffix (e.g. `Hero`, `AuthService`)
- File names are kebab-case without a type suffix (e.g. `hero.ts`, not `hero.component.ts`)

### Services
- `providedIn: 'root'` for all services
- Signal-based state management (avoid BehaviorSubject where signals suffice)
- Always guard browser-only APIs (localStorage, window) with `PlatformService.isBrowser`

### Routing
- All routes use `loadComponent` / `loadChildren` for lazy loading
- Functional guards (`CanActivateFn`) — no class-based guards

### Styling
- Tailwind utility classes inline in templates
- Dark mode via `dark:` variant (class strategy)
- No component-scoped CSS files unless strictly necessary
- Use `app-section` wrapper for homepage sections to maintain consistent padding/max-width

### Translations / i18n
- All user-facing strings live in `LanguageService` (`DEFAULT_TRANSLATIONS`)
- Access via `lang.t()` signal in templates — never hardcode display strings
- Supports `'en'` and `'hr'` languages
