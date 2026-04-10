# Implementation Plan: Portfolio Website

## Overview

Implement Ivan's portfolio website as a full-stack Angular 21 SSR application. The plan builds incrementally: core services and data models first, then public homepage sections, then the contact form and API, then authentication and the admin dashboard, and finally content persistence and the messages inbox.

## Tasks

- [ ] 1. Set up core services and data models
  - [ ] 1.1 Implement `PlatformService` to guard browser-only APIs during SSR
    - Create `src/app/core/service/platform.service.ts` with `isBrowser` getter using `isPlatformBrowser`
    - _Requirements: 10.3_

  - [ ] 1.2 Implement `ThemeService` with localStorage persistence
    - Read `portfolio-theme` from `localStorage` on init; fall back to `prefers-color-scheme`
    - Apply theme class to `document.documentElement`; persist on every toggle
    - Guard all browser APIs with `PlatformService.isBrowser`
    - _Requirements: 4.1, 4.3, 4.4, 4.5, 4.6_

  - [ ]* 1.3 Write property test for theme persistence round-trip (Property 3)
    - **Property 3: Theme persistence round-trip**
    - **Validates: Requirements 4.5, 4.6**

  - [ ] 1.4 Implement `LanguageService` with reactive signals
    - Expose `language` signal (default `'en'`) and `t` signal returning the current `Translation`
    - Implement `toggleLanguage()`, `setLanguage()`, and `setTranslations()`
    - _Requirements: 3.1, 3.4, 3.5_

  - [ ]* 1.5 Write property test for language switch (Property 2)
    - **Property 2: Language switch updates all visible text**
    - **Validates: Requirements 3.2, 3.5**

  - [ ]* 1.6 Write property test for language service fallback (Property 8)
    - **Property 8: Language service falls back to defaults on API failure**
    - **Validates: Requirements 8.4_**

  - [ ] 1.7 Implement `ScrollService` for smooth section navigation
    - Implement `scrollToSection(id: string)` calling `scrollIntoView` on the element
    - Implement `isThresholdExceeded` using Intersection Observer for active section tracking
    - Guard browser APIs with `PlatformService.isBrowser`
    - _Requirements: 5.2, 5.3_

  - [ ]* 1.8 Write property test for scroll service (Property 4)
    - **Property 4: Scroll service navigates to correct section**
    - **Validates: Requirements 5.2**

- [ ] 2. Checkpoint — Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 3. Implement public homepage sections
  - [ ] 3.1 Implement `NavbarComponent`
    - Render section links, language toggle (EN/HR), theme toggle, and "Hire me" CTA
    - Highlight active section link using `ScrollService.isThresholdExceeded`
    - Wire language toggle to `LanguageService.toggleLanguage()` and theme toggle to `ThemeService.toggleTheme()`
    - _Requirements: 3.3, 4.2, 5.1, 5.3, 5.4_

  - [ ] 3.2 Implement `HeroComponent`
    - Display name, role title, bio, four career stats, and CV download link from `t()` signal
    - _Requirements: 1.3, 1.4_

  - [ ] 3.3 Implement `ServicesComponent`
    - Render list of service items (title, description, icon) from `t()` signal
    - _Requirements: 1.5_

  - [ ] 3.4 Implement `TimelineComponent`
    - Render chronological entries with year, endYear, title, company, location, type, description, and tags
    - _Requirements: 1.6_

  - [ ] 3.5 Implement `ResumeComponent`
    - Render separate experience and education lists from `t()` signal
    - _Requirements: 1.7_

  - [ ] 3.6 Implement `SkillsComponent`
    - Render each skill with name and proficiency percentage bar
    - _Requirements: 1.8_

  - [ ] 3.7 Implement `TechStackComponent`
    - Render tech stack categories, each with a list of technology names
    - _Requirements: 1.9_

  - [ ] 3.8 Implement `FooterComponent`
    - Render copyright text and social links from `t()` signal
    - _Requirements: 1.1_

  - [ ] 3.9 Compose `HomepageComponent`
    - Assemble all section components in order: Navbar, Hero, Services, Timeline, Resume, Skills, TechStack, Contact, Footer
    - Use `ChangeDetectionStrategy.OnPush` on all section components
    - _Requirements: 1.1, 1.2_

- [ ] 4. Implement contact form and API endpoint
  - [ ] 4.1 Implement `ContactComponent` with reactive form
    - Three fields: `name` (required, minLength 2), `email` (required, email pattern), `message` (required, minLength 10)
    - Show per-field validation errors on submit
    - Disable submit button and show "Sending..." while in progress; show success or error message after response
    - Display Ivan's email and phone number from `t()` signal
    - _Requirements: 1.10, 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7_

  - [ ]* 4.2 Write property test for contact form validation (Property 1)
    - **Property 1: Contact form rejects invalid inputs**
    - **Validates: Requirements 2.2, 2.3, 2.4**

  - [ ] 4.3 Implement `POST /api/contact` server endpoint
    - Validate payload; append message with `receivedAt` ISO timestamp to `messages.json`
    - Return 400 on invalid payload, 200 on success
    - _Requirements: 9.2_

  - [ ]* 4.4 Write property test for contact form submission storage (Property 7)
    - **Property 7: Contact form submission stores message**
    - **Validates: Requirements 9.2, 9.3**

- [ ] 5. Checkpoint — Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 6. Implement content API and language service integration
  - [ ] 6.1 Implement `GET /api/content` and `PUT /api/content` server endpoints
    - `GET` reads and returns `content.json`; `PUT` validates auth header, writes updated content object to `content.json`
    - Return 401 if `Authorization: Bearer <token>` is missing or invalid for `PUT`
    - _Requirements: 8.1, 8.2, 8.5, 8.6_

  - [ ]* 6.2 Write property test for unauthenticated write rejection (Property 6)
    - **Property 6: Unauthenticated write requests are rejected**
    - **Validates: Requirements 8.5, 8.6, 9.4**

  - [ ] 6.3 Fetch content on app init and wire into `LanguageService`
    - On `APP_INITIALIZER`, call `GET /api/content` and pass result to `LanguageService.setTranslations()`
    - On failure, log the error and continue with built-in defaults
    - _Requirements: 8.3, 8.4_

  - [ ]* 6.4 Write property test for content save round-trip (Property 5)
    - **Property 5: Content save round-trip**
    - **Validates: Requirements 7.8, 8.1, 8.2, 8.3**

- [ ] 7. Implement admin authentication
  - [ ] 7.1 Implement `POST /api/auth/register` and `POST /api/auth/login` server endpoints
    - Register: hash password with SHA-256, append user to `users.json`
    - Login: verify credentials; on success generate 32-byte random hex token, store in `sessions.json`, return token
    - On invalid credentials return 401
    - _Requirements: 6.1, 6.6_

  - [ ] 7.2 Implement `POST /api/auth/logout` server endpoint
    - Remove the session entry from `sessions.json` for the provided token
    - _Requirements: 6.5_

  - [ ] 7.3 Implement `AuthService` on the Angular client
    - Store/clear token in `localStorage`; expose `isLoggedIn` signal
    - Implement `login()`, `logout()`, and `getToken()` methods
    - _Requirements: 6.2, 6.5_

  - [ ] 7.4 Implement `authGuard` and dashboard routing
    - Redirect unauthenticated users to `/dashboard/login`
    - Lazy-load the dashboard feature module under `/dashboard`
    - _Requirements: 6.4_

  - [ ] 7.5 Implement `LoginComponent` and `RegisterComponent`
    - Login form: submit credentials, store token on success, redirect to dashboard overview, show error on failure
    - Register form: submit new credentials to register endpoint
    - _Requirements: 6.2, 6.3_

- [ ] 8. Checkpoint — Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 9. Implement admin dashboard screens
  - [ ] 9.1 Implement dashboard shell with sidebar navigation
    - Sidebar links to Overview, Messages, and Page Customization
    - Logout button that calls `AuthService.logout()` and redirects to `/dashboard/login`
    - _Requirements: 6.5_

  - [ ] 9.2 Implement `MessagesComponent` (dashboard inbox)
    - Fetch messages from `GET /api/messages` with auth token; display name, email, message text, and timestamp for each
    - _Requirements: 9.1, 9.3_

  - [ ] 9.3 Implement `GET /api/messages` server endpoint
    - Require valid session token; return contents of `messages.json`; return 401 if token missing or invalid
    - _Requirements: 9.4_

  - [ ] 9.4 Implement `PageCustomizationComponent` with tabbed editor
    - Tabs: Hero, Services, Skills, Timeline, Tech Stack, Contact
    - Render bilingual (EN/HR) form fields side by side for each section
    - Support adding and removing items in list-based sections (services, skills, timeline entries, tech stack categories)
    - _Requirements: 7.1, 7.2, 7.6, 7.7_

  - [ ] 9.5 Wire "Save Changes" in `PageCustomizationComponent`
    - On save: PUT to `/api/content` with auth token; show "Saved successfully" toast for 3 seconds on success; show error and preserve draft on failure; call `LanguageService.setTranslations()` on success
    - _Requirements: 7.3, 7.4, 7.5, 7.8_

- [ ] 10. Implement SSR configuration and hydration
  - [ ] 10.1 Configure Angular SSR render modes
    - Set homepage (`/`) to `RenderMode.Prerender` in `app.routes.server.ts`
    - Set `/dashboard/**` routes to `RenderMode.Server`
    - _Requirements: 10.1, 10.2_

  - [ ] 10.2 Enable `withEventReplay()` for client hydration
    - Add `withEventReplay()` to `provideClientHydration()` in `app.config.ts`
    - _Requirements: 10.3_

- [ ] 11. Final checkpoint — Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for a faster MVP
- Each task references specific requirements for traceability
- Property tests use **fast-check** with a minimum of 100 iterations per property
- Each property test file must include the comment `// Feature: portfolio-website, Property N: <property text>`
- `PlatformService` must be used in all services that access browser-only APIs to ensure SSR compatibility
