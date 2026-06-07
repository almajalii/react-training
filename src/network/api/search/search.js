import { API_BASE_URL } from '../../config/apiConfig';
import { HttpMethod } from '../../config/apiConstants';
import { buildHeaders } from '../../http/requestInterceptor';
import { handleResponse } from '../../http/responseInterceptor';

// q: string — search query
// limit: number — optional, default 5, max 10
// Returns the whole data object: { professionals, areas, services }
// Callers destructure what they need: const { professionals, areas, services } = await search('plumber')
// Note: distanceKm is intentionally null on all professionals from search — backend doesn't use coords here
const search = async (q, limit = 10) => {
  const params = new URLSearchParams({ q, limit });

  const res = await handleResponse(
    fetch(`${API_BASE_URL}/search?${params}`, {
      method: HttpMethod.GET,
      // Auth optional — works for guests too, token sent if available
      headers: buildHeaders(true),
    })
  );

  // Unwrap envelope: { success, message, data: { professionals, areas, services } }
  return res?.data ?? { professionals: [], areas: [], services: [] };
};

export default search;
