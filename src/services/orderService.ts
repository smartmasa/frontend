import { OrderItem, Order } from '@/types/order';

interface PlaceOrderRequest {
  tableId: string;
  items: {
    mealId: string;
    quantity: number;
  }[];
  totalPrice: number;
}

interface PlaceOrderResponse {
  orderId: string;
  status: 'preparing' | 'ready' | 'paid';
  totalPrice: number;
  estimatedTimeInMin: number;
}

interface OrdersResponse {
  orders: Order[];
  totalPrice: number;
}

export const placeOrder = async (orderItems: OrderItem[], tableId: string): Promise<PlaceOrderResponse> => {
  const totalPrice = orderItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  
  const requestBody: PlaceOrderRequest = {
    tableId,
    items: orderItems.map(item => ({
      mealId: item.mealId,
      quantity: item.quantity
    })),
    totalPrice: totalPrice
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

export const getTableOrders = async (tableId: string, lang: string): Promise<OrdersResponse> => {
  const response = await fetch(`/api/order/table/${tableId}`, {
    headers: {
      'Accept-Language': lang,
    },
  });

  if (!response.ok) {
    if (response.status === 204) {
      return { orders: [], totalPrice: 0};
    }
    const error = await response.json();
    throw new Error(error.message || 'Failed to fetch orders');
  }

  return response.json();
}; 