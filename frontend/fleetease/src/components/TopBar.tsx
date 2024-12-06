import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { useUser } from '../contexts/UserContext';
import { Link } from 'react-router-dom';

const TopBar: React.FC = () => {
  const { user, isAuthenticated } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="h-20 bg-[#001529] text-white px-8 flex items-center justify-between border-b border-white/10 w-full">
      <div className="flex items-center gap-4">
        <img src="/logo1.png" alt="FleetEase" className="w-12 h-12 object-contain" />
        <h1 className="text-2xl font-semibold">
          Fleet<span className="text-blue-500">Ease</span>
        </h1>
      </div>
      
      <div className="flex items-center gap-8 mr-4" ref={dropdownRef}>
        {isAuthenticated && user ? (
          <div className="relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center gap-3 p-2 cursor-pointer rounded-md transition-all duration-200 hover:bg-white/10"
            >
              <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center font-semibold text-base">
                {user.first_name[0]}{user.last_name[0]}
              </div>
              <div className="flex flex-col items-start">
                <span className="text-base font-medium">
                  {user.first_name} {user.last_name}
                </span>
                <span className="text-sm text-white/70">{user.role.role_name}</span>
              </div>
              <ChevronDown className={`w-5 h-5 ml-2 opacity-70 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-[#001529] ring-1 ring-black ring-opacity-5">
                <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
                  <button
                    className="w-full text-left px-4 py-2 text-sm text-white hover:bg-white/10 transition-colors duration-200"
                    role="menuitem"
                  >
                    Edit Profile
                  </button>
                  <button
                    className="w-full text-left px-4 py-2 text-sm text-white hover:bg-white/10 transition-colors duration-200"
                    role="menuitem"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
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
        )}
      </div>
    </div>
  );
};

export default TopBar;

