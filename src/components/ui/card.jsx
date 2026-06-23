import React from 'react';
import { cn } from '@/lib/utils';

export const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('border border-neutral-200/80 bg-white shadow-[0_18px_50px_rgba(0,0,0,0.06)]', className)}
    {...props}
  />
));

Card.displayName = 'Card';

export const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('p-6', className)} {...props} />
));

CardContent.displayName = 'CardContent';
