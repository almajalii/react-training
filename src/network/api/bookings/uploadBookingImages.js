import { API_BASE_URL } from '../../config/apiConfig';
import { buildHeaders } from '../../http/requestInterceptor';
import { handleResponse } from '../../http/responseInterceptor';

// files: File[] — array of File objects from the image picker (max 5)
// Uploads to Azure Blob Storage via the backend and returns real public URLs.
// Must be called before createBooking — pass the returned URLs as imageUrls.
const uploadBookingImages = async (files) => {
  if (!files?.length) return [];

  const formData = new FormData();
  files.forEach((file) => formData.append('files', file));

  const res = await handleResponse(
    fetch(`${API_BASE_URL}/bookings/images`, {
      method: 'POST',
      // No Content-Type header — browser sets it automatically with the correct boundary for multipart
      headers: buildHeaders(true, false),
      body: formData,
    })
  );

  return res?.data ?? [];
};

export default uploadBookingImages;
