import { useTranslation } from 'react-i18next';
import { findCategoryBySlug } from '../../constants/categories';

/**
 * BrowsePageHeader — banner above the results grid.
 * Shows breadcrumb (when a category is selected), the title, and a subtitle
 * derived from the active category meta.
 */
export default function BrowsePageHeader({ categorySlug }) {
  const { t } = useTranslation();
  const activeMeta = findCategoryBySlug(categorySlug);
  //active meta = null  -> all services page
  //active meta = category -> category page
  const title = activeMeta ? t(activeMeta.nameKey) : t('browse_all_services');

  const subtitle = activeMeta
    ? `${t('browse_expert_solutions')} ${t(activeMeta.subKey).toLowerCase()}.`
    : t('browse_all_subtitle');

  return (
    <div className="bg-page-2 border-b border-line py-14 px-6">
      <div className="max-w-7xl mx-auto">
        <nav className="flex gap-2 text-sm text-muted mb-5">
          {activeMeta && (
            <>
              <span className="text-faint">/</span>
              <span className="text-ink font-semibold">{t(activeMeta.nameKey)}</span>
            </>
          )}
        </nav>
        <h1 className="text-4xl font-extrabold text-ink tracking-tight mb-3">{title}</h1>
        <p className="text-muted text-[16px] max-w-lg">{subtitle}</p>
      </div>
    </div>
  );
}
