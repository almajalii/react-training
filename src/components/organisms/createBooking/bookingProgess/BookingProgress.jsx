import { Check } from 'lucide-react';

export default function BookingProgress({ step, t }) {
  const labels = [t('booking_step_service'), t('booking_step_schedule'), t('booking_step_confirm')];

  const steps = [1, 2, 3];

  return (
    <div className="flex items-center gap-3 mb-10">
      {steps.map((n, i) => (
        <div key={n} className="contents">
          <div className="flex items-center gap-2.5">
            <div
              className={`w-7 h-7 rounded-full grid place-items-center text-[13px] font-bold border-[1.5px] transition-colors
                ${step >= n ? 'bg-brand border-brand text-white' : 'border-line text-muted'}`}
            >
              {step > n ? <Check size={14} strokeWidth={2.5} /> : n}
            </div>
            <span className={`text-[13px] font-semibold ${step >= n ? 'text-ink' : 'text-muted'}`}>
              {labels[i]}
            </span>
          </div>
          {i < 2 && <div className={`flex-1 h-[1.5px] ${step > n ? 'bg-brand' : 'bg-line'}`} />}
        </div>
      ))}
    </div>
  );
}
