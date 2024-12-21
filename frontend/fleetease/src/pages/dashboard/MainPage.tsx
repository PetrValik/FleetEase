import React from 'react';
import { useUser } from '../../contexts/UserContext';
import About from '../../components/dashboard/components/About';
import Dashboard from './Dashboard';

const MainPage: React.FC = () => {
  const { isAuthenticated } = useUser();
  return isAuthenticated ? <Dashboard /> : <About />;
};

export default MainPage;
