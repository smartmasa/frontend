import { ButtonHTMLAttributes, ReactNode } from 'react';
import { VariantProps, cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 disabled:pointer-events-none max-w-xl mx-auto',
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
      },
      hasText: {
        true: 'h-12 rounded-[14px]',
        false: 'p-2 rounded-[6px]',
      }
    },
    defaultVariants: {
      variant: 'primary',
      iconPosition: 'none',
      hasText: false,
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  icon?: ReactNode;
  text?: string;
}

const Button = ({
  className,
  variant,
  iconPosition,
  icon,
  text,
  children,
  ...props
}: ButtonProps) => {
  const hasText = Boolean(text || children);
  
  return (
    <button
      className={cn(buttonVariants({ variant, iconPosition, hasText, className }))}
      {...props}
    >
      {icon && iconPosition === 'icon-left' && (
        <span className="w-5 h-5 flex items-center justify-center">{icon}</span>
      )}
      {hasText && (text || children)}
      {icon && iconPosition === 'icon-right' && (
        <span className="w-5 h-5 flex items-center justify-center">{icon}</span>
      )}
      {!hasText && icon && (
        <span className="w-5 h-5 flex items-center justify-center">{icon}</span>
      )}
    </button>
  );
};

export { Button }; 