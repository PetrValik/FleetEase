import React from 'react';
import { Link } from 'react-router-dom';

const SignIn: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement sign in logic
    console.log('Sign in submitted');
  };

  return (
    <div className="h-screen bg-gray-100 flex items-center justify-center p-4 overflow-hidden">
      <div className="bg-white rounded-lg shadow-md w-full max-w-md">
        <div className="p-5">
          <h2 className="text-2xl font-semibold mb-4">Sign In</h2>
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label htmlFor="email" className="block text-sm text-gray-600 mb-0.5">
                Email
              </label>
              <input
                type="email"
                id="email"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm text-gray-600 mb-0.5">
                Password
              </label>
              <input
                type="password"
                id="password"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your password"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-200"
            >
              Sign In
            </button>
          </form>
          <div className="mt-4 text-center">
            <Link to="/signup" className="text-blue-500 hover:text-blue-600">
              Don't have an account? Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;

