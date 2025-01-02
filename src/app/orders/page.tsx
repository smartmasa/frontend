"use client";

import { useRouter } from 'next/navigation';
import { Button } from '@/app/components/Button';
import { OrderCard } from '@/app/components/OrderCard';
import { useOrder } from '@/contexts/OrderContext';
import { formatPrice } from '@/lib/formatters';
import { calculateTotal } from '@/lib/utils';
import { useState } from 'react';
import { OrderConfirmationModal } from '@/app/components/OrderConfirmationModal';
import { HeaderWithBack } from '@/app/components/HeaderWithBack';
import { placeOrder } from '@/services/orderService';

export default function OrdersPage() {
  const router = useRouter();
  const { orderItems, updateQuantity, clearOrder } = useOrder();
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFinish = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await placeOrder(orderItems);
      
      // Clear the order after successful placement
      clearOrder();
      
      // Show confirmation modal
      setIsConfirmationOpen(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to place order');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <HeaderWithBack title="My orders" />

      {error && (
        <div className="p-4 bg-red-100 text-red-700 mb-4">
          {error}
        </div>
      )}

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
            disabled={isLoading}
          />
          <Button
            variant="primary"
            className="flex-1 flex justify-between"
            onClick={handleFinish}
            disabled={isLoading || orderItems.length === 0}
          >
            <span>{isLoading ? 'Placing Order' : 'Finish'}</span>
            <span>{isLoading ? '...' : formatPrice(calculateTotal(orderItems))}</span>
          </Button>
        </div>
      </div>

      <OrderConfirmationModal
        isOpen={isConfirmationOpen}
        onClose={() => setIsConfirmationOpen(false)}
        onViewOrder={() => {
          setIsConfirmationOpen(false);
          // Here you would typically navigate to an order tracking page
          router.push('/order-status');
        }}
      />
    </div>
  );
} 