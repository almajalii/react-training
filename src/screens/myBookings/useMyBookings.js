import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useState, useCallback, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { getUpcomingBookings, getPastBookings, cancelBooking, updateBooking } from '../../network/api'
import { RESCHEDULE_ALLOWED, CANCEL_ALLOWED } from '../../utils/bookingUtils'

const UPCOMING_KEY = ['bookings', 'upcoming']
const PAST_KEY = ['bookings', 'past']

export function useMyBookings() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  // Optional route param — present when reached via /my-bookings/:bookingId
  // (e.g. from a notification click), absent for the plain /my-bookings list.
  const { bookingId } = useParams()
  const user = useSelector(s => s.auth.user)
  const qc = useQueryClient()
  const [tab, setTab] = useState('upcoming')

  // Which booking drawer is open (by id), or null
  const [openId, setOpenId] = useState(null)

  //fetch upcoming bookings
  const { data: upcoming = [], isLoading: upcomingLoading } = useQuery({
    queryKey: UPCOMING_KEY,
    queryFn: () => getUpcomingBookings().then(r => r?.data ?? r ?? []),
    enabled: !!user,
  })
  //fetch past bookings
  const { data: past = [], isLoading: pastLoading } = useQuery({
    queryKey: PAST_KEY,
    queryFn: () => getPastBookings().then(r => r?.data ?? r ?? []),
    enabled: !!user,
  })

  // Auto-open the drawer for a booking referenced by the URL (e.g. arriving
  // from a notification), once its list has finished loading. Also switches
  // to the correct tab (past vs upcoming) so the booking is actually visible
  // behind the drawer, not hidden on the other tab.
  useEffect(() => {
    if (!bookingId || upcomingLoading || pastLoading) return

    const inUpcoming = upcoming.some(b => b.id === bookingId)
    const inPast = past.some(b => b.id === bookingId)

    if (inUpcoming) {
      setTab('upcoming')
      setOpenId(bookingId)
    } else if (inPast) {
      setTab('past')
      setOpenId(bookingId)
    }
    // If the id matches neither list (e.g. stale notification, deleted
    // booking), we simply don't open anything — no error state needed here.
  }, [bookingId, upcoming, past, upcomingLoading, pastLoading])

  //when opening a drawer
  //check the id comes from which list, upcoming or past, and find the booking from there
  //gets the booking object to pass to the drawer for display and actions
  const openBooking = openId ? ([...upcoming, ...past].find(b => b.id === openId) ?? null) : null

  //cancel mutation
  const { mutate: cancel, isPending: cancelling } = useMutation({
    mutationFn: ({ id, reason }) => cancelBooking(id, reason),
    onSuccess: () => {
      toast.success(t('bk_toast_cancelled'))
      qc.invalidateQueries({ queryKey: UPCOMING_KEY })
      qc.invalidateQueries({ queryKey: PAST_KEY })
      setOpenId(null)
    },
    onError: () => toast.error(t('bk_toast_cancel_error')),
  })

  const openDrawer = useCallback(id => setOpenId(id), [])

  // If we arrived via /my-bookings/:bookingId, closing should also return the
  // URL to the plain list route — otherwise the id stays in the address bar
  // and refreshing would just reopen the same drawer.
  const closeDrawer = useCallback(() => {
    setOpenId(null)
    if (bookingId) navigate('/my-bookings', { replace: true })
  }, [bookingId, navigate])

  const canReschedule = useCallback(booking => RESCHEDULE_ALLOWED.has(booking?.status), [])

  const canCancel = useCallback(booking => CANCEL_ALLOWED.has(booking?.status), [])

  const handleMessagePro = professionalId => {
    navigate(`/messages?professionalId=${professionalId}`)
  }

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
    canCancel,
    handleMessagePro,
    user,
    tab,
    setTab,
  }
}
