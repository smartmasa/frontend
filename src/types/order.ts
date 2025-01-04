import { Meal } from './menu';

export interface OrderItem extends Omit<Meal, 'id'> {
  mealId: string;
  quantity: number;
  comment?: string;
}

export interface OrderStatusItem {
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

export interface Order {
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