# GoFix

GoFix is a home-services marketplace — customers book vetted professionals (plumbers, electricians, AC technicians, cleaners, and more) for home repair and maintenance jobs. Professionals manage their availability, services, and bookings through the same platform.

Live API: `https://gofix-api-ceaaewf7hua0ghez.uaenorth-01.azurewebsites.net/api`

## Tech stack

- **React 19** + **Vite**
- **TypeScript** — partial adoption, migrating incrementally from JS/JSX (see [Project status](#project-status))
- **Tailwind CSS 4** — utility classes with a custom design token layer (`styles/themeColors.js`)
- **Redux Toolkit** + **redux-persist** — auth state (`store/authSlice.js`)
- **TanStack Query (React Query)** — server state, caching, pagination, polling
- **React Router 7**
- **Formik + Yup** — form state and validation
- **react-i18next** — English/Arabic localization, with RTL support
- **lucide-react** — icon set
- **@heroui/react**, **framer-motion**, **next-themes** — UI primitives, animation, theme switching
- **Firebase** — (see relevant integration code for exact usage)
- **react-toastify** — toast notifications, including API error feedback from the response interceptor
- **Jest + Testing Library** — unit and component testing (see [Testing](#testing))

## Features

### Browse & discovery

Category grid on the home page, a dedicated browse screen (`/browse`, `/browse/:categoryId`) with filtering by minimum rating, maximum distance, and years of experience, and infinite-scroll pagination.

### Unified search

A search bar in the header (and hero section for guests) hits a single backend endpoint that returns matching **services**, **professionals**, and **areas** in one request. Each result type routes somewhere different:

- Clicking a **service** goes to a results screen (`/service/:serviceId`) showing professionals who genuinely offer that exact service — since the backend only filters by category, this is done client-side using each professional's own service list.
- Clicking a **professional** goes straight to their profile (`/pro/:id`).
- Clicking an **area** goes to a results screen (`/area/:areaId`) showing every professional serving that area.

### Professional profiles

Bio, certifications, service areas, working hours, and a paginated customer reviews tab with a rating breakdown.

### Booking

A 3-step wizard (`/book/:id`): pick a service, pick a date/time/address, review and confirm. Availability is checked live against the professional's working hours and already-booked slots. Steps are backed by Yup validation schemas and a shared `NewBooking`/`Booking` type split — the create payload and the returned entity are intentionally different shapes (e.g. price is a formatted string on submit, a structured value on read).

### Live booking tracking

Once a booking is active, a widget on the home screen shows its progress through a 6-step status timeline (Pending → Accepted → On the way → Arrived → In progress → Completed) with an animated progress bar and a pulsing indicator on the current step. Since there's no websocket channel, this works by polling the single-booking endpoint every few seconds — polling stops automatically once the booking reaches a terminal state.

### My bookings & reviews

A list of upcoming/past bookings (`/my-bookings`) with a detail drawer covering the same status timeline, reschedule/cancel actions, and — for completed bookings — a "leave a review" flow (star rating + comment). The drawer also supports deep-linking directly to one booking (`/my-bookings/:bookingId`), which is how notification clicks land on the exact booking rather than the general list.

### Notifications

A bell icon in the header shows unread count and a dropdown of notifications (booking updates, chat messages, feedback responses, etc.), each with a type-specific icon. Clicking one marks it read and, if it references a booking, deep-links straight into that booking's drawer.

### Auth

Email/password login and registration, role-aware (customer vs professional), with persisted session state.

### Profile & addresses

Editable profile info, saved addresses used throughout the booking flow, and an in-app feedback form.

### Localization

Full English/Arabic support with automatic RTL layout switching, covering both static UI copy and dynamically formatted content (dates, relative timestamps).

## Project structure

```
src/
├── assets/               # Static assets (logo, images)
├── components/
│   ├── atoms/             # Smallest reusable UI primitives (Input, Label, Chip, ProAvatar…)
│   ├── molecules/          # Small compositions (FormField, LanguageSwitcher, ThemeToggle, TimelineRow…)
│   └── organisms/          # Feature-level components, grouped by domain
│       ├── header/          # Nav, search trigger, notification bell
│       ├── footer/
│       ├── home/            # Hero, category grid, welcome banner, live booking widget
│       ├── browse/          # Browse results, filters, pro cards
│       ├── professional/    # Professional profile tabs (about, services, reviews)
│       ├── createBooking/   # Booking wizard steps
│       ├── myBookings/      # Booking list, card, detail drawer, review sheet
│       └── userMenuDrawer/
├── screens/               # Route-level screens, each with a colocated hook
│   ├── home/, login/, register/, profile/
│   ├── browse/, professionalProfile/
│   ├── createBooking/, myBookings/
│   ├── myAddresses/, areaResults/, serviceResults/
├── network/
│   ├── config/             # API base URL, HTTP method/content-type constants
│   ├── http/                # Request/response interceptors (headers, auth, error handling)
│   └── api/                 # API functions, grouped by domain
│       ├── bookings/, professionals/, categories/, auth/, profile/
│       ├── search/           # Unified search, area lookups, search history
│       ├── notifications/    # Fetch, mark-read, mark-all-read
│       └── reviews/           # Fetch, paginate, add, edit, delete
├── store/                 # Redux slices (auth)
├── types/                 # Shared TypeScript domain types
│   ├── booking.ts, professional.ts, search.ts, notification.ts, review.ts
├── hooks/                 # Cross-feature hooks (useCategories, useCities…)
├── constants/              # Static lookup data (categories, time slots, day names)
├── utils/                  # Pure helper functions
├── styles/                 # Theme tokens, Tailwind class groupings
└── locales/                 # i18n setup + en/ar translation files
```

## Getting started

```bash
npm install
npm run dev
```

> If you hit an `ERESOLVE` peer dependency error on install (seen between `ts-jest` and `@babel/core`), use:
>
> ```bash
> npm install --legacy-peer-deps
> ```

Set the API base URL via an environment variable if you need to point at a different backend:

```
VITE_API_URL=https://your-api-url/api
```

(defaults to the live API above if unset — see `network/config/apiConfig.js`)

## Available scripts

| Command               | Description                                 |
| --------------------- | ------------------------------------------- |
| `npm run dev`         | Start the Vite dev server                   |
| `npm run build`       | Production build                            |
| `npm run preview`     | Preview the production build locally        |
| `npm test`            | Run the Jest test suite                     |
| `npm run lint`        | Lint `src/` (JS, JSX, TS, TSX)              |
| `npm run lint:fix`    | Lint and auto-fix                           |
| `npm run lint:watch`  | Lint in watch mode                          |
| `npm run lint:report` | Output lint results as `eslint-report.json` |
| `npm run format`      | Format `src/` with Prettier                 |

## Code quality tooling

- **ESLint** — configured with React, React Hooks, import, promise, security, and SonarJS plugins
- **Prettier** — code formatting, run via `npm run format`
- **Husky + lint-staged** — pre-commit hook auto-fixes staged `.js/.jsx/.ts/.tsx` files with ESLint

## Testing

```bash
npm test
```

Test setup uses `ts-jest` for `.ts`/`.tsx` files and `babel-jest` for still-untyped `.js`/`.jsx` files, with `jsdom` as the test environment. See `jest.config.cjs` and `babel.config.cjs`.

Current coverage focuses on the booking creation flow: pure utility functions, component rendering, hook logic (with mocked network/router/query), direct API mocking, and form validation. See [`docs/`](./docs) for a per-file breakdown of what's converted and tested.

## Project status

This codebase is mid-migration from JavaScript to TypeScript. Converted and typed from the start so far:

- The entire booking creation flow (`types/booking.ts`, everything under `screens/createBooking/`)
- Search (`types/search.ts`, `network/api/search/`, header/hero search components)
- Notifications (`types/notification.ts`, `network/api/notifications/`, the header bell)
- Reviews (`types/review.ts`, `network/api/reviews/` additions)
- Live booking widget (`components/organisms/home/liveBooking/`)

Everything else — including the booking display side's original files (`MyBookings`, `BookingDrawer`, `useMyBookings`) — remains JS/JSX, incrementally touched only where a new feature needed to hook into it.

Files that import from not-yet-converted modules use `@ts-expect-error` at the import line rather than a project-wide `allowJs` flag, so each JS/TS boundary stays visible and intentional during the migration.

## Localization

Language files live in `src/locales/`. Add new keys to both `en_translation.json` and `ar_translation.json` — the app falls back to English if a key or language fails to load. RTL layout is handled automatically based on the active language.
