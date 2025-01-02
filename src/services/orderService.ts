import { OrderItem } from '@/types/item';

interface PlaceOrderRequest {
  tableId: string;
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

export const placeOrder = async (orderItems: OrderItem[]): Promise<PlaceOrderResponse> => {
  const totalPrice = orderItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  
  const requestBody: PlaceOrderRequest = {
    tableId: "6775d3967e65c4a0753e1083",
    items: orderItems.map(item => ({
      id: item.id,
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
  const response = await fetch(`/api/order/table/6775d3967e65c4a0753e1083`, {
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