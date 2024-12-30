"use client";

import { createContext, useContext, useState, ReactNode } from 'react';
import { OrderItem } from '@/types/order';

interface OrderContextType {
  orderItems: OrderItem[];
  setOrderItems: (items: OrderItem[]) => void;
  addToOrder: (item: OrderItem) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearOrder: () => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: ReactNode }) {
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);

  const addToOrder = (newItem: OrderItem) => {
    setOrderItems(items => {
      const existingItem = items.find(item => item.id === newItem.id);
      if (existingItem) {
        return items.map(item =>
          item.id === newItem.id
            ? { ...item, quantity: item.quantity + newItem.quantity }
            : item
        );
      }
      return [...items, newItem];
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    setOrderItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity } : item
      ).filter(item => item.quantity > 0)
    );
  };

  const clearOrder = () => {
    setOrderItems([]);
  };

  return (
    <OrderContext.Provider value={{
      orderItems,
      setOrderItems,
      addToOrder,
      updateQuantity,
      clearOrder
    }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrder() {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
} 