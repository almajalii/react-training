import { useTranslation } from 'react-i18next'
import { useMemo } from 'react'
import { STATUS_CONFIG, type BookingStatus } from '../../../utils/bookingUtils'

interface StatusBadgeProps {
  status: BookingStatus
}
export default function StatusBadge({ status }: StatusBadgeProps) {
  const { t } = useTranslation()
  const cfg = useMemo(() => STATUS_CONFIG[status] ?? STATUS_CONFIG.Pending, [status])

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[12px] font-semibold ${cfg.classes}`}
    >
      {t(cfg.labelKey)}
    </span>
  )
}
