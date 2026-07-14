// @ts-expect-error
import { API_BASE_URL } from '../../config/apiConfig'
// @ts-expect-error
import { HttpMethod } from '../../config/apiConstants'
// @ts-expect-error
import { buildHeaders } from '../../http/requestInterceptor'
// @ts-expect-error
import { handleResponse } from '../../http/responseInterceptor'
import type { EditReviewPayload, Review } from '../../../types/review'

// User can only edit their own review — 403 otherwise.
const editReview = async (id: string, payload: EditReviewPayload): Promise<Review> => {
  const res = await handleResponse(
    fetch(`${API_BASE_URL}/reviews/${id}`, {
      method: HttpMethod.PUT,
      headers: buildHeaders(true),
      body: JSON.stringify(payload),
    })
  )
  return res?.data
}

export default editReview
