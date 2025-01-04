import { Button } from '@/app/components/Button';
import { formatPrice } from '@/lib/formatters';
import { useTranslation } from '@/utils/i18n';

interface OrderSummaryButtonProps {
  totalAmount: number;
  totalQuantity: number;
  onClick: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  buttonText?: string;
}

export function OrderSummaryButton({
  totalAmount,
  totalQuantity,
  onClick,
  disabled = false,
  isLoading = false,
  buttonText,
}: OrderSummaryButtonProps) {
  const { t } = useTranslation();
  
  return (
    <Button
      variant="primary"
      className="w-full"
      onClick={onClick}
      disabled={disabled}
    >
      <div className="grid grid-cols-3 w-full items-center">
        <div className="justify-self-start">
          {totalQuantity > 0 && (
            <div className="flex items-center gap-2">
              <span className="bg-primary-900 rounded-full w-6 h-6 flex items-center justify-center text-xs text-primary-50">
                {totalQuantity}
              </span>
            </div>
          )}
        </div>
        <span className="justify-self-center">
          {buttonText || t('order.finish')}
        </span>
        <span className="justify-self-end min-w-[80px] text-right">
          {isLoading ? '...' : formatPrice(totalAmount)}
        </span>
      </div>
    </Button>
  );
} 