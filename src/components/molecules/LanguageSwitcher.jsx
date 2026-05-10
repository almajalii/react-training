import { useTranslation } from 'react-i18next';

export default function LanguageSwitcher({ className = '' }) {
  const { i18n } = useTranslation();
  const isAR = i18n.language === 'ar';

  return (
    <button
      onClick={() => i18n.changeLanguage(isAR ? 'en' : 'ar')}
      aria-label="Switch language"
      className={`text-sm font-semibold text-muted hover:text-ink px-2.5 py-1.5 rounded-lg hover:bg-page-2 transition-colors duration-150 ${className}`}
    >
      {isAR ? 'EN' : 'ع'}
    </button>
  );
}