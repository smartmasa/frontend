import Image from 'next/image';
import { formatPrice } from '@/lib/formatters';
import { CardContainer } from './common/CardContainer';
import { OrderItem } from '@/types/order';

type OrderItemCardProps = Omit<OrderItem, 'mealId' | 'comment'>;

export function OrderItemCard({ name, price, quantity, imageUrl }: OrderItemCardProps) {
  return (
    <CardContainer className="p-4 max-w-2xl mx-auto">
      <div className="flex items-center">
        <div className="w-16 h-16 relative rounded-lg overflow-hidden">
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="object-cover"
          />
        </div>
        <div className="ml-4 flex-1">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-secondary-500">{name}</h3>
              <p className="text-secondary-500">{formatPrice(price)}</p>
            </div>
            <div className="flex items-center justify-center">
              <span className="w-8 h-8 flex items-center justify-center text-primary-500 font-medium border border-primary-500 rounded-lg">
                {quantity}
              </span>
            </div>
          </div>
        </div>
      </div>
    </CardContainer>
  );
} 