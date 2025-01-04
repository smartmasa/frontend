'use client';

import Image from 'next/image';
import Link from 'next/link';
import HeaderWithLogo from '@/app/components/HeaderWithLogo';
import { useOrder } from '@/contexts/OrderContext';
import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useTranslation } from '@/utils/i18n';

export default function TablePage() {
  const { setTableId } = useOrder();
  const params = useParams();
  const tableId = params?.tableId as string;
  const { t } = useTranslation();

  useEffect(() => {
    if (tableId) {
      setTableId(tableId);
    }
  }, [tableId, setTableId]);

  return (
    <main className="min-h-screen bg-gray-50">
      <HeaderWithLogo />
      
      <div className="container mx-auto max-w-7xl px-4 py-8">
        <div className="flex flex-col items-center">
          <h1 className="text-xl font-bold text-secondary-500">{t('table.help_question')}</h1>
          <p className="text-base text-secondary-400 mb-8">{t('table.choose_option')}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl place-items-center">
            {/* Order now card */}
            <Link 
              href={`/${params.lang}/menu`}
              className="bg-white w-72 rounded-3xl p-8 flex flex-col items-center justify-center gap-6 shadow-sm hover:shadow-md transition-all border border-secondary-200 hover:border-2 hover:border-primary-500"
            >
              <Image
                src="/static/order.svg"
                alt={t('table.order_now')}
                width={80}
                height={80}
                priority
              />
              <span className="text-xl font-semibold text-secondary-500">{t('table.order_now')}</span>
            </Link>

            {/* Call waiter card */}
            <button 
              className="bg-white w-72 rounded-3xl py-8 flex flex-col items-center justify-center gap-6 shadow-sm hover:shadow-md transition-shadow border border-secondary-200"
            >
              <Image
                src="/static/waiter.svg"
                alt={t('table.call_waiter')}
                width={80}
                height={80}
              />
              <span className="text-xl font-semibold text-secondary-500">{t('table.call_waiter')}</span>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
} 