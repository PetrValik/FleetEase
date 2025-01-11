import React from 'react';
import { Link } from 'react-router-dom';

const TopbarAuthButtons: React.FC = () => {
  return (
    <div className="flex items-center gap-2 md:gap-4">
      <Link
        to="/signin"
        className="px-3 py-1.5 md:px-4 md:py-2 text-sm md:text-base text-white hover:bg-white/10 rounded-md transition-colors duration-200"
      >
        Sign in
      </Link>
      <Link
        to="/signup"
        className="px-3 py-1.5 md:px-4 md:py-2 text-sm md:text-base bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200"
      >
        Sign up
      </Link>
    </div>
  );
};

export default TopbarAuthButtons;

