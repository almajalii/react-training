// @ts-expect-error
import { API_BASE_URL } from '../../config/apiConfig'
// @ts-expect-error
import { HttpMethod } from '../../config/apiConstants'
// @ts-expect-error
import { buildHeaders } from '../../http/requestInterceptor'
// @ts-expect-error
import { handleResponse } from '../../http/responseInterceptor'

const markAllNotificationsAsRead = async () =>
  await handleResponse(
    fetch(`${API_BASE_URL}/notifications/read-all`, {
      method: HttpMethod.PUT,
      headers: buildHeaders(true),
    })
  )

export default markAllNotificationsAsRead
