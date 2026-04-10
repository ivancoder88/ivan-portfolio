# Requirements Document

## Introduction

Ivan's portfolio website is a personal developer portfolio built with Angular 21 and server-side rendering. It presents Ivan Iviček's professional profile — skills, experience, services, and contact information — to potential employers and clients. The site supports bilingual content (English and Croatian), light/dark theming, and includes a password-protected admin dashboard for managing all page content without code changes.

## Glossary

- **Portfolio_Site**: The public-facing single-page Angular application served at the root URL (`/`)
- **Dashboard**: The password-protected admin area served under `/dashboard`
- **Auth_Service**: The backend service responsible for authenticating admin users via JWT tokens
- **Content_API**: The backend REST API that stores and serves all translatable page content
- **Language_Service**: The Angular service that holds and exposes bilingual translations as reactive signals
- **Theme_Service**: The Angular service that manages light/dark theme state and persistence
- **Scroll_Service**: The Angular service that handles smooth scrolling to named page sections
- **Visitor**: An unauthenticated user browsing the public portfolio
- **Admin**: An authenticated user managing content through the Dashboard
- **Translation**: A complete set of UI strings for one language (English or Croatian)

---

## Requirements

### Requirement 1: Public Homepage Sections

**User Story:** As a Visitor, I want to view a structured single-page portfolio, so that I can quickly learn about Ivan's background, skills, and services.

#### Acceptance Criteria

1. THE Portfolio_Site SHALL render the following sections in order: Hero, Services, Timeline, Resume, Skills, Tech Stack, Contact, and Footer.
2. WHEN the Portfolio_Site is loaded, THE Portfolio_Site SHALL display all sections without requiring additional navigation.
3. THE Portfolio_Site SHALL display Ivan's name, role title, bio, and four career stats in the Hero section.
4. THE Portfolio_Site SHALL display a downloadable CV link in the Hero section.
5. THE Portfolio_Site SHALL display a list of professional services, each with a title, description, and icon, in the Services section.
6. THE Portfolio_Site SHALL display a chronological experience timeline with entries that each include a start year, end year, job title, company, location, type (software / engineering / other), description, and tags.
7. THE Portfolio_Site SHALL display separate experience and education lists in the Resume section.
8. THE Portfolio_Site SHALL display each skill with its name and a proficiency percentage (0–100) in the Skills section.
9. THE Portfolio_Site SHALL display tech stack categories, each containing a list of technology names, in the Tech Stack section.
10. THE Portfolio_Site SHALL display Ivan's email address and phone number in the Contact section.

---

### Requirement 2: Contact Form

**User Story:** As a Visitor, I want to send Ivan a message through the website, so that I can reach out without leaving the page.

#### Acceptance Criteria

1. THE Portfolio_Site SHALL display a contact form with fields for name, email, and message.
2. WHEN a Visitor submits the contact form with a name shorter than 2 characters, THE Portfolio_Site SHALL display the validation error "Name must be at least 2 characters".
3. WHEN a Visitor submits the contact form with an invalid email address, THE Portfolio_Site SHALL display the validation error "Invalid email address".
4. WHEN a Visitor submits the contact form with a message shorter than 10 characters, THE Portfolio_Site SHALL display the validation error "Message must be at least 10 characters".
5. WHEN a Visitor submits a valid contact form, THE Portfolio_Site SHALL send the message to the Content_API and display a success confirmation.
6. IF the Content_API returns an error during form submission, THEN THE Portfolio_Site SHALL display an error message and allow the Visitor to retry.
7. WHILE a contact form submission is in progress, THE Portfolio_Site SHALL disable the submit button and display a "Sending..." label.

---

### Requirement 3: Bilingual Content (English and Croatian)

**User Story:** As a Visitor, I want to switch the site language between English and Croatian, so that I can read the content in my preferred language.

#### Acceptance Criteria

1. THE Portfolio_Site SHALL support English (`en`) and Croatian (`hr`) as selectable languages.
2. WHEN a Visitor selects a language, THE Language_Service SHALL update all visible text on the page to the selected language without a full page reload.
3. THE Portfolio_Site SHALL display a language toggle control in the navigation bar.
4. WHEN the Portfolio_Site is loaded, THE Language_Service SHALL default to English.
5. THE Language_Service SHALL expose the current language and all translations as reactive signals so that components update automatically on language change.

---

### Requirement 4: Light and Dark Theme

**User Story:** As a Visitor, I want to switch between light and dark themes, so that I can view the site comfortably in different lighting conditions.

#### Acceptance Criteria

1. THE Portfolio_Site SHALL support light and dark display themes.
2. THE Portfolio_Site SHALL display a theme toggle control in the navigation bar.
3. WHEN a Visitor toggles the theme, THE Theme_Service SHALL apply the selected theme to the entire page immediately.
4. WHEN the Portfolio_Site is loaded for the first time, THE Theme_Service SHALL apply the theme that matches the operating system's `prefers-color-scheme` setting.
5. WHEN a Visitor has previously selected a theme, THE Theme_Service SHALL restore that theme on subsequent visits by reading the value from `localStorage`.
6. THE Theme_Service SHALL persist the selected theme to `localStorage` under the key `portfolio-theme` whenever the theme changes.

---

### Requirement 5: Smooth Navigation

**User Story:** As a Visitor, I want to navigate to page sections by clicking navbar links, so that I can jump directly to the content I'm interested in.

#### Acceptance Criteria

1. THE Portfolio_Site SHALL display a fixed navigation bar containing links to each homepage section.
2. WHEN a Visitor clicks a navigation link, THE Scroll_Service SHALL smoothly scroll the viewport to the corresponding section.
3. WHEN a Visitor scrolls the page, THE Portfolio_Site SHALL highlight the navigation link corresponding to the currently visible section.
4. THE Portfolio_Site SHALL display a "Hire me" call-to-action button in the navigation bar that scrolls to the Contact section.

---

### Requirement 6: Admin Authentication

**User Story:** As an Admin, I want to log in to the dashboard with a username and password, so that I can securely manage portfolio content.

#### Acceptance Criteria

1. THE Auth_Service SHALL expose a login endpoint that accepts a username and password and returns a JWT token on success.
2. WHEN an Admin submits valid credentials, THE Dashboard SHALL store the JWT token in `localStorage` and redirect to the dashboard overview.
3. WHEN an Admin submits invalid credentials, THE Dashboard SHALL display an authentication error message.
4. WHEN an unauthenticated user navigates to any protected dashboard route, THE Dashboard SHALL redirect the user to `/dashboard/login`.
5. WHEN an Admin logs out, THE Auth_Service SHALL invalidate the session and THE Dashboard SHALL remove the JWT token from `localStorage` and redirect to `/dashboard/login`.
6. THE Auth_Service SHALL expose a registration endpoint that creates a new admin account with a hashed password.

---

### Requirement 7: Content Management via Dashboard

**User Story:** As an Admin, I want to edit all portfolio content through the dashboard, so that I can update the site without modifying source code.

#### Acceptance Criteria

1. THE Dashboard SHALL provide a Page Customization screen with tabs for: Hero, Services, Skills, Timeline, Tech Stack, and Contact.
2. WHEN an Admin edits content in any tab, THE Dashboard SHALL reflect changes in the form fields immediately.
3. WHEN an Admin clicks "Save Changes", THE Dashboard SHALL send the updated content to the Content_API using the stored JWT token for authorization.
4. WHEN the Content_API accepts the save request, THE Dashboard SHALL display a "Saved successfully" confirmation for 3 seconds.
5. IF the Content_API rejects the save request, THEN THE Dashboard SHALL display an error message and preserve the unsaved draft.
6. THE Dashboard SHALL allow the Admin to add and remove items within list-based sections (services, skills, timeline entries, tech stack categories).
7. THE Dashboard SHALL display editing fields for both English and Croatian translations side by side for each content section.
8. WHEN an Admin saves content, THE Language_Service SHALL update its in-memory translations so the public homepage reflects the changes immediately without a page reload.

---

### Requirement 8: Content Persistence via API

**User Story:** As an Admin, I want saved content to persist across server restarts, so that my changes are not lost.

#### Acceptance Criteria

1. THE Content_API SHALL expose a `GET /api/content` endpoint that returns the current bilingual content object.
2. THE Content_API SHALL expose a `PUT /api/content` endpoint that accepts an updated bilingual content object and persists it.
3. WHEN the Portfolio_Site is loaded, THE Language_Service SHALL fetch the current content from `GET /api/content` and replace the default in-memory translations.
4. IF the `GET /api/content` request fails, THEN THE Language_Service SHALL fall back to the built-in default translations and continue rendering.
5. THE Content_API SHALL require a valid JWT token in the `Authorization` header for `PUT /api/content` requests.
6. IF a `PUT /api/content` request is received without a valid JWT token, THEN THE Content_API SHALL return an HTTP 401 response.

---

### Requirement 9: Messages Inbox

**User Story:** As an Admin, I want to view contact form submissions in the dashboard, so that I can respond to visitor inquiries.

#### Acceptance Criteria

1. THE Dashboard SHALL provide a Messages screen that lists all contact form submissions.
2. WHEN a Visitor submits the contact form, THE Content_API SHALL store the message with the sender's name, email, message text, and submission timestamp.
3. THE Dashboard SHALL display each message with the sender's name, email, message text, and submission timestamp.
4. THE Content_API SHALL require a valid JWT token for all message retrieval and management endpoints.

---

### Requirement 10: Server-Side Rendering

**User Story:** As a Visitor, I want the portfolio to load quickly and be indexable by search engines, so that I can find it through web searches and experience fast initial load times.

#### Acceptance Criteria

1. THE Portfolio_Site SHALL support Angular SSR so that the initial HTML response contains fully rendered page content.
2. WHEN a search engine crawler requests the Portfolio_Site, THE Portfolio_Site SHALL return a fully rendered HTML page without requiring JavaScript execution.
3. THE Portfolio_Site SHALL hydrate on the client after the initial SSR render so that interactive features (theme toggle, language toggle, contact form, smooth scroll) become functional without a full page reload.
