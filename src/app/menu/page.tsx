"use client";

import MealCard from '@/app/components/MealCard';
import { menuData } from '@/data/meals';
import { PhoneIcon, ShoppingCartIcon } from '@heroicons/react/24/solid';
import { Button } from '@/app/components/Button';
import { useState } from 'react';
import Tab from '@/app/components/Tab';

interface MealQuantities {
  [mealId: string]: number;
}

export default function MenuPage() {
  const [mealQuantities, setMealQuantities] = useState<MealQuantities>({});
  const [activeCategory, setActiveCategory] = useState(menuData[0].id);

  const handleQuantityChange = (mealId: string, newQuantity: number) => {
    setMealQuantities(prev => ({
      ...prev,
      [mealId]: newQuantity
    }));
  };

  const calculateTotal = () => {
    return menuData.reduce((total, category) => {
      return total + category.meals.reduce((categoryTotal, meal) => {
        const quantity = mealQuantities[meal.id] || 0;
        return categoryTotal + (meal.price * quantity);
      }, 0);
    }, 0);
  };

  const total = calculateTotal();

  return (
    <main className="min-h-screen pb-24 bg-gray-50">
      {/* Scrollable tabs */}
      <div className="sticky top-0 bg-white shadow-sm z-10">
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex gap-2 p-4 min-w-full">
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

      <div className="p-6">
        <div className="max-w-7xl mx-auto">        
          {menuData.map((category) => (
            <div 
              key={category.id} 
              className={`mb-16 ${activeCategory !== category.id ? 'hidden' : ''}`}
            >
              <h2 className="text-2xl font-semibold mb-8 text-gray-800 text-center">
                {category.name}
              </h2>
              
              <div className="grid xs:grid-cols-1 grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-x-2 gap-y-8 justify-items-center">
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
                    quantity={mealQuantities[meal.id] || 0}
                    onQuantityChange={(newQuantity) => 
                      handleQuantityChange(meal.id, newQuantity)
                    }
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fixed bottom bar */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between gap-4">
          <Button
            variant="secondary"
            iconPosition="icon-left"
            icon={<PhoneIcon />}
            className="flex-1"
          >
            Call waiter
          </Button>
          
          <Button
            variant="primary"
            iconPosition="icon-left"
            icon={<ShoppingCartIcon />}
            className="flex-1"
          >
            Cart <span className="ml-2 font-semibold">${total.toFixed(2)}</span>
          </Button>
        </div>
      </div>
    </main>
  );
} 