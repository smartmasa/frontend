'use client';

import { useState } from 'react';
import Image from 'next/image';
import { XMarkIcon } from '@heroicons/react/24/solid';
import LanguageTab from './LanguageTab';
import { useLocale } from 'next-intl';
import { Link, usePathname, routing } from '@/i18n/routing';

const { locales: languages } = routing;

const languageNames: Record<string, string> = {
  az: 'Azerbaijani',
  ru: 'Russian',
  tr: 'Turkish',
  en: 'English',
};

export default function LanguageButton() {
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);
  const currentLocale = useLocale();
  const pathname = usePathname();

  return (
    <>
      <button
        onClick={() => setIsLanguageModalOpen(true)}
        className="flex items-center hover:bg-gray-50 rounded-lg"
      >
        <Image 
          src={`/static/flags/${currentLocale}.svg`}
          alt={`${languageNames[currentLocale]} flag`}
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
                  <Link
                    key={code}
                    href={pathname}
                    locale={code}
                  >
                    <LanguageTab
                      code={code}
                      name={languageNames[code]}
                      isSelected={currentLocale === code}
                    />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}