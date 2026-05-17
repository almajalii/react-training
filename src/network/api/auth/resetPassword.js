import { API_BASE_URL } from '../../config/apiConfig';
import { buildHeaders } from '../../http/requestInterceptor';
import { handleResponse } from '../../http/responseInterceptor';
import { HttpMethod } from '../../config/apiConstants';
//not used yet
const resetPassword = async (token, newPassword) =>
    await handleResponse(
        fetch(`${API_BASE_URL}/auth/reset-password`, {
            method: HttpMethod.POST,
            headers: buildHeaders(false),
            body: JSON.stringify({ token, newPassword }),
        })
    );

export default resetPassword;