"use client";

import { createContext, useContext, useState, ReactNode } from 'react';

export interface Language {
  code: string;
  name: string;
}

export const languages: Language[] = [
  { code: 'az', name: 'Azerbaijani' },
  { code: 'ru', name: 'Russian' },
  { code: 'tr', name: 'Turkish' },
  { code: 'uk', name: 'English' },
];

interface LanguageContextType {
  selectedLanguage: Language;
  setLanguage: (language: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(languages[0]);

  return (
    <LanguageContext.Provider 
      value={{ 
        selectedLanguage, 
        setLanguage: setSelectedLanguage 
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
} 