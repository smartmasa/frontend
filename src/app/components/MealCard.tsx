"use client";

import Image from 'next/image';
import { StarIcon, FireIcon } from '@heroicons/react/24/solid';
import { formatPrice } from '@/lib/formatters';
import { CardContainer } from './common/CardContainer';
import { QuantityControl } from './common/QuantityControl';
import { IconBadge } from './common/IconBadge';
import { TimeDisplay } from './common/TimeDisplay';
import { MenuItem } from '@/types/menu';

interface MealCardProps extends Omit<MenuItem, 'id'> {
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
  return (
    <CardContainer className="w-[180px] flex flex-col">
      <div className="relative">
        <Image
          src={imageUrl}
          alt={name}
          width={160}
          height={120}
          className="w-full h-[120px] object-cover"
        />
        <div className="absolute top-2 right-2 flex gap-1">
          {isFavorite && <IconBadge icon={<StarIcon />} color="text-orange-400" />}
          {isSpicy && <IconBadge icon={<FireIcon />} color="text-red-500" />}
        </div>
      </div>

      <div className="px-2 py-1 flex flex-col h-full">
        <h3 className="text-sm font-semibold text-gray-900 line-clamp-2">{name}</h3>
        <p className="text-xs text-secondary-500 flex-grow line-clamp-3">{description}</p>
        
        <div className="flex flex-col gap-2 mt-auto pt-2">
          <div className="flex items-center justify-between">
            <TimeDisplay minutes={cookingTime} />
            <span className="text-xs font-semibold text-primary-500">
              {formatPrice(price.amount)}
            </span>
          </div>
          
          <div className="mt-auto py-2">
            <QuantityControl
              quantity={quantity}
              onQuantityChange={onQuantityChange}
              variant="compact"
            />
          </div>
        </div>
      </div>
    </CardContainer>
  );
};

export default MealCard; 