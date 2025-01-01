"use client";

import Image from 'next/image';
import { PlusIcon, MinusIcon } from '@heroicons/react/24/solid';
import { formatPrice } from '@/lib/formatters';

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

interface OrderCardProps {
  item: OrderItem;
  onQuantityChange: (id: string, newQuantity: number) => void;
}

export function OrderCard({ item, onQuantityChange }: OrderCardProps) {
  return (
    <div className="space-y-3">
      {/* Top row with image, name, price, and quantity */}
      <div className="flex">
        <div className="w-16 h-16 relative rounded-lg overflow-hidden">
          <Image
            src={item.imageUrl}
            alt={item.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="ml-4 flex-1">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-secondary-500">{item.name}</h3>
              <p className="text-secondary-500">{formatPrice(item.price)}</p>
            </div>
            <div className="flex items-center border border-orange-500 rounded-full h-10 justify-center">
              <button
                className="w-8 text-secondary-500 flex items-center justify-center"
                onClick={() => onQuantityChange(item.id, item.quantity - 1)}
              >
                <MinusIcon className="w-4 h-4" />
              </button>
              <span className="w-7 text-center text-secondary-500">{item.quantity}</span>
              <button
                className="w-8 text-secondary-500 flex items-center justify-center"
                onClick={() => onQuantityChange(item.id, item.quantity + 1)}
              >
                <PlusIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Comment input */}
      <textarea
        placeholder={"Need more? \n Leave a comment..."}
        rows={2}
        className="w-full p-2 border-b text-xs border-gray-200 text-secondary-500 placeholder-gray-400 focus:outline-none focus:ring-0 focus:border-b-2 focus:border-orange-500 transition-colors bg-transparent resize-none min-h-[3.5rem] overflow-auto [white-space:pre-line]"
      />
    </div>
  );
} 