"use client";

import { useState } from 'react';
import Image from 'next/image';
import { XMarkIcon } from '@heroicons/react/24/solid';
import LanguageTab from './LanguageTab';

interface Language {
  code: string;
  name: string;
}

interface LanguageButtonProps {
  selectedLanguage: Language;
  onLanguageChange: (language: Language) => void;
}

const languages: Language[] = [
  { code: 'az', name: 'Azerbaijani' },
  { code: 'ru', name: 'Russian' },
  { code: 'tr', name: 'Turkish' },
  { code: 'uk', name: 'English' },
];

export default function LanguageButton({ selectedLanguage, onLanguageChange }: LanguageButtonProps) {
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsLanguageModalOpen(true)}
        className="flex items-center hover:bg-gray-50 rounded-lg"
      >
        <Image 
          src={`/flags/${selectedLanguage.code}.svg`}
          alt={`${selectedLanguage.name} flag`}
          width={24}
          height={24}
          className="rounded-full"
        />
      </button>

      {/* Language Selection Modal */}
      {isLanguageModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-secondary-50 rounded-2xl w-full max-w-md">
            <div className="p-4 flex justify-between items-center border-b">
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
                {languages.map((language) => (
                  <LanguageTab
                    key={language.code}
                    code={language.code}
                    name={language.name}
                    isSelected={selectedLanguage.code === language.code}
                    onClick={() => {
                      onLanguageChange(language);
                      setIsLanguageModalOpen(false);
                    }}
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

export type { Language }; 