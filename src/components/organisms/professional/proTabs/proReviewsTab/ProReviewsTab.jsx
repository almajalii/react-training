import { useTranslation } from 'react-i18next';
import useReviews from './useReviews';
import RatingSummary from './RatingSummary';
import ReviewCard from './ReviewCard';

export default function ProReviewsTab({ pro, ratingBreakdown }) {
  const { t } = useTranslation();
  const { reviews, isLoading } = useReviews(pro.id);

  return (
    <div>
      <h2 className="text-[22px] font-bold text-ink tracking-tight mb-4">
        {t('pro_customer_reviews')}
      </h2>

      <RatingSummary
        rating={pro.rating}
        reviewCount={pro.reviewCount}
        ratingBreakdown={ratingBreakdown}
      />

      <div className="mt-6">
        {isLoading ? (
          /* loading state */
          <div className="animate-pulse flex flex-col gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 bg-chip rounded-xl" />
            ))}
          </div>
        ) : /* empty state */
        reviews.length === 0 ? (
          <p className="text-muted text-[14.5px] py-6 text-center">{t('pro_no_reviews')}</p>
        ) : (
          /* data state */
          reviews.map((review, i) => <ReviewCard key={review.id} review={review} index={i} />)
        )}
      </div>
    </div>
  );
}
