import React from 'react';
import Topbar from './Topbar';

interface UnauthenticatedLayoutProps {
  children: React.ReactNode;
}

const UnauthenticatedLayout: React.FC<UnauthenticatedLayoutProps> = ({ children }) => {
  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <Topbar />
      <main className="flex-1 flex items-center justify-center overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

export default UnauthenticatedLayout;

