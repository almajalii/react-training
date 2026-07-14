import { ArrowLeft, ArrowRight } from 'lucide-react'
import BookingProgress from '../../components/organisms/createBooking/bookingProgess/BookingProgress'
import BookingStep1 from '../../components/organisms/createBooking/bookingSteps/BookingStep1'
import BookingStep2 from '../../components/organisms/createBooking/bookingSteps/BookingStep2'
import BookingStep3 from '../../components/organisms/createBooking/bookingSteps/BookingStep3'
import BookingSuccess from '../../components/organisms/createBooking/bookingSteps/BookingSuccess'
// @ts-expect-error
import Footer from '../../components/organisms/footer/Footer'
// @ts-expect-error
import Header from '../../components/organisms/header/Header'
// @ts-expect-error
import { gfx } from '../../styles/themeColors'
import useCreateBooking from './useCreateBooking'

export default function CreateBooking() {
  // all logic and state lives in the hook, this file is pure layout
  const {
    t,
    i18n,
    pro,
    proLoading,
    step,
    setStep,
    formik,
    image,
    dateSlots,
    savedAddresses,
    handleContinue,
    selectService,
    selectDate,
    selectTime,
    selectAddress,
    selectedDateLabel,
    navigate,
    isDayUnavailable,
    isTimeUnavailable,
    addImage,
    removeImage,
    isAr,
  } = useCreateBooking()
  // step 3 is a review screen with no fields, always allow continue
  const canContinue = step === 3 || formik.isValid

  //loading state
  if (proLoading) {
    return (
      <div className="min-h-screen bg-page">
        <Header />
        <div className="max-w-230 mx-auto px-8 py-16 animate-pulse">
          <div className="h-8 bg-chip rounded w-1/3 mb-4" />
          <div className="h-4 bg-chip rounded w-1/2" />
        </div>
      </div>
    )
  }
  //error state
  if (!pro)
    return (
      <>
        <div>Pro not found</div>
      </>
    )
  //success state

  return (
    <div className="min-h-screen bg-page">
      <Header />
      <div className="max-w-230 mx-auto px-8 py-10 pb-20">
        {/* header and progress bar hidden on the success screen */}
        {step < 4 && (
          <>
            {/* takes the user back to the pro's profile page */}
            <button
              onClick={() => navigate(`/pro/${pro.id}`)}
              className="flex items-center gap-2 text-[13px] text-muted hover:text-ink mb-2 transition-colors"
            >
              <ArrowLeft size={14} />
              {t('booking_back_to', { name: pro.name })}
            </button>

            <h1 className="text-[32px] font-extrabold text-ink tracking-tight mb-2">{t('booking_title')}</h1>
            <p className="text-[16px] text-muted mb-8">
              {t('booking_subtitle_with')} <strong className="text-ink">{pro.name}</strong>
              {' · '}
              {isAr && pro.categoryAr ? pro.categoryAr : pro.category}
            </p>

            {/* step indicator dots at the top — Service / Schedule / Confirm */}
            <BookingProgress step={step} t={t} />
          </>
        )}

        {/* service picker, description textarea, photo upload */}
        {step === 1 && (
          <BookingStep1
            pro={pro}
            formik={formik}
            image={image}
            selectService={selectService}
            addImage={addImage}
            removeImage={removeImage}
            t={t}
            i18n={i18n}
          />
        )}

        {/* date grid, time grid, address picker */}
        {step === 2 && (
          <BookingStep2
            formik={formik}
            selectDate={selectDate}
            selectTime={selectTime}
            selectAddress={selectAddress}
            savedAddresses={savedAddresses}
            dateSlots={dateSlots}
            isDayUnavailable={isDayUnavailable}
            isTimeUnavailable={isTimeUnavailable}
            navigate={navigate}
            t={t}
            i18n={i18n}
          />
        )}

        {/* read-only summary card before the user submits */}
        {step === 3 && (
          <BookingStep3 pro={pro} formik={formik} image={image} selectedDateLabel={selectedDateLabel} t={t} />
        )}

        {/* confirmation screen shown after successful submission */}
        {step === 4 && <BookingSuccess pro={pro} navigate={navigate} t={t} />}

        {/* back / continue navigation, hidden on success screen */}
        {step < 4 && (
          <div className="flex justify-between gap-4 mt-10">
            {/* back button only shown from step 2 onwards */}
            {step > 1 ? (
              <button
                onClick={() => setStep(s => s - 1)}
                className={`${gfx.btnSecondary} flex items-center gap-2 px-5 h-11 text-[15px]`}
              >
                <ArrowLeft size={16} />
                {t('booking_back')}
              </button>
            ) : (
              <span />
            )}

            {/* disabled until the current step's yup schema passes */}
            <button
              onClick={handleContinue}
              disabled={!canContinue || formik.isSubmitting}
              className={`${gfx.btnPrimary} flex items-center gap-2 px-7 h-11 text-[15px]
                ${!canContinue || formik.isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {formik.isSubmitting
                ? t('booking_submitting')
                : step === 3
                  ? t('booking_send_request')
                  : t('booking_continue')}
              {!formik.isSubmitting && <ArrowRight size={16} />}
            </button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}
