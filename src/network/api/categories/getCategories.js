import { API_BASE_URL } from '../../config/apiConfig';
import { buildHeaders } from '../../http/requestInterceptor';
import { handleResponse } from '../../http/responseInterceptor';
import { HttpMethod } from '../../config/apiConstants';

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
