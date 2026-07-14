# createBookingValidation.js

**Path:** `src/screens/createBooking/createBookingValidation.js`
**Type:** Validation schemas (Yup) — not yet converted to TypeScript

## Purpose
Defines the validation rules for steps 1 and 2 of the booking form, consumed by `useCreateBooking.ts`'s Formik instance.

## Exports

| Export | Description |
|---|---|
| `step1Schema(t)` | Validates `serviceName` (required) and `description` (required, min 6 characters) |
| `step2Schema(t)` | Validates `scheduledDate` (required), `scheduledTime` (required), and `address` (required, min 3 characters) |

Both are functions that take the translation function `t` and return a Yup object schema, so error messages are localized.

## Key behavior
- `useCreateBooking.ts` picks the schema dynamically based on `step`, and only validates the fields relevant to the current step.
- `handleContinue` uses `schema.isValid(formik.values)` for a simple pass/fail check before advancing.

## Dependencies
`yup`.

## Tests
`createBookingValidation.test.ts` — 8 tests. Since this file is pure (no React, no network), it's tested directly with no mocking: pass/fail cases for both schemas, plus checking specific error messages via `.validate(..., { abortEarly: false })`.

## Screenshot
_[Not applicable — this file has no JSX/visual output]_
