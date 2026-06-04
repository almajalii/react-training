import { useTranslation } from 'react-i18next';

export default function AboutSection({ bio }) {
  const { t } = useTranslation();

  if (!bio) return null;

  return (
    <div>
      <h2 className="text-[22px] font-bold text-ink tracking-tight mb-4">{t('pro_about_me')}</h2>
      <p className="text-ink-soft text-[15.5px] leading-relaxed">{bio}</p>
    </div>
  );
}
