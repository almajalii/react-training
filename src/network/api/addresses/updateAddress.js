import { API_BASE_URL } from '../../config/apiConfig';
import { buildHeaders } from '../../http/requestInterceptor';
import { handleResponse } from '../../http/responseInterceptor';
import { HttpMethod } from '../../config/apiConstants';

// address shape: { id, type, area, street, buildingName, apartmentNumber, floor, house, additionalDirections, latitude, longitude }
// id must be included in the body — backend validates ownership before updating
const updateAddress = async (id, address) =>
    await handleResponse(
        fetch(`${API_BASE_URL}/settings/addresses/${id}`, {
            method: HttpMethod.PUT,
            headers: buildHeaders(true),
            body: JSON.stringify(address),
        })
    );

export default updateAddress;