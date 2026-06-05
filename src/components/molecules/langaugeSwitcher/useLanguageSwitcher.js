import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

export function useLanguageSwitcher() {
  const { i18n } = useTranslation();

  const isAR = useMemo(() => i18n.language === 'ar', [i18n.language]);

  const toggle = useCallback(() => {
    i18n.changeLanguage(isAR ? 'en' : 'ar');
  }, [i18n, isAR]);

  return { isAR, toggle };
}
