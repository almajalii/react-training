import { useTranslation } from 'react-i18next';
import Chip from '../../../../atoms/chip/Chip';
export default function ServiceAreasSection({ serviceAreas }) {
  const { t } = useTranslation();

  if (!serviceAreas || serviceAreas?.length === 0) return null;
  return (
    <div>
      <h2 className="text-[22px] font-bold text-ink tracking-tight mb-4">
        {t('pro_service_areas')}
      </h2>
      <div className="flex flex-wrap gap-2">
        {serviceAreas.map((area) => (
          <Chip key={area.id} active={false}>
            {area.name}
          </Chip>
        ))}
      </div>
    </div>
  );
}
