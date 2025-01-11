import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, LogOut, Menu } from 'lucide-react';
import { useUser } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import * as Toast from "../../utils/toastUtils";

const TopbarUserMenu: React.FC = () => {
  const { user, logout } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    Toast.showInfoToast("User has been succesfully logged out");
    navigate("/signin");
  };

  // Mobile menu button
  const MobileButton = () => (
    <button
      onClick={() => setIsOpen(!isOpen)}
      className="md:hidden flex items-center gap-2 p-2 cursor-pointer rounded-md transition-all duration-200 hover:bg-white/10"
    >
      <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center font-semibold text-sm">
        {user?.first_name[0]}
        {user?.last_name[0]}
      </div>
      <span className="text-sm font-medium truncate">
        {user?.first_name}
      </span>
      <ChevronDown
        className={`w-4 h-4 opacity-70 transition-transform duration-200 ${
          isOpen ? "rotate-180" : ""
        }`}
      />
    </button>
  );

  // Desktop menu button
  const DesktopButton = () => (
    <button
      onClick={() => setIsOpen(!isOpen)}
      className="hidden md:flex items-center gap-3 p-2 cursor-pointer rounded-md transition-all duration-200 hover:bg-white/10"
    >
      <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center font-semibold text-base">
        {user?.first_name[0]}
        {user?.last_name[0]}
      </div>
      <div className="flex flex-col items-start">
        <span className="text-base font-medium">
          {user?.first_name} {user?.last_name}
        </span>
        <span className="text-sm text-white/70">
          {user?.role?.role_name || "No Role Assigned"}
        </span>
      </div>
      <ChevronDown
        className={`w-5 h-5 ml-2 opacity-70 transition-transform duration-200 ${
          isOpen ? "rotate-180" : ""
        }`}
      />
    </button>
  );

  return (
    <div className="relative" ref={dropdownRef}>
      <MobileButton />
      <DesktopButton />

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-[#001529] ring-1 ring-black ring-opacity-5 z-50">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="user-menu"
          >
            {/* Mobile-only user info */}
            <div className="md:hidden px-4 py-2 border-b border-white/10">
              <div className="font-medium">{user?.first_name} {user?.last_name}</div>
              <div className="text-sm text-white/70">{user?.role?.role_name || "No Role Assigned"}</div>
            </div>
            <button
              className="w-full text-left px-4 py-2 text-sm text-white hover:bg-white/10 transition-colors duration-200 flex items-center gap-2"
              role="menuitem"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TopbarUserMenu;

