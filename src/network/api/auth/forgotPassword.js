import { API_BASE_URL } from '../../config/apiConfig';
import { HttpMethod } from '../../config/apiConstants';
import { buildHeaders } from '../../http/requestInterceptor';
import { handleResponse } from '../../http/responseInterceptor';

const forgotPassword = async (email) =>
  await handleResponse(
    fetch(`${API_BASE_URL}/auth/forgot-password`, {
      method: HttpMethod.POST,
      headers: buildHeaders(false),
      body: JSON.stringify({ email }),
    })
  );

export default forgotPassword;
