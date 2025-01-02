import { ReactNode } from 'react';

interface CardContainerProps {
  children: ReactNode;
  className?: string;
}

export function CardContainer({ children, className = '' }: CardContainerProps) {
  return (
    <div className={`bg-white rounded-lg overflow-hidden shadow-sm ${className}`}>
      {children}
    </div>
  );
} 