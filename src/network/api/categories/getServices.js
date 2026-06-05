import { API_BASE_URL } from '../../config/apiConfig';
import { HttpMethod } from '../../config/apiConstants';
import { buildHeaders } from '../../http/requestInterceptor';
import { handleResponse } from '../../http/responseInterceptor';

// categoryId: number — e.g. 1 for Plumbing, 2 for Electrical (see apiConstants for full map)
// Returns list of services available under that category
const getServices = async (categoryId) =>
  await handleResponse(
    fetch(`${API_BASE_URL}/professionals/services?categoryId=${categoryId}`, {
      method: HttpMethod.GET,
      headers: buildHeaders(false),
    })
  );

export default getServices;
