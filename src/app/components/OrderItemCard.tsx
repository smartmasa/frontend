import Image from 'next/image';
import { formatPrice } from '@/lib/formatters';

interface OrderItemCardProps {
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

export function OrderItemCard({ name, price, quantity, imageUrl }: OrderItemCardProps) {
  return (
    <div className="flex items-center bg-white p-4 rounded-lg">
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
            <h3 className="font-medium text-secondary-500">{name}</h3>
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
  );
} 