import React from 'react';
import { useUser } from '../../contexts/UserContext';
import MainPage from '../../pages/dashboard/MainPage'; // Import MainPage

const RedirectIfAuthenticated: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useUser();

  if (isAuthenticated) {
    // If the user is authenticated, redirect to the main dashboard
    return  <><MainPage/></>;
  }

    // If the user is not authenticated, wrap the content with the Layout component
  return <>{children}</>;
};

export default RedirectIfAuthenticated;
