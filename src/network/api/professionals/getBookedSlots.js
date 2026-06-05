import { API_BASE_URL } from '../../config/apiConfig';
import { buildHeaders } from '../../http/requestInterceptor';
import { handleResponse } from '../../http/responseInterceptor';
import { HttpMethod } from '../../config/apiConstants';

// id: string — Guid of the professional
// date: string — ISO date string e.g. "2025-06-10"
// Returns { data: ["09:00", "14:00", ...] } — time slots already booked for that day
const getBookedSlots = async (id, date) => {
  const params = new URLSearchParams({ date });
  const res = await handleResponse(
    fetch(`${API_BASE_URL}/professionals/${id}/booked-slots?${params}`, {
      method: HttpMethod.GET,
      headers: buildHeaders(false),
    })
  );
  return res?.data ?? [];
};

export default getBookedSlots;
