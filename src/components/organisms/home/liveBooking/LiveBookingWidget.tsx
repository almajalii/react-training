import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
// @ts-expect-error
import { gfx } from '../../../../styles/themeColors'
// @ts-expect-error
import ProAvatar from '../../../atoms/proAvatar/ProAvatar'
import { formatBookingDate } from '../../../../utils/bookingUtils'
import useLiveBooking from './useLiveBooking'
import LiveStatusStepper from './LiveStatusStepper'

export default function LiveBookingWidget() {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const isAr = i18n.language === 'ar'
  const { booking, isLoading, hasActiveBooking } = useLiveBooking()

  if (isLoading || !hasActiveBooking || !booking) return null

  const serviceName = isAr && booking.serviceNameAr ? booking.serviceNameAr : booking.serviceName
  const dateLabel = formatBookingDate(booking.scheduledDate, isAr, false)
  const isCompleted = booking.status === 'Completed'

  return (
    <div className="max-w-7xl mx-auto px-6 pt-6">
      <div className={`${gfx.cardLg} p-6 border-l-4 border-l-brand`}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2 text-[13px] font-bold text-brand tracking-[-0.01em]">
            <span className="relative flex w-2 h-2">
              <span className="absolute inline-flex w-full h-full rounded-full bg-brand/50 animate-ping" />
              <span className="relative inline-flex w-2 h-2 rounded-full bg-brand" />
            </span>
            {t('live_booking_badge')}
          </div>
          <button
            onClick={() => navigate(`/my-bookings/${booking.id}`)}
            className="text-[13px] font-semibold text-brand hover:underline"
          >
            {t('live_booking_view_details')}
          </button>
        </div>

        <div className="flex items-center gap-3.5 pb-6 mb-6 border-b border-line">
          <ProAvatar name={booking.professionalName} imageUrl={booking.professionalImageUrl} size="md" />
          <div className="flex-1 min-w-0">
            <p className="font-bold text-[16px] text-ink truncate">{serviceName}</p>
            <p className="text-[13px] text-muted mt-0.5">
              {booking.professionalName} · {dateLabel}, {booking.scheduledTime}
            </p>
          </div>
        </div>

        <LiveStatusStepper status={booking.status} t={t} />

        {isCompleted && (
          <button
            onClick={() => navigate(`/my-bookings/${booking.id}`)}
            className={`${gfx.btnPrimary} w-full h-11 text-[14.5px] mt-6`}
          >
            {t('live_booking_confirm_payment')}
          </button>
        )}
      </div>
    </div>
  )
}
