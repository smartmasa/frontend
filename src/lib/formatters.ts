export const formatPrice = (amount: number): string => {
  return `${amount.toFixed(2)} ${process.env.NEXT_PUBLIC_BASE_CURRENCY}`;
}; 