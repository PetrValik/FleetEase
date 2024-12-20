import React from 'react';

interface SeparatorProps {
  orientation?: 'horizontal' | 'vertical'; // Add the orientation prop
}

export const Separator: React.FC<SeparatorProps> = ({ orientation = 'horizontal' }) => {
  return (
    <div
      className={`${
        orientation === 'horizontal' ? 'border-t border-gray-200 my-4' : 'border-l border-gray-200 h-full'
      }`}
    />
  );
};

export default Separator;
