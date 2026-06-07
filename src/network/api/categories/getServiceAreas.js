import { API_BASE_URL } from '../../config/apiConfig';
import { HttpMethod } from '../../config/apiConstants';
import { buildHeaders } from '../../http/requestInterceptor';
import { handleResponse } from '../../http/responseInterceptor';

// GET /api/professionals/service-areas?cityId=1  (cityId optional)
// Returns [{ id, name, nameAr, cityId }]
const getServiceAreas = async (cityId) => {
  const url = cityId
    ? `${API_BASE_URL}/professionals/service-areas?cityId=${cityId}`
    : `${API_BASE_URL}/professionals/service-areas`;

  return await handleResponse(
    fetch(url, {
      method: HttpMethod.GET,
      headers: buildHeaders(false),
    }),
  );
};

export default getServiceAreas;
