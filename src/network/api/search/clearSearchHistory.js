import { API_BASE_URL } from '../../config/apiConfig';
import { HttpMethod } from '../../config/apiConstants';
import { buildHeaders } from '../../http/requestInterceptor';
import { handleResponse } from '../../http/responseInterceptor';

// Deletes all search history for the current user — no params, no body
// Auth required
const clearSearchHistory = async () =>
  await handleResponse(
    fetch(`${API_BASE_URL}/search/recent`, {
      method: HttpMethod.DELETE,
      headers: buildHeaders(true),
    })
  );

export default clearSearchHistory;
