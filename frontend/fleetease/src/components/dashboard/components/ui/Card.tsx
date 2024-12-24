import React from 'react';
import classNames from 'classnames';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className, ...props }) => {
  return (
    <div
      className={classNames(
        'bg-white rounded-lg shadow-md border border-gray-200',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardContent: React.FC<CardProps> = ({ children, className, ...props }) => {
  return (
    <div className={classNames('p-4', className)} {...props}>
      {children}
    </div>
  );
};