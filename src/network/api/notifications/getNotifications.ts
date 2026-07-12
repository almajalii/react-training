// @ts-expect-error
import { API_BASE_URL } from '../../config/apiConfig'
// @ts-expect-error
import { HttpMethod } from '../../config/apiConstants'
// @ts-expect-error
import { buildHeaders } from '../../http/requestInterceptor'
// @ts-expect-error
import { handleResponse } from '../../http/responseInterceptor'
import type { Notification } from '../../../types/notification'

// role: 'customer' | 'professional' — matches the logged-in user's role
const getNotifications = async (role: string): Promise<Notification[]> => {
  const res = await handleResponse(
    fetch(`${API_BASE_URL}/notifications?role=${role}`, {
      method: HttpMethod.GET,
      headers: buildHeaders(true),
    })
  )
  return res?.data ?? []
}

export default getNotifications
