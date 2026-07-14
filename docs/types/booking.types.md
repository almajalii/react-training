# booking.ts

**Path:** `src/types/booking.ts`
**Type:** Type definitions (no runtime code)

## Purpose
Central place for every domain shape used across the booking feature. Kept separate from any component or hook so that multiple files can share the same shape without redefining it, and so the "what a booking is" layer stays independent from "how a screen displays it."

## Exports

| Export | Kind | Represents |
|---|---|---|
| `BookingStatus` | Union type | Every valid status string a booking can be in |
| `Booking` | Interface | A booking as returned by `GET /bookings` |
| `NewBooking` | Interface | The payload sent to `POST /bookings` when creating a booking |
| `BookingFormValues` | Interface | Formik's working copy of the create-booking form |
| `BookingPro` | Interface | The professional being booked |
| `BookingProService` | Interface | One service offered by a professional |
| `WorkingHour` | Interface | One day's open/close time for a professional |
| `DateSlot` | Interface | One day in the 7-day date picker |
| `SavedAddress` | Interface | One of the user's saved addresses |

## Key behavior

- **`Booking` vs `NewBooking` are intentionally separate**, not one type reused. `Booking` has `id`, `status`, `professionalName` — fields that don't exist until the server creates the record. `NewBooking` has none of those, since the client never sends them.
- **`NewBooking.servicePrice` is `string`, not `number`** — found while converting `useCreateBooking.ts`. The create form submits a formatted display string (e.g. `"50 – 60 JD"`), not a raw number, even though the professional's service catalog (`BookingProService.minPrice`/`maxPrice`) uses real numbers.
- **`workingHours` on `BookingPro` is optional (`?`)** — matches how the source code already guards every access with `pro?.workingHours?.length`.

## Dependencies
None — this file has zero imports. It's the base of the domain layer; everything else imports from it, it imports from nothing.

## Tests
Not directly tested (type-only file, nothing to run). Its correctness is exercised indirectly by every test that imports and uses these types (`useCreateBooking.test.ts`, `createBooking.test.ts`, `BookingStep1.test.tsx`).

## Screenshot
_[Add a screenshot of the file here]_
