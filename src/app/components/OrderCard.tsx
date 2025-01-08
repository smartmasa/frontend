"use client";

import Image from 'next/image';
import { formatPrice } from '@/lib/formatters';
import { CardContainer } from './common/CardContainer';
import { QuantityControl } from './common/QuantityControl';
import { OrderItem } from '@/types/order';
import {useTranslations} from 'next-intl';

interface OrderCardProps {
  item: OrderItem;
  onQuantityChange: (mealId: string, newQuantity: number, comment?: string) => void;
}

export function OrderCard({ 
  item, 
  onQuantityChange,
}: OrderCardProps) {
  const t  = useTranslations();

  const handleQuantityChange = (newQuantity: number) => {
    onQuantityChange(item.mealId, newQuantity, item.comment);
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onQuantityChange(item.mealId, item.quantity, e.target.value);
  };

  return (
    <CardContainer className="p-4 max-w-2xl mx-auto">
      <div className="space-y-3">
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
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0 max-w-40">
                <h3 className="font-semibold text-secondary-500 line-clamp-2">{item.name}</h3>
                <p className="text-secondary-500">{formatPrice(item.price)}</p>
              </div>
              <div className="flex-shrink-0">
                <QuantityControl
                  quantity={item.quantity}
                  onQuantityChange={handleQuantityChange}
                  variant="full"
                />
              </div>
            </div>
          </div>
        </div>
        
        <input
          type="text"
          value={item.comment}
          onChange={handleCommentChange}
          placeholder={t('order.special_request_placeholder')}
          className="w-full p-2 border-b text-xs border-gray-200 text-secondary-500 placeholder-gray-400 focus:outline-none focus:ring-0 focus:border-b-2 focus:border-orange-500 transition-colors bg-transparent"
        />
      </div>
    </CardContainer>
  );
} 