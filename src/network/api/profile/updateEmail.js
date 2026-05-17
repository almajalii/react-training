import { API_BASE_URL } from '../../config/apiConfig';
import { buildHeaders } from '../../http/requestInterceptor';
import { handleResponse } from '../../http/responseInterceptor';
import { HttpMethod } from '../../config/apiConstants';

// email: string — backend checks uniqueness, throws if already taken by another user
// Handle the error message specifically in the UI
const updateEmail = async (email) =>
    await handleResponse(
        fetch(`${API_BASE_URL}/settings/profile/email`, {
            method: HttpMethod.PUT,
            headers: buildHeaders(true),
            body: JSON.stringify({ email }),
        })
    );

export default updateEmail;