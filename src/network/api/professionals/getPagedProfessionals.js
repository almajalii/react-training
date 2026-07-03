import { API_BASE_URL } from '../../config/apiConfig';
import { HttpMethod } from '../../config/apiConstants';
import { buildHeaders } from '../../http/requestInterceptor';
import { handleResponse } from '../../http/responseInterceptor';

const getPagedProfessionals = async ({ categoryId, page = 1, pageSize = 10, lat, lon } = {}) => {
  const params = new URLSearchParams({ page, pageSize });
  if (categoryId != null) params.append('categoryId', categoryId);
  if (lat != null) params.append('lat', lat);
  if (lon != null) params.append('lon', lon);

  return await handleResponse(
    fetch(`${API_BASE_URL}/professionals/paged?${params}`, {
      method: HttpMethod.GET,
      headers: buildHeaders(false),
    }),
  );
};

export default getPagedProfessionals;
