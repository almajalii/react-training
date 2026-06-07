import { API_BASE_URL } from '../../config/apiConfig';
import { HttpMethod } from '../../config/apiConstants';
import { buildHeaders } from '../../http/requestInterceptor';
import { handleResponse } from '../../http/responseInterceptor';

// Returns all cities the app operates in
const getCities = async () =>
  await handleResponse(
    fetch(`${API_BASE_URL}/professionals/cities`, {
      method: HttpMethod.GET,
      headers: buildHeaders(false),
    })
  );

export default getCities;
