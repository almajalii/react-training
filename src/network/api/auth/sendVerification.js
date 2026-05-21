import { API_BASE_URL } from '../../config/apiConfig';
import { buildHeaders } from '../../http/requestInterceptor';
import { handleResponse } from '../../http/responseInterceptor';
import { HttpMethod } from '../../config/apiConstants';
//not used yet
const sendVerification = async () =>
  await handleResponse(
    fetch(`${API_BASE_URL}/auth/send-verification`, {
      method: HttpMethod.POST,
      headers: buildHeaders(true),
    })
  );

export default sendVerification;
