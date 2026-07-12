// @ts-expect-error
import { API_BASE_URL } from '../../config/apiConfig'
// @ts-expect-error
import { HttpMethod } from '../../config/apiConstants'
// @ts-expect-error
import { buildHeaders } from '../../http/requestInterceptor'
// @ts-expect-error
import { handleResponse } from '../../http/responseInterceptor'
import type { Professional } from '../../../types/professional'

interface GetProfessionalsByAreaParams {
  areaId: number
  categoryId?: number
  lat?: number
  lon?: number
}

// areaId: required, integer id from search results (not the name string)
// categoryId: optional, omit to get all pros in that area regardless of category
// lat, lon: optional, enables distanceKm in response
const getProfessionalsByArea = async ({
  areaId,
  categoryId,
  lat,
  lon,
}: GetProfessionalsByAreaParams): Promise<Professional[]> => {
  const params = new URLSearchParams({ areaId: String(areaId) })
  if (categoryId != null) params.set('categoryId', String(categoryId))
  if (lat != null && !isNaN(lat)) params.set('lat', String(lat))
  if (lon != null && !isNaN(lon)) params.set('lon', String(lon))

  const res = await handleResponse(
    fetch(`${API_BASE_URL}/professionals/by-area?${params}`, {
      method: HttpMethod.GET,
      // Auth optional — token sent if available to populate isFavorite
      headers: buildHeaders(true),
    })
  )

  return res?.data ?? []
}

export default getProfessionalsByArea
