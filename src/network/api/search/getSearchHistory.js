import { API_BASE_URL } from '../../config/apiConfig';
import { HttpMethod } from '../../config/apiConstants';
import { buildHeaders } from '../../http/requestInterceptor';
import { handleResponse } from '../../http/responseInterceptor';

// Auth required — only call this when user is logged in
// Returns list of recent searches for the current user
const getSearchHistory = async () =>
  await handleResponse(
    fetch(`${API_BASE_URL}/search/recent`, {
      method: HttpMethod.GET,
      headers: buildHeaders(true),
    })
  );

export default getSearchHistory;
