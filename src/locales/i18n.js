import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from './en/translation.json';
import ar from './ar/translation.json';

i18n
    .use(LanguageDetector)//detects language from localStorage or browser settings
    .use(initReactI18next)//connects i18n to React
    .init({
        resources: {
            en: { translation: en }, //loads the en json
            ar: { translation: ar }, // loads the ar json
        },
        fallbackLng: 'en', //use English if language detection fails
        detection: {
            order: ['localStorage', 'navigator'], //where to look for saved langauges
            caches: ['localStorage']//where to save the choice
        },
        react: {
            useSuspense: false,
        },
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;