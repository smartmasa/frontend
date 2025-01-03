import { Meal } from './menu';

export interface OrderItem extends Omit<Meal, 'id'> {
  mealId: string;
  quantity: number;
  comment?: string;
} 