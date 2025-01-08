import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { OrderItem } from '@/types/order';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculateTotal(orderItems: OrderItem[]) {
  return {
    amount: Number((orderItems.reduce((sum, item) => {
      // Multiply individual item price and quantity, round to 2 decimal places
      const itemTotal = Math.round((item.price * item.quantity) * 100);
      return (sum * 100 + itemTotal) / 100;
    }, 0)).toFixed(2)),
    currency: process.env.BASE_CURRENCY as string
  };
}