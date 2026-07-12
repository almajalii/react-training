import { useState } from 'react'
import { Star, X } from 'lucide-react'
import type { TFunction } from 'i18next'
// @ts-expect-error
import { gfx } from '../../../../styles/themeColors'

interface ReviewSheetProps {
  proName: string
  onConfirm: (rating: number, comment: string) => void
  onClose: () => void
  submitting: boolean
  t: TFunction
}

export default function ReviewSheet({ proName, onConfirm, onClose, submitting, t }: ReviewSheetProps) {
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [comment, setComment] = useState('')

  const canSubmit = rating > 0 && !submitting

  return (
    <div className="absolute inset-0 bg-surface z-10 flex flex-col">
      <div className="flex items-center justify-between px-5 py-4 border-b border-line shrink-0">
        <h3 className="text-[16px] font-bold text-ink">{t('bk_review_title')}</h3>
        <button
          onClick={onClose}
          aria-label={t('bk_drawer_close')}
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-surface-2 transition-colors"
        >
          <X size={16} className="text-muted" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-5 flex flex-col gap-5">
        <p className="text-[14px] text-muted">{t('bk_review_subtitle', { name: proName })}</p>

        {/* star picker */}
        <div className="flex items-center gap-1.5">
          {[1, 2, 3, 4, 5].map(s => (
            <button
              key={s}
              type="button"
              onClick={() => setRating(s)}
              onMouseEnter={() => setHoverRating(s)}
              onMouseLeave={() => setHoverRating(0)}
              aria-label={t('bk_review_star_label', { count: s })}
              className="p-1"
            >
              <Star size={28} className={s <= (hoverRating || rating) ? 'text-brand fill-brand' : 'text-line'} />
            </button>
          ))}
        </div>

        {/* comment */}
        <div>
          <label className={gfx.label}>{t('bk_review_comment_label')}</label>
          <textarea
            rows={4}
            value={comment}
            onChange={e => setComment(e.target.value)}
            placeholder={t('bk_review_comment_placeholder')}
            className="w-full px-4 py-3 rounded-xl border-[1.5px] border-line bg-surface text-ink
              text-[15px] placeholder:text-faint focus:ring-2 focus:ring-focus focus:border-brand outline-none transition-all resize-none"
          />
        </div>
      </div>

      <div className="px-5 py-4 border-t border-line shrink-0">
        <button
          type="button"
          disabled={!canSubmit}
          onClick={() => onConfirm(rating, comment)}
          className={`${gfx.btnPrimary} w-full h-11 text-[14.5px] ${!canSubmit ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {submitting ? t('bk_review_submitting') : t('bk_review_submit')}
        </button>
      </div>
    </div>
  )
}
