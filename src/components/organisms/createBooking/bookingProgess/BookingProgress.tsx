// @ts-expect-error
import ProgressBar from '../../../molecules/progressBar/ProgressBar'
import type { TFunction } from 'i18next'

interface BookingProgressProps {
  step: number
  t: TFunction
}
export default function BookingProgress({ step, t }: BookingProgressProps) {
  const steps = [
    { label: t('booking_step_service') },
    { label: t('booking_step_schedule') },
    { label: t('booking_step_confirm') },
  ]

  return <ProgressBar steps={steps} currentStep={step} />
}
