import { API_BASE_URL } from '../../config/apiConfig'
import { HttpMethod } from '../../config/apiConstants'
import { buildHeaders } from '../../http/requestInterceptor'
import { handleResponse } from '../../http/responseInterceptor'

// categoryId: number — required
// minExp: int — optional, minimum years of experience
// maxDistance: float (km) — optional, only active if lat + lon are also provided
// minRating: float — optional, e.g. 4.0
// lat, lon: number — optional, required for distance filtering to work
const filterProfessionals = async ({
  categoryId,
  minExp,
  maxDistance,
  minRating,
  lat,
  lon,
  page = 1,
  pageSize = 10,
} = {}) => {
  const params = new URLSearchParams({ categoryId, page, pageSize })
  if (minExp != null) params.set('minExp', minExp)
  if (maxDistance != null) params.set('maxDistance', maxDistance)
  if (minRating != null) params.set('minRating', minRating)
  if (lat != null && !isNaN(lat)) params.set('lat', lat)
  if (lon != null && !isNaN(lon)) params.set('lon', lon)

  return await handleResponse(
    fetch(`${API_BASE_URL}/professionals/filter-paged?${params}`, {
      method: HttpMethod.GET, // Token sent if available — populates isFavorite for logged-in
      headers: buildHeaders(true),
    })
  )
}

export default filterProfessionals
