import { useState, useRef, useEffect } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  getNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
} from '../../../network/api/notifications'
import type { Notification } from '../../../types/notification'

export default function useNotifications() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const user = useSelector((state: any) => state.auth.user)
  const role = user?.role ?? 'customer'

  const [isOpen, setIsOpen] = useState(false)
  const wrapRef = useRef<HTMLDivElement>(null)

  const { data, isLoading } = useQuery({
    queryKey: ['notifications', role],
    queryFn: () => getNotifications(role),
    enabled: !!user,
    staleTime: 30 * 1000,
  })

  const notifications: Notification[] = data ?? []
  const unreadCount = notifications.filter(n => !n.isRead).length

  // Close on click outside
  useEffect(() => {
    if (!isOpen) return
    const handleClick = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setIsOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [isOpen])

  const toggle = () => setIsOpen(open => !open)

  const handleClickNotification = async (notification: Notification) => {
    if (!notification.isRead) {
      await markNotificationAsRead(notification.id)
      queryClient.invalidateQueries({ queryKey: ['notifications', role] })
    }
    setIsOpen(false)
    // referenceId is the booking's id — deep-links straight to its drawer via
    // the optional :bookingId route segment, instead of the plain list.
    if (notification.referenceId) {
      navigate(`/my-bookings/${notification.referenceId}`)
    }
  }

  const handleMarkAllRead = async () => {
    await markAllNotificationsAsRead()
    queryClient.invalidateQueries({ queryKey: ['notifications', role] })
  }

  return {
    isOpen,
    toggle,
    wrapRef,
    notifications,
    unreadCount,
    isLoading,
    handleClickNotification,
    handleMarkAllRead,
  }
}
