import { Button } from './Button';
import Image from 'next/image';

interface OrderConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onViewOrder: () => void;
}

export function OrderConfirmationModal({ isOpen, onClose, onViewOrder }: OrderConfirmationModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-sm" onClick={e => e.stopPropagation()}>
        <div className="p-6 flex flex-col items-center text-center">
          <div className="w-24 h-24 mb-6 relative">
            <Image
              src="/order-completion.gif"
              alt="Order completion"
              fill
              className="object-contain"
            />
          </div>

          <h2 className="text-2xl font-semibold text-secondary-500 mb-2">Order Confirmed!</h2>
          <p className="text-gray-600 mb-8">Your order is being prepared.</p>

          <Button
            variant="primary"
            className="w-full"
            onClick={onViewOrder}
            text="View order"
          />
        </div>
      </div>
    </div>
  );
} 