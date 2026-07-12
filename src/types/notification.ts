// Confirmed against a real GET /api/notifications response.
// `type` has at least 5 observed values (booking_confirmation, chat_messages,
// app_feedback, modifications_cancellations, support_complaints) but is kept
// as `string` rather than a strict union, since the sample isn't necessarily
// exhaustive — a union would break the moment an unseen type arrives.

export interface Notification {
  id: string
  role: string
  title: string
  body: string
  type: string
  isRead: boolean
  referenceId: string | null
  createdAt: string
}
