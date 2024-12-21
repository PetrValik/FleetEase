import React from 'react';
import Topbar from './Topbar';

interface UnauthenticatedLayoutProps {
  children: React.ReactNode;
}

const UnauthenticatedLayout: React.FC<UnauthenticatedLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Topbar />
      <main className="flex-grow flex items-center justify-center">
        {children}
      </main>
    </div>
  );
};

export default UnauthenticatedLayout;

