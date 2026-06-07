import { gfx } from '../../../../styles/themeColors';
import ProAvatar from '../../../atoms/proAvatar/ProAvatar';

export default function BookingStep3({ pro, formik, image, selectedDateLabel, initials, toneClass, t }) {
  // flat list of label/value pairs rendered as rows in the summary card
  const rows = [
    { label: t('booking_summary_service'), value: formik.values.serviceName },
    { label: t('booking_summary_date'), value: selectedDateLabel },
    { label: t('booking_summary_time'), value: formik.values.scheduledTime, mono: true },
    { label: t('booking_summary_address'), value: formik.values.address },
    { label: t('booking_summary_estimate'), value: formik.values.servicePrice, price: true },
  ];

  return (
    <>
      <h2 className="text-[22px] font-bold text-ink tracking-tight mb-1">{t('booking_step3_title')}</h2>
      <p className="text-muted text-[14.5px] mb-6">{t('booking_step3_subtitle')}</p>

      {/* pro info header + all booking field values */}
      <div className={`${gfx.card} p-7 mb-4`}>
        <div className="flex items-center gap-3.5 pb-4 border-b border-line mb-2">
          <ProAvatar name={pro.name} imageUrl={pro.profileImageUrl} index={0} size="md" />
          <div>
            <div className="font-bold text-[16px] text-ink">{pro.name}</div>
            <div className="text-[13px] text-muted">{pro.category}</div>
          </div>
        </div>

        {rows.map(({ label, value, mono, price }) => (
          <div key={label} className="flex justify-between py-3 border-b border-line last:border-0 text-[14.5px]">
            <span className="text-muted">{label}</span>
            <span className={`font-semibold text-ink ${mono ? 'font-mono' : ''} ${price ? 'text-ok font-mono' : ''}`}>
              {value || '—'}
            </span>
          </div>
        ))}
      </div>

      {/* problem description the user wrote in step 1 */}
      <div className={`${gfx.card} p-5 mb-4`}>
        <div className="text-[13px] font-semibold text-ink-soft mb-1.5">{t('booking_summary_description')}</div>
        <p className="text-[14.5px] text-ink-soft leading-relaxed m-0">{formik.values.description || '—'}</p>
      </div>

      {/* only rendered if the user attached a photo */}
      {image && (
        <div className={`${gfx.card} p-5`}>
          <div className="text-[13px] font-semibold text-ink-soft mb-3">{t('booking_summary_photos') ?? 'Photo'}</div>
          <img src={image.uri} alt="" className="w-20 h-20 rounded-xl object-cover border border-line" />
        </div>
      )}
    </>
  );
}
