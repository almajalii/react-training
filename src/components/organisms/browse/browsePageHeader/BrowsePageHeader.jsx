import { useTranslation } from 'react-i18next';
import { useCategories } from '../../../../hooks/useCategories';

// This component renders the header section of the browse page, including the title and subtitle based on the active category.
export default function BrowsePageHeader({ categorySlug }) {
  const { t } = useTranslation();
  const { categories } = useCategories();

  const activeCategory = categorySlug ? (categories.find((c) => c.slug === categorySlug) ?? null) : null;

  const title = activeCategory ? activeCategory.displayName : t('browse_all_services');

  const subtitle = activeCategory
    ? `${t('browse_expert_solutions')} ${activeCategory.displayName.toLowerCase()}.`
    : t('browse_all_subtitle');

  return (
    <div className="bg-page-2 border-b border-line py-14 px-6">
      <div className="max-w-7xl mx-auto">
        <nav className="flex gap-2 text-sm text-muted mb-5">
          {activeCategory && (
            <>
              <span className="text-faint">/</span>
              <span className="text-ink font-semibold">{activeCategory.displayName}</span>
            </>
          )}
        </nav>
        <h1 className="text-4xl font-extrabold text-ink tracking-tight mb-3">{title}</h1>
        <p className="text-muted text-[16px] max-w-lg">{subtitle}</p>
      </div>
    </div>
  );
}
