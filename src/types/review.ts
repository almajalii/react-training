// Confirmed against the real POST /api/reviews spec (AddReviewRequest / ReviewDto).

export interface Review {
  id: string
  professionalId: string
  bookingId: string
  reviewerId: string
  reviewerName: string
  reviewerImageUrl?: string
  rating: number
  comment: string
  createdAt: string
  updatedAt: string | null
}

export interface AddReviewPayload {
  professionalId: string
  bookingId: string
  rating: number
  comment: string
}

export interface EditReviewPayload {
  rating: number
  comment: string
}
