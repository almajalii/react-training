import { API_BASE_URL } from '../../config/apiConfig';
import { HttpMethod } from '../../config/apiConstants';
import { buildHeaders } from '../../http/requestInterceptor';
import { handleResponse } from '../../http/responseInterceptor';

// GET /api/categories
// Returns { data: [{ id, name, nameAr }] }
const getCategories = async () =>
  await handleResponse(
    fetch(`${API_BASE_URL}/categories`, {
      method: HttpMethod.GET,
      headers: buildHeaders(false),
    }),
  );

export default getCategories;
