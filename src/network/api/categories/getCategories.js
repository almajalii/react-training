import { API_BASE_URL } from '../../config/apiConfig';
import { HttpMethod } from '../../config/apiConstants';
import { buildHeaders } from '../../http/requestInterceptor';
import { handleResponse } from '../../http/responseInterceptor';

// Returns { data: [{ id, name, nameAr }] }
// NOTE: The backend serves categories via /api/professionals/services?categoryId=X
// This endpoint fetches all categories from the admin-managed list.
// For browsing, prefer the CATEGORIES constant in src/constants/categories.js
// which maps slugs to the numeric IDs used by the API.
const getCategories = async () =>
  await handleResponse(
    fetch(`${API_BASE_URL}/professionals/services`, {
      method: HttpMethod.GET,
      headers: buildHeaders(false),
    })
  );

export default getCategories;
