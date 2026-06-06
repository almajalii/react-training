import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
const STATUS_CONFIG = {
  Pending: {
    labelKey: 'bk_status_pending',
    classes: 'bg-amber-100  text-amber-800  dark:bg-amber-900/30  dark:text-amber-300',
  },
  Accepted: {
    labelKey: 'bk_status_accepted',
    classes: 'bg-blue-100   text-blue-800   dark:bg-blue-900/30   dark:text-blue-300',
  },
  OnTheWay: {
    labelKey: 'bk_status_on_the_way',
    classes: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
  },
  Arrived: {
    labelKey: 'bk_status_arrived',
    classes: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
  },
  InProgress: {
    labelKey: 'bk_status_in_progress',
    classes: 'bg-blue-100   text-blue-800   dark:bg-blue-900/30   dark:text-blue-300',
  },
  Completed: {
    labelKey: 'bk_status_completed',
    classes: 'bg-green-100  text-green-800  dark:bg-green-900/30  dark:text-green-300',
  },
  Cancelled: {
    labelKey: 'bk_status_cancelled',
    classes: 'bg-red-100    text-red-800    dark:bg-red-900/30    dark:text-red-300',
  },
  Declined: {
    labelKey: 'bk_status_declined',
    classes: 'bg-red-100    text-red-800    dark:bg-red-900/30    dark:text-red-300',
  },
};

export default function StatusBadge({ status }) {
  const { t } = useTranslation();
  const cfg = useMemo(() => STATUS_CONFIG[status] ?? STATUS_CONFIG.Pending, [status]);
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[12px] font-semibold ${cfg.classes}`}>
      {t(cfg.labelKey)}
    </span>
  );
}
