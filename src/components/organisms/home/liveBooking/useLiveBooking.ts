import { useQuery } from '@tanstack/react-query'
// @ts-expect-error
import { getUpcomingBookings } from '../../../../network/api'
import getBookingById from '../../../../network/api/bookings/getBookingById'
import { PAST_STATUSES } from '../../../../utils/bookingUtils'
import type { Booking } from '../../../../types/booking'

const POLL_INTERVAL_MS = 7000

export default function useLiveBooking() {
  // Stage 1: find which upcoming booking (if any) is currently "in flight".
  // Deliberately reuses the same queryKey as useMyBookings.js, so this widget
  // and the My Bookings screen share one cached fetch instead of duplicating it.
  const { data: upcoming = [], isLoading: findingActive } = useQuery({
    queryKey: ['bookings', 'upcoming'],
    queryFn: () => getUpcomingBookings().then((r: any) => r?.data ?? r ?? []),
  })

  const activeFromList = (upcoming as Booking[]).find(b => !PAST_STATUSES.has(b.status)) ?? null
  const activeId = activeFromList?.id ?? null

  // Stage 2: poll that specific booking for live status changes. Stops
  // polling automatically once the status reaches a terminal state.
  const { data: liveBooking, isLoading: loadingLive } = useQuery({
    queryKey: ['booking-live', activeId],
    queryFn: () => getBookingById(activeId as string),
    enabled: !!activeId,
    refetchInterval: query => {
      const status = query.state.data?.status
      if (!status || PAST_STATUSES.has(status)) return false
      return POLL_INTERVAL_MS
    },
  })

  const booking = liveBooking ?? activeFromList

  return {
    booking,
    isLoading: findingActive || (!!activeId && loadingLive && !booking),
    hasActiveBooking: !!booking && !PAST_STATUSES.has(booking.status),
  }
}
