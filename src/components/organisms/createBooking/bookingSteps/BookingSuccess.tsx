import { Check } from 'lucide-react'
// @ts-expect-error
import { gfx } from '../../../../styles/themeColors'
import type { BookingPro } from '../../../../types/booking'
import type { TFunction } from 'i18next'
interface BookingSuccessProps {
  pro: BookingPro
  navigate: (path: string) => void
  t: TFunction
}
export default function BookingSuccess({ pro, navigate, t }: BookingSuccessProps) {
  return (
    <div
      className="text-center py-16 px-8 bg-surface border border-line rounded-3xl
      max-w-lg mx-auto mt-16"
    >
      {/* Check icon */}
      <div
        className="w-18 h-18 rounded-full bg-brand-tint text-brand
        grid place-items-center mx-auto mb-6"
      >
        <Check size={36} strokeWidth={2.4} />
      </div>

      <h2 className="text-[28px] font-extrabold text-ink tracking-tight mb-3">{t('booking_success_title')}</h2>

      <p className="text-[15.5px] text-ink-soft leading-relaxed max-w-sm mx-auto mb-8">
        {t('booking_success_body', { name: pro.name.split(' ')[0] })}
      </p>

      <div className="flex gap-3 justify-center">
        <button onClick={() => navigate('/')} className={`${gfx.btnPrimary} px-6 h-11 text-[15px]`}>
          {t('booking_success_home')}
        </button>
        <button onClick={() => navigate(`/pro/${pro.id}`)} className={`${gfx.btnSecondary} px-6 h-11 text-[15px]`}>
          {t('booking_success_view_pro')}
        </button>
      </div>
    </div>
  )
}
