import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { OrderItem } from '@/types/order';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculateTotal(orderItems: OrderItem[]) {
  return orderItems.reduce((sum, item) => {
    return {
      amount: sum.amount + (item.price.amount * item.quantity),
      currency: item.price.currency,
    };
  }, { amount: 0, currency: process.env.BASE_CURRENCY as string });
} 