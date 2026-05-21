import { API_BASE_URL } from '../../config/apiConfig';
import { buildHeaders } from '../../http/requestInterceptor';
import { handleResponse } from '../../http/responseInterceptor';
import { HttpMethod } from '../../config/apiConstants';

// dateOfBirth: string — plain string, max 20 chars, no format enforced server-side
// Be consistent with format across the app e.g. "1995-08-21"
const updateDob = async (dateOfBirth) =>
  await handleResponse(
    fetch(`${API_BASE_URL}/settings/profile/dob`, {
      method: HttpMethod.PUT,
      headers: buildHeaders(true),
      body: JSON.stringify({ dateOfBirth }),
    })
  );

export default updateDob;
