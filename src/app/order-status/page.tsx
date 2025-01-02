'use client';

import { useEffect, useState } from 'react';
import { getTableOrders } from '@/services/orderService';
import { formatPrice } from '@/lib/formatters';
import { OrderItemCard } from '@/app/components/OrderItemCard';
import HeaderWithLogo from '@/app/components/HeaderWithLogo';
import { Button } from '@/app/components/Button';
import { useRouter } from 'next/navigation';

interface OrderStatusItem {
  meal: {
    id: string;
    name: string;
    price: {
      amount: number;
      currency: string;
    };
    imageUrl: string;
  };
  quantity: number;
}

interface OrderStatus {
  orderId: string;
  items: OrderStatusItem[];
  status: 'preparing' | 'ready' | 'paid';
  total: {
    amount: number;
    currency: string;
  };
  estimatedTimeInMin: number;
  createdAt: string;
}

export default function OrderStatusPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<OrderStatus[]>([]);
  const [totalPrice, setTotalPrice] = useState<{ amount: number; currency: string }>({ amount: 0, currency: 'AZN' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const tableId = '1'; // Mocked table ID
        const response = await getTableOrders(tableId);
        setOrders(response.orders);
        setTotalPrice(response.totalPrice);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center min-h-screen text-red-500">{error}</div>;
  }

  if (orders.length === 0) {
    return <div className="flex justify-center items-center min-h-screen">No orders found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <HeaderWithLogo />
      
      <div className="p-4 space-y-4">
        {orders.map((order) => (
          <div key={order.orderId} className="space-y-4">
            {order.items.map((item, index) => (
              <OrderItemCard
                key={`${order.orderId}-${index}`}
                name={item.meal.name}
                price={item.meal.price.amount}
                quantity={item.quantity}
                imageUrl={item.meal.imageUrl}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Fixed bottom buttons */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white shadow-lg">
        <div className="max-w-7xl mx-auto flex gap-3">
          <Button
            variant="secondary"
            className="flex-1"
            onClick={() => router.push('/menu')}
            text="New order"
          />
          <Button
            variant="primary"
            className="flex-1 flex justify-between"
            onClick={() => {}}
          >
            <div className="flex justify-between items-center w-full">
              <span>Pay</span>
              <span>{formatPrice(totalPrice.amount)}</span>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
} 