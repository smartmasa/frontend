"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

export interface MealQuantities {
  [mealId: string]: number;
}

interface OrderContextType {
  orderItems: OrderItem[];
  setOrderItems: (items: OrderItem[]) => void;
  addToOrder: (item: OrderItem) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearOrder: () => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

const STORAGE_KEY = 'smartmasa_order';

// Standalone function to clear order from storage
export const clearCurrentOrder = () => {
  if (typeof window !== 'undefined') {
    sessionStorage.removeItem(STORAGE_KEY);
  }
};

export function OrderProvider({ children }: { children: ReactNode }) {
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);

  // Load from sessionStorage on client-side mount
  useEffect(() => {
    const savedOrder = sessionStorage.getItem(STORAGE_KEY);
    if (savedOrder) {
      setOrderItems(JSON.parse(savedOrder));
    }
  }, []);

  // Update sessionStorage whenever orderItems changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(orderItems));
    }
  }, [orderItems]);

  const addToOrder = (newItem: OrderItem) => {
    setOrderItems(items => {
      const existingItem = items.find(item => item.id === newItem.id);
      return existingItem
        ? items.map(item =>
            item.id === newItem.id
              ? { ...item, quantity: item.quantity + newItem.quantity }
              : item
          )
        : [...items, newItem];
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    setOrderItems(items =>
      items
        .map(item => item.id === id ? { ...item, quantity } : item)
        .filter(item => item.quantity > 0)
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