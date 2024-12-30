"use client";

import Image from 'next/image';

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
      <div className="flex items-center">
        <div className="w-20 h-20 relative rounded-lg overflow-hidden">
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
              <p className="text-lg text-secondary-500">${item.price.toFixed(2)}</p>
            </div>
            <div className="flex items-center border border-orange-500 rounded-full">
              <button
                className="w-6 py-1 text-orange-500"
                onClick={() => onQuantityChange(item.id, item.quantity - 1)}
              >
                -
              </button>
              <span className="w-7 text-center text-secondary-500">{item.quantity}</span>
              <button
                className="w-6 py-1 text-orange-500"
                onClick={() => onQuantityChange(item.id, item.quantity + 1)}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Comment input */}
      <textarea
        placeholder={"Need more? \n Leave a comment..."}
        rows={2}
        className="w-full p-2 border-b border-gray-200 text-secondary-500 placeholder-gray-400 focus:outline-none focus:ring-0 focus:border-b-2 focus:border-orange-500 transition-colors bg-transparent resize-none min-h-[3.5rem] overflow-auto [white-space:pre-line]"
      />
    </div>
  );
} 