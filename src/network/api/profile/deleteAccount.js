import { API_BASE_URL } from '../../config/apiConfig';
import { HttpMethod } from '../../config/apiConstants';
import { buildHeaders } from '../../http/requestInterceptor';
import { handleResponse } from '../../http/responseInterceptor';
import { setToken } from '../../http/tokenHelper';

// Permanently deletes the user from the DB — this is irreversible
// Clears the token after success, same as logout
const deleteAccount = async () => {
  const res = await handleResponse(
    fetch(`${API_BASE_URL}/settings/account`, {
      method: HttpMethod.DELETE,
      headers: buildHeaders(true),
    })
  );

  // Account is gone — clear token so user is fully logged out
  setToken(null);

  return res;
};

export default deleteAccount;
