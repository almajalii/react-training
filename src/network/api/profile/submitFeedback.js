import { API_BASE_URL } from '../../config/apiConfig';
import { buildHeaders } from '../../http/requestInterceptor';
import { handleResponse } from '../../http/responseInterceptor';
import { HttpMethod } from '../../config/apiConstants';

// rating: number — must be 1-5, validated server-side with [Range(1, 5)]
// comment: string — required
// category: string — optional, defaults to 'general'
const submitFeedback = async (rating, comment, category = 'general') =>
  await handleResponse(
    fetch(`${API_BASE_URL}/settings/feedback`, {
      method: HttpMethod.POST,
      headers: buildHeaders(true),
      body: JSON.stringify({ rating, comment, category }),
    })
  );

export default submitFeedback;
