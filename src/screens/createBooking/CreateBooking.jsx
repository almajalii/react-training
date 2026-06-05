import { ArrowLeft, ArrowRight } from 'lucide-react';
import Header from '../../components/organisms/header/Header';
import Footer from '../../components/organisms/footer/Footer';
import BookingProgress from '../../components/organisms/createBooking/bookingProgess/BookingProgress';
import BookingStep1 from '../../components/organisms/createBooking/bookingSteps/BookingStep1';
import BookingStep2 from '../../components/organisms/createBooking/bookingSteps/BookingStep2';
import BookingStep3 from '../../components/organisms/createBooking/bookingSteps/BookingStep3';
import BookingSuccess from '../../components/organisms/createBooking/bookingSteps/BookingSuccess';
import useCreateBooking from './useCreateBooking';
import { gfx, proAvatarTone } from '../../styles/themeColors';
import { getInitials } from '../../utils/initials';

export default function CreateBooking() {
  const {
    t,
    i18n,
    pro,
    proLoading,
    step,
    setStep,
    form,
    set,
    dateSlots,
    savedAddresses,
    submitting,
    canProceedStep1,
    canProceedStep2,
    handleContinue,
    selectService,
    selectDate,
    selectTime,
    selectAddress,
    selectedDateLabel,
    navigate,
    isDayUnavailable,
    isTimeUnavailable,
    addImages,
    removeImage,
  } = useCreateBooking();

  const initials = pro ? getInitials(pro.name) : '';
  const toneClass = proAvatarTone(0);

  const canContinue =
    (step === 1 && canProceedStep1) || (step === 2 && canProceedStep2) || step === 3;

  if (proLoading) {
    return (
      <div className="min-h-screen bg-page">
        <Header />
        <div className="max-w-230 mx-auto px-8 py-16 animate-pulse">
          <div className="h-8 bg-chip rounded w-1/3 mb-4" />
          <div className="h-4 bg-chip rounded w-1/2" />
        </div>
      </div>
    );
  }

  if (!pro) return null;

  return (
    <div className="min-h-screen bg-page">
      <Header />
      <div className="max-w-230 mx-auto px-8 py-10 pb-20">
        {step < 4 && (
          <>
            {/* Back link */}
            <button
              onClick={() => navigate(`/pro/${pro.id}`)}
              className="flex items-center gap-2 text-[13px] text-muted hover:text-ink mb-2 transition-colors"
            >
              <ArrowLeft size={14} />
              {t('booking_back_to', { name: pro.name })}
            </button>

            <h1 className="text-[32px] font-extrabold text-ink tracking-tight mb-2">
              {t('booking_title')}
            </h1>
            <p className="text-[16px] text-muted mb-8">
              {t('booking_subtitle_with')} <strong className="text-ink">{pro.name}</strong>
              {' · '}
              {pro.category}
            </p>

            <BookingProgress step={step} t={t} />
          </>
        )}

        {/* Step content */}
        {step === 1 && (
          <BookingStep1
            pro={pro}
            form={form}
            set={set}
            selectService={selectService}
            addImages={addImages}
            removeImage={removeImage}
            t={t}
            i18n={i18n}
          />
        )}
        {step === 2 && (
          <BookingStep2
            form={form}
            set={set}
            selectDate={selectDate}
            selectTime={selectTime}
            selectAddress={selectAddress}
            savedAddresses={savedAddresses}
            dateSlots={dateSlots}
            isDayUnavailable={isDayUnavailable}
            isTimeUnavailable={isTimeUnavailable}
            t={t}
          />
        )}
        {step === 3 && (
          <BookingStep3
            pro={pro}
            form={form}
            selectedDateLabel={selectedDateLabel}
            initials={initials}
            toneClass={toneClass}
            t={t}
          />
        )}
        {step === 4 && <BookingSuccess pro={pro} navigate={navigate} t={t} />}

        {/* Footer nav — shared across all steps */}
        {step < 4 && (
          <div className="flex justify-between gap-4 mt-10">
            {step > 1 ? (
              <button
                onClick={() => setStep((s) => s - 1)}
                className={`${gfx.btnSecondary} flex items-center gap-2 px-5 h-11 text-[15px]`}
              >
                <ArrowLeft size={16} />
                {t('booking_back')}
              </button>
            ) : (
              <span />
            )}
            <button
              onClick={handleContinue}
              disabled={!canContinue || submitting}
              className={`${gfx.btnPrimary} flex items-center gap-2 px-7 h-11 text-[15px]
                ${!canContinue || submitting ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {submitting
                ? t('booking_submitting')
                : step === 3
                  ? t('booking_send_request')
                  : t('booking_continue')}
              {!submitting && <ArrowRight size={16} />}
            </button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
