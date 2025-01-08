"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { OrderItem } from '@/types/order';

interface OrderContextType {
  orderItems: OrderItem[];
  setOrderItems: (items: OrderItem[]) => void;
  addToOrder: (item: OrderItem) => void;
  updateQuantity: (mealId: string, quantity: number, comment?: string) => void;
  clearOrder: () => void;
  tableId: string;
  setTableId: (id: string) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

const STORAGE_KEY = 'smartmasa_order';
const TABLE_ID_KEY = 'smartmasa_table_id';

export function OrderProvider({ children }: { children: ReactNode }) {
  const [orderItems, setOrderItems] = useState<OrderItem[]>(() => {
    // Initialize from session storage if available
    if (typeof window !== 'undefined') {
      const savedOrder = sessionStorage.getItem(STORAGE_KEY);
      return savedOrder ? JSON.parse(savedOrder) : [];
    }
    return [];
  });
  const [tableId, setTableId] = useState<string>(() => {
    // Initialize table ID from session storage if available
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem(TABLE_ID_KEY) || '';
    }
    return '';
  });

  // Update sessionStorage whenever orderItems changes
  useEffect(() => {
    if (typeof window !== 'undefined' && orderItems) {
      try {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(orderItems));
      } catch (error) {
        console.error('Error saving order to session storage:', error);
      }
    }
  }, [orderItems]);

  // Update sessionStorage whenever tableId changes
  useEffect(() => {
    if (typeof window !== 'undefined' && tableId) {
      try {
        sessionStorage.setItem(TABLE_ID_KEY, tableId);
      } catch (error) {
        console.error('Error saving table ID to session storage:', error);
      }
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

  const updateQuantity = (mealId: string, quantity: number, comment?: string) => {
    console.log(comment);
    setOrderItems(items =>
      items
        .map(item => item.mealId === mealId ? { ...item, quantity, ...(comment !== undefined && { comment }) } : item)
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