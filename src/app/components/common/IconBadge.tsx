import { ReactNode } from 'react';

interface IconBadgeProps {
  icon: ReactNode;
  color?: string;
}

export function IconBadge({ icon, color = 'text-gray-600' }: IconBadgeProps) {
  return (
    <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
      <div className={`w-4 h-4 ${color}`}>{icon}</div>
    </div>
  );
} 