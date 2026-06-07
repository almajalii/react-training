import { API_BASE_URL } from '../../config/apiConfig';
import { HttpMethod } from '../../config/apiConstants';
import { buildHeaders } from '../../http/requestInterceptor';
import { handleResponse } from '../../http/responseInterceptor';

const deleteAddress = async (id) =>
  await handleResponse(
    fetch(`${API_BASE_URL}/settings/addresses/${id}`, {
      method: HttpMethod.DELETE,
      headers: buildHeaders(true),
    })
  );

export default deleteAddress;
