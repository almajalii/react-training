import { useEffect, useRef, useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { PAST_STATUSES, formatBookingDate } from '../../../../utils/bookingUtils'
// @ts-expect-error
import { addReview } from '../../../../network/api/reviews'

export function useBookingDrawer({ booking, onClose, onCancel, onReschedule }) {
  const { t, i18n } = useTranslation()
  const isAr = useMemo(() => i18n.language === 'ar', [i18n.language])
  const queryClient = useQueryClient()

  // which sub-sheet is open inside the drawer: null, 'reschedule', 'cancel', or 'review'
  const [sheet, setSheet] = useState(null)
  const [submittingReview, setSubmittingReview] = useState(false)
  const backdropRef = useRef(null)

  const isPast = useMemo(() => PAST_STATUSES.has(booking?.status), [booking?.status])

  const dateLabel = useMemo(
    () => formatBookingDate(booking?.scheduledDate, isAr, false),
    [booking?.scheduledDate, isAr]
  )

  const serviceName = useMemo(
    () => (isAr && booking?.serviceNameAr ? booking.serviceNameAr : booking?.serviceName),
    [isAr, booking?.serviceNameAr, booking?.serviceName]
  )

  // close drawer on Escape, but only if no sub-sheet is open
  useEffect(() => {
    const handler = e => {
      if (e.key === 'Escape' && !sheet) onClose()
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose, sheet])

  // lock body scroll while drawer is open
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  // calls the reschedule mutation then closes the sheet
  const handleReschedule = (iso, time) => {
    onReschedule({ id: booking.id, scheduledDate: iso, scheduledTime: time })
    setSheet(null)
  }

  // calls the cancel mutation then closes the sheet
  const handleCancel = () => {
    onCancel({ id: booking.id, reason: 'Customer requested cancellation' })
    setSheet(null)
  }

  // Posts a new review for this booking. Reviews are scoped to the
  // professional's rating (a separate query key from the bookings list), so
  // this is handled locally here rather than bubbled up through useMyBookings
  // the way cancel/reschedule are.
  const handleAddReview = async (rating, comment) => {
    setSubmittingReview(true)
    try {
      await addReview({
        professionalId: booking.professionalId,
        bookingId: booking.id,
        rating,
        comment,
      })
      toast.success(t('bk_review_toast_success'))
      // Refreshes the professional's review list/rating average wherever it's shown
      queryClient.invalidateQueries({ queryKey: ['reviews', booking.professionalId] })
      setSheet(null)
    } catch (err) {
      // Backend returns a 400 with this message when the booking already has
      // a review — surfaced as a friendly message rather than a generic error.
      const message = err?.message ?? ''
      if (message.toLowerCase().includes('already reviewed')) {
        toast.error(t('bk_review_toast_already_reviewed'))
      } else {
        toast.error(t('bk_review_toast_error'))
      }
    } finally {
      setSubmittingReview(false)
    }
  }

  return {
    t,
    i18n,
    isAr,
    sheet,
    setSheet,
    backdropRef,
    isPast,
    dateLabel,
    serviceName,
    handleReschedule,
    handleCancel,
    handleAddReview,
    submittingReview,
  }
}
