import ProgressBar from '../../../molecules/progressBar/ProgressBar';

export default function BookingProgress({ step, t }) {
  const steps = [
    { label: t('booking_step_service') },
    { label: t('booking_step_schedule') },
    { label: t('booking_step_confirm') },
  ];

  return <ProgressBar steps={steps} currentStep={step} />;
}
