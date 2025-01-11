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
    <div className="bg-white rounded-lg shadow-md p-4 md:p-6 w-[90%] max-w-sm mx-auto">
      <h2 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4">{title}</h2>
      <form onSubmit={onSubmit} className="space-y-3">
        {children}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-200 text-sm md:text-base"
        >
          {title}
        </button>
      </form>
      <div className="mt-3">
        <button
          onClick={onGoogleClick}
          className="w-full bg-white text-gray-700 border border-gray-300 py-2 px-4 rounded-md hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center text-sm md:text-base"
        >
          <img src="/google-logo.png" alt="Google logo" className="w-4 h-4 md:w-5 md:h-5 mr-2" />
          {googleButtonText}
        </button>
      </div>
      <div className="mt-3 text-center text-sm md:text-base">
        <Link to={linkTo} className="text-blue-500 hover:text-blue-600">
          {linkText}
        </Link>
      </div>
    </div>
  );
};

export default AuthForm;

