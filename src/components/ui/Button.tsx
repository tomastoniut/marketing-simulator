import React from 'react';
import clsx from 'clsx';

type Variant = 'primary' | 'secondary' | 'ghost' ;
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

const base = 'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none h-10 px-4 py-2';
const variants: Record<Variant,string> = {
  primary: 'bg-white text-[var(--brand-blue)] border border-[var(--brand-blue)] focus:ring-2 focus:ring-[var(--focus-ring)]',
  secondary: 'bg-[var(--brand-blue)] text-white hover:bg-brand-light focus:ring-2 focus:ring-[var(--focus-ring)]',
  ghost: 'bg-transparent text-[var(--brand-blue)] hover:bg-[var(--progress-track)]',
};

export function Button({ variant='primary', className, ...rest }: ButtonProps) {
  return <button className={clsx(base, variants[variant], className)} {...rest} />;
}
