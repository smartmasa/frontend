import { Meal } from './menu';

export interface OrderItem extends Meal {
  quantity: number;
  comment?: string;
} 