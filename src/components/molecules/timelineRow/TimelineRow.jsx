import { Check } from 'lucide-react';
import { timelineDone } from '../../../utils/bookingUtils';

export default function TimelineRow({ labelKey, stepStatus, bookingStatus, t }) {
  const done = timelineDone(bookingStatus, stepStatus);
  const isCancelled = bookingStatus === 'Cancelled' || bookingStatus === 'Declined';

  return (
    <div className="flex items-center gap-3">
      <div
        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors
        ${done && !isCancelled ? 'bg-ok border-ok' : 'bg-surface border-line'}`}
      >
        {done && !isCancelled && <Check size={12} strokeWidth={3} className="text-white" />}
      </div>
      <span className={`text-[13.5px] ${done && !isCancelled ? 'text-ink font-medium' : 'text-muted'}`}>
        {t(labelKey)}
      </span>
    </div>
  );
}
