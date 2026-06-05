import { API_BASE_URL } from '../../config/apiConfig';
import { HttpMethod } from '../../config/apiConstants';
import { buildHeaders } from '../../http/requestInterceptor';
import { handleResponse } from '../../http/responseInterceptor';

// id: string — Guid of the booking to modify
// booking: { serviceName, servicePrice, scheduledDate, scheduledTime, address, description }
// Only allowed when booking status is Pending or Accepted
const updateBooking = async (id, booking) =>
  await handleResponse(
    fetch(`${API_BASE_URL}/bookings/${id}`, {
      method: HttpMethod.PUT,
      headers: buildHeaders(true),
      body: JSON.stringify(booking),
    })
  );

export default updateBooking;
