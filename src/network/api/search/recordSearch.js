import { API_BASE_URL } from '../../config/apiConfig';
import { HttpMethod } from '../../config/apiConstants';
import { buildHeaders } from '../../http/requestInterceptor';
import { handleResponse } from '../../http/responseInterceptor';

// query: string — the search term to record
// Called automatically after results come back, not on result tap
// Backend upserts — same query just bumps the timestamp, no duplicates created
// Auth required — only call when user is logged in
const recordSearch = async (query) =>
  await handleResponse(
    fetch(`${API_BASE_URL}/search/recent`, {
      method: HttpMethod.POST,
      headers: buildHeaders(true),
      body: JSON.stringify({ query }),
    })
  );

export default recordSearch;
