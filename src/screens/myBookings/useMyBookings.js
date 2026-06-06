import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getUpcomingBookings, getPastBookings, cancelBooking, updateBooking } from '../../network/api';

// Statuses where the customer can still reschedule
const RESCHEDULE_ALLOWED = new Set(['Pending', 'Accepted']);

// Statuses where the customer can still cancel
const CANCEL_ALLOWED = new Set(['Pending', 'Accepted']);

const UPCOMING_KEY = ['bookings', 'upcoming'];
const PAST_KEY = ['bookings', 'past'];

export function useMyBookings() {
  const { t } = useTranslation();
  const user = useSelector((s) => s.auth.user);
  const qc = useQueryClient();

  // Which booking drawer is open (by id), or null
  const [openId, setOpenId] = useState(null);

  // ── Queries ───────────────────────────────────────────────────────────────

  const { data: upcoming = [], isLoading: upcomingLoading } = useQuery({
    queryKey: UPCOMING_KEY,
    queryFn: () => getUpcomingBookings().then((r) => r?.data ?? r ?? []),
    enabled: !!user,
  });

  const { data: past = [], isLoading: pastLoading } = useQuery({
    queryKey: PAST_KEY,
    queryFn: () => getPastBookings().then((r) => r?.data ?? r ?? []),
    enabled: !!user,
  });

  // Derive the open booking object from whichever list it lives in
  const openBooking = openId ? ([...upcoming, ...past].find((b) => b.id === openId) ?? null) : null;

  // ── Cancel ────────────────────────────────────────────────────────────────

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

  // ── Reschedule ────────────────────────────────────────────────────────────

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

  // ── Helpers exposed to UI ─────────────────────────────────────────────────

  const openDrawer = useCallback((id) => setOpenId(id), []);
  const closeDrawer = useCallback(() => setOpenId(null), []);

  const canReschedule = useCallback((booking) => RESCHEDULE_ALLOWED.has(booking?.status), []);

  const canCancel = useCallback((booking) => CANCEL_ALLOWED.has(booking?.status), []);

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
  };
}
