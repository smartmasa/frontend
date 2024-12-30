export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

export interface MealQuantities {
  [mealId: string]: number;
} 