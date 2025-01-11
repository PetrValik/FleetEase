import React from 'react';

interface AuthInputProps {
  id: string;
  type: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const AuthInput: React.FC<AuthInputProps> = ({ id, type, label, placeholder, value, onChange }) => {
  return (
    <div>
      <label htmlFor={id} className="block text-xs md:text-sm text-gray-600 mb-1">
        {label}
      </label>
      <input
        type={type}
        id={id}
        required
        className="w-full px-3 py-1.5 md:py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default AuthInput;

