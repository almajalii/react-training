import { API_BASE_URL } from '../../config/apiConfig';
import { buildHeaders } from '../../http/requestInterceptor';
import { handleResponse } from '../../http/responseInterceptor';
import { HttpMethod } from '../../config/apiConstants';

const forgotPassword = async (email) =>
  await handleResponse(
    fetch(`${API_BASE_URL}/auth/forgot-password`, {
      method: HttpMethod.POST,
      headers: buildHeaders(false),
      body: JSON.stringify({ email }),
    })
  );

export default forgotPassword;
