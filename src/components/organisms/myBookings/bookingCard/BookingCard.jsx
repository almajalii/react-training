import { Calendar, Clock, MapPin, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { gfx } from '../../../../styles/themeColors';
import { formatBookingDate } from '../../../../utils/bookingUtils';
import ProAvatar from '../../../atoms/proAvatar/ProAvatar';
import StatusBadge from '../../../atoms/statusBadge/StatusBadge';

export default function BookingCard({ booking, index = 0, onClick }) {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === 'ar';

  const dateLabel = formatBookingDate(booking.scheduledDate, isAr);
  const serviceName = isAr && booking.serviceNameAr ? booking.serviceNameAr : booking.serviceName;

  return (
    <button onClick={onClick} className={`${gfx.card} ${gfx.cardHover} w-full text-left p-5 flex items-center gap-4`}>
      <ProAvatar name={booking.professionalName} imageUrl={booking.professionalImageUrl} index={index} size="md" />

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap mb-1">
          <p className="font-bold text-ink text-[15px] tracking-tight truncate">{serviceName}</p>
          <StatusBadge status={booking.status} />
        </div>

        <p className="text-[13px] text-muted truncate mb-2">
          {t('bk_card_with')} <span className="font-medium text-ink-soft">{booking.professionalName}</span>
          {booking.professionalRole ? ` · ${booking.professionalRole}` : ''}
        </p>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[12.5px] text-muted">
          <span className="inline-flex items-center gap-1">
            <Calendar size={12} />
            {dateLabel}
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock size={12} />
            {booking.scheduledTime}
          </span>
          {booking.address && (
            <span className="inline-flex items-center gap-1 truncate max-w-45">
              <MapPin size={12} />
              {booking.address}
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-col items-end gap-2 shrink-0">
        {booking.servicePrice && (
          <span className="font-mono text-[14px] font-semibold text-ok">{booking.servicePrice}</span>
        )}
        <ChevronRight size={16} className="text-muted" />
      </div>
    </button>
  );
}
