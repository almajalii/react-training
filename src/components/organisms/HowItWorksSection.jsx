import { useTranslation } from 'react-i18next';

export default function HowItWorksSection() {
  const { t } = useTranslation();

  const steps = [
    { num: '01', title: t('how_step1_title'), desc: t('how_step1_desc') },
    { num: '02', title: t('how_step2_title'), desc: t('how_step2_desc') },
    { num: '03', title: t('how_step3_title'), desc: t('how_step3_desc') },
  ];

  return (
    <section className="bg-page py-8 px-6" id="how-it-works">
      <div className="max-w-7xl mx-auto">
        {/* Intentionally dark navy in both themes — it's the brand "spotlight" block */}
        <div className="bg-[#0E1A2B] rounded-3xl px-8 py-16 lg:px-16 lg:py-18">

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-12">
            <div>
              <p className="text-xs font-bold uppercase tracking-caps text-brand mb-2">
                {t('how_label')}
              </p>
              <h2 className="text-4xl font-extrabold text-white tracking-tight leading-tight">
                {t('how_heading')}
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step) => (
              <div key={step.num}>
                <div className="w-9 h-9 rounded-[10px] bg-white/10 border border-white/15 text-brand text-sm font-bold grid place-items-center mb-5">
                  {step.num}
                </div>
                <h3 className="text-[22px] font-bold text-white tracking-[-0.01em] mb-2.5">
                  {step.title}
                </h3>
                <p className="text-[15px] text-white/60 leading-[1.55]">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}