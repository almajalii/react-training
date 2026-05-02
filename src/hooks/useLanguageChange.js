// src/hooks/useLanguageChange.js
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';

export function useLanguageChange() {
  const { i18n, t } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);

  useEffect(() => {
    const handleLanguageChange = (lng) => {
      console.log('Language changed to:', lng);
      setCurrentLanguage(lng);
    };

    i18n.on('languageChanged', handleLanguageChange);
    
    return () => i18n.off('languageChanged', handleLanguageChange);
  }, [i18n]);

  const changeLanguage = (lng) => {
    console.log('Changing language to:', lng);
    i18n.changeLanguage(lng);
  };

  return {
    currentLanguage,
    isRTL: currentLanguage === 'ar',
    t,
    i18n,
    changeLanguage,
  };
}