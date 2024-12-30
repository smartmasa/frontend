"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/app/components/Button';
import { OrderCard } from '@/app/components/OrderCard';
import LanguageButton, { Language } from '@/app/components/LanguageButton';
import { useOrder } from '@/contexts/OrderContext';

export default function OrdersPage() {
  const router = useRouter();
  const { orderItems, updateQuantity } = useOrder();
  const [selectedLanguage, setSelectedLanguage] = useState<Language>({ code: 'az', name: 'Azerbaijani' });

  const calculateTotal = () => {
    return orderItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button 
              onClick={() => router.back()}
              className="mr-4 text-secondary-500"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h1 className="text-xl font-semibold text-secondary-500">My orders</h1>
          </div>
          <LanguageButton
            selectedLanguage={selectedLanguage}
            onLanguageChange={setSelectedLanguage}
          />
        </div>
      </div>

      {/* Order Items */}
      <div className="p-4 space-y-4">
        {orderItems.map((item) => (
          <OrderCard
            key={item.id}
            item={item}
            onQuantityChange={(id, quantity) => updateQuantity(id, quantity)}
          />
        ))}
      </div>

      {/* Bottom Buttons */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white shadow-lg">
        <div className="max-w-7xl mx-auto flex gap-3">
          <Button
            variant="secondary"
            className="flex-1"
            onClick={() => router.push('/menu')}
          >
            Edit order
          </Button>
          <Button
            variant="primary"
            className="flex-1"
          >
            Pay ${calculateTotal().toFixed(2)}
          </Button>
        </div>
      </div>
    </div>
  );
} 