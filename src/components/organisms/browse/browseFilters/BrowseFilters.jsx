import {
  RATING_OPTIONS,
  DISTANCE_OPTIONS,
  EXPERIENCE_OPTIONS,
} from '../../../../screens/browse/browseFiltersConstants';
import { gfx } from '../../../../styles/themeColors';
import Chip from '../../../atoms/chip/Chip';
import { useBrowseFilters } from './useBrowseFilters';

export default function BrowseFilters({ categorySlug, filters, onChange }) {
  const { t, CATEGORIES, toggle, reset, hasActiveFilter, goToCategory } = useBrowseFilters(
    filters,
    onChange,
    categorySlug
  );

  return (
    <aside className={`lg:sticky lg:top-22 self-start ${gfx.card} p-6 divide-y divide-line`}>
      {/* show categories */}
      <div className="pb-5">
        <p className={`${gfx.caps} mb-3`}>{t('browse_filter_categories')}</p>
        <div className="flex flex-wrap gap-2">
          {/* all */}
          <Chip active={!categorySlug} onClick={() => goToCategory(null)}>
            {t('browse_filter_all')}
          </Chip>
          {/* categories from constants */}
          {CATEGORIES.map((c) => (
            <Chip
              key={c.slug}
              active={categorySlug === c.slug}
              onClick={() => goToCategory(c.slug)}
            >
              {t(c.nameKey)}
            </Chip>
          ))}
        </div>
      </div>
      {/* experience filter */}
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
      {/* rating filter */}
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
      {/* distance filter */}
      <div className="py-5">
        <p className={`${gfx.caps} mb-3`}>{t('browse_filter_distance')}</p>
        <div className="flex flex-wrap gap-2">
          {DISTANCE_OPTIONS.map((n) => (
            <Chip
              key={n}
              active={filters.maxDistance === n}
              onClick={() => toggle('maxDistance', n)}
            >
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
