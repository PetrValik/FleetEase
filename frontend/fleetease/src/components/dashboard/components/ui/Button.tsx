import React from 'react';
import classNames from 'classnames';

// Define the ButtonProps interface for the button component
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'outline' | 'filled' | 'text';
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ variant = 'filled', className, children, ...props }) => {
  // Classname logic to apply different styles based on the variant
  const baseStyle = 'py-2 px-4 rounded-md focus:outline-none transition-all';
  const variantStyle = {
    outline: 'border-2 border-gray-500 text-gray-700 hover:bg-gray-200',
    filled: 'bg-blue-500 text-white hover:bg-blue-600',
    text: 'text-blue-500 hover:text-blue-600',
  };

  return (
    <button
      className={classNames(baseStyle, variantStyle[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
};

export { Button };