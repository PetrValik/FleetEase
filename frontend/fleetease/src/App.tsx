import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';
import Layout from './components/layout/Layout'; // Layout with sidebar and other global components
import UnauthenticatedLayout from './components/layout/UnauthenticatedLayout'; // Layout for unauthenticated pages
import Dashboard from './pages/dashboard/Dashboard';
import SignUp from './pages/auth/SignUp';
import SignIn from './pages/auth/SignIn';
import Vehicles from './pages/vehicles/Vehicles';
import VehicleDetail from './pages/vehicles/Vehicles'; // Correct import path for VehicleDetail
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
          {/* Unauthenticated Routes */}
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
          
          {/* Authenticated Routes */}
          <Route
            path="/"
            element={isAuthenticated() ? (
              <Layout>
                <Dashboard />
              </Layout>
            ) : (
              <Navigate to="/signin" replace />
            )}
          />
          <Route
            path="/vehicles"
            element={isAuthenticated() ? (
              <Layout>
                <Vehicles />
              </Layout>
            ) : (
              <Navigate to="/signin" replace />
            )}
          />
          {/* Dynamic route for vehicle detail page */}
          <Route
            path="/vehicle/:vehicleId"  // Dynamic path for vehicle detail
            element={isAuthenticated() ? (
              <Layout>
                <VehicleDetail />
              </Layout>
            ) : (
              <Navigate to="/signin" replace />
            )}
          />
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;
