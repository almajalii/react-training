import { API_BASE_URL } from '../../config/apiConfig';
import { HttpMethod } from '../../config/apiConstants';
import { buildHeaders } from '../../http/requestInterceptor';
import { handleResponse } from '../../http/responseInterceptor';

// booking: { professionalId, serviceName, servicePrice, scheduledDate, scheduledTime, address, description, imageUrls }
const createBooking = async (booking) =>
  await handleResponse(
    fetch(`${API_BASE_URL}/bookings`, {
      method: HttpMethod.POST,
      headers: buildHeaders(true),
      body: JSON.stringify(booking),
    })
  );

export default createBooking;
