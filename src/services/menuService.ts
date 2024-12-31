export interface Category {
  id: string;
  name: string;
  meals: Meal[];
}

export interface Meal {
  id: string;
  name: string;
  description: string;
  price: {
    amount: number;
    currency: string;
  };
  imageUrl: string;
  cookingTime: string;
  isFavorite: boolean;
  isSpicy: boolean;
}

export interface MenuResponse {
  categories: Category[];
}

export async function fetchMenu(): Promise<MenuResponse> {
  const response = await fetch('/api/menu', {
    method: 'GET',
    headers: {
      'Accept-Language': 'az',
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch menu data: ${response.status} ${response.statusText}`);
  }

  return response.json();
} 