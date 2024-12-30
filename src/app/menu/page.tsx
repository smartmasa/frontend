"use client";

import MealCard from '@/app/components/MealCard';
import { menuData } from '@/data/meals';
import { PhoneIcon, ShoppingCartIcon, GlobeAltIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { Button } from '@/app/components/Button';
import { useState } from 'react';
import Tab from '@/app/components/Tab';
import Image from 'next/image';
import LanguageButton, { Language } from '@/app/components/LanguageButton';

interface MealQuantities {
  [mealId: string]: number;
}

export default function MenuPage() {
  const [mealQuantities, setMealQuantities] = useState<MealQuantities>({});
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedLanguage, setSelectedLanguage] = useState<Language>({ code: 'az', name: 'Azerbaijani' });

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

  const getVisibleMeals = () => {
    if (activeCategory === 'all') {
      return menuData.flatMap(category => category.meals);
    }
    return menuData.find(category => category.id === activeCategory)?.meals || [];
  };

  return (
    <div className="container mx-auto max-w-7xl px-4">
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

        <div className="p-6">
          <div className="max-w-7xl mx-auto">
            {activeCategory === 'all' ? (
              menuData.map((category) => (
                <div key={category.id} className="mb-16">
                  <h2 className="text-2xl font-semibold mb-8 text-gray-800 text-center">
                    {category.name}
                  </h2>
                  
                  <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-4 gap-y-8 px-4 justify-items-center">
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
              ))
            ) : (
              menuData.map((category) => (
                <div 
                  key={category.id} 
                  className={`mb-16 ${activeCategory !== category.id ? 'hidden' : ''}`}
                >
                  <h2 className="text-2xl font-semibold mb-8 text-gray-800 text-center">
                    {category.name}
                  </h2>
                  
                  <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-x-4 gap-y-8 px-4">
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
              ))
            )}
          </div>
        </div>

        {/* Fixed bottom bar */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white shadow-lg">
          <div className="max-w-7xl mx-auto">
            <Button
              variant="primary"
              className="w-full"
            >
              View Order <span className="ml-2 font-semibold">${total.toFixed(2)}</span>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
} 