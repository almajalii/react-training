import { API_BASE_URL } from '../../config/apiConfig';
import { HttpMethod } from '../../config/apiConstants';
import { buildHeaders } from '../../http/requestInterceptor';
import { handleResponse } from '../../http/responseInterceptor';

// areaId: number — required, integer id from search results (not the name string)
// categoryId: number — optional, omit to get all pros in that area regardless of category
// lat, lon: number — optional, enables distanceKm in response
const getProfessionalsByArea = async ({ areaId, categoryId, lat, lon } = {}) => {
  const params = new URLSearchParams({ areaId });
  if (categoryId !== null) params.set('categoryId', categoryId);
  if (lat != null && !isNaN(lat)) params.set('lat', lat);
  if (lon != null && !isNaN(lon)) params.set('lon', lon);

  return await handleResponse(
    fetch(`${API_BASE_URL}/professionals/by-area?${params}`, {
      method: HttpMethod.GET,
      // Auth optional — token sent if available to populate isFavorite
      headers: buildHeaders(true),
    })
  );
};

export default getProfessionalsByArea;
