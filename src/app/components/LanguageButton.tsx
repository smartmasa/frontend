"use client";

import { useState } from 'react';
import Image from 'next/image';
import { XMarkIcon } from '@heroicons/react/24/solid';
import LanguageTab from './LanguageTab';
import { usePathname, useRouter } from 'next/navigation';
import { Language, languages, useTranslation } from '@/utils/i18n';

const languageNames: Record<Language, string> = {
  az: 'Azerbaijani',
  ru: 'Russian',
  tr: 'Turkish',
  en: 'English',
};

export default function LanguageButton() {
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);
  const { currentLanguage } = useTranslation();
  const pathname = usePathname();
  const router = useRouter();

  const handleLanguageChange = (language: Language) => {
    const segments = pathname.split('/');
    segments[1] = language;
    router.push(segments.join('/'));
    setIsLanguageModalOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsLanguageModalOpen(true)}
        className="flex items-center hover:bg-gray-50 rounded-lg"
      >
        <Image 
          src={`/static/flags/${currentLanguage}.svg`}
          alt={`${languageNames[currentLanguage]} flag`}
          width={24}
          height={24}
          className="rounded-full"
        />
      </button>

      {/* Language Selection Modal */}
      {isLanguageModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-secondary-50 rounded-2xl w-full max-w-md">
            <div className="p-4 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-secondary-500">Select language</h2>
              <button
                onClick={() => setIsLanguageModalOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <XMarkIcon className="w-6 h-6 text-gray-500" />
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4">
                {languages.map((code) => (
                  <LanguageTab
                    key={code}
                    code={code}
                    name={languageNames[code]}
                    isSelected={currentLanguage === code}
                    onClick={() => handleLanguageChange(code)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
} 