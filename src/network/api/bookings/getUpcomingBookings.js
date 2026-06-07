import { API_BASE_URL } from '../../config/apiConfig';
import { HttpMethod } from '../../config/apiConstants';
import { buildHeaders } from '../../http/requestInterceptor';
import { handleResponse } from '../../http/responseInterceptor';

const getUpcomingBookings = async () =>
  await handleResponse(
    fetch(`${API_BASE_URL}/bookings/upcoming`, {
      method: HttpMethod.GET,
      headers: buildHeaders(true),
    })
  );

export default getUpcomingBookings;
