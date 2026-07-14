import { Bell, Calendar, MessageCircle, Star, XCircle, ShieldAlert } from 'lucide-react'
// @ts-expect-error
import { gfx } from '../../../styles/themeColors'
import useNotifications from './useNotifications'
import type { Notification } from '../../../types/notification'

// Pure display helper — turns an ISO timestamp into "2 min ago" / "Yesterday" / a date.
function formatRelativeTime(iso: string): string {
  const then = new Date(iso).getTime()
  const now = Date.now()
  const diffMin = Math.floor((now - then) / 60000)

  if (diffMin < 1) return 'Just now'
  if (diffMin < 60) return `${diffMin} min ago`
  const diffHr = Math.floor(diffMin / 60)
  if (diffHr < 24) return `${diffHr} hr${diffHr === 1 ? '' : 's'} ago`
  const diffDay = Math.floor(diffHr / 24)
  if (diffDay === 1) return 'Yesterday'
  if (diffDay < 7) return `${diffDay} days ago`
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
}

function iconForType(type: string) {
  switch (type) {
    case 'booking_confirmation':
      return Calendar
    case 'chat_messages':
      return MessageCircle
    case 'app_feedback':
      return Star
    case 'modifications_cancellations':
      return XCircle
    case 'support_complaints':
      return ShieldAlert
    default:
      return Bell
  }
}

export default function NotificationBell() {
  const { isOpen, toggle, wrapRef, notifications, unreadCount, isLoading, handleClickNotification, handleMarkAllRead } =
    useNotifications()

  return (
    <div className="relative" ref={wrapRef}>
      <button
        type="button"
        onClick={toggle}
        aria-label="Notifications"
        aria-expanded={isOpen}
        className="relative flex items-center justify-center w-9 h-9 rounded-full text-muted hover:text-ink hover:bg-page-2 transition-colors"
      >
        <Bell size={18} />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 min-w-4 h-4 px-1 rounded-full bg-brand text-white text-[10px] font-bold flex items-center justify-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className={`${gfx.cardLg} absolute right-0 top-full mt-2 z-50 w-104 max-h-128 overflow-y-auto shadow-xl`}>
          <div className="flex items-center justify-between px-4 py-3 border-b border-line sticky top-0 bg-surface">
            <h3 className="text-[15px] font-bold text-ink">Notifications</h3>
            {unreadCount > 0 && (
              <button
                type="button"
                onClick={handleMarkAllRead}
                className="text-[13px] font-semibold text-brand hover:underline"
              >
                Mark all read
              </button>
            )}
          </div>

          {isLoading && <p className="text-[14px] text-muted px-4 py-8 text-center">Loading…</p>}

          {!isLoading && notifications.length === 0 && (
            <p className="text-[14px] text-muted px-4 py-8 text-center">No notifications yet</p>
          )}

          {!isLoading &&
            notifications.map((n: Notification) => {
              const Icon = iconForType(n.type)
              return (
                <button
                  key={n.id}
                  type="button"
                  onClick={() => handleClickNotification(n)}
                  className={`w-full flex items-start gap-3 px-4 py-3.5 text-left border-b border-line last:border-0 transition-colors
                    ${n.isRead ? 'hover:bg-page-2' : 'bg-brand-tint hover:bg-brand-tint/70'}`}
                >
                  <div className="w-9 h-9 rounded-full bg-surface border border-line flex items-center justify-center shrink-0">
                    <Icon size={16} className="text-brand" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <p className="text-[14px] font-semibold text-ink truncate">{n.title}</p>
                      {!n.isRead && <span className="w-1.5 h-1.5 rounded-full bg-brand shrink-0" />}
                    </div>
                    <p className="text-[13px] text-muted mt-0.5 line-clamp-2">{n.body}</p>
                    <p className="text-[11.5px] text-faint mt-1">{formatRelativeTime(n.createdAt)}</p>
                  </div>
                </button>
              )
            })}
        </div>
      )}
    </div>
  )
}
