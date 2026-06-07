import { MapPin } from 'lucide-react';
import { TIME_SLOTS } from '../../../../constants/times';
import { useMemo } from 'react';

export default function BookingStep2({
  formik,
  selectDate,
  selectTime,
  selectAddress,
  savedAddresses,
  dateSlots,
  isDayUnavailable,
  isTimeUnavailable,
  t,
  i18n,
  navigate,
}) {
  return (
    <>
      <h2 className="text-[22px] font-bold text-ink tracking-tight mb-1">{t('booking_step2_title')}</h2>
      <p className="text-muted text-[14.5px] mb-6">{t('booking_step2_subtitle')}</p>

      {/* 7-day date cards, grayed out if the pro doesn't work that day */}
      <div className="mb-7">
        <label className="block text-[13px] font-semibold text-ink-soft mb-3">{t('booking_date_label')}</label>
        <div className="grid grid-cols-7 gap-2">
          {dateSlots.map((d) => {
            const active = formik.values.scheduledDate === d.iso;
            const unavailable = isDayUnavailable(d);

            return (
              <button
                key={d.iso}
                onClick={() => !unavailable && selectDate(d)}
                disabled={unavailable}
                aria-disabled={unavailable}
                className={`py-3.5 px-1 rounded-[14px] border-[1.5px] text-center transition-all
                  ${
                    unavailable
                      ? 'border-line bg-surface opacity-35 cursor-not-allowed'
                      : active
                        ? 'border-brand bg-brand-tint'
                        : 'border-line bg-surface hover:border-brand-soft'
                  }`}
              >
                <div
                  className={`text-[11px] font-bold uppercase tracking-wider
                  ${active && !unavailable ? 'text-brand' : 'text-muted'}`}
                >
                  {d.label}
                </div>
                <div
                  className={`text-[22px] font-extrabold mt-0.5 tracking-tight
                  ${active && !unavailable ? 'text-brand' : 'text-ink'}`}
                >
                  {d.num}
                </div>
                <div className={`text-[11px] mt-0.5 ${active && !unavailable ? 'text-brand' : 'text-muted'}`}>
                  {d.month}
                </div>
              </button>
            );
          })}
        </div>
        {formik.touched.scheduledDate && formik.errors.scheduledDate && (
          <p className="mt-2 text-sm text-red-500">{formik.errors.scheduledDate}</p>
        )}
      </div>

      {/* time slots, hidden until a date is selected */}
      <div className="mb-7">
        <label className="block text-[13px] font-semibold text-ink-soft mb-3">{t('booking_time_label')}</label>

        {!formik.values.scheduledDate ? (
          <p className="text-[13.5px] text-muted italic">{t('booking_time_pick_date_first')}</p>
        ) : (
          <div className="grid grid-cols-4 gap-2">
            {TIME_SLOTS.map((slot) => {
              const active = formik.values.scheduledTime === slot;
              const unavailable = isTimeUnavailable(slot);

              return (
                <button
                  key={slot}
                  onClick={() => !unavailable && selectTime(slot)}
                  disabled={unavailable}
                  aria-disabled={unavailable}
                  className={`py-3 rounded-[14px] border-[1.5px] text-[14px] font-mono
                    font-medium text-center transition-all
                    ${
                      unavailable
                        ? 'border-line bg-surface text-faint opacity-35 cursor-not-allowed line-through'
                        : active
                          ? 'border-brand bg-brand-tint text-brand font-semibold'
                          : 'border-line bg-surface text-ink hover:border-brand-soft'
                    }`}
                >
                  {slot}
                </button>
              );
            })}
          </div>
        )}
        {formik.touched.scheduledTime && formik.errors.scheduledTime && (
          <p className="mt-2 text-sm text-red-500">{formik.errors.scheduledTime}</p>
        )}
      </div>

      {/* saved address cards — required, no manual input */}
      <div>
        <label className="block text-[13px] font-semibold text-ink-soft mb-3">{t('booking_address_label')}</label>

        {savedAddresses.length > 0 ? (
          <div className="flex flex-col gap-2.5">
            {savedAddresses.map((addr) => {
              const active = formik.values.addressId === addr.id;
              const detail = [
                addr.street,
                addr.buildingName,
                addr.apartmentNumber ? `Apt ${addr.apartmentNumber}` : null,
              ]
                .filter(Boolean)
                .join(', ');

              return (
                <div
                  key={addr.id}
                  onClick={() => selectAddress(addr)}
                  className={`flex gap-3.5 items-start px-5 py-4 rounded-[14px] border-[1.5px]
                    cursor-pointer transition-all
                    ${active ? 'border-brand bg-brand-tint' : 'border-line bg-surface hover:border-brand-soft'}`}
                >
                  <MapPin size={20} className="shrink-0 mt-0.5 text-brand" />
                  <div className="flex-1">
                    <div className="font-semibold text-[15px] text-ink">{addr.area}</div>
                    <div className="text-[13.5px] text-muted mt-0.5">{detail}</div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          // no saved addresses — takes the user to add one first
          <p className="text-[13.5px] text-muted italic">
            {t('booking_address_none')}{' '}
            <button onClick={() => navigate('/my-addresses')} className="text-brand font-semibold hover:underline">
              {t('booking_address_add_one')}
            </button>
          </p>
        )}

        {formik.touched.address && formik.errors.address && (
          <p className="mt-2 text-sm text-red-500">{formik.errors.address}</p>
        )}
      </div>
    </>
  );
}
