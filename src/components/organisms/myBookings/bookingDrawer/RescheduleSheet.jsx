import { X } from 'lucide-react';
import { gfx } from '../../../../styles/themeColors';

export default function RescheduleSheet({ onClose, t }) {
  return (
    <div className="absolute inset-0 bg-surface flex flex-col z-10">
      {/* header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-line shrink-0">
        <h3 className="text-[17px] font-bold text-ink">{t('bk_reschedule_title')}</h3>
        <button
          onClick={onClose}
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-surface-2 transition-colors"
        >
          <X size={16} className="text-muted" />
        </button>
      </div>

      {/* coming soon placeholder */}
      <div className="flex-1 flex items-center justify-center">
        <p className="text-muted text-[14px]">{t('coming_soon')}</p>
      </div>

      {/* footer */}
      <div className="px-5 py-4 border-t border-line shrink-0">
        <button onClick={onClose} className={`${gfx.btnSecondary} w-full h-11 text-[14px]`}>
          {t('bk_cancel_keep')}
        </button>
      </div>
    </div>
  );
}
