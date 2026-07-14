# BookingSuccess.tsx

**Path:** `src/components/organisms/createBooking/bookingSteps/BookingSuccess.tsx`
**Type:** Component (presentational)

## Purpose
Step 4 — the confirmation screen shown after a booking is successfully created.

## Props

| Name | Type | Description |
|---|---|---|
| `pro` | `BookingPro` | Used for the confirmation message and the "view pro" link |
| `navigate` | `(path: string) => void` | Sends the user home or to the pro's profile |
| `t` | `TFunction` | Translation function |

## Returns / Exports
Default export: `BookingSuccess(props)`, a React component.

## Key behavior
Purely presentational — a success icon, a message interpolating the pro's first name, and two navigation buttons.

## Dependencies
`lucide-react` (`Check` icon), `gfx` (still untyped theme styles).

## Tests
Not yet tested — same shape as `BookingCard`'s click tests, would be a quick addition.

## Screenshot
_[Add a screenshot of the file here]_
