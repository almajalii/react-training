import { API_BASE_URL } from '../../config/apiConfig';
import { buildHeaders } from '../../http/requestInterceptor';
import { handleResponse } from '../../http/responseInterceptor';
import { HttpMethod } from '../../config/apiConstants';

// name: string — send full name as one string e.g. "John Doe"
// Backend splits on first space into firstName / lastName
const updateName = async (name) =>
    await handleResponse(
        fetch(`${API_BASE_URL}/settings/profile/name`, {
            method: HttpMethod.PUT,
            headers: buildHeaders(true),
            body: JSON.stringify({ name }),
        })
    );

export default updateName;