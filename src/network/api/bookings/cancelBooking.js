import { API_BASE_URL } from '../../config/apiConfig';
import { HttpMethod } from '../../config/apiConstants';
import { buildHeaders } from '../../http/requestInterceptor';
import { handleResponse } from '../../http/responseInterceptor';

// reason: string — required by backend (CancelBookingRequest.Reason)
const cancelBooking = async (id, reason) =>
  await handleResponse(
    fetch(`${API_BASE_URL}/bookings/${id}`, {
      method: HttpMethod.DELETE,
      headers: buildHeaders(true),
      body: JSON.stringify({ reason }),
    })
  );

export default cancelBooking;
