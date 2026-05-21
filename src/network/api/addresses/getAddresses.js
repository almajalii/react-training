import { API_BASE_URL } from '../../config/apiConfig';
import { buildHeaders } from '../../http/requestInterceptor';
import { handleResponse } from '../../http/responseInterceptor';
import { HttpMethod } from '../../config/apiConstants';

const getAddresses = async () => {
  const res = await handleResponse(
    fetch(`${API_BASE_URL}/settings/addresses`, {
      method: HttpMethod.GET,
      headers: buildHeaders(true),
    })
  );
  // Response: { success, message, data: [] } — unwrap to get the array directly
  return res?.data ?? [];
};

export default getAddresses;
