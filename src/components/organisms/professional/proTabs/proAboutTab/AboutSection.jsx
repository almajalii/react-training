import { useTranslation } from 'react-i18next';

export default function AboutSection({ bio }) {
  const { t } = useTranslation();
  //empty state
  if (!bio) return <p className="text-ink-soft text-[15.5px] leading-relaxed">{t('pro_no_bio')}</p>;
  //success state
  return (
    <div>
      <h2 className="text-[22px] font-bold text-ink tracking-tight mb-4">{t('pro_about_me')}</h2>
      <p className="text-ink-soft text-[15.5px] leading-relaxed">{bio}</p>
    </div>
  );
}
