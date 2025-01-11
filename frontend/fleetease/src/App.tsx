import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { UserProvider } from "./contexts/UserContext";
import Layout from "./components/layout/Layout";
import RedirectIfAuthenticated from "./components/auth/RedirectIfAuthenticated";
import Dashboard from "./pages/dashboard/Dashboard";
import SignUp from "./pages/auth/SignUp";
import SignIn from "./pages/auth/SignIn";
import AuditlogBook from "./pages/admin_pages/Auditlog_Book";
import InspectionIntervals from "./pages/admin_pages/Inspection_Intervals";
import UserManagement from "./pages/admin_pages/User_Management";
import RoleCompany from "./pages/manager_pages/Role_Company";
import { getStoredToken } from "./utils/authUtils";
import axios from "axios";
import RoleBasedRoute from "./components/auth/RoleBasedRoute";
import InsurancePage from "./components/insurance/InsurancePage";
import TestPage from "./pages/test_page/TestPage";
import Vehicles from "./pages/vehicles/Vehicles"
import DefectsPage from "./pages/defect_page/DefectsPage";

const App: React.FC = () => {
  useEffect(() => {
    const token = getStoredToken();
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, []);

  return (
    <UserProvider>
      {/* ToastContainer to display toast notifications */}
      <ToastContainer
        position="top-right" // Position of the notifications
        autoClose={5000} // Auto close after 5 seconds
        hideProgressBar={false} // Show progress bar
        newestOnTop={false} // New notifications on top
        closeOnClick // Close on click
        pauseOnFocusLoss // Pause auto-close on focus loss
        draggable // Allow dragging notifications
        pauseOnHover // Pause auto-close on hover
        theme="light" // Light theme
        aria-label="Notification container"
      />
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
            path="/testing"
            element={
              <RoleBasedRoute allowedRoles={["Admin", "Manager", "Driver"]}>
                <Layout>
                  <TestPage />
                </Layout>
              </RoleBasedRoute>
            }
          />
          <Route
            path="/"
            element={
              <RoleBasedRoute allowedRoles={["Admin", "Manager", "Driver"]}>
                <Layout>
                  <Dashboard />
                </Layout>
              </RoleBasedRoute>
            }
          />
          <Route
            path="/vehicle/:vehicleId"
            element={
              <RoleBasedRoute allowedRoles={["Admin", "Manager", "Driver"]}>
                <Layout>
                  <Vehicles />
                </Layout>
              </RoleBasedRoute>
            }
          />
          <Route
            path="/Inspection_Intervals"
            element={
              <RoleBasedRoute allowedRoles={["Admin"]}>
                <Layout>
                  <InspectionIntervals />
                </Layout>
              </RoleBasedRoute>
            }
          />
          <Route
            path="/User_Management"
            element={
              <RoleBasedRoute allowedRoles={["Admin"]}>
                <Layout>
                  <UserManagement />
                </Layout>
              </RoleBasedRoute>
            }
          />
          <Route
            path="/Auditlog_Book"
            element={
              <RoleBasedRoute allowedRoles={["Admin"]}>
                <Layout>
                  <AuditlogBook />
                </Layout>
              </RoleBasedRoute>
            }
          />
          <Route
            path="/defects"
            element={
              <RoleBasedRoute allowedRoles={["Driver", "Manager", "Admin"]}>
                <Layout>
                  <DefectsPage />
                </Layout>
              </RoleBasedRoute>
            }
          />
          <Route
            path="/Role_Company"
            element={
              <RoleBasedRoute allowedRoles={["Manager", "Admin"]}>
                <Layout>
                  <RoleCompany />
                </Layout>
              </RoleBasedRoute>
            }
          />
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
              <RoleBasedRoute allowedRoles={["Admin", "Manager", "Driver"]}>
                <Layout>
                  <Dashboard />
                </Layout>
              </RoleBasedRoute>
            }
          />
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;
