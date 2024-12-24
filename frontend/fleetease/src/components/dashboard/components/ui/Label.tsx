import React from 'react';

interface LabelProps {
  htmlFor: string;
  children: React.ReactNode;
  required?: boolean;
}

export const Label: React.FC<LabelProps> = ({ htmlFor, children, required = false }) => {
  return (
    <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700">
      {children}
      {required && <span className="text-red-500">*</span>}
    </label>
  );
};

export default Label;
