import { Star } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { STAR_RATINGS } from '../../../../../constants/ratings';
export default function RatingSummary({ rating, reviewCount, ratingBreakdown }) {
  const { t } = useTranslation();

  if (!reviewCount) return null;
  return (
    <div className="bg-surface rounded-2xl border border-line p-6 flex gap-8 items-center">
      {/* Left — big score */}
      <div className="flex flex-col items-center shrink-0">
        <p className="text-6xl font-extrabold text-ink tracking-tight">{rating?.toFixed(1)}</p>
        <div className="flex gap-0.5 mt-2">
          {STAR_RATINGS.map((s) => (
            <Star
              key={s}
              size={14}
              className={s <= Math.round(rating) ? 'text-brand fill-brand' : 'text-line'}
            />
          ))}
        </div>
        <p className="text-[12px] text-muted mt-1.5 text-center">
          {t('pro_based_on')} {reviewCount} {t('browse_reviews')}
        </p>
      </div>

      {/* Right — breakdown bars */}
      <div className="flex-1 flex flex-col gap-2">
        {ratingBreakdown.map(({ star, pct }) => (
          <div key={star} className="flex items-center gap-2 text-[13px] text-muted">
            <span className="w-3 shrink-0">{star}</span>
            <div className="flex-1 h-1.5 bg-line rounded-full overflow-hidden">
              <div
                className="h-full bg-brand rounded-full transition-all duration-500"
                style={{ width: `${pct}%` }}
              />
            </div>
            <span className="w-8 text-right shrink-0">{pct}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
