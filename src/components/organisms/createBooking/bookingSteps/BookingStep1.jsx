import { Image, X, Plus } from 'lucide-react';
import { useRef } from 'react';
import { gfx } from '../../../../styles/themeColors';

export default function BookingStep1({
  pro,
  form,
  set,
  selectService,
  addImages,
  removeImage,
  t,
  i18n,
}) {
  const isRTL = i18n.language === 'ar';
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    if (e.target.files?.length) {
      addImages(e.target.files);
      // Reset input so picking the same file again still fires onChange
      e.target.value = '';
    }
  };

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

      {/* Photo upload */}
      <div>
        <label className={gfx.label}>{t('booking_photo_label')}</label>

        {/* Hidden file input — accepts images, allows multi-select */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleFileChange}
        />

        {/* Preview strip + add button */}
        {form.images.length > 0 ? (
          <div className="flex gap-2.5 flex-wrap">
            {form.images.map((img, i) => (
              <div
                key={img.uri}
                className="relative w-20 h-20 rounded-xl overflow-hidden border border-line shrink-0"
              >
                <img src={img.uri} alt="" className="w-full h-full object-cover" />
                <button
                  onClick={() => removeImage(i)}
                  className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/60 flex items-center
                    justify-center text-white transition-opacity hover:bg-black/80"
                  aria-label="Remove photo"
                >
                  <X size={11} strokeWidth={2.5} />
                </button>
              </div>
            ))}

            {/* Add more — only show if under the 5-photo cap */}
            {form.images.length < 5 && (
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-20 h-20 rounded-xl border-[1.5px] border-dashed border-line
                  bg-surface flex flex-col items-center justify-center gap-1 text-muted
                  hover:border-brand-soft transition-colors shrink-0"
                aria-label="Add photo"
              >
                <Plus size={18} strokeWidth={1.8} />
                <span className="text-[11px]">{t('booking_photo_add')}</span>
              </button>
            )}
          </div>
        ) : (
          /* Empty state — tap the whole zone to open the picker */
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full border-[1.5px] border-dashed border-line rounded-[14px] p-7 text-center
              bg-surface text-muted hover:border-brand-soft transition-colors"
          >
            <Image size={22} strokeWidth={1.6} className="mx-auto mb-2" />
            <div className="text-[14px]">
              {t('booking_photo_hint')}{' '}
              <span className="font-semibold text-brand">{t('booking_photo_browse')}</span>
            </div>
            <div className="text-[12px] mt-1 text-faint">
              {t('booking_photo_max') ?? 'Up to 5 photos'}
            </div>
          </button>
        )}
      </div>
    </>
  );
}
