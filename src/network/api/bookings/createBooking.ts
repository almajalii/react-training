// @ts-expect-error
import { API_BASE_URL } from '../../config/apiConfig'
// @ts-expect-error
import { HttpMethod } from '../../config/apiConstants'
// @ts-expect-error
import { buildHeaders } from '../../http/requestInterceptor'
// @ts-expect-error
import { handleResponse } from '../../http/responseInterceptor'
import { NewBooking } from '../../../types/booking'
// booking: { professionalId, serviceName, servicePrice, scheduledDate, scheduledTime, address, description, imageUrls }
const createBooking = async (booking: NewBooking) =>
  await handleResponse(
    fetch(`${API_BASE_URL}/bookings`, {
      method: HttpMethod.POST,
      headers: buildHeaders(true),
      body: JSON.stringify(booking),
    })
  )

export default createBooking
