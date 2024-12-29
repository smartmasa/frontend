import { ButtonHTMLAttributes, ReactNode } from 'react';
import { VariantProps, cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  // Base styles
  'inline-flex items-center justify-center rounded-xl text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        primary: 'bg-primary-500 text-secondary-500 hover:bg-primary-600 focus-visible:ring-primary-200 disabled:bg-secondary-300 disabled:text-secondary-50',
        secondary: 'bg-white border border-primary-500 text-primary-600 hover:border-primary-600 hover:text-primary-600 focus-visible:ring-primary-200 disabled:border-secondary-300 disabled:text-secondary-300',
      },
      iconPosition: {
        none: 'px-4 py-2',
        'icon-left': 'pl-3 pr-4 py-2 gap-2',
        'icon-right': 'pl-4 pr-3 py-2 gap-2',
        'icon-only': 'p-2',
      },
    },
    defaultVariants: {
      variant: 'primary',
      iconPosition: 'none',
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  icon?: ReactNode;
}

const Button = ({
  className,
  variant,
  iconPosition,
  icon,
  children,
  ...props
}: ButtonProps) => {
  const iconClass = iconPosition === 'icon-only' ? 'w-6 h-6' : 'w-5 h-5';

  return (
    <button
      className={cn(buttonVariants({ variant, iconPosition, className }))}
      {...props}
    >
      {iconPosition === 'icon-left' && icon && (
        <span className={iconClass}>{icon}</span>
      )}
      {iconPosition !== 'icon-only' && children}
      {iconPosition === 'icon-right' && icon && (
        <span className={iconClass}>{icon}</span>
      )}
      {iconPosition === 'icon-only' && icon && (
        <span className={iconClass}>{icon}</span>
      )}
    </button>
  );
};

export { Button, buttonVariants }; 