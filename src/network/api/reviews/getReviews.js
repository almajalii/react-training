import { API_BASE_URL } from '../../config/apiConfig';
import { HttpMethod } from '../../config/apiConstants';
import { buildHeaders } from '../../http/requestInterceptor';
import { handleResponse } from '../../http/responseInterceptor';

// professionalId: string (uuid) — filters reviews by professional
const getReviews = async (professionalId) => {
  const params = new URLSearchParams({ professionalId });

  return await handleResponse(
    fetch(`${API_BASE_URL}/reviews?${params}`, {
      method: HttpMethod.GET,
      headers: buildHeaders(false),
    })
  );
};

export default getReviews;
