import React from 'react';
import { useUser } from '../contexts/UserContext';
import TopBar from './TopBar';
import Sidebar from './Sidebar';
import MainContent from './MainContent';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isAuthenticated } = useUser();

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-gray-100">
      <TopBar />
      <div className="flex flex-1 overflow-hidden">
        {isAuthenticated && <Sidebar />}
        <MainContent>{children}</MainContent>
      </div>
    </div>
  );
};

export default Layout;

