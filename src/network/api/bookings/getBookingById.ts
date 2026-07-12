// @ts-expect-error
import { API_BASE_URL } from '../../config/apiConfig'
// @ts-expect-error
import { HttpMethod } from '../../config/apiConstants'
// @ts-expect-error
import { buildHeaders } from '../../http/requestInterceptor'
// @ts-expect-error
import { handleResponse } from '../../http/responseInterceptor'
import type { Booking } from '../../../types/booking'

// Used for polling a single booking's live status (job-in-progress widget),
// since there's no websocket/push channel — the widget re-fetches this on
// an interval while the booking is in an active (non-terminal) state.
const getBookingById = async (id: string): Promise<Booking> => {
  const res = await handleResponse(
    fetch(`${API_BASE_URL}/bookings/${id}`, {
      method: HttpMethod.GET,
      headers: buildHeaders(true),
    })
  )
  return res?.data
}

export default getBookingById
