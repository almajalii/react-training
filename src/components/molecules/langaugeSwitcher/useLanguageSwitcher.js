import { useTranslation } from 'react-i18next';

export function useLanguageSwitcher() {
    const { i18n } = useTranslation();
    const isAR = i18n.language === 'ar';

    const toggle = () => i18n.changeLanguage(isAR ? 'en' : 'ar');

    return { isAR, toggle };
}