'use client';

import Image from 'next/image';
import Link from 'next/link';
import HeaderWithLogo from '@/app/components/HeaderWithLogo';
import { useOrder } from '@/contexts/OrderContext';
import { useEffect } from 'react';
import { useParams } from 'next/navigation';

export default function TablePage() {
  const { setTableId } = useOrder();
  const params = useParams();
  const tableId = params?.tableId as string;

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
          <h1 className="text-xl font-bold text-secondary-500">How can we help?</h1>
          <p className="text-base text-secondary-400 mb-8">Choose your preferred option</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl place-items-center">
            {/* Order now card */}
            <Link 
              href="/menu"
              className="bg-white w-72 rounded-3xl p-8 flex flex-col items-center justify-center gap-6 shadow-sm hover:shadow-md transition-all border border-secondary-200 hover:border-2 hover:border-primary-500"
            >
              <Image
                src="/order.svg"
                alt="Order food"
                width={80}
                height={80}
                priority
              />
              <span className="text-xl font-semibold text-secondary-500">Order now</span>
            </Link>

            {/* Call waiter card */}
            <button 
              className="bg-white w-72 rounded-3xl py-8 flex flex-col items-center justify-center gap-6 shadow-sm hover:shadow-md transition-shadow border border-secondary-200"
            >
              <Image
                src="/waiter.svg"
                alt="Call waiter"
                width={80}
                height={80}
              />
              <span className="text-xl font-semibold text-secondary-500">Call waiter</span>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
} 