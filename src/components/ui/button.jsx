import React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex min-h-11 items-center justify-center gap-2 rounded-none px-5 py-3 text-sm font-semibold tracking-wide transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-[#c9a45c] text-black shadow-[0_18px_45px_rgba(201,164,92,0.22)] hover:bg-[#d8b66f]',
        dark: 'bg-black text-white shadow-[0_18px_40px_rgba(0,0,0,0.2)] hover:bg-neutral-800',
        glass: 'border border-white/20 bg-white/10 text-white backdrop-blur-xl hover:bg-white/15',
        outline: 'border border-neutral-300 bg-transparent text-neutral-950 hover:border-neutral-950',
        ghost: 'text-neutral-600 hover:text-neutral-950',
      },
      size: {
        default: 'min-h-12 px-5',
        sm: 'min-h-10 px-4 text-xs',
        lg: 'min-h-14 px-7 text-base',
        icon: 'h-11 w-11 p-0',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : 'button';
  return <Comp ref={ref} className={cn(buttonVariants({ variant, size, className }))} {...props} />;
});

Button.displayName = 'Button';
