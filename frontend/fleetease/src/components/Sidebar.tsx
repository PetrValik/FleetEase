import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, ChevronLeft, ChevronRight, Car, PenToolIcon as Tool, Calendar, Users, Settings, FileText, AlertTriangle } from 'lucide-react';
import { useUser } from '../contexts/UserContext';
import type { Role } from '../contexts/UserContext';

interface NavItem {
  path: string;
  label: string;
  icon: React.ElementType;
}

const getNavItems = (role: Role): NavItem[] => {
  // Common items for all authenticated users
  const commonItems: NavItem[] = [
    { path: '/', label: 'Dashboard', icon: Home },
  ];

  // Role-specific items
  const roleItems: Record<NonNullable<Role>, NavItem[]> = {
    Driver: [
      { path: '/vehicles', label: 'My Vehicles', icon: Car },
      { path: '/defects', label: 'Report Defect', icon: AlertTriangle },
      { path: '/schedule', label: 'My Schedule', icon: Calendar },
    ],
    Manager: [
      { path: '/vehicles', label: 'Vehicles', icon: Car },
      { path: '/defects', label: 'Defects', icon: Tool },
      { path: '/schedule', label: 'Schedule', icon: Calendar },
      { path: '/drivers', label: 'Drivers', icon: Users },
    ],
    Owner: [
      { path: '/vehicles', label: 'Vehicles', icon: Car },
      { path: '/defects', label: 'Defects', icon: Tool },
      { path: '/schedule', label: 'Schedule', icon: Calendar },
      { path: '/employees', label: 'Employees', icon: Users },
      { path: '/reports', label: 'Reports', icon: FileText },
      { path: '/settings', label: 'Settings', icon: Settings },
    ],
  };

  return role ? [...commonItems, ...roleItems[role]] : commonItems;
};

const Sidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const { user } = useUser();

  const isActive = (path: string) => location.pathname === path;
  const navItems = getNavItems(user?.role?.role_name ?? null);

  return (
    <div className={`bg-[#001529] text-white transition-all duration-300 ease-in-out ${isCollapsed ? 'w-16' : 'w-60'}`}>
      <div className="fixed h-[calc(100vh-80px)] flex flex-col w-[inherit] box-border">
        <nav className="flex-1 flex flex-col w-full">
          {navItems.map((item) => (
            <Link 
              key={item.path}
              to={item.path} 
              className={`
                w-full flex items-center gap-3 
                py-3 pl-6 pr-4
                text-white no-underline 
                transition-colors duration-200 
                hover:bg-white/10
                ${isActive(item.path) ? 'bg-white/10' : ''}
                ${isCollapsed ? 'justify-center pl-0' : ''}
              `}
            >
              <item.icon className="w-6 h-6 flex-shrink-0" />
              {!isCollapsed && <span className="whitespace-nowrap overflow-hidden text-ellipsis">{item.label}</span>}
            </Link>
          ))}
        </nav>

        <div className="px-4 pb-4 w-full">
          <button
            className={`
              w-full h-10
              flex items-center justify-center 
              bg-transparent border-none 
              text-white cursor-pointer 
              rounded-md transition-colors duration-200 
              hover:bg-white/10
            `}
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            {isCollapsed ? <ChevronRight className="w-6 h-6" /> : <ChevronLeft className="w-6 h-6" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

