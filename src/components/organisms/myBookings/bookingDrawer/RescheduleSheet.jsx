import { useState, useMemo } from 'react';
import { X } from 'lucide-react';
import { gfx } from '../../../../styles/themeColors';
import { TIME_SLOTS } from '../../../../constants/times';
import { buildRescheduleDays } from '../../../../utils/bookingUtils';

export default function RescheduleSheet({ onConfirm, onClose, t, i18n }) {
  const isAr = i18n.language === 'ar';
  const days = useMemo(() => buildRescheduleDays(isAr), [isAr]);

  const [pickDay, setPickDay] = useState(null);
  const [pickTime, setPickTime] = useState(null);

  const canConfirm = pickDay !== null && pickTime !== null;

  return (
    <div className="absolute inset-0 bg-surface rounded-none flex flex-col z-10">
      {/* Head */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-line shrink-0">
        <h3 className="text-[17px] font-bold text-ink">{t('bk_reschedule_title')}</h3>
        <button
          onClick={onClose}
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-surface-2 transition-colors"
        >
          <X size={16} className="text-muted" />
        </button>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto px-5 py-5 flex flex-col gap-6">
        {/* Day picker */}
        <div>
          <p className="text-[12px] font-semibold uppercase tracking-wide text-muted mb-3">
            {t('bk_reschedule_pick_day')}
          </p>
          <div className="grid grid-cols-7 gap-1.5">
            {days.map((d, i) => {
              const active = pickDay === i;
              return (
                <button
                  key={d.iso}
                  onClick={() => setPickDay(i)}
                  className={`py-3 px-1 rounded-xl border-[1.5px] text-center transition-all
                    ${active ? 'border-brand bg-brand-tint' : 'border-line bg-surface hover:border-brand-soft'}`}
                >
                  <div
                    className={`text-[10px] font-bold uppercase tracking-wider ${active ? 'text-brand' : 'text-muted'}`}
                  >
                    {d.label}
                  </div>
                  <div className={`text-[18px] font-extrabold mt-0.5 ${active ? 'text-brand' : 'text-ink'}`}>
                    {d.num}
                  </div>
                  <div className={`text-[10px] mt-0.5 ${active ? 'text-brand' : 'text-muted'}`}>{d.month}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Time picker */}
        <div>
          <p className="text-[12px] font-semibold uppercase tracking-wide text-muted mb-3">
            {t('bk_reschedule_pick_time')}
          </p>
          <div className="grid grid-cols-3 gap-2">
            {TIME_SLOTS.map((slot) => {
              const active = pickTime === slot;
              return (
                <button
                  key={slot}
                  onClick={() => setPickTime(slot)}
                  className={`py-2.5 rounded-xl border-[1.5px] text-[13.5px] font-mono
                    font-medium text-center transition-all
                    ${
                      active
                        ? 'border-brand bg-brand-tint text-brand font-semibold'
                        : 'border-line bg-surface text-ink hover:border-brand-soft'
                    }`}
                >
                  {slot}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex gap-3 px-5 py-4 border-t border-line shrink-0">
        <button onClick={onClose} className={`${gfx.btnSecondary} flex-1 h-11 text-[14px]`}>
          {t('bk_cancel_keep')}
        </button>
        <button
          disabled={!canConfirm}
          onClick={() => canConfirm && onConfirm(days[pickDay].iso, pickTime)}
          className={`${gfx.btnPrimary} flex-1 h-11 text-[14px]
            ${!canConfirm ? 'opacity-40 cursor-not-allowed' : ''}`}
        >
          {t('bk_reschedule_confirm')}
        </button>
      </div>
    </div>
  );
}
