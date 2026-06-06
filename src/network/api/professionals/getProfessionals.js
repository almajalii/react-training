import { API_BASE_URL } from '../../config/apiConfig';
import { HttpMethod } from '../../config/apiConstants';
import { buildHeaders } from '../../http/requestInterceptor';
import { handleResponse } from '../../http/responseInterceptor';

// categoryId: number — optional, filters by category
const getProfessionals = async (categoryId, lat, lon) => {
  const params = new URLSearchParams();
  if (categoryId != null) params.set('categoryId', categoryId); // != catches both null and undefined
  if (lat != null && !isNaN(lat)) params.set('lat', lat);
  if (lon != null && !isNaN(lon)) params.set('lon', lon);

  const query = params.toString() ? `?${params}` : '';

  return await handleResponse(
    fetch(`${API_BASE_URL}/professionals${query}`, {
      method: HttpMethod.GET,
      headers: buildHeaders(true),
    }),
  );
};

export default getProfessionals;
