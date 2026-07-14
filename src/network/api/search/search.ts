// @ts-expect-error
import { API_BASE_URL } from '../../config/apiConfig'
// @ts-expect-error
import { HttpMethod } from '../../config/apiConstants'
// @ts-expect-error
import { buildHeaders } from '../../http/requestInterceptor'
// @ts-expect-error
import { handleResponse } from '../../http/responseInterceptor'
import type { SearchResults } from '../../../types/search'

// q: search query
// limit: optional, default 10, backend max 10
// Returns the whole data object: { professionals, areas, services }
// Callers destructure what they need: const { professionals, services } = await search('plumber')
// Note: distanceKm is intentionally null on all professionals from search — backend doesn't use coords here
const search = async (q: string, limit = 10): Promise<SearchResults> => {
  const params = new URLSearchParams({ q, limit: String(limit) })

  const res = await handleResponse(
    fetch(`${API_BASE_URL}/search?${params}`, {
      method: HttpMethod.GET,
      // Auth optional — works for guests too, token sent if available
      headers: buildHeaders(true),
    })
  )

  // Unwrap envelope: { success, message, data: { professionals, areas, services } }
  return res?.data ?? { professionals: [], areas: [], services: [] }
}

export default search
