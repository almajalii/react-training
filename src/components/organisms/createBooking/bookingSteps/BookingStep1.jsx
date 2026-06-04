import { Image } from 'lucide-react';
import { gfx } from '../../../../styles/themeColors';

export default function BookingStep1({ pro, form, set, selectService, t, i18n }) {
  const isRTL = i18n.language === 'ar';

  return (
    <>
      <h2 className="text-[22px] font-bold text-ink tracking-tight mb-1">
        {t('booking_step1_title')}
      </h2>
      <p className="text-muted text-[14.5px] mb-6">
        {t('booking_step1_subtitle', { name: pro.name.split(' ')[0] })}
      </p>

      {/* Service selection grid */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {pro.services?.map((svc) => {
          const active = form.serviceName === svc.name;
          const priceStr =
            svc.minPrice != null && svc.maxPrice != null
              ? `${svc.minPrice} – ${svc.maxPrice} JD`
              : svc.minPrice != null
                ? `${t('browse_from')} ${svc.minPrice} JD`
                : t('pro_tbd');

          return (
            <button
              key={svc.serviceId}
              onClick={() => selectService(svc)}
              className={`flex items-center justify-between px-5 py-4.5 rounded-[14px] border-[1.5px] text-left transition-all
                ${
                  active
                    ? 'border-brand bg-brand-tint'
                    : 'border-line bg-surface hover:border-brand-soft'
                }`}
            >
              <div className="font-semibold text-[15.5px] text-ink">
                {isRTL && svc.nameAr ? svc.nameAr : svc.name}
              </div>
              <div
                className={`font-mono text-[13px] font-semibold shrink-0 ml-3
                ${active ? 'text-brand' : 'text-ok'}`}
              >
                {priceStr}
              </div>
            </button>
          );
        })}
      </div>

      {/* Description */}
      <div className="mb-5">
        <label className={gfx.label}>{t('booking_description_label')}</label>
        <textarea
          rows={4}
          placeholder={t('booking_description_placeholder')}
          value={form.description}
          onChange={(e) => set('description', e.target.value)}
          className="w-full px-4 py-3 rounded-xl border-[1.5px] border-line bg-surface text-ink
            text-[15px] placeholder:text-faint focus:border-brand focus:ring-2 focus:ring-focus
            outline-none transition-all resize-none"
        />
        {form.description.trim().length > 0 && form.description.trim().length < 6 && (
          <p className="mt-1 text-sm text-red-500">{t('booking_val_description_min')}</p>
        )}
      </div>

      {/* Photo upload — UI only, wired in v2 */}
      <div>
        <label className={gfx.label}>{t('booking_photo_label')}</label>
        <div
          className="border-[1.5px] border-dashed border-line rounded-[14px] p-7 text-center
          bg-surface text-muted cursor-pointer hover:border-brand-soft transition-colors"
        >
          <Image size={22} strokeWidth={1.6} className="mx-auto mb-2" />
          <div className="text-[14px]">
            {t('booking_photo_hint')}{' '}
            <span className="font-semibold text-brand">{t('booking_photo_browse')}</span>
          </div>
        </div>
      </div>
    </>
  );
}
