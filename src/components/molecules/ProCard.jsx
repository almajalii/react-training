import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Star, ShieldCheck } from 'lucide-react';
import { gfx, proAvatarTone } from '../../styles/themeColors';
import { getInitials } from '../../utils/initials';

/**
 * ProCard — clickable card representing a professional in the browse grid.
 * Used by `BrowseResults`. Composed of avatar + name + rating + meta strip.
 *
 *   <ProCard pro={pro} index={i} />
 *
 * `index` is only used to deterministically pick an avatar tone so a list of
 * pros looks visually varied.
 */
export default function ProCard({ pro, index = 0 }) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const initials  = getInitials(pro.name);
  const toneClass = proAvatarTone(index);
  const minPrice  = pro.services?.[0]?.minPrice;

  return (
    <button
      onClick={() => navigate(`/pro/${pro.id}`)}
      className={`${gfx.card} ${gfx.cardHover} p-5 flex flex-col gap-4 text-left w-full`}
    >
      <div className="flex gap-3.5 items-start">
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-lg shrink-0 overflow-hidden ${toneClass}`}>
          {pro.profileImageUrl
            ? <img src={pro.profileImageUrl} alt={initials} className="w-full h-full object-cover" />
            : initials}
        </div>

        <div className="flex-1 min-w-0">
          <p className="font-bold text-ink text-[16px] tracking-tight truncate">{pro.name}</p>
          <p className="text-[13px] text-muted mt-0.5">
            {pro.category}
            {pro.experienceYears != null && ` · ${pro.experienceYears} ${t('browse_yrs_exp')}`}
          </p>
          {pro.rating != null && (
            <div className="flex items-center gap-1 mt-1.5">
              <Star size={12} className="text-brand fill-brand" />
              <span className="text-[13px] font-semibold text-ink">{pro.rating.toFixed(1)}</span>
              <span className="text-[12px] text-muted">
                ({pro.reviewCount ?? 0} {t('browse_reviews')})
              </span>
            </div>
          )}
        </div>

        {pro.isVerified && (
          <div className="flex items-center gap-1 text-[11.5px] font-semibold text-ok shrink-0">
            <ShieldCheck size={13} />
            {t('browse_verified')}
          </div>
        )}
      </div>

      <div className="flex gap-4 pt-3.5 border-t border-line items-end">
        {pro.serviceAreas?.length > 0 && (
          <div>
            <p className="text-[13px] text-ink truncate max-w-30">{pro.serviceAreas[0].name}</p>
            <p className="text-[11px] uppercase tracking-wide text-muted mt-0.5">{t('browse_area')}</p>
          </div>
        )}
        {minPrice != null && (
          <div className="ml-auto text-right">
            <p className="text-[14px] font-semibold text-ok font-mono">
              {t('browse_from')} {minPrice} JD
            </p>
            <p className="text-[11px] uppercase tracking-wide text-muted mt-0.5">{t('browse_starting')}</p>
          </div>
        )}
      </div>
    </button>
  );
}

/**
 * Loading skeleton matching ProCard's footprint. Exported separately so the
 * results grid can render skeletons before data arrives without importing the
 * full component path twice.
 */
export function ProCardSkeleton() {
  return (
    <div className={`${gfx.card} p-5 flex flex-col gap-4 animate-pulse`}>
      <div className="flex gap-3.5 items-start">
        <div className="w-14 h-14 rounded-2xl bg-chip shrink-0" />
        <div className="flex-1 space-y-2 pt-1">
          <div className="h-4 bg-chip rounded w-2/3" />
          <div className="h-3 bg-chip rounded w-1/2" />
          <div className="h-3 bg-chip rounded w-1/3" />
        </div>
      </div>
      <div className="pt-3.5 border-t border-line flex gap-4">
        <div className="h-3 bg-chip rounded w-16" />
        <div className="h-3 bg-chip rounded w-16 ml-auto" />
      </div>
    </div>
  );
}
