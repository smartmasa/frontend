'use client';

import { useEffect, useState } from 'react';
import { getTableOrders } from '@/services/orderService';
import { Order } from '@/types/order';
import { formatPrice } from '@/lib/formatters';
import { OrderItemCard } from '@/app/components/OrderItemCard';
import { HeaderWithBack } from '@/app/components/HeaderWithBack';
import { Button } from '@/app/components/Button';
import { useOrder } from '@/contexts/OrderContext';
import {useTranslations} from 'next-intl';
import LoadingSpinner from '@/app/components/LoadingSpinner';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';

export default function OrderStatusPage() {
  const { tableId } = useOrder();
  const [orders, setOrders] = useState<Order[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const t = useTranslations();
  const currentLocale = useLocale();

  useEffect(() => {
    if (!tableId) {
      return;
    }

    const fetchOrders = async () => {
      try {
        const response = await getTableOrders(tableId, currentLocale);
        setOrders(response.orders);
        setTotalPrice(response.totalPrice);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [tableId, currentLocale, t]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (orders.length === 0) {
    return <div className="flex justify-center items-center min-h-screen">{t('order_status.no_orders')}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <HeaderWithBack title={t('order_status.title')} />
      
      <div className="p-4 pb-32 space-y-4">
        {orders.map((order) => (
          <div key={order.orderId} className="space-y-4">
            {order.items.map((item) => (
              <OrderItemCard
                key={`${order.orderId}-${item.meal.id}`}
                name={item.meal.name}
                price={item.meal.price}
                quantity={item.quantity}
                imageUrl={item.meal.imageUrl}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Fixed bottom buttons */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white shadow-lg">
        <div className="max-w-xl mx-auto flex gap-3">
          <Link href={`/menu`} className="flex-1">
            <Button
              variant="secondary"
              className="w-full"
              text={t('order_status.new_order')}
            />
          </Link>
          <Link href={`#`} className="flex-1">
            <Button
              variant="primary"
              className="w-full"
            >
              <div className="flex justify-between items-center w-full">
                <span>{t('order_status.pay')}</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
} 