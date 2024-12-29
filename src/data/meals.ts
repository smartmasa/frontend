export interface Meal {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  cookingTime: string;
  isFavorite: boolean;
  isSpicy: boolean;
}

export interface Category {
  id: string;
  name: string;
  meals: Meal[];
}

export const menuData: Category[] = [
  {
    id: 'snacks',
    name: 'Snacks',
    meals: [
      {
        id: 'snack1',
        name: "Loaded Nachos",
        description: "Crispy tortilla chips with melted cheese, jalapeños, and guacamole",
        price: 12.99,
        imageUrl: "/static/mock/images/grill.jpeg",
        cookingTime: "15 min",
        isFavorite: true,
        isSpicy: true
      },
      {
        id: 'snack2',
        name: "Chicken Wings",
        description: "Crispy wings with choice of BBQ, Buffalo, or Garlic Parmesan sauce",
        price: 14.99,
        imageUrl: "/static/mock/images/grill.jpeg",
        cookingTime: "20 min",
        isFavorite: true,
        isSpicy: false
      }
    ]
  },
  {
    id: 'desserts',
    name: 'Desserts',
    meals: [
      {
        id: 'dessert1',
        name: "Chocolate Lava Cake",
        description: "Warm chocolate cake with molten center, served with vanilla ice cream",
        price: 9.99,
        imageUrl: "/static/mock/images/grill.jpeg",
        cookingTime: "15 min",
        isFavorite: true,
        isSpicy: false
      }
    ]
  },
  {
    id: 'breakfast',
    name: 'Breakfast',
    meals: [
      {
        id: 'breakfast1',
        name: "Eggs Benedict",
        description: "Poached eggs on English muffin with hollandaise sauce",
        price: 16.99,
        imageUrl: "/static/mock/images/grill.jpeg",
        cookingTime: "20 min",
        isFavorite: true,
        isSpicy: false
      }
    ]
  },
  {
    id: 'maindish',
    name: 'Main Dish',
    meals: [
      {
        id: 'main1',
        name: "Ribeye Steak",
        description: "Grilled ribeye with garlic butter and roasted vegetables",
        price: 32.99,
        imageUrl: "/static/mock/images/grill.jpeg",
        cookingTime: "25 min",
        isFavorite: true,
        isSpicy: false
      }
    ]
  },
  {
    id: 'soups',
    name: 'Soups',
    meals: [
      {
        id: 'soup1',
        name: "French Onion Soup",
        description: "Classic onion soup with melted gruyere cheese",
        price: 8.99,
        imageUrl: "/static/mock/images/grill.jpeg",
        cookingTime: "15 min",
        isFavorite: false,
        isSpicy: false
      }
    ]
  },
  {
    id: 'salads',
    name: 'Salads',
    meals: [
      {
        id: 'salad1',
        name: "Caesar Salad",
        description: "Crispy romaine with parmesan, croutons and Caesar dressing",
        price: 12.99,
        imageUrl: "/static/mock/images/grill.jpeg",
        cookingTime: "10 min",
        isFavorite: true,
        isSpicy: false
      }
    ]
  },
  {
    id: 'pasta',
    name: 'Pasta',
    meals: [
      {
        id: 'pasta1',
        name: "Fettuccine Alfredo",
        description: "Creamy parmesan sauce with fettuccine pasta",
        price: 16.99,
        imageUrl: "/static/mock/images/grill.jpeg",
        cookingTime: "20 min",
        isFavorite: true,
        isSpicy: false
      }
    ]
  },
  {
    id: 'seafood',
    name: 'Seafood',
    meals: [
      {
        id: 'seafood1',
        name: "Grilled Salmon",
        description: "Fresh Atlantic salmon with lemon butter sauce",
        price: 24.99,
        imageUrl: "/static/mock/images/grill.jpeg",
        cookingTime: "20 min",
        isFavorite: true,
        isSpicy: false
      }
    ]
  },
  {
    id: 'drinks',
    name: 'Drinks',
    meals: [
      {
        id: 'drink1',
        name: "Craft Cocktails",
        description: "Signature house cocktails made with premium spirits",
        price: 12.99,
        imageUrl: "/static/mock/images/grill.jpeg",
        cookingTime: "5 min",
        isFavorite: true,
        isSpicy: false
      }
    ]
  },
  {
    id: 'pizza',
    name: 'Pizza',
    meals: [
      {
        id: 'pizza1',
        name: "Margherita Pizza",
        description: "Fresh mozzarella, tomatoes, and basil on thin crust",
        price: 18.99,
        imageUrl: "/static/mock/images/grill.jpeg",
        cookingTime: "20 min",
        isFavorite: true,
        isSpicy: false
      }
    ]
  }
]; 