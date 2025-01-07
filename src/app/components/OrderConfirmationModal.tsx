import { Button } from './Button';
import Image from 'next/image';
import {useTranslations} from 'next-intl';
import { Link } from '@/i18n/routing';

interface OrderConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  estimatedTimeInMin: number;
}

export function OrderConfirmationModal({ isOpen, onClose, estimatedTimeInMin }: OrderConfirmationModalProps) {
  const  t = useTranslations();
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-sm" onClick={e => e.stopPropagation()}>
        <div className="p-6 flex flex-col items-center text-center">
          <div className="w-24 h-24 mb-6 relative">
            <Image
              src="/static/order-completion.gif"
              alt={t('order.order_confirmed')}
              fill
              className="object-contain"
            />
          </div>

          <h2 className="text-2xl font-semibold text-secondary-500 mb-2">{t('order.order_confirmed')}</h2>
          <p className="text-gray-600 mb-8">
            {t('order.order_confirmed_description', { 
              minutesMin: estimatedTimeInMin - 5, 
              minutesMax: estimatedTimeInMin + 5 
            })}
          </p>
          <Link href={`/order-status`}>

          <Button
            variant="primary"
            className="w-full"
            text={t('order.view_order')}
          />
          </Link>
        </div>
      </div>
    </div>
  );
} 