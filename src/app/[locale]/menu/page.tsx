"use client";

import MealCard from '@/app/components/MealCard';
import { useState, useEffect } from 'react';
import Tab from '@/app/components/Tab';
import HeaderWithLogo from '@/app/components/HeaderWithLogo';
import LoadingSpinner from '@/app/components/LoadingSpinner';
import { useOrder } from '@/contexts/OrderContext';
import { calculateTotal } from '@/lib/utils';
import { fetchMenu } from '@/services/menuService';
import { Category, MenuItem } from '@/types/menu';
import { OrderSummaryButton } from '@/app/components/OrderSummaryButton';
import { useLocale } from "next-intl";
import { Link } from '@/i18n/routing';

interface CategorySectionProps {
  category: Category;
  gridClassName?: string;
}

function CategorySection({ category, gridClassName }: CategorySectionProps) {
  const { orderItems, updateQuantity, addToOrder } = useOrder();
  
  const handleQuantityChange = (mealId: string, newQuantity: number) => {
    const existingItem = orderItems.find(item => item.mealId === mealId);
    if (!existingItem && newQuantity > 0 && mealId) {
      // Find the meal data from the category
      const meal = category.meals.find((meal: MenuItem) => meal.id === mealId);
      
      if (meal) {
        addToOrder({
          mealId: meal.id!,
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
      <h2 className="text-lg font-semibold mt-4 mb-4 text-secondary-500 text-center">
        {category.name}
      </h2>
      
      <div className={gridClassName || "grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-y-6 justify-items-center"}>
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
              quantity={orderItems.find(item => item.mealId === meal.id)?.quantity || 0}
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
  const { orderItems } = useOrder();
  const [menuData, setMenuData] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>('');
  const locale = useLocale();

  const scrollToCategory = (categoryId: string) => {
    const element = document.getElementById(`category-${categoryId}`);
    if (element) {
      const headerOffset = 80; // Approximate height of the sticky header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setActiveTab(categoryId);
    }
  };

  useEffect(() => {
    const loadMenu = async () => {
      try {
        const data = await fetchMenu(locale);
        setMenuData(data.categories);
        // Set first tab as active by default
        setActiveTab(data.categories[0].id);
      } catch (err) {
        console.error('Error fetching menu:', err);
        setError(err instanceof Error ? err.message : 'An error occurred while fetching the menu');
      } finally {
        setIsLoading(false);
      }
    };

    loadMenu();
  }, []);

  const total = calculateTotal(orderItems);

  if (isLoading) {
    return <LoadingSpinner />;
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
      <main className="min-h-screen pb-24 bg-gray-50 scroll-pt-20">
        <HeaderWithLogo />

        {/* Scrollable tabs */}
        <div className="sticky top-0 bg-white shadow-sm z-10">
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex gap-2 p-4 min-w-full">
              {menuData.map((category) => (
                <Tab
                  key={category.id}
                  label={category.name}
                  isActive={activeTab === category.id}
                  onClick={() => scrollToCategory(category.id)}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-4">
          {menuData.map((category) => (
            <div id={`category-${category.id}`} key={category.id} className="scroll-mt-20">
              <CategorySection
                category={category}
                gridClassName="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-y-6 justify-items-center"
              />
            </div>
          ))}
        </div>

        {/* Fixed bottom bar */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white shadow-lg">
          <div className="max-w-7xl mx-auto">
            <Link href={`/orders`}>
              <OrderSummaryButton
                totalAmount={total.amount}
                totalQuantity={orderItems.reduce((sum, item) => sum + item.quantity, 0)}
                disabled={total.amount === 0}
              />
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
} 