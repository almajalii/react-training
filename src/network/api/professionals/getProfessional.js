import { API_BASE_URL } from '../../config/apiConfig';
import { buildHeaders } from '../../http/requestInterceptor';
import { handleResponse } from '../../http/responseInterceptor';
import { HttpMethod } from '../../config/apiConstants';

// id: string — Guid of the professional
// lat, lon: number — optional, enables distanceKm in response
const getProfessional = async (id, lat, lon) => {
    const params = new URLSearchParams();
    if (lat != null) params.set('lat', lat);
    if (lon != null) params.set('lon', lon);

    const query = params.toString() ? `?${params}` : '';

    return await handleResponse(
        fetch(`${API_BASE_URL}/professionals/${id}${query}`, {
            method: HttpMethod.GET,
            headers: buildHeaders(true),
        })
    );
};

export default getProfessional;