import { useParams } from 'next/navigation';

export const languages = ['az', 'ru', 'tr', 'en'] as const;
export type Language = typeof languages[number];

export function useTranslation() {
  const params = useParams();
  const lang = (params?.lang as Language) || 'az';

  const t = (key: string): string => {
    // Split the key by dots to access nested translations
    const keys = key.split('.');
    
    try {
      // Dynamic import of the translation file based on current locale
      const translations = require(`../locales/${lang}.json`);
      
      // Traverse the translations object using the key path
      return keys.reduce((obj, key) => obj[key], translations) || key;
    } catch (error) {
      // Return the key itself if translation is not found
      console.warn(`Translation not found for key: ${key} in locale: ${lang}`);
      return key;
    }
  };

  return {
    t,
    currentLanguage: lang,
  };
}