import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface SidebarToggleProps {
  isCollapsed: boolean;
  setIsCollapsed: (isCollapsed: boolean) => void;
}

const SidebarToggle: React.FC<SidebarToggleProps> = ({ isCollapsed, setIsCollapsed }) => {
  return (
    <div>
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
  );
};

export default SidebarToggle;

