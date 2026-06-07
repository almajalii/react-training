import { API_BASE_URL } from '../../config/apiConfig';
import { HttpMethod } from '../../config/apiConstants';
import { buildHeaders } from '../../http/requestInterceptor';
import { handleResponse } from '../../http/responseInterceptor';

// id: string — Guid of the professional
// lat, lon: number — optional, enables distanceKm in response
// getProfessionals.js — change the guards to also reject undefined strings
const getProfessional = async (id, lat, lon) => {
  const params = new URLSearchParams();
  if (lat != null && !isNaN(lat)) params.set('lat', lat);
  if (lon != null && !isNaN(lon)) params.set('lon', lon);

  const query = params.toString() ? `?${params}` : '';

  return await handleResponse(
    fetch(`${API_BASE_URL}/professionals/${id}${query}`, {
      method: HttpMethod.GET,
      headers: buildHeaders(true),
    })
  );
};

export default getProfessional;
