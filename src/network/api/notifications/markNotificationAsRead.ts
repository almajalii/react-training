// @ts-expect-error
import { API_BASE_URL } from '../../config/apiConfig'
// @ts-expect-error
import { HttpMethod } from '../../config/apiConstants'
// @ts-expect-error
import { buildHeaders } from '../../http/requestInterceptor'
// @ts-expect-error
import { handleResponse } from '../../http/responseInterceptor'

const markNotificationAsRead = async (id: string) =>
  await handleResponse(
    fetch(`${API_BASE_URL}/notifications/${id}/read`, {
      method: HttpMethod.PUT,
      headers: buildHeaders(true),
    })
  )

export default markNotificationAsRead
