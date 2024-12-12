import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';
import Layout from './components/layout/Layout';
import UnauthenticatedLayout from './components/layout/UnauthenticatedLayout';
import Dashboard from './pages/dashboard/Dashboard';
import SignUp from './pages/auth/SignUp';
import SignIn from './pages/auth/SignIn';
import { getStoredToken, isAuthenticated } from './utils/authUtils';
import axios from 'axios';

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
          <Route path="/signin" element={
            <UnauthenticatedLayout>
              <SignIn />
            </UnauthenticatedLayout>
          } />
          <Route path="/signup" element={
            <UnauthenticatedLayout>
              <SignUp />
            </UnauthenticatedLayout>
          } />
          <Route
            path="/"
            element={
              isAuthenticated() ? (
                <Layout>
                  <Dashboard />
                </Layout>
              ) : (
                <Navigate to="/signin" replace />
              )
            }
          />
          <Route
            path="/vehicle"
            element={
              isAuthenticated() ? (
                <Layout>
                  <Dashboard />
                </Layout>
              ) : (
                <Navigate to="/signin" replace />
              )
            }
          />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;

