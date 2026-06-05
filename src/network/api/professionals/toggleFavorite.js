import { API_BASE_URL } from '../../config/apiConfig';
import { HttpMethod } from '../../config/apiConstants';
import { buildHeaders } from '../../http/requestInterceptor';
import { handleResponse } from '../../http/responseInterceptor';

// id: string — Guid of the professional
// Backend handles add/remove automatically:
// if already favorited → removes it, if not → adds it
// Auth required
const toggleFavorite = async (id) =>
  await handleResponse(
    fetch(`${API_BASE_URL}/professionals/${id}/favorite`, {
      method: HttpMethod.POST,
      headers: buildHeaders(true),
    })
  );

export default toggleFavorite;
