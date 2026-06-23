import React from 'react';
import { cn } from '@/lib/utils';

export const Input = React.forwardRef(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={cn(
      'h-12 w-full border border-neutral-200 bg-white px-4 text-sm text-neutral-950 outline-none transition placeholder:text-neutral-400 focus:border-neutral-950 focus:ring-0',
      className,
    )}
    {...props}
  />
));

Input.displayName = 'Input';

export const Textarea = React.forwardRef(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      'min-h-28 w-full border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-950 outline-none transition placeholder:text-neutral-400 focus:border-neutral-950 focus:ring-0',
      className,
    )}
    {...props}
  />
));

Textarea.displayName = 'Textarea';

export const Select = React.forwardRef(({ className, children, ...props }, ref) => (
  <select
    ref={ref}
    className={cn(
      'h-12 w-full border border-neutral-200 bg-white px-4 text-sm text-neutral-950 outline-none transition focus:border-neutral-950 focus:ring-0',
      className,
    )}
    {...props}
  >
    {children}
  </select>
));

Select.displayName = 'Select';
