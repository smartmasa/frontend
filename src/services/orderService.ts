import { OrderItem } from '@/types/order';

interface PlaceOrderRequest {
  tableId: string;
  items: {
    mealId: string;
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

interface OrdersResponse {
  orders: OrderStatus[];
  totalPrice: {
    amount: number;
    currency: string;
  };
}

export const placeOrder = async (orderItems: OrderItem[], tableId: string): Promise<PlaceOrderResponse> => {
  const totalPrice = orderItems.reduce((total, item) => total + (item.price.amount * item.quantity), 0);
  
  const requestBody: PlaceOrderRequest = {
    tableId,
    items: orderItems.map(item => ({
      mealId: item.mealId,
      quantity: item.quantity
    })),
    totalPrice: {
      amount: totalPrice,
      currency: process.env.BASE_CURRENCY || 'AZN'
    }
  };

  const response = await fetch(`/api/order`, {
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

export const getTableOrders = async (tableId: string): Promise<OrdersResponse> => {
  const response = await fetch(`/api/order/table/${tableId}`, {
    headers: {
      'Accept-Language': 'az',
    },
  });

  if (!response.ok) {
    if (response.status === 204) {
      return { orders: [], totalPrice: { amount: 0, currency: 'AZN' } };
    }
    const error = await response.json();
    throw new Error(error.message || 'Failed to fetch orders');
  }

  return response.json();
}; 