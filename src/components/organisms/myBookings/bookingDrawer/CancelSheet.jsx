import { X } from 'lucide-react';
import { gfx } from '../../../../styles/themeColors';

export default function CancelSheet({ booking, proName, onConfirm, onClose, t }) {
  return (
    <div className="absolute inset-0 bg-surface flex flex-col justify-end z-10">
      <div className="px-6 py-6 flex flex-col gap-4">
        {/* Icon */}
        <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
          <X size={20} className="text-red-600 dark:text-red-400" />
        </div>

        {/* Copy */}
        <div>
          <h3 className="text-[19px] font-bold text-ink mb-1">{t('bk_cancel_title')}</h3>
          <p className="text-[14px] text-muted leading-relaxed">
            {t('bk_cancel_body', { service: booking.serviceName, name: proName })}
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2.5 pt-1">
          <button onClick={onConfirm} className={`${gfx.btnDanger} w-full h-11 text-[14.5px]`}>
            {t('bk_cancel_confirm')}
          </button>
          <button onClick={onClose} className={`${gfx.btnSecondary} w-full h-11 text-[14.5px]`}>
            {t('bk_cancel_keep')}
          </button>
        </div>
      </div>
    </div>
  );
}
