import { API_BASE_URL } from '../../config/apiConfig';
import { buildHeaders } from '../../http/requestInterceptor';
import { handleResponse } from '../../http/responseInterceptor';
import { setToken } from '../../http/tokenHelper';
import { HttpMethod } from '../../config/apiConstants';
// Backend expects: { email, password }
// Returns: { success, message, data: { token, user } }
const login = async (email, password) => {
    const res = await handleResponse(
        fetch(`${API_BASE_URL}/auth/login`, {
            method: HttpMethod.POST,
            headers: buildHeaders(false),
            body: JSON.stringify({ email, password }),
        })
    );
    const token = res?.data?.token;
    if (token) setToken(token);

    return res;
};

export default login;