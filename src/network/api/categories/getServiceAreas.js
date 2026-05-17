import { API_BASE_URL } from '../../config/apiConfig';
import { buildHeaders } from '../../http/requestInterceptor';
import { handleResponse } from '../../http/responseInterceptor';
import { HttpMethod } from '../../config/apiConstants';

// Returns all service areas across all cities
// e.g. [{ id: 1, name: 'Jubeiha', cityId: 1 }, ...]
const getServiceAreas = async () =>
    await handleResponse(
        fetch(`${API_BASE_URL}/professionals/service-areas`, {
            method: HttpMethod.GET,
            headers: buildHeaders(false),
        })
    );

export default getServiceAreas;