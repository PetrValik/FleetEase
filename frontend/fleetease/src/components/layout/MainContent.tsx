import React from 'react';

interface MainContentProps {
  children: React.ReactNode;
}

const MainContent: React.FC<MainContentProps> = ({ children }) => {
  return (
    <main className="flex-1 p-2 md:p-6 bg-gray-100 overflow-y-auto">
      {children}
    </main>
  );
};

export default MainContent;