import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { gfx } from '../../styles/themeColors';
import { CATEGORIES } from '../../constants/categories';

/**
 * CategorySection — home-page grid of service categories.
 * Data comes entirely from the CATEGORIES constant (no API, no props).
 * Labels and subtitles are resolved through i18next so Arabic/English
 * switching works automatically.
 */
export default function CategorySection() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <section className="bg-page pt-10 pb-20 px-6">
      <div className="max-w-7xl mx-auto">

        <div className="mb-12">
          <p className={`${gfx.caps} mb-2`}>{t('category_label')}</p>
          <h2 className="text-4xl font-extrabold text-ink tracking-tight leading-tight">
            {t('category_heading')}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CATEGORIES.map(({ slug, Icon, nameKey, subKey }) => (
            <button
              key={slug}
              onClick={() => navigate(`/browse/${slug}`)}
              className={`group ${gfx.card} ${gfx.cardHover} p-7 flex flex-col gap-3.5 text-left min-h-45 relative overflow-hidden`}
            >
              <div className="w-11 h-11 rounded-xl bg-chip text-ink group-hover:bg-accent group-hover:text-brand flex items-center justify-center transition-all duration-200 shrink-0">
                <Icon size={22} strokeWidth={1.7} />
              </div>

              <div className="flex-1">
                <p className="font-bold text-ink text-[17px] tracking-[-0.01em]">
                  {t(nameKey)}
                </p>
                <p className="text-[13px] text-muted mt-1 leading-relaxed">
                  {t(subKey)}
                </p>
              </div>

              <span className="absolute right-5 bottom-5 opacity-0 group-hover:opacity-100 translate-x-1 group-hover:translate-x-0 transition-all duration-200 text-ink">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </span>
            </button>
          ))}
        </div>

      </div>
    </section>
  );
}
