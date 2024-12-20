import React from 'react';
import { Link } from 'react-router-dom';

interface NavItem {
  path: string;
  label: string;
  icon: React.ElementType;
}

interface SidebarNavItemProps {
  item: NavItem;
  isActive: boolean;
  isCollapsed: boolean;
}

const SidebarNavItem: React.FC<SidebarNavItemProps> = ({ item, isActive, isCollapsed }) => {
  return (
    <Link 
      to={item.path} 
      className={`
        w-full flex items-center gap-3 
        py-3 pl-6 pr-4
        text-white no-underline 
        transition-colors duration-200 
        hover:bg-white/10
        ${isActive ? 'bg-white/10' : ''}
        ${isCollapsed ? 'justify-center pl-0' : ''}
      `}
    >
      <item.icon className="w-6 h-6 flex-shrink-0" />
      {!isCollapsed && <span className="whitespace-nowrap overflow-hidden text-ellipsis">{item.label}</span>}
    </Link>
  );
};

export default SidebarNavItem;

