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
        'px-4 py-2 rounded-lg text-secondary-500 text-xs text-center transition-colors whitespace-nowrap',
        isActive 
          ? 'bg-primary-500' 
          : 'bg-secondary-200 hover:bg-secondary-300',
        className
      )}
    >
      {label}
    </button>
  );
};

export default Tab; 