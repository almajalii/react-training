import { API_BASE_URL } from '../../config/apiConfig';
import { buildHeaders } from '../../http/requestInterceptor';
import { handleResponse } from '../../http/responseInterceptor';
import { HttpMethod } from '../../config/apiConstants';

// id: string — Guid of the specific search history item to delete
// Auth required
const deleteSearchItem = async (id) =>
    await handleResponse(
        fetch(`${API_BASE_URL}/search/recent/${id}`, {
            method: HttpMethod.DELETE,
            headers: buildHeaders(true),
        })
    );

export default deleteSearchItem;