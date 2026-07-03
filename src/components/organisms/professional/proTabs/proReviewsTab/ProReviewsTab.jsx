import { useTranslation } from 'react-i18next';
import RatingSummary from './RatingSummary';
import ReviewCard from './ReviewCard';
import useReviews from './useReviews';

export default function ProReviewsTab({ pro, ratingBreakdown }) {
  const { t } = useTranslation();
  const { reviews, isLoading, totalPages, page, setPage } = useReviews(pro.id);

  return (
    <div>
      <h2 className="text-[22px] font-bold text-ink tracking-tight mb-4">{t('pro_customer_reviews')}</h2>
      {/*  fetched beforehand in parent component */}

      <RatingSummary rating={pro.rating} reviewCount={pro.reviewCount} ratingBreakdown={ratingBreakdown} />

      {/* Reviews list */}
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

      {/* pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-6 flex-wrap">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`w-9 h-9 rounded-xl text-sm font-semibold transition-colors
                ${p === page ? 'bg-brand text-white' : 'bg-chip text-ink hover:bg-line'}`}
            >
              {p}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
