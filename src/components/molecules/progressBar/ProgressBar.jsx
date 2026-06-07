import { Check } from 'lucide-react';

export default function ProgressBar({ steps, currentStep }) {
  return (
    <div className="flex items-center gap-3 mb-10">
      {steps.map((step, i) => {
        const n = i + 1;
        return (
          <div key={n} className="contents">
            <div className="flex items-center gap-2.5">
              <div
                className={`w-7 h-7 rounded-full grid place-items-center text-[13px] font-bold border-[1.5px] transition-colors
                  ${currentStep >= n ? 'bg-brand border-brand text-white' : 'border-line text-muted'}`}
              >
                {currentStep > n ? <Check size={14} strokeWidth={2.5} /> : n}
              </div>
              <span className={`text-[13px] font-semibold ${currentStep >= n ? 'text-ink' : 'text-muted'}`}>
                {step.label}
              </span>
            </div>
            {i < steps.length - 1 && <div className={`flex-1 h-[1.5px] ${currentStep > n ? 'bg-brand' : 'bg-line'}`} />}
          </div>
        );
      })}
    </div>
  );
}
