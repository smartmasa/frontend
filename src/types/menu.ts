export interface Meal {
  id: string;
  name: string;
  price: number;
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