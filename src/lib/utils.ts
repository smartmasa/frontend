import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { OrderItem } from '@/types/order';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculateTotal(orderItems: OrderItem[]) {
  return {
    amount: orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
    currency: process.env.BASE_CURRENCY as string
  };
} 