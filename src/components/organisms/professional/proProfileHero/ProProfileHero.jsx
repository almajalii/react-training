import { Star, ShieldCheck, BadgeCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@heroui/react';
import { gfx } from '../../../../styles/themeColors';

export default function ProProfileHero({ pro, initials, toneClass, t }) {
  const navigate = useNavigate();
  return (
    <div className="bg-page-2 border-b border-line py-10 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Hero row */}
        <div className="flex gap-6 items-start">
          {/* Avatar */}
          <div
            className={`w-24 h-24 rounded-2xl flex items-center justify-center font-bold text-2xl shrink-0 overflow-hidden ${toneClass}`}
          >
            {pro.profileImageUrl ? (
              <img
                src={pro.profileImageUrl}
                alt={initials}
                className="w-full h-full object-cover"
              />
            ) : (
              initials
            )}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            {/* Name */}
            <h1 className="text-3xl font-extrabold text-ink tracking-tight">{pro.name}</h1>
            <p className="text-muted mt-1">
              {t('pro_professional') ?? 'Professional'} {pro.category}
            </p>

            {/* Badges */}
            <div className="flex flex-wrap gap-2 mt-3">
              {pro.isVerified && (
                <span className={gfx.pill}>
                  <ShieldCheck size={13} className="text-ok" />
                  {t('pro_background_checked') ?? 'Background-checked'}
                </span>
              )}
              {pro.isIdentityVerified && (
                <span className={gfx.pill}>
                  <BadgeCheck size={13} className="text-ok" />
                  {t('pro_identity_verified') ?? 'Identity verified'}
                </span>
              )}
            </div>

            {/* Stats */}
            <div className="flex gap-8 mt-5">
              {pro.experienceYears !== null && (
                <div>
                  <p className="text-2xl font-extrabold text-ink">{pro.experienceYears}</p>
                  <p className="text-xs text-muted mt-0.5">{t('browse_yrs_exp') ?? 'Years exp.'}</p>
                </div>
              )}
              {pro.rating !== null && (
                <div>
                  <p className="text-2xl font-extrabold text-ink flex items-center gap-1.5">
                    {pro.rating.toFixed(1)}
                    <Star size={16} className="text-brand fill-brand" />
                  </p>
                  <p className="text-xs text-muted mt-0.5">{t('pro_rating') ?? 'Rating'}</p>
                </div>
              )}
            </div>

            {/* Book Now */}
            <div className="mt-6 flex items-center gap-3">
              <button
                onClick={() => navigate(`/book/${pro.id}`)}
                disabled={!pro.isAvailable}
                className={`${gfx.btnPrimary} px-7 h-11 text-[15px] ${!pro.isAvailable ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {t('pro_book_now')}
              </button>
              {!pro.isAvailable && (
                <span className="text-[13px] text-muted">{t('pro_unavailable')}</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
