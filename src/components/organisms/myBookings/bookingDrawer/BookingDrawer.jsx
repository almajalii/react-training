import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { X, MessageCircle, RotateCcw, ChevronRight } from 'lucide-react';
import { gfx } from '../../../../styles/themeColors';
import { PAST_STATUSES, formatBookingDate } from '../../../../utils/bookingUtils';
import ProAvatar from '../../../atoms/proAvatar/ProAvatar';
import BookingDrawerBody from './BookingDrawerBody';
import RescheduleSheet from './RescheduleSheet';
import CancelSheet from './CancelSheet';

export default function BookingDrawer({
  booking,
  onClose,
  onCancel,
  onReschedule,
  canReschedule,
  canCancel,
  onMessagePro,
}) {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === 'ar';

  const [sheet, setSheet] = useState(null);
  const backdropRef = useRef(null);

  const isPast = PAST_STATUSES.has(booking?.status);
  const dateLabel = formatBookingDate(booking?.scheduledDate, isAr, false);
  const serviceName = isAr && booking?.serviceNameAr ? booking.serviceNameAr : booking?.serviceName;

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape' && !sheet) onClose();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose, sheet]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  if (!booking) return null;

  const handleReschedule = (iso, time) => {
    onReschedule({ id: booking.id, scheduledDate: iso, scheduledTime: time });
    setSheet(null);
  };

  const handleCancel = () => {
    onCancel({ id: booking.id, reason: 'Customer requested cancellation' });
    setSheet(null);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        ref={backdropRef}
        className="fixed inset-0 bg-ink/40 z-40"
        onMouseDown={(e) => {
          if (e.target === backdropRef.current) onClose();
        }}
      />

      {/* Drawer */}
      <aside
        role="dialog"
        aria-label={t('bk_drawer_label')}
        className={`fixed top-0 ${isAr ? 'left-0' : 'right-0'} h-full w-full max-w-110
          z-50 bg-surface shadow-card-lg flex flex-col`}
      >
        {/* ── Header ── */}
        <div className="px-5 pt-5 pb-4 border-b border-line shrink-0">
          {/* Title row */}
          <div className="flex items-start justify-between gap-3 mb-3">
            <div>
              <p className="text-[12px] font-semibold uppercase tracking-wide text-muted mb-1">
                {booking.ref ?? booking.id?.slice(0, 8).toUpperCase()}
              </p>
              <h2 className="text-[20px] font-extrabold text-ink tracking-tight leading-tight">{serviceName}</h2>
            </div>
            <button
              onClick={onClose}
              aria-label={t('bk_drawer_close')}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-surface-2 transition-colors shrink-0 mt-0.5"
            >
              <X size={16} className="text-muted" />
            </button>
          </div>

          {/* Pro row */}
          <div className="flex items-center gap-3">
            <ProAvatar name={booking.professionalName} imageUrl={booking.professionalImageUrl} size="sm" />
            <div className="flex-1 min-w-0">
              <p className="font-bold text-[14px] text-ink truncate">{booking.professionalName}</p>
              <p className="text-[12.5px] text-muted">{booking.professionalRole}</p>
            </div>
            {!isPast && (
              <button
                onClick={() => onMessagePro(booking.professionalId)}
                className={`${gfx.btnSecondary} flex items-center gap-1.5 px-3 h-8 text-[13px]`}
              >
                <MessageCircle size={13} />
                {t('bk_message_btn')}
              </button>
            )}
          </div>
        </div>

        {/* ── Body ── */}
        <div className="flex-1 overflow-y-auto relative">
          <BookingDrawerBody booking={booking} dateLabel={dateLabel} isPast={isPast} t={t} />

          {sheet === 'reschedule' && (
            <RescheduleSheet onConfirm={handleReschedule} onClose={() => setSheet(null)} t={t} i18n={i18n} />
          )}
          {sheet === 'cancel' && (
            <CancelSheet
              booking={booking}
              proName={booking.professionalName}
              onConfirm={handleCancel}
              onClose={() => setSheet(null)}
              t={t}
            />
          )}
        </div>

        {/* ── Footer ── */}
        {!isPast && (canReschedule(booking) || canCancel(booking)) && (
          <div className="px-5 py-4 border-t border-line shrink-0 flex flex-col gap-2.5">
            {canReschedule(booking) && (
              <button
                onClick={() => setSheet('reschedule')}
                className={`${gfx.btnSecondary} w-full h-11 text-[14.5px] flex items-center justify-center gap-2`}
              >
                <RotateCcw size={15} />
                {t('bk_action_reschedule')}
              </button>
            )}
            {canCancel(booking) && (
              <button
                onClick={() => setSheet('cancel')}
                className="w-full h-11 text-[14.5px] font-medium text-red-500 hover:text-red-600 transition-colors"
              >
                {t('bk_action_cancel')}
              </button>
            )}
          </div>
        )}

        {isPast && (
          <div className="px-5 py-4 border-t border-line shrink-0 flex gap-3">
            {booking.status === 'Completed' && (
              <button className={`${gfx.btnPrimary} flex-1 h-11 text-[14.5px]`}>{t('bk_action_review')}</button>
            )}
            <button className={`${gfx.btnSecondary} flex-1 h-11 text-[14.5px] flex items-center justify-center gap-2`}>
              <ChevronRight size={15} />
              {t('bk_action_book_again')}
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
