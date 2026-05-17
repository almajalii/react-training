import { API_BASE_URL } from '../../config/apiConfig';
import { buildHeaders } from '../../http/requestInterceptor';
import { handleResponse } from '../../http/responseInterceptor';
import { HttpMethod } from '../../config/apiConstants';

// address shape: { type, area, street, buildingName, apartmentNumber, floor, house, additionalDirections, latitude, longitude }
// type is "apartment" | "house" — send as plain string, not a number or boolean
const createAddress = async (address) =>
    await handleResponse(
        fetch(`${API_BASE_URL}/settings/addresses`, {
            method: HttpMethod.POST,
            headers: buildHeaders(true),
            body: JSON.stringify(address),
        })
    );

export default createAddress;