"use client";

import MealCard from '@/app/components/MealCard';
import { Button } from '@/app/components/Button';
import { useState, useEffect } from 'react';
import Tab from '@/app/components/Tab';
import HeaderWithLogo from '@/app/components/HeaderWithLogo';
import { useRouter } from 'next/navigation';
import { useOrder } from '@/contexts/OrderContext';
import { formatPrice } from '@/lib/formatters';
import { calculateTotal } from '@/lib/utils';
import { fetchMenu } from '@/services/menuService';
import { Category, MenuItem } from '@/types/menu';

interface CategorySectionProps {
  category: Category;
  gridClassName?: string;
}

function CategorySection({ category, gridClassName }: CategorySectionProps) {
  const { orderItems, updateQuantity, addToOrder } = useOrder();
  
  const handleQuantityChange = (mealId: string, newQuantity: number) => {
    const existingItem = orderItems.find(item => item.id === mealId);
    if (!existingItem && newQuantity > 0 && mealId) {
      // Find the meal data from the category
      const meal = category.meals.find((meal: MenuItem) => meal.id === mealId);
      
      if (meal) {
        addToOrder({
          id: meal.id!,
          name: meal.name,
          price: meal.price,
          quantity: newQuantity,
          imageUrl: meal.imageUrl,
        });
      }
    } else {
      updateQuantity(mealId, newQuantity);
    }
  };
  
  return (
    <div key={category.id} className="mb-8">
      <h2 className="text-lg font-semibold mt-4 mb-2 text-secondary-500 text-center">
        {category.name}
      </h2>
      
      <div className={gridClassName || "grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-y-8 px-4 justify-items-center"}>
        {category.meals && category.meals.map((meal) => (
          meal && meal.id && (
            <MealCard
              key={meal.id}
              name={meal.name}
              description={meal.description}
              price={meal.price}
              imageUrl={meal.imageUrl}
              cookingTime={meal.cookingTime}
              isFavorite={meal.isFavorite}
              isSpicy={meal.isSpicy}
              quantity={orderItems.find(item => item.id === meal.id)?.quantity || 0}
              onQuantityChange={(newQuantity) => 
                handleQuantityChange(meal.id!, newQuantity)
              }
            />
          )
        ))}
      </div>
    </div>
  );
}

export default function MenuPage() {
  const router = useRouter();
  const { orderItems, updateQuantity, addToOrder } = useOrder();
  const [activeCategory, setActiveCategory] = useState('all');
  const [menuData, setMenuData] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMenu = async () => {
      try {
        const data = await fetchMenu();
        setMenuData(data.categories);
      } catch (err) {
        console.error('Error fetching menu:', err);
        setError(err instanceof Error ? err.message : 'An error occurred while fetching the menu');
      } finally {
        setIsLoading(false);
      }
    };

    loadMenu();
  }, []);

  const handleQuantityChange = (mealId: string, newQuantity: number) => {
    const existingItem = orderItems.find(item => item.id === mealId);
    if (!existingItem && newQuantity > 0) {
      // Find the meal data
      const meal = menuData
        .flatMap(category => category.meals)
        .find(meal => meal.id === mealId);
      
      if (meal) {
        addToOrder({
          id: meal.id!,
          name: meal.name,
          price: meal.price,
          quantity: newQuantity,
          imageUrl: meal.imageUrl,
        });
      }
    } else {
      updateQuantity(mealId, newQuantity);
    }
  };

  const total = calculateTotal(orderItems);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-7xl">
      <main className="min-h-screen pb-24 bg-gray-50">
        <HeaderWithLogo />

        {/* Scrollable tabs */}
        <div className="sticky top-0 bg-white shadow-sm z-10">
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex gap-2 p-4 min-w-full">
              <Tab
                key="all"
                label="All"
                isActive={activeCategory === 'all'}
                onClick={() => setActiveCategory('all')}
              />
              {menuData.map((category) => (
                <Tab
                  key={category.id}
                  label={category.name}
                  isActive={activeCategory === category.id}
                  onClick={() => setActiveCategory(category.id)}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto">
          {activeCategory === 'all' ? (
            menuData.map((category) => (
              <CategorySection
                key={category.id}
                category={category}
              />
            ))
          ) : (
            menuData.map((category) => (
              category.id === activeCategory && (
                <CategorySection
                  key={category.id}
                  category={category}
                  gridClassName="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-y-8 px-4"
                />
              )
            ))
          )}
        </div>

        {/* Fixed bottom bar */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white shadow-lg">
          <div className="max-w-7xl mx-auto">
            <Button
              variant="primary"
              className="w-full"
              onClick={() => router.push('/orders')}
              disabled={total.amount === 0}
            >
              <div className="flex justify-between items-center w-full">
                <span>View Order</span>
                <span>{formatPrice(total)}</span>
              </div>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
} 