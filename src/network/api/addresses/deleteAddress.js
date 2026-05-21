import { API_BASE_URL } from '../../config/apiConfig';
import { buildHeaders } from '../../http/requestInterceptor';
import { handleResponse } from '../../http/responseInterceptor';
import { HttpMethod } from '../../config/apiConstants';

const deleteAddress = async (id) =>
  await handleResponse(
    fetch(`${API_BASE_URL}/settings/addresses/${id}`, {
      method: HttpMethod.DELETE,
      headers: buildHeaders(true),
    })
  );

export default deleteAddress;
