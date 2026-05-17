import { API_BASE_URL } from '../../config/apiConfig';
import { buildHeaders } from '../../http/requestInterceptor';
import { handleResponse } from '../../http/responseInterceptor';
import { HttpMethod } from '../../config/apiConstants';

// Called after a completed cash job to confirm payment was received
const confirmPayment = async (id) =>
    await handleResponse(
        fetch(`${API_BASE_URL}/bookings/${id}/confirm-payment`, {
            method: HttpMethod.POST,
            headers: buildHeaders(true),
        })
    );

export default confirmPayment;