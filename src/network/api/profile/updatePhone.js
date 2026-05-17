import { API_BASE_URL } from '../../config/apiConfig';
import { buildHeaders } from '../../http/requestInterceptor';
import { handleResponse } from '../../http/responseInterceptor';
import { HttpMethod } from '../../config/apiConstants';

// phone: string — e.g. "+962791234567"
const updatePhone = async (phone) =>
    await handleResponse(
        fetch(`${API_BASE_URL}/settings/profile/phone`, {
            method: HttpMethod.PUT,
            headers: buildHeaders(true),
            body: JSON.stringify({ phone }),
        })
    );

export default updatePhone;