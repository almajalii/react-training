// @ts-expect-error
import { API_BASE_URL } from '../../config/apiConfig'
// @ts-expect-error
import { HttpMethod } from '../../config/apiConstants'
// @ts-expect-error
import { buildHeaders } from '../../http/requestInterceptor'
// @ts-expect-error
import { handleResponse } from '../../http/responseInterceptor'

// Same ownership restriction as editReview — 403 if not the review's author.
const deleteReview = async (id: string) =>
  await handleResponse(
    fetch(`${API_BASE_URL}/reviews/${id}`, {
      method: HttpMethod.DELETE,
      headers: buildHeaders(true),
    })
  )

export default deleteReview
