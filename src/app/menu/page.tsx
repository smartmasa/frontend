"use client";

import MealCard from '@/app/components/MealCard';
import { menuData } from '@/data/meals';
import { PhoneIcon, ShoppingCartIcon, GlobeAltIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { Button } from '@/app/components/Button';
import { useState } from 'react';
import Tab from '@/app/components/Tab';
import Image from 'next/image';
import LanguageTab from '@/app/components/LanguageTab';

interface MealQuantities {
  [mealId: string]: number;
}

interface Language {
  code: string;
  name: string;
}

const languages: Language[] = [
  { code: 'az', name: 'Azerbaijani' },
  { code: 'ru', name: 'Russian' },
  { code: 'tr', name: 'Turkish' },
  { code: 'uk', name: 'English' },
];

export default function MenuPage() {
  const [mealQuantities, setMealQuantities] = useState<MealQuantities>({});
  const [activeCategory, setActiveCategory] = useState('all');
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);

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
            <button
              onClick={() => setIsLanguageModalOpen(true)}
              className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-lg"
            >
              <Image 
                src={`/flags/${selectedLanguage.code}.svg`}
                alt={`${selectedLanguage.name} flag`}
                width={24}
                height={24}
                className="rounded-full"
              />
            </button>
          </div>
        </div>

        {/* Language Selection Modal */}
        {isLanguageModalOpen && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-secondary-50 rounded-2xl w-full max-w-md">
              <div className="p-4 flex justify-between items-center border-b">
                <h2 className="text-xl font-semibold text-secondary-500">Select language</h2>
                <button
                  onClick={() => setIsLanguageModalOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <XMarkIcon className="w-6 h-6 text-gray-500" />
                </button>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-2 gap-4">
                  {languages.map((language) => (
                    <LanguageTab
                      key={language.code}
                      code={language.code}
                      name={language.name}
                      isSelected={selectedLanguage.code === language.code}
                      onClick={() => {
                        setSelectedLanguage(language);
                        setIsLanguageModalOpen(false);
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

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