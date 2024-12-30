"use client";

import Image from 'next/image';
import { StarIcon } from '@heroicons/react/24/solid';
import { FireIcon } from '@heroicons/react/24/solid';
import { PlusIcon, MinusIcon } from '@heroicons/react/24/solid';
import { Button } from './Button';
import { formatPrice } from '@/lib/formatters';

interface MealCardProps {
  name: string;
  description: string;
  price: number;
  cookingTime: string;
  imageUrl: string;
  isFavorite?: boolean;
  isSpicy?: boolean;
  quantity: number;
  onQuantityChange: (newQuantity: number) => void;
}

const MealCard = ({
  name,
  description,
  price,
  cookingTime,
  imageUrl,
  isFavorite = false,
  isSpicy = false,
  quantity,
  onQuantityChange,
}: MealCardProps) => {
  const handleIncrement = () => {
    onQuantityChange(quantity + 1);
  };

  const handleDecrement = () => {
    onQuantityChange(Math.max(0, quantity - 1));
  };

  return (
    <div className="w-[160px] rounded-2xl bg-white overflow-hidden shadow-sm flex flex-col">
      <div className="relative">
        <Image
          src={imageUrl}
          alt={name}
          width={160}
          height={120}
          className="w-full h-[120px] object-cover"
          priority={false}
        />
        <div className="absolute top-2 right-2 flex gap-1">
          {isFavorite && (
            <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
              <StarIcon className="w-4 h-4 text-orange-400" />
            </div>
          )}
          {isSpicy && (
            <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
              <FireIcon className="w-4 h-4 text-red-500" />
            </div>
          )}
        </div>
      </div>

      <div className="px-2 py-2 flex flex-col h-full">
        <h3 className="text-sm font-semibold text-gray-900 line-clamp-2">{name}</h3>
        <p className="text-xs text-gray-600 flex-grow line-clamp-3 mt-1">{description}</p>
        
        <div className="flex flex-col gap-2 mt-auto pt-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <svg
                className="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="text-xs text-gray-500">{cookingTime}</span>
            </div>
            <span className="text-sm font-semibold text-primary-500">
              {formatPrice(price)}
            </span>
          </div>
          
          <div className="flex justify-between items-center pt-2">
            {quantity > 0 ? (
              <Button
                variant="secondary"
                onClick={handleDecrement}
                aria-label="Remove from cart"
                icon={<MinusIcon/>}
              />
            ) : (
              <div />
            )}
            <Button
              variant="primary"
              onClick={handleIncrement}
              icon={quantity > 0 ? quantity : <PlusIcon/>}
              aria-label={quantity > 0 ? `Quantity: ${quantity}` : 'Add to cart'}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealCard; 