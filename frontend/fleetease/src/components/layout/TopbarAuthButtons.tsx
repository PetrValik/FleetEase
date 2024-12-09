import React from 'react';
import { Link } from 'react-router-dom';

const TopbarAuthButtons: React.FC = () => {
  return (
    <div className="flex items-center gap-4">
      <Link
        to="/signin"
        className="px-4 py-2 text-white hover:bg-white/10 rounded-md transition-colors duration-200"
      >
        Sign in
      </Link>
      <Link
        to="/signup"
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200"
      >
        Sign up
      </Link>
    </div>
  );
};

export default TopbarAuthButtons;

