import { API_BASE_URL } from '../../config/apiConfig';
import { HttpMethod } from '../../config/apiConstants';
import { buildHeaders } from '../../http/requestInterceptor';
import { handleResponse } from '../../http/responseInterceptor';

// Auth required — returns full ProfessionalDto[] for the logged-in user's saved favorites
const getFavorites = async () =>
  await handleResponse(
    fetch(`${API_BASE_URL}/professionals/favorites`, {
      method: HttpMethod.GET,
      headers: buildHeaders(true),
    })
  );

export default getFavorites;
