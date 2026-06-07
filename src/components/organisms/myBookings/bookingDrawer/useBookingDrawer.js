import { useEffect, useRef, useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { PAST_STATUSES, formatBookingDate } from '../../../../utils/bookingUtils';

export function useBookingDrawer({ booking, onClose, onCancel, onReschedule }) {
  const { t, i18n } = useTranslation();
  const isAr = useMemo(() => i18n.language === 'ar', [i18n.language]);

  // which sub-sheet is open inside the drawer: null, 'reschedule', or 'cancel'
  const [sheet, setSheet] = useState(null);
  const backdropRef = useRef(null);

  const isPast = useMemo(() => PAST_STATUSES.has(booking?.status), [booking?.status]);

  const dateLabel = useMemo(
    () => formatBookingDate(booking?.scheduledDate, isAr, false),
    [booking?.scheduledDate, isAr],
  );

  const serviceName = useMemo(
    () => (isAr && booking?.serviceNameAr ? booking.serviceNameAr : booking?.serviceName),
    [isAr, booking?.serviceNameAr, booking?.serviceName],
  );

  // close drawer on Escape, but only if no sub-sheet is open
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape' && !sheet) onClose();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose, sheet]);

  // lock body scroll while drawer is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  // calls the reschedule mutation then closes the sheet
  const handleReschedule = (iso, time) => {
    onReschedule({ id: booking.id, scheduledDate: iso, scheduledTime: time });
    setSheet(null);
  };

  // calls the cancel mutation then closes the sheet
  const handleCancel = () => {
    onCancel({ id: booking.id, reason: 'Customer requested cancellation' });
    setSheet(null);
  };

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
  };
}
