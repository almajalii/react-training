import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button } from '@heroui/react';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { gfx } from '../../styles/themeColors';

const BENEFITS = [
  { titleKey: 'pro_benefit_1_title', subKey: 'pro_benefit_1_sub' },
  { titleKey: 'pro_benefit_2_title', subKey: 'pro_benefit_2_sub' },
  { titleKey: 'pro_benefit_3_title', subKey: 'pro_benefit_3_sub' },
];

export default function ProSection() {
  const { t } = useTranslation();

  return (
    <section className="bg-page py-8 px-6 pb-20">
      <div className="max-w-7xl mx-auto">
        <div className={`${gfx.cardLg} p-10 lg:p-14 grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-12 items-center`}>

          <div>
            <p className="text-xs font-bold uppercase tracking-caps text-brand-strong mb-3">
              {t('pro_label')}
            </p>
            <h2 className="text-[40px] font-extrabold text-ink tracking-tight leading-tight mb-4">
              {t('pro_heading')}
            </h2>
            <p className="text-muted text-[17px] leading-relaxed mb-8 max-w-130">
              {t('pro_subtext')}
            </p>
            <div className="flex flex-wrap gap-3">
              <Button
                as={Link}
                to="/become-a-pro"
                className={`${gfx.btnPrimary} text-[15px] px-7 h-12`}
                endContent={<ArrowRight size={18} />}
              >
                {t('pro_apply_cta')}
              </Button>
              <Button
                as={Link}
                to="/how-it-works"
                variant="bordered"
                className={`${gfx.btnSecondary} text-[15px] px-7 h-12`}
              >
                {t('pro_learn_more')}
              </Button>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {BENEFITS.map((b) => (
              <div key={b.titleKey} className="flex items-start gap-4 bg-chip rounded-2xl px-5 py-4">
                <div className="shrink-0 mt-0.5 text-ink">
                  <CheckCircle2 size={22} strokeWidth={1.8} />
                </div>
                <div>
                  <p className="text-[15px] font-bold text-ink">{t(b.titleKey)}</p>
                  <p className="text-[13px] text-muted mt-0.5">{t(b.subKey)}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}