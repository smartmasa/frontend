import { useParams } from 'next/navigation';
import { useCallback, useMemo } from 'react';

export const languages = ['az', 'ru', 'tr', 'en'] as const;
export type Language = typeof languages[number];

export function useTranslation() {
  const params = useParams();
  const lang = (params?.lang as Language) || process.env.NEXT_PUBLIC_DEFAULT_LANGUAGE as Language;

  // Memoize the translations object
  const translations = useMemo(() => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      return require(`../locales/${lang}.json`);
    } catch (error) {
      console.error(`Failed to load translations for language: ${lang}`, error);
      return {};
    }
  }, [lang]);

  // Memoize the translation function
  const t = useCallback((key: string, params?: Record<string, string | number | boolean>): string => {
    // Split the key by dots to access nested translations
    const keys = key.split('.');
    
    try {
      // Use the memoized translations
      let text = keys.reduce((obj, key) => obj[key], translations) || key;
      
      // Replace parameters in the text
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          text = text.replace(new RegExp(`{{${key}}}`, 'g'), String(value));
        });
      }
      
      return text;
    } catch (error) {
      // Return the key itself if translation is not found
      console.warn(`Translation not found for key: ${key} in locale: ${lang}`);
      console.error(error);
      return key;
    }
  }, [translations]);

  return {
    t,
    currentLanguage: lang,
  };
}