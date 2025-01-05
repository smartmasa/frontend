"use client";

import { useRouter } from 'next/navigation';
import { OrderCard } from '@/app/components/OrderCard';
import { useOrder } from '@/contexts/OrderContext';
import { calculateTotal } from '@/lib/utils';
import { useState, useEffect } from 'react';
import { OrderConfirmationModal } from '@/app/components/OrderConfirmationModal';
import { HeaderWithBack } from '@/app/components/HeaderWithBack';
import { placeOrder } from '@/services/orderService';
import { useTranslation } from '@/utils/i18n';
import LoadingSpinner from '@/app/components/LoadingSpinner';
import { OrderSummaryButton } from '@/app/components/OrderSummaryButton';

export default function OrdersPage() {
  const router = useRouter();
  const { orderItems, updateQuantity, clearOrder, tableId } = useOrder();
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { t } = useTranslation();
  const [estimatedTime, setEstimatedTime] = useState<number>(0);

  let orderPlaced: boolean = false;
  useEffect(() => {
    if (!orderPlaced && orderItems.length === 0 && !isConfirmationOpen) {
      router.push('/menu');
    }
  }, [orderItems]);

  const handleFinish = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await placeOrder(orderItems, tableId);
      setEstimatedTime(response.estimatedTimeInMin);
      orderPlaced = true;
      // Clear the order after successful placement
      clearOrder();
      
      // Show confirmation modal
      setIsConfirmationOpen(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : t('orders.failed_to_place'));
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <HeaderWithBack title={t('order.my_orders')} />

      {error && (
        <div className="p-4 bg-red-100 text-red-700 mb-4">
          {error}
        </div>
      )}

      {/* Order Items */}
      <div className="p-4 space-y-4">
        {orderItems.map((item, index) => (
          <OrderCard
            key={`${item.mealId}-${index}`}
            item={item}
            onQuantityChange={(mealId, quantity) => updateQuantity(mealId, quantity)}
          />
        ))}
      </div>

      {/* Bottom Buttons */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white shadow-lg">
        <div className="max-w-7xl mx-auto">
          <OrderSummaryButton
            totalAmount={calculateTotal(orderItems).amount}
            totalQuantity={orderItems.reduce((sum, item) => sum + item.quantity, 0)}
            onClick={handleFinish}
            disabled={isLoading || orderItems.length === 0}
            isLoading={isLoading}
            buttonText={isLoading ? t('order.placing_order') : t('order.finish')}
          />
        </div>
      </div>

      <OrderConfirmationModal
        isOpen={isConfirmationOpen}
        onClose={() => setIsConfirmationOpen(false)}
        onViewOrder={() => {
          setIsConfirmationOpen(false);
          router.push('/order-status');
        }}
        estimatedTimeInMin={estimatedTime}
      />
    </div>
  );
} 