export const formatPrice = (price: number): string => {
  return `${price.toFixed(2)} ${process.env.BASE_CURRENCY || 'AZN'}`;
}; 