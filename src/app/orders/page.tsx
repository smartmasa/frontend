"use client";

import { useRouter } from 'next/navigation';
import { Button } from '@/app/components/Button';
import { OrderCard } from '@/app/components/OrderCard';
import { useOrder } from '@/contexts/OrderContext';
import { formatPrice } from '@/lib/formatters';
import { useState } from 'react';
import { OrderConfirmationModal } from '@/app/components/OrderConfirmationModal';
import { HeaderWithBack } from '@/app/components/HeaderWithBack';

export default function OrdersPage() {
  const router = useRouter();
  const { orderItems, updateQuantity } = useOrder();
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  const calculateTotal = () => {
    return orderItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // Get currency from the first order item, or fallback to a default
  const currency = orderItems[0]?.currency

  const handleFinish = () => {
    setIsConfirmationOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <HeaderWithBack title="My orders" />

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
            text="Edit"
          />
          <Button
            variant="primary"
            className="flex-1 flex justify-between"
            onClick={handleFinish}
          >
            <span>Finish</span>
            <span>{formatPrice(calculateTotal(), currency)}</span>
          </Button>
        </div>
      </div>

      <OrderConfirmationModal
        isOpen={isConfirmationOpen}
        onClose={() => setIsConfirmationOpen(false)}
        onViewOrder={() => {
          setIsConfirmationOpen(false);
          // Here you would typically navigate to an order tracking page
          // For now, we'll just close the modal
        }}
      />
    </div>
  );
} 