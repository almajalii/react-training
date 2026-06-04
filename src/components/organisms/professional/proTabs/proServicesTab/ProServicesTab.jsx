import { useTranslation } from 'react-i18next';

export default function ProServicesTab({ services }) {
  const { t } = useTranslation();

  if (!services?.length) return null;

  return (
    <div>
      <h2 className="text-[22px] font-bold text-ink tracking-tight mb-4">
        {t('pro_services_offered')}
      </h2>
      <div className="flex flex-col divide-y divide-line">
        {services.map(({ serviceId, name, minPrice, maxPrice }) => (
          <div key={serviceId} className="flex items-center justify-between py-4">
            <p className="font-semibold text-ink text-[15.5px]">{name}</p>
            <p className="font-mono font-semibold text-ok text-[14px] shrink-0 ml-4">
              {minPrice != null && maxPrice != null
                ? `${minPrice} – ${maxPrice} JD`
                : minPrice != null
                  ? `${t('browse_from')} ${minPrice} JD`
                  : t('pro_tbd')}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
