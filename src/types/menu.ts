export interface Meal {
  id: string;
  name: string;
  price: {
    amount: number;
    currency: string;
  };
  imageUrl: string;
}

export interface MenuItem extends Meal {
  description: string;
  cookingTime: string;
  isFavorite?: boolean;
  isSpicy?: boolean;
}

export interface Category {
  id: string;
  name: string;
  meals: MenuItem[];
}

export interface MenuResponse {
  categories: Category[];
} 