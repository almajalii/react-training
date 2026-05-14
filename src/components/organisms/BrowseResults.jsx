import { useTranslation } from 'react-i18next';
import { AlertCircle } from 'lucide-react';
import ProCard, { ProCardSkeleton } from '../molecules/ProCard';

const SKELETON_COUNT = 6;

/**
 * BrowseResults — right-hand column of the browse page.
 * Renders count + sort dropdown, then one of: error / loading / empty / grid.
 *
 * Props:
 *   professionals — array of pro objects (may be empty)
 *   loading       — bool
 *   error         — string | null
 */
export default function BrowseResults({ professionals, loading, error }) {
  const { t } = useTranslation();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-muted">
          {loading ? (
            <span className="inline-block w-24 h-4 bg-chip rounded animate-pulse" />
          ) : (
            <>
              <span className="font-semibold text-ink">{professionals.length}</span>{' '}
              {t('browse_pros_available')}
            </>
          )}
        </p>

        <select className="px-3 py-2 rounded-xl border border-line bg-surface text-sm text-ink focus:outline-none focus:border-brand">
          <option>{t('browse_sort_recommended')}</option>
          <option>{t('browse_sort_rating')}</option>
          <option>{t('browse_sort_closest')}</option>
          <option>{t('browse_sort_price')}</option>
        </select>
      </div>

      {error && (
        <div className="flex items-center gap-3 p-4 mb-6 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 rounded-2xl text-red-600 dark:text-red-400 text-sm">
          <AlertCircle size={16} className="shrink-0" />
          {error}
        </div>
      )}

      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
            <ProCardSkeleton key={i} />
          ))}
        </div>
      )}

      {!loading && !error && professionals.length === 0 && (
        <div className="flex items-center justify-center py-20 border border-dashed border-line rounded-2xl text-muted text-sm">
          {t('browse_no_results')}
        </div>
      )}

      {!loading && professionals.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {professionals.map((p, i) => (
            <ProCard key={p.id} pro={p} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
