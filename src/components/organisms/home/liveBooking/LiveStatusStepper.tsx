import { Check } from 'lucide-react'
import type { TFunction } from 'i18next'
import { TIMELINE_STEPS, STATUS_ORDER } from '../../../../utils/bookingUtils'
import type { BookingStatus } from '../../../../types/booking'

const STEP_LABEL_KEYS: Record<string, string> = {
  Pending: 'bk_tl_placed',
  Accepted: 'bk_tl_confirmed',
  OnTheWay: 'bk_tl_on_the_way',
  Arrived: 'bk_tl_arrived',
  InProgress: 'bk_tl_in_progress',
  Completed: 'bk_tl_completed',
}

interface LiveStatusStepperProps {
  status: BookingStatus
  t: TFunction
}

export default function LiveStatusStepper({ status, t }: LiveStatusStepperProps) {
  const currentIndex = STATUS_ORDER[status] ?? -1
  const progressFraction = currentIndex >= 0 ? currentIndex / (TIMELINE_STEPS.length - 1) : 0

  return (
    <div className="relative py-1">
      {/* background line, spans between the first and last dot centers */}
      <div className="absolute top-4 left-4 right-4 h-0.75 bg-line rounded-full" />
      {/* filled progress line — animates its width as the status advances */}
      <div
        className="absolute top-4 left-4 h-0.75 bg-brand rounded-full transition-all duration-700 ease-out"
        style={{ width: `calc((100% - 2rem) * ${progressFraction})` }}
      />

      <div className="flex justify-between relative z-10">
        {TIMELINE_STEPS.map((step, i) => {
          const isDone = i < currentIndex
          const isCurrent = i === currentIndex
          const isReached = isDone || isCurrent

          return (
            <div key={step} className="flex flex-col items-center gap-2 w-8">
              <div
                className={`relative w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors duration-500
                  ${isReached ? 'bg-brand text-white' : 'bg-chip text-faint'}`}
              >
                {/* pulsing ring, only on the current in-progress step */}
                {isCurrent && (
                  <span className="absolute inline-flex w-full h-full rounded-full bg-brand/60 animate-ping" />
                )}
                <span className="relative">
                  {isDone ? (
                    <Check size={16} strokeWidth={3} />
                  ) : (
                    <span className="text-[11px] font-bold">{i + 1}</span>
                  )}
                </span>
              </div>
              <span
                className={`text-[10.5px] font-semibold text-center leading-tight w-16 -mx-4
                  ${isReached ? 'text-ink' : 'text-faint'}`}
              >
                {t(STEP_LABEL_KEYS[step])}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
