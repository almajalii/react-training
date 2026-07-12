# useCreateBooking.ts

**Path:** `src/screens/createBooking/useCreateBooking.ts`
**Type:** Hook

## Purpose
Owns every piece of state, data-fetching, and business logic for the entire create-booking flow. `CreateBooking.tsx` is pure layout — this hook is where all the real work happens.

## Parameters
None — reads `id` from the URL via `useParams()` internally.

## Returns / Exports
Default export: `useCreateBooking()`, returning an object with:

| Key | Type | Description |
|---|---|---|
| `pro`, `proLoading` | `BookingPro \| undefined`, `boolean` | The professional being booked |
| `step`, `setStep` | `number`, setter | Current wizard step (1–4) |
| `formik` | `FormikProps<BookingFormValues>` | Full form state/validation |
| `image` | `{ uri: string; file: File } \| null` | Attached photo, if any |
| `dateSlots` | `DateSlot[]` | Next 7 bookable days |
| `savedAddresses` | `SavedAddress[]` | User's saved addresses |
| `handleContinue` | `() => Promise<void>` | Validates current step, advances or submits |
| `selectService`, `selectDate`, `selectTime`, `selectAddress` | functions | Set the corresponding formik field(s) |
| `selectedDateLabel` | `string` | Human-readable label for the chosen date |
| `isDayUnavailable`, `isTimeUnavailable` | functions | Availability checks against the professional's working hours and existing bookings |
| `addImage`, `removeImage` | functions | Manage the attached photo, including blob URL cleanup |

## Key behavior
- **`isDayUnavailable`** — a day is unavailable if it's not in the professional's set of working days (`pro.workingHours`).
- **`isTimeUnavailable`** — a time is unavailable if it's already booked (`bookedSlots`) *or* falls outside the professional's open/close hours for the selected day.
- **`handleContinue`** — validates only the current step's Yup schema before advancing. On step 3, calls `formik.submitForm()` instead of advancing further.
- **`onSubmit`** — uploads the attached image (if any) via `uploadBookingImages`, then calls `createBooking`, then sets `step` to 4 on success. Errors are caught and silently swallowed — the network layer's response interceptor is responsible for the user-facing error toast.
- **Dead props removed during conversion:** the original file computed `initials`/`toneClass` (matching a pattern in `useProfessionalProfile.js`) and returned them, but nothing downstream ever used them — `ProAvatar` computes its own initials/tone internally. Removed from the return object and its imports (`getInitials`, `proAvatarTone`).

## Dependencies
`@tanstack/react-query`, `formik`, `react-i18next`, `react-router-dom`, the network API barrel (`../../network/api`), `bookingUtils.ts`, `createBookingValidation.js` (still untyped).

## Tests
`useCreateBooking.test.ts` — ~20 tests, using `renderHook` with every external dependency mocked (router, i18n, validation schemas, network calls, React Query). Covers availability logic, all field selectors, step advancement, and the full submit flow (success, failure, image upload). The working-hours branch of `isTimeUnavailable` required `jest.useFakeTimers()` to control `new Date()`, since `dateSlots` depends on the real current date.

## Screenshot
_[Add a screenshot of the file here]_
