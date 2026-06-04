import { useMemo } from 'react';
import { Star } from 'lucide-react';
import { getInitials } from '../../../../../utils/initials';
import { proAvatarTone } from '../../../../../styles/themeColors';
import timeAgo from '../../../../../utils/timeAgo';

export default function ReviewCard({ review, index = 0 }) {
  const { reviewerName, reviewerImageUrl, rating, comment, createdAt } = review;

  const initials = useMemo(() => getInitials(reviewerName), [reviewerName]);
  const toneClass = useMemo(() => proAvatarTone(index), [index]);
  const ago = useMemo(() => timeAgo(createdAt), [createdAt]);

  return (
    <div className="flex flex-col gap-3 py-5 border-b border-line last:border-none">
      {/* Top row — avatar, name, date, stars */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 overflow-hidden ${toneClass}`}
          >
            {reviewerImageUrl ? (
              <img src={reviewerImageUrl} alt={initials} className="w-full h-full object-cover" />
            ) : (
              initials
            )}
          </div>
          {/* Name + date */}
          <div>
            <p className="font-semibold text-ink text-[14.5px]">{reviewerName}</p>
            <p className="text-[12px] text-muted mt-0.5">{ago}</p>
          </div>
        </div>

        {/* Stars */}
        <div className="flex gap-0.5 shrink-0 mt-0.5">
          {[1, 2, 3, 4, 5].map((s) => (
            <Star
              key={s}
              size={13}
              className={s <= rating ? 'text-brand fill-brand' : 'text-line'}
            />
          ))}
        </div>
      </div>

      {/* Comment */}
      {comment && <p className="text-ink-soft text-[14.5px] leading-relaxed">{comment}</p>}
    </div>
  );
}
