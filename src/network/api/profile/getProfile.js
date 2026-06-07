import { API_BASE_URL } from '../../config/apiConfig';
import { HttpMethod } from '../../config/apiConstants';
import { buildHeaders } from '../../http/requestInterceptor';
import { handleResponse } from '../../http/responseInterceptor';

// Returns ProfileDto: { name, email, phone, dateOfBirth, gender, profileImageUrl }
const getProfile = async () =>
  await handleResponse(
    fetch(`${API_BASE_URL}/settings/profile`, {
      method: HttpMethod.GET,
      headers: buildHeaders(true),
    })
  );

export default getProfile;
