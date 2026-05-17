import { API_BASE_URL } from '../../config/apiConfig';
import { buildHeaders } from '../../http/requestInterceptor';
import { handleResponse } from '../../http/responseInterceptor';
import { HttpMethod } from '../../config/apiConstants';

const verifyEmail = async (code) =>
    await handleResponse(
        fetch(`${API_BASE_URL}/auth/verify-email`, {
            method: HttpMethod.POST,
            headers: buildHeaders(true),
            body: JSON.stringify({ code }),
        })
    );

export default verifyEmail;