import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';
import Layout from './components/layout/Layout';
import RedirectIfAuthenticated from './components/auth/RedirectIfAuthenticated';
import MainPage from './pages/dashboard/MainPage';
import SignUp from './pages/auth/SignUp';
import SignIn from './pages/auth/SignIn';
import { getStoredToken } from './utils/authUtils';
import axios from 'axios';
import RoleBasedRoute from './components/auth/RoleBasedRoute';
import InsurancePage from './components/insurance/InsurancePage';  // Přidat import

const App: React.FC = () => {
  useEffect(() => {
    const token = getStoredToken();
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }, []);

  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route
            path="/signin"
            element={
              <RedirectIfAuthenticated>
                <Layout> 
                  <SignIn />
                </Layout>
              </RedirectIfAuthenticated>
            }
          />
          <Route
            path="/signup"
            element={
              <RedirectIfAuthenticated>
                <Layout> 
                  <SignUp />
                </Layout>
              </RedirectIfAuthenticated>
            }
          />
          <Route
            path="/"
            element={
              <RoleBasedRoute allowedRoles={['Admin', 'Manager', 'Driver']}>
                <Layout>
                  <MainPage />
                </Layout>
              </RoleBasedRoute>
            }
          />
          {/* Přidat novou routu pro pojistky */}
          <Route
            path="/insurances"
            element={
              <RoleBasedRoute allowedRoles={['Admin', 'Manager']}>
                <Layout>
                  <InsurancePage />
                </Layout>
              </RoleBasedRoute>
            }
          />
          <Route 
            path="*" 
            element={
              <RoleBasedRoute allowedRoles={['Admin', 'Manager', 'Driver']}>
                <Layout>
                  <MainPage />
                </Layout>
              </RoleBasedRoute>
            }
          />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;