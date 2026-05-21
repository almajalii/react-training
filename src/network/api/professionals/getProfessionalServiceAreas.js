import { API_BASE_URL } from '../../config/apiConfig';
import { buildHeaders } from '../../http/requestInterceptor';
import { handleResponse } from '../../http/responseInterceptor';
import { HttpMethod } from '../../config/apiConstants';

// cityId: number — optional, omit to get all areas across all cities
// Returns [{ id, name, cityId }]
const getProfessionalServiceAreas = async (cityId) => {
  const params = new URLSearchParams();
  if (cityId !== null) params.set('cityId', cityId);

  const query = params.toString() ? `?${params}` : '';

  return await handleResponse(
    fetch(`${API_BASE_URL}/professionals/service-areas${query}`, {
      method: HttpMethod.GET,
      headers: buildHeaders(false),
    })
  );
};

export default getProfessionalServiceAreas;
