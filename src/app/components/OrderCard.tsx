"use client";

import Image from 'next/image';
import { formatPrice } from '@/lib/formatters';
import { CardContainer } from './common/CardContainer';
import { QuantityControl } from './common/QuantityControl';
import { OrderItem } from '@/types/order';
import { useTranslation } from '@/utils/i18n';

interface OrderCardProps {
  item: OrderItem;
  onQuantityChange: (mealId: string, newQuantity: number) => void;
  onCommentChange?: (mealId: string, comment: string) => void;
}

export function OrderCard({ 
  item, 
  onQuantityChange,
  onCommentChange 
}: OrderCardProps) {
  const { t } = useTranslation();

  const handleQuantityChange = (newQuantity: number) => {
    onQuantityChange(item.mealId, newQuantity);
  };

  const handleCommentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onCommentChange?.(item.mealId, event.target.value);
  };

  return (
    <CardContainer className="p-4">
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
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-secondary-500">{item.name}</h3>
                <p className="text-secondary-500">{formatPrice(item.price)}</p>
              </div>
              <QuantityControl
                quantity={item.quantity}
                onQuantityChange={handleQuantityChange}
                variant="full"
              />
            </div>
          </div>
        </div>
        
        <textarea
          value={item.comment}
          onChange={handleCommentChange}
          placeholder={t('order.special_request_placeholder')}
          rows={2}
          className="w-full p-2 border-b text-xs border-gray-200 text-secondary-500 placeholder-gray-400 focus:outline-none focus:ring-0 focus:border-b-2 focus:border-orange-500 transition-colors bg-transparent resize-none min-h-[3.5rem] overflow-auto [white-space:pre-line]"
        />
      </div>
    </CardContainer>
  );
} 