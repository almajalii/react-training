import { API_BASE_URL } from '../../config/apiConfig';
import { buildHeaders } from '../../http/requestInterceptor';
import { handleResponse } from '../../http/responseInterceptor';
import { HttpMethod } from '../../config/apiConstants';

const getPastBookings = async () =>
  await handleResponse(
    fetch(`${API_BASE_URL}/bookings/past`, {
      method: HttpMethod.GET,
      headers: buildHeaders(true),
    })
  );

export default getPastBookings;
