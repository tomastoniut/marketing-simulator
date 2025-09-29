import React from 'react';
import clsx from 'clsx';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  padded?: boolean;
}

export function Card({ className, padded = true, ...rest }: CardProps) {
  return (
    <div
      className={clsx(
        'rounded-lg border bg-[var(--card-bg)] border-[var(--card-border)] shadow-sm',
        padded && 'p-4 sm:p-6',
        className,
      )}
      {...rest}
    />
  );
}

export function CardTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-lg font-semibold mb-2">{children}</h2>;
}

export function CardDescription({ children }: { children: React.ReactNode }) {
  return <p className="text-sm mb-2 text-[var(--brand-blue)] dark:text-[var(--brand-blue-light)]">{children}</p>;
}
