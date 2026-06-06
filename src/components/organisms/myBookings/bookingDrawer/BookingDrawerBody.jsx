import { Calendar, Clock, MapPin, Tag } from 'lucide-react';
import { gfx } from '../../../../styles/themeColors';
import DetailRow from '../../../molecules/detailRow/DetailRow';
import TimelineRow from '../../../molecules/timelineRow/TimelineRow';

// ── Body ──────────────────────────────────────────────────────────────────────
export default function BookingDrawerBody({ booking, dateLabel, isPast, t }) {
  return (
    <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-4">
      {/* Details */}
      <div className={`${gfx.card} px-4 py-1`}>
        <DetailRow icon={Calendar} label={t('bk_detail_date')} value={dateLabel} />
        <DetailRow icon={Clock} label={t('bk_detail_time')} value={booking.scheduledTime} mono />
        <DetailRow icon={MapPin} label={t('bk_detail_address')} value={booking.address} />
        <DetailRow icon={Tag} label={t('bk_detail_total')} value={booking.servicePrice} price />
      </div>

      {/* Notes + Photos — same card */}
      {(booking.description || booking.imageUrls?.length > 0) && (
        <div className={`${gfx.card} px-4 py-3 flex flex-col gap-4`}>
          {booking.description && (
            <div>
              <p className="text-[11.5px] font-semibold uppercase tracking-wide text-muted mb-1.5">
                {t('bk_detail_notes')}
              </p>
              <p className="text-[14px] text-ink-soft leading-relaxed">{booking.description}</p>
            </div>
          )}
          {booking.imageUrls?.length > 0 && (
            <div>
              <p className="text-[11.5px] font-semibold uppercase tracking-wide text-muted mb-2.5">
                {t('bk_detail_photos')}
              </p>
              <div className="flex gap-2 flex-wrap">
                {booking.imageUrls.map((url) => (
                  <img key={url} src={url} alt="" className="w-20 h-20 rounded-xl object-cover border border-line" />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Timeline — upcoming only */}
      {!isPast && (
        <div className={`${gfx.card} px-4 py-4`}>
          <p className="text-[11.5px] font-semibold uppercase tracking-wide text-muted mb-3.5">
            {t('bk_timeline_title')}
          </p>
          <div className="flex flex-col gap-3 relative">
            <div className="absolute left-2.75 top-6 bottom-0 w-[1.5px] bg-line" />
            <TimelineRow labelKey="bk_tl_placed" stepStatus="Pending" bookingStatus={booking.status} t={t} />
            <TimelineRow labelKey="bk_tl_confirmed" stepStatus="Accepted" bookingStatus={booking.status} t={t} />
            <TimelineRow labelKey="bk_tl_on_the_way" stepStatus="OnTheWay" bookingStatus={booking.status} t={t} />
            <TimelineRow labelKey="bk_tl_arrived" stepStatus="Arrived" bookingStatus={booking.status} t={t} />
            <TimelineRow labelKey="bk_tl_in_progress" stepStatus="InProgress" bookingStatus={booking.status} t={t} />
            <TimelineRow labelKey="bk_tl_completed" stepStatus="Completed" bookingStatus={booking.status} t={t} />
          </div>
        </div>
      )}
    </div>
  );
}
