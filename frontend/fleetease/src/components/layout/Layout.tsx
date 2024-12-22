import React from 'react';
import { useUser } from '../../contexts/UserContext';
import Topbar from './Topbar';
import Sidebar from './Sidebar';
import MainContent from './MainContent';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isAuthenticated } = useUser();

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-gray-100">
      <Topbar />
      <div className="flex flex-1 overflow-hidden">
        {isAuthenticated && <Sidebar />}
        <MainContent>{children}</MainContent>
      </div>
    </div>
  );
};

export default Layout;

