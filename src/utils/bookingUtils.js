import { DAY_SLOTS, DAY_SLOTS_AR, MONTH_SLOTS, MONTH_SLOTS_AR } from '../constants/times';

// Statuses the backend considers "past" (no customer actions available)
export const PAST_STATUSES = new Set(['Completed', 'Cancelled', 'Declined']);

// Statuses where the customer can still reschedule
export const RESCHEDULE_ALLOWED = new Set(['Pending', 'Accepted']);

// Statuses where the customer can still cancel
export const CANCEL_ALLOWED = new Set(['Pending', 'Accepted']);

// Ordered progression for the booking timeline
export const TIMELINE_STEPS = ['Pending', 'Accepted', 'OnTheWay', 'Arrived', 'InProgress', 'Completed'];

export const STATUS_ORDER = Object.fromEntries(TIMELINE_STEPS.map((s, i) => [s, i]));

// Returns true if bookingStatus has reached or passed stepStatus in the flow
export function timelineDone(bookingStatus, stepStatus) {
  const bIdx = STATUS_ORDER[bookingStatus] ?? -1;
  const sIdx = STATUS_ORDER[stepStatus] ?? -1;
  return bIdx >= sIdx;
}

// Formats a booking's scheduledDate into a locale-aware readable string.
// Pass short: true for card use (e.g. "5 Feb 2025"),
// or short: false for drawer use (e.g. "Wednesday, 5 February 2025").
export function formatBookingDate(scheduledDate, isAr, short = true) {
  if (!scheduledDate) return '—';
  return new Date(scheduledDate).toLocaleDateString(
    isAr ? 'ar-JO' : 'en-GB',
    short
      ? { day: 'numeric', month: 'short', year: 'numeric' }
      : { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' },
  );
}

// Builds 7 consecutive day slots starting from today, locale-aware
export function buildRescheduleDays(isAr) {
  const FULL = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    const di = d.getDay();
    const mi = d.getMonth();
    return {
      label: isAr ? DAY_SLOTS_AR[di] : DAY_SLOTS[di],
      month: isAr ? MONTH_SLOTS_AR[mi] : MONTH_SLOTS[mi],
      num: d.getDate(),
      fullDay: FULL[di],
      iso: d.toISOString().split('T')[0],
    };
  });
}
