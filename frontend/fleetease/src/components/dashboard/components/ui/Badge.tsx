import React from 'react';
import classNames from 'classnames';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'success' | 'default' | 'destructive';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'default', className, ...props }) => {
  const badgeStyles = {
    success: 'bg-green-500 text-white',
    default: 'bg-blue-500 text-white',
    destructive: 'bg-red-500 text-white',
  };

  return (
    <span
      className={classNames(
        'inline-block px-3 py-1 text-sm font-semibold rounded-full',
        badgeStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};