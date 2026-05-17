import { Star, ShieldCheck } from 'lucide-react';
import { gfx } from '../../../styles/themeColors';
import { useProCard } from './useProCard';

export default function ProCard({ pro, index = 0 }) {
    const { t, initials, toneClass, minPrice, goToProfile, cityName } = useProCard(pro, index);

    return (
        <button
            onClick={goToProfile}
            className={`${gfx.card} ${gfx.cardHover} p-5 flex flex-col gap-4 text-left w-full cursor-pointer`}
        >
            <div className="flex gap-3.5 items-start">
                {/* profile image and initials */}
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-lg shrink-0 overflow-hidden ${toneClass}`}>
                    {pro.profileImageUrl
                        ? <img src={pro.profileImageUrl} alt={initials} className="w-full h-full object-cover" />
                        : initials}
                </div>
                {/* name and details */}
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
                  {/* verified badge */}
                {pro.isVerified && (
                    <div className="flex items-center gap-1 text-[11.5px] font-semibold text-ok shrink-0">
                        <ShieldCheck size={13} />
                        {t('browse_verified')}
                    </div>
                )}
            </div>
            
            {/* service areas and pricing */}
            <div className="flex gap-4 pt-3.5 border-t border-line items-end">
                {pro.serviceAreas?.length > 0 && (
                    <div>
                        <p className="text-[13px] text-ink truncate max-w-30">{cityName}</p>
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