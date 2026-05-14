import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Chip from '../atoms/Chip';
import { gfx } from '../../styles/themeColors';
import { CATEGORIES } from '../../constants/categories';
import {
  RATING_OPTIONS,
  DISTANCE_OPTIONS,
  EXPERIENCE_OPTIONS,
  EMPTY_FILTERS,
} from '../../screens/browse/browseFilters';

/**
 * BrowseFilters — sidebar of toggleable filter chips.
 * Owns no state; filter state lives in the BrowseServices screen and is
 * lifted in via props. Category navigation is a route change, so it uses
 * the router rather than calling onChange.
 *
 * Props:
 *   categorySlug   — current URL category slug (for highlighting active chip)
 *   filters        — { minRating, maxDistance, minExp }
 *   onChange       — (nextFilters) => void
 */
export default function BrowseFilters({ categorySlug, filters, onChange }) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const toggle = (key, value) =>
    onChange({ ...filters, [key]: filters[key] === value ? null : value });

  const reset          = () => onChange(EMPTY_FILTERS);
  const hasActiveFilter = Object.values(filters).some((v) => v != null);

  return (
    <aside className={`lg:sticky lg:top-22 self-start ${gfx.card} p-6 divide-y divide-line`}>

      <div className="pb-5">
        <p className={`${gfx.caps} mb-3`}>{t('browse_filter_categories')}</p>
        <div className="flex flex-wrap gap-2">
          <Chip active={!categorySlug} onClick={() => navigate('/browse')}>
            {t('browse_filter_all')}
          </Chip>
          {CATEGORIES.map((c) => (
            <Chip
              key={c.slug}
              active={categorySlug === c.slug}
              onClick={() => navigate(`/browse/${c.slug}`)}
            >
              {t(c.nameKey)}
            </Chip>
          ))}
        </div>
      </div>

      <div className="py-5">
        <p className={`${gfx.caps} mb-3`}>{t('browse_filter_experience')}</p>
        <div className="flex flex-wrap gap-2">
          {EXPERIENCE_OPTIONS.map((n) => (
            <Chip
              key={n}
              active={filters.minExp === n}
              onClick={() => toggle('minExp', n)}
            >
              {n}+ {t('browse_yrs')}
            </Chip>
          ))}
        </div>
      </div>

      <div className="py-5">
        <p className={`${gfx.caps} mb-3`}>{t('browse_filter_rating')}</p>
        <div className="flex flex-wrap gap-2">
          {RATING_OPTIONS.map((n) => (
            <Chip
              key={n}
              active={filters.minRating === n}
              onClick={() => toggle('minRating', n)}
            >
              {n}+ ★
            </Chip>
          ))}
        </div>
      </div>

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
          className="w-full py-2 rounded-xl border border-line text-sm font-medium text-ink hover:border-line-2 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {t('browse_reset_filters')}
        </button>
      </div>
    </aside>
  );
}
