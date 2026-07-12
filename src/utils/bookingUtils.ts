// @ts-expect-error
import { DAY_SLOTS, DAY_SLOTS_AR, MONTH_SLOTS, MONTH_SLOTS_AR } from '../constants/times'
// @ts-expect-error
import { FULL_DAY_NAMES } from '../constants/days'
export const PAST_STATUSES = new Set(['Completed', 'Cancelled', 'Declined'])
export const RESCHEDULE_ALLOWED = new Set(['Pending', 'Accepted'])
export const CANCEL_ALLOWED = new Set(['Pending', 'Accepted'])
export const TIMELINE_STEPS = ['Pending', 'Accepted', 'OnTheWay', 'Arrived', 'InProgress', 'Completed']
export const STATUS_ORDER = Object.fromEntries(TIMELINE_STEPS.map((s, i) => [s, i]))

export type BookingStatus =
  | 'Pending'
  | 'Accepted'
  | 'OnTheWay'
  | 'Arrived'
  | 'InProgress'
  | 'Completed'
  | 'Cancelled'
  | 'Declined'
//check if the step is done or not, based on the current booking status
export function timelineDone(bookingStatus: BookingStatus, stepStatus: BookingStatus): boolean {
  const bIdx = STATUS_ORDER[bookingStatus] ?? -1
  const sIdx = STATUS_ORDER[stepStatus] ?? -1
  return bIdx >= sIdx
}

export function formatBookingDate(scheduledDate: string | null, isAr: boolean, short = true): string {
  if (!scheduledDate) return '—'
  return new Date(scheduledDate).toLocaleDateString(
    isAr ? 'ar-JO' : 'en-GB',
    short
      ? { day: 'numeric', month: 'short', year: 'numeric' }
      : { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }
  )
}

// ONE function, replaces both buildRescheduleDays and buildDateSlots
// uses FULL_DAY_NAMES from constants instead of defining it locally
export function buildDateSlots(isAr: boolean) {
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() + i)
    const di = d.getDay()
    const mi = d.getMonth()
    return {
      label: isAr ? DAY_SLOTS_AR[di] : DAY_SLOTS[di],
      fullDay: FULL_DAY_NAMES[di], // ← from constants, not a local array
      num: d.getDate(),
      month: isAr ? MONTH_SLOTS_AR[mi] : MONTH_SLOTS[mi],
      iso: d.toISOString().split('T')[0],
    }
  })
}
// converts a time string (12-hour or 24-hour) to minutes since midnight
export function toMinutes(timeStr: string | null): number | null {
  if (!timeStr) return null
  const s = timeStr.trim()

  const match12 = s.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i)
  if (match12) {
    let h = parseInt(match12[1], 10)
    const m = parseInt(match12[2], 10)
    const period = match12[3].toUpperCase()
    if (period === 'AM' && h === 12) h = 0
    if (period === 'PM' && h !== 12) h += 12
    return h * 60 + m
  }

  const match24 = s.match(/^(\d{1,2}):(\d{2})$/)
  if (match24) {
    return parseInt(match24[1], 10) * 60 + parseInt(match24[2], 10)
  }

  return null
}
// checks if a given time slot is within the working hours defined by openTime and closeTime
export function isWithinWorkingHours(timeSlot: string | null, openTime: string | null, closeTime: string | null) {
  const slot = toMinutes(timeSlot)
  const open = toMinutes(openTime)
  const close = toMinutes(closeTime)
  if (slot == null || open == null || close == null) return true
  return slot >= open && slot <= close
}
// configuration for booking status labels and CSS classes
export const STATUS_CONFIG: Record<BookingStatus, { labelKey: string; classes: string }> = {
  Pending: {
    labelKey: 'bk_status_pending',
    classes: 'bg-amber-100  text-amber-800  dark:bg-amber-900/30  dark:text-amber-300',
  },
  Accepted: {
    labelKey: 'bk_status_accepted',
    classes: 'bg-blue-100   text-blue-800   dark:bg-blue-900/30   dark:text-blue-300',
  },
  OnTheWay: {
    labelKey: 'bk_status_on_the_way',
    classes: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
  },
  Arrived: {
    labelKey: 'bk_status_arrived',
    classes: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
  },
  InProgress: {
    labelKey: 'bk_status_in_progress',
    classes: 'bg-blue-100   text-blue-800   dark:bg-blue-900/30   dark:text-blue-300',
  },
  Completed: {
    labelKey: 'bk_status_completed',
    classes: 'bg-green-100  text-green-800  dark:bg-green-900/30  dark:text-green-300',
  },
  Cancelled: {
    labelKey: 'bk_status_cancelled',
    classes: 'bg-red-100    text-red-800    dark:bg-red-900/30    dark:text-red-300',
  },
  Declined: {
    labelKey: 'bk_status_declined',
    classes: 'bg-red-100    text-red-800    dark:bg-red-900/30    dark:text-red-300',
  },
}
