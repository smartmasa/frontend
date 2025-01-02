export const formatPrice = ({ amount, currency }: { amount: number; currency: string }): string => {
  return `${amount.toFixed(2)} ${currency}`;
}; 