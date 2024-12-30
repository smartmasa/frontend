"use client";

import MealCard from '@/app/components/MealCard';
import { menuData } from '@/data/meals';
import { Button } from '@/app/components/Button';
import { useState } from 'react';
import Tab from '@/app/components/Tab';
import LanguageButton, { Language } from '@/app/components/LanguageButton';
import { useRouter } from 'next/navigation';
import { useOrder, OrderItem } from '@/contexts/OrderContext';

interface CategorySectionProps {
  category: typeof menuData[0];
  onQuantityChange: (mealId: string, newQuantity: number) => void;
  gridClassName?: string;
}

function CategorySection({ category, onQuantityChange, gridClassName }: CategorySectionProps) {
  const { orderItems } = useOrder();
  
  return (
    <div key={category.id} className="mb-8">
      <h2 className="text-lg font-semibold mt-4 mb-2 text-secondary-500 text-center">
        {category.name}
      </h2>
      
      <div className={gridClassName || "grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-y-8 px-4 justify-items-center"}>
        {category.meals.map((meal) => (
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
              onQuantityChange(meal.id, newQuantity)
            }
          />
        ))}
      </div>
    </div>
  );
}

export default function MenuPage() {
  const router = useRouter();
  const { orderItems, updateQuantity, addToOrder } = useOrder();
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedLanguage, setSelectedLanguage] = useState<Language>({ code: 'az', name: 'Azerbaijani' });

  const handleQuantityChange = (mealId: string, newQuantity: number) => {
    const meal = menuData
      .flatMap(category => category.meals)
      .find(meal => meal.id === mealId);

    if (meal) {
      if (newQuantity > 0) {
        const orderItem: OrderItem = {
          id: meal.id,
          name: meal.name,
          price: meal.price,
          quantity: newQuantity,
          imageUrl: meal.imageUrl,
        };
        addToOrder(orderItem);
      }
      updateQuantity(mealId, newQuantity);
    }
  };

  const calculateTotal = () => {
    return menuData.reduce((total, category) => {
      return total + category.meals.reduce((categoryTotal, meal) => {
        const orderItem = orderItems.find(item => item.id === meal.id);
        const quantity = orderItem?.quantity || 0;
        return categoryTotal + (meal.price * quantity);
      }, 0);
    }, 0);
  };

  const total = calculateTotal();

  const handleViewOrder = () => {
    if (orderItems.length > 0) {
      router.push('/orders');
    }
  };

  return (
    <div className="container mx-auto max-w-7xl">
      <main className="min-h-screen pb-24 bg-gray-50">
        {/* Header with Logo and Language Selector */}
        <div className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 pt-2 flex justify-between items-center">
            <h1 className="text-xl font-bold">LOGO</h1>
            <LanguageButton
              selectedLanguage={selectedLanguage}
              onLanguageChange={setSelectedLanguage}
            />
          </div>
        </div>

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
                  onQuantityChange={handleQuantityChange}
                />
              ))
            ) : (
              menuData.map((category) => (
                category.id === activeCategory && (
                  <CategorySection
                    key={category.id}
                    category={category}
                    onQuantityChange={handleQuantityChange}
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
              onClick={handleViewOrder}
              disabled={total === 0}
            >
              <div className="flex justify-between items-center w-full">
                <span>View Order</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
} 