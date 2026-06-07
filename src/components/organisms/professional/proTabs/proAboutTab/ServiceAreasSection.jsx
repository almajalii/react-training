import { useTranslation } from 'react-i18next';
import Chip from '../../../../atoms/chip/Chip';
import { useMemo } from 'react';
export default function ServiceAreasSection({ serviceAreas }) {
  const { t, i18n } = useTranslation();
  const isAr = useMemo(() => i18n.language === 'ar', [i18n.language]);

  if (!serviceAreas || serviceAreas.length === 0) return null;

  return (
    <div>
      <h2 className="text-[22px] font-bold text-ink tracking-tight mb-4">{t('pro_service_areas')}</h2>
      <div className="flex flex-wrap gap-2">
        {serviceAreas.map((area) => (
          <Chip key={area.id} active={false}>
            {isAr && area.nameAr ? area.nameAr : area.name}
          </Chip>
        ))}
      </div>
    </div>
  );
}
