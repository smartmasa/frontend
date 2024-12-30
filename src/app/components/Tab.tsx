"use client";

import { cn } from '@/lib/utils';

interface TabProps {
  label: string;
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
}

const Tab = ({ label, isActive = false, onClick, className }: TabProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        'px-4 py-2 rounded-[10px] text-sm text-center transition-colors whitespace-nowrap',
        isActive 
          ? 'bg-primary-500 text-white' 
          : 'bg-secondary-200 text-gray-600 hover:bg-secondary-300',
        className
      )}
    >
      {label}
    </button>
  );
};

export default Tab; 