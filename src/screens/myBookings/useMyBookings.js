import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getUpcomingBookings, getPastBookings, cancelBooking, updateBooking } from '../../network/api';
import { RESCHEDULE_ALLOWED, CANCEL_ALLOWED } from '../../utils/bookingUtils';

const UPCOMING_KEY = ['bookings', 'upcoming'];
const PAST_KEY = ['bookings', 'past'];

export function useMyBookings() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const user = useSelector((s) => s.auth.user);
  const qc = useQueryClient();

  // Which booking drawer is open (by id), or null
  const [openId, setOpenId] = useState(null);

  //fetch upcoming bookings
  const { data: upcoming = [], isLoading: upcomingLoading } = useQuery({
    queryKey: UPCOMING_KEY,
    queryFn: () => getUpcomingBookings().then((r) => r?.data ?? r ?? []),
    enabled: !!user,
  });
  //fetch past bookings
  const { data: past = [], isLoading: pastLoading } = useQuery({
    queryKey: PAST_KEY,
    queryFn: () => getPastBookings().then((r) => r?.data ?? r ?? []),
    enabled: !!user,
  });

  //when opening a drawer
  //check the id comes from which list, upcoming or past, and find the booking from there
  //gets the booking object to pass to the drawer for display and actions
  const openBooking = openId ? ([...upcoming, ...past].find((b) => b.id === openId) ?? null) : null;

  //cancel mutation
  const { mutate: cancel, isPending: cancelling } = useMutation({
    mutationFn: ({ id, reason }) => cancelBooking(id, reason),
    onSuccess: () => {
      toast.success(t('bk_toast_cancelled'));
      qc.invalidateQueries({ queryKey: UPCOMING_KEY });
      qc.invalidateQueries({ queryKey: PAST_KEY });
      setOpenId(null);
    },
    onError: () => toast.error(t('bk_toast_cancel_error')),
  });
  //reschedule mutation
  const { mutate: reschedule, isPending: rescheduling } = useMutation({
    mutationFn: ({ id, scheduledDate, scheduledTime }) => updateBooking(id, { scheduledDate, scheduledTime }),
    onSuccess: (_res, vars) => {
      toast.success(
        t('bk_toast_rescheduled', {
          date: vars.scheduledDate,
          time: vars.scheduledTime,
        }),
      );
      qc.invalidateQueries({ queryKey: UPCOMING_KEY });
    },
    onError: () => toast.error(t('bk_toast_reschedule_error')),
  });

  const openDrawer = useCallback((id) => setOpenId(id), []);
  const closeDrawer = useCallback(() => setOpenId(null), []);

  const canReschedule = useCallback((booking) => RESCHEDULE_ALLOWED.has(booking?.status), []);

  const canCancel = useCallback((booking) => CANCEL_ALLOWED.has(booking?.status), []);

  const handleMessagePro = (professionalId) => {
    navigate(`/messages?professionalId=${professionalId}`);
  };

  return {
    t,
    upcoming,
    past,
    upcomingLoading,
    pastLoading,
    openBooking,
    openId,
    openDrawer,
    closeDrawer,
    cancel,
    cancelling,
    reschedule,
    rescheduling,
    canReschedule,
    canCancel,
    handleMessagePro,
  };
}
