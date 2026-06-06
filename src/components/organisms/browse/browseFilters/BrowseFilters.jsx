import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import {
  RATING_OPTIONS,
  DISTANCE_OPTIONS,
  EXPERIENCE_OPTIONS,
  EMPTY_FILTERS,
} from '../../../../screens/browse/browseFiltersConstants';
import { gfx } from '../../../../styles/themeColors';
import Chip from '../../../atoms/chip/Chip';
import { useCategories } from '../../../../hooks/useCategories';

export default function BrowseFilters({ categorySlug, filters, onChange }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { categories, isLoading } = useCategories();

  const toggle = useCallback(
    (key, value) => onChange({ ...filters, [key]: filters[key] === value ? null : value }),
    [filters, onChange],
  );

  const reset = useCallback(() => onChange(EMPTY_FILTERS), [onChange]);

  const goToCategory = useCallback((slug) => navigate(slug ? `/browse/${slug}` : '/browse'), [navigate]);

  const hasActiveFilter = useMemo(() => Object.values(filters).some((v) => v !== null), [filters]);

  return (
    <aside className={`lg:sticky lg:top-22 self-start ${gfx.card} p-6 divide-y divide-line`}>
      {/* categories */}
      <div className="pb-5">
        <p className={`${gfx.caps} mb-3`}>{t('browse_filter_categories')}</p>
        <div className="flex flex-wrap gap-2">
          <Chip active={!categorySlug} onClick={() => goToCategory(null)}>
            {t('browse_filter_all')}
          </Chip>
          {isLoading
            ? Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-7 w-20 rounded-full bg-chip animate-pulse" />
              ))
            : categories.map((c) => (
                <Chip key={c.id} active={categorySlug === c.slug} onClick={() => goToCategory(c.slug)}>
                  {c.displayName}
                </Chip>
              ))}
        </div>
      </div>

      {/* experience */}
      <div className="py-5">
        <p className={`${gfx.caps} mb-3`}>{t('browse_filter_experience')}</p>
        <div className="flex flex-wrap gap-2">
          {EXPERIENCE_OPTIONS.map((n) => (
            <Chip key={n} active={filters.minExp === n} onClick={() => toggle('minExp', n)}>
              {n}+ {t('browse_yrs')}
            </Chip>
          ))}
        </div>
      </div>

      {/* rating */}
      <div className="py-5">
        <p className={`${gfx.caps} mb-3`}>{t('browse_filter_rating')}</p>
        <div className="flex flex-wrap gap-2">
          {RATING_OPTIONS.map((n) => (
            <Chip key={n} active={filters.minRating === n} onClick={() => toggle('minRating', n)}>
              {n}+ ★
            </Chip>
          ))}
        </div>
      </div>

      {/* distance */}
      <div className="py-5">
        <p className={`${gfx.caps} mb-3`}>{t('browse_filter_distance')}</p>
        <div className="flex flex-wrap gap-2">
          {DISTANCE_OPTIONS.map((n) => (
            <Chip key={n} active={filters.maxDistance === n} onClick={() => toggle('maxDistance', n)}>
              {n} km
            </Chip>
          ))}
        </div>
      </div>

      <div className="pt-5">
        <button
          type="button"
          disabled={!hasActiveFilter}
          onClick={reset}
          className="w-full py-2 rounded-xl border border-line text-sm font-medium text-ink hover:border-line-2 transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
        >
          {t('browse_reset_filters')}
        </button>
      </div>
    </aside>
  );
}
