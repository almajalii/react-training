import { X, MessageCircle, RotateCcw, ChevronRight } from 'lucide-react';
import { gfx } from '../../../../styles/themeColors';
import ProAvatar from '../../../atoms/proAvatar/ProAvatar';
import BookingDrawerBody from './BookingDrawerBody';
import RescheduleSheet from './RescheduleSheet';
import CancelSheet from './CancelSheet';
import { useBookingDrawer } from './useBookingDrawer';

export default function BookingDrawer({
  booking,
  onClose,
  onCancel,
  onReschedule,
  canReschedule,
  canCancel,
  onMessagePro,
}) {
  const {
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
  } = useBookingDrawer({ booking, onClose, onCancel, onReschedule });

  if (!booking) return null;

  return (
    <>
      {/* clicking outside the drawer closes it */}
      <div
        ref={backdropRef}
        className="fixed inset-0 bg-ink/40 z-40"
        onMouseDown={(e) => {
          if (e.target === backdropRef.current) onClose();
        }}
      />

      <aside
        role="dialog"
        aria-label={t('bk_drawer_label')}
        className={`fixed top-0 ${isAr ? 'left-0' : 'right-0'} h-full w-full max-w-110
          z-50 bg-surface shadow-card-lg flex flex-col`}
      >
        {/* booking reference + service name + close button */}
        <div className="px-5 pt-5 pb-4 border-b border-line shrink-0">
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

          {/* pro avatar, name, role, message button */}
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

        {/* scrollable body — also where sub-sheets render on top */}
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

        {/* active booking actions: reschedule and cancel */}
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

        {/* past booking actions: review and book again */}
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
