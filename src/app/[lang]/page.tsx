'use client';

import HeaderWithLogo from '@/app/components/HeaderWithLogo';
import { useTranslation } from '@/utils/i18n';

export default function Home() {
  const { t } = useTranslation();
  
  return (
    <main className="min-h-screen bg-gray-50">
      <HeaderWithLogo />
      
      <div className="container mx-auto max-w-7xl px-4 py-8">
        <div className="flex flex-col items-center">
          <h1 className="text-xl font-bold text-secondary-500">{t('home.welcome')}</h1>
          <p className="text-base text-secondary-400 mb-8">{t('home.scan_instruction')}</p>
        </div>
      </div>
    </main>
  );
}
