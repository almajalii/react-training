import { API_BASE_URL } from '../../config/apiConfig';
import { buildHeaders } from '../../http/requestInterceptor';
import { handleResponse } from '../../http/responseInterceptor';
import { HttpMethod } from '../../config/apiConstants';

// gender: string — plain string, max 20 chars, no enum enforced server-side
// e.g. "male", "female"
const updateGender = async (gender) =>
    await handleResponse(
        fetch(`${API_BASE_URL}/settings/profile/gender`, {
            method: HttpMethod.PUT,
            headers: buildHeaders(true),
            body: JSON.stringify({ gender }),
        })
    );

export default updateGender;