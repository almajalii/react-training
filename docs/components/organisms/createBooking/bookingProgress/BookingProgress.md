# BookingProgress.tsx

**Path:** `src/components/organisms/createBooking/bookingProgress/BookingProgress.tsx`
**Type:** Component (presentational)

## Purpose

Renders the 3-dot step indicator at the top of the booking flow (Service / Schedule / Confirm), highlighting the current step.

## Props

| Name   | Type        | Description                                          |
| ------ | ----------- | ---------------------------------------------------- |
| `step` | `number`    | The current step (1–3)                               |
| `t`    | `TFunction` | Translation function, used for the three step labels |

## Returns / Exports

Default export: `BookingProgress({ step, t })`, a React component. Renders the untyped `ProgressBar` molecule with a `steps` array and `currentStep`.

## Key behavior

Purely presentational — builds a `steps` array of translated labels and passes it straight to `ProgressBar`. No internal state or logic.

## Dependencies

`ProgressBar` (still untyped `.jsx` molecule).

## Tests

Not yet tested — a good candidate for a quick smoke test (render + check the three labels appear) if more coverage is added later.

## Screenshot

![alt text](image.png)
![alt text](image-1.png)
![alt text](image-2.png)
