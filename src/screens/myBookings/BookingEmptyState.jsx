import { CalendarDays } from 'lucide-react';
import { gfx } from '../../styles/themeColors';

export default function BookingEmptyState({ tab, t }) {
  return (
    <div className={`${gfx.card} px-6 py-14 text-center flex flex-col items-center`}>
      <div className="w-16 h-16 rounded-2xl bg-brand-tint text-brand-strong flex items-center justify-center mb-5">
        <CalendarDays className="w-7 h-7" />
      </div>
      <h3 className="text-xl font-bold text-ink mb-1">
        {tab === 'upcoming' ? t('bk_empty_upcoming_title') : t('bk_empty_past_title')}
      </h3>
      <p className="text-muted text-[15px] max-w-sm">
        {tab === 'upcoming' ? t('bk_empty_upcoming_body') : t('bk_empty_past_body')}
      </p>
    </div>
  );
}
