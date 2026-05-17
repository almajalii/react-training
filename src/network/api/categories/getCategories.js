import { API_BASE_URL } from '../../config/apiConfig';
import { buildHeaders } from '../../http/requestInterceptor';
import { handleResponse } from '../../http/responseInterceptor';
import { HttpMethod } from '../../config/apiConstants';
//not used because its only in english so far
// Returns { data: [{ id, name }] } — e.g. [{ id: 1, name: 'Plumbing' }, ...]
const getCategories = async () =>
    await handleResponse(
        fetch(`${API_BASE_URL}/categories`, {
            method: HttpMethod.GET,
            headers: buildHeaders(false),
        })
    );

export default getCategories;