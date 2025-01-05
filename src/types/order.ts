import { Meal } from './menu';

export interface OrderItem extends Omit<Meal, 'id'> {
  mealId: string;
  quantity: number;
  comment?: string;
}

interface PlacedOrderItem {
  meal: {
    id: string;
    name: string;
    price: number;
    imageUrl: string;
  };
  quantity: number;
}

export interface Order {
  orderId: string;
  items: PlacedOrderItem[];
  status: 'preparing' | 'ready' | 'paid';
  totalPrice: number;
  estimatedTimeInMin: number;
  createdAt: string;
} 