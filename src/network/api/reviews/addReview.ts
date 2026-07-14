// @ts-expect-error
import { API_BASE_URL } from '../../config/apiConfig'
// @ts-expect-error
import { HttpMethod } from '../../config/apiConstants'
// @ts-expect-error
import { buildHeaders } from '../../http/requestInterceptor'
// @ts-expect-error
import { handleResponse } from '../../http/responseInterceptor'
import type { AddReviewPayload, Review } from '../../../types/review'

// Reviewer is derived server-side from the JWT — never sent in the body.
// Throws on: professional not found (404), or a review already exists for
// this bookingId (400, "You have already reviewed this booking.").
const addReview = async (payload: AddReviewPayload): Promise<Review> => {
  const res = await handleResponse(
    fetch(`${API_BASE_URL}/reviews`, {
      method: HttpMethod.POST,
      headers: buildHeaders(true),
      body: JSON.stringify(payload),
    })
  )
  return res?.data
}

export default addReview
