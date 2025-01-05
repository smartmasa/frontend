"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { OrderItem } from '@/types/order';

interface OrderContextType {
  orderItems: OrderItem[];
  setOrderItems: (items: OrderItem[]) => void;
  addToOrder: (item: OrderItem) => void;
  updateQuantity: (mealId: string, quantity: number) => void;
  clearOrder: () => void;
  tableId: string;
  setTableId: (id: string) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

const STORAGE_KEY = 'smartmasa_order';
const TABLE_ID_KEY = 'smartmasa_table_id';

export function OrderProvider({ children }: { children: ReactNode }) {
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [tableId, setTableId] = useState<string>('');

  // Load from sessionStorage on client-side mount
  useEffect(() => {
    const savedOrder = sessionStorage.getItem(STORAGE_KEY);
    const savedTableId = sessionStorage.getItem(TABLE_ID_KEY);
    
    if (savedOrder) {
      setOrderItems(JSON.parse(savedOrder));
    }
    if (savedTableId) {
      setTableId(savedTableId);
    }
  }, []);

  // Update sessionStorage whenever orderItems changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(orderItems));
    }
  }, [orderItems]);

  // Update sessionStorage whenever tableId changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(TABLE_ID_KEY, tableId);
    }
  }, [tableId]);

  const addToOrder = (newItem: OrderItem) => {
    setOrderItems(items => {
      const existingItem = items.find(item => item.mealId === newItem.mealId);
      return existingItem
        ? items.map(item =>
            item.mealId === newItem.mealId
              ? { ...item, quantity: item.quantity + newItem.quantity }
              : item
          )
        : [...items, newItem];
    });
  };

  const updateQuantity = (mealId: string, quantity: number) => {
    setOrderItems(items =>
      items
        .map(item => item.mealId === mealId ? { ...item, quantity } : item)
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
      clearOrder,
      tableId,
      setTableId
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