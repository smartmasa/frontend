import { OrderItem } from '@/types/order';

interface PlaceOrderRequest {
  items: {
    id: string;
    quantity: number;
  }[];
  totalPrice: {
    amount: number;
    currency: string;
  };
}

interface PlaceOrderResponse {
  orderId: string;
  status: 'preparing' | 'ready' | 'paid';
  total: {
    amount: number;
    currency: string;
  };
  estimatedTimeInMin: number;
}

export const placeOrder = async (orderItems: OrderItem[]): Promise<PlaceOrderResponse> => {
  const totalPrice = orderItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  
  const requestBody: PlaceOrderRequest = {
    items: orderItems.map(item => ({
      id: item.id,
      quantity: item.quantity
    })),
    totalPrice: {
      amount: totalPrice,
      currency: orderItems[0]?.currency || 'AZN'
    }
  };

  console.log(requestBody);
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/order`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to place order');
  }

  return response.json();
} 