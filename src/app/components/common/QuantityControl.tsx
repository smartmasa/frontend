import { PlusIcon, MinusIcon } from '@heroicons/react/24/solid';

interface QuantityControlProps {
  quantity: number;
  onQuantityChange: (newQuantity: number) => void;
  variant?: 'compact' | 'full';
  minQuantity?: number;
}

export function QuantityControl({
  quantity,
  onQuantityChange,
  variant = 'compact',
  minQuantity = 0
}: QuantityControlProps) {
  const handleDecrement = () => {
    onQuantityChange(Math.max(minQuantity, quantity - 1));
  };

  const handleIncrement = () => {
    onQuantityChange(quantity + 1);
  };

  if (variant === 'compact') {
    return (
      <div className="flex justify-between items-center">
        {quantity > minQuantity ? (
          <button
            className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center"
            onClick={handleDecrement}
            aria-label="Decrease quantity"
          >
            <MinusIcon className="w-4 h-4 text-gray-600" />
          </button>
        ) : (
          <div />
        )}
        <button
          className="w-8 h-8 rounded-lg bg-primary-500 text-white flex items-center justify-center"
          onClick={handleIncrement}
          aria-label={quantity > 0 ? `Quantity: ${quantity}` : 'Add'}
        >
          {quantity > 0 ? quantity : <PlusIcon className="w-4 h-4" />}
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center border border-orange-500 rounded-full h-10 justify-center">
      <button
        className="w-8 text-secondary-500 flex items-center justify-center"
        onClick={handleDecrement}
      >
        <MinusIcon className="w-4 h-4" />
      </button>
      <span className="w-7 text-center text-secondary-500">{quantity}</span>
      <button
        className="w-8 text-secondary-500 flex items-center justify-center"
        onClick={handleIncrement}
      >
        <PlusIcon className="w-4 h-4" />
      </button>
    </div>
  );
} 