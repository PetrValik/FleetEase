import React from 'react';
import { Link } from 'react-router-dom';

interface AuthFormProps {
  title: string;
  onSubmit: (e: React.FormEvent) => void;
  children: React.ReactNode;
  googleButtonText: string;
  onGoogleClick: () => void;
  linkText: string;
  linkTo: string;
}

const AuthForm: React.FC<AuthFormProps> = ({
  title,
  onSubmit,
  children,
  googleButtonText,
  onGoogleClick,
  linkText,
  linkTo,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      <form onSubmit={onSubmit} className="space-y-4">
        {children}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-200"
        >
          {title}
        </button>
      </form>
      <div className="mt-4">
        <button
          onClick={onGoogleClick}
          className="w-full bg-white text-gray-700 border border-gray-300 py-2 px-4 rounded-md hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center"
        >
          <img src="/google-logo.png" alt="Google logo" className="w-5 h-5 mr-2" />
          {googleButtonText}
        </button>
      </div>
      <div className="mt-4 text-center">
        <Link to={linkTo} className="text-blue-500 hover:text-blue-600">
          {linkText}
        </Link>
      </div>
    </div>
  );
};

export default AuthForm;

