import { useTranslation } from 'react-i18next';

export default function WorkingHoursSection({ workingHours }) {
  const { t } = useTranslation();

  if (!workingHours?.length) return null;

  return (
    <div>
      <h2 className="text-[22px] font-bold text-ink tracking-tight mb-4">
        {t('pro_working_hours')}
      </h2>
      <div className="flex flex-col divide-y divide-line">
        {workingHours.map(({ day, openTime, closeTime }) => (
          <div key={day} className="flex justify-between py-3 text-[14.5px]">
            <span className="text-muted">{day}</span>
            <span className="font-mono text-ink">
              {openTime} – {closeTime}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
