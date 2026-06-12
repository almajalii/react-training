import { API_BASE_URL } from '../../config/apiConfig';
import { HttpMethod } from '../../config/apiConstants';
import { buildHeaders } from '../../http/requestInterceptor';
import { handleResponse } from '../../http/responseInterceptor';

const getPaginatedReviews = async (professionalId, page = 1, pageSize = 5) => {
  const params = new URLSearchParams({ professionalId, page, pageSize });

  return await handleResponse(
    fetch(`${API_BASE_URL}/reviews/paginated?${params}`, {
      method: HttpMethod.GET,
      headers: buildHeaders(false),
    }),
  );
};

export default getPaginatedReviews;
