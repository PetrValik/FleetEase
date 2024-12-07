import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';
import Layout from './components/layout/Layout';
import UnauthenticatedLayout from './components/layout/UnauthenticatedLayout';
import Dashboard from './pages/dashboard/Dashboard';
import SignUp from './pages/auth/SignUp';
import SignIn from './pages/auth/SignIn';

const App: React.FC = () => {
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
          <Route path="/" element={
            <Layout>
              <Dashboard />
            </Layout>
          } />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;

