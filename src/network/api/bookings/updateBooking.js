import { API_BASE_URL } from '../../config/apiConfig';
import { buildHeaders } from '../../http/requestInterceptor';
import { handleResponse } from '../../http/responseInterceptor';
import { HttpMethod } from '../../config/apiConstants';

// description: string — reason for the report
const reportBooking = async (id, description) =>
    await handleResponse(
        fetch(`${API_BASE_URL}/bookings/${id}/report`, {
            method: HttpMethod.POST,
            headers: buildHeaders(true),
            body: JSON.stringify({ description }),
        })
    );

export default reportBooking;