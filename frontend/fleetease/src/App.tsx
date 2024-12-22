import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext";
import Layout from "./components/layout/Layout";
import RedirectIfAuthenticated from "./components/auth/RedirectIfAuthenticated";
import Vehicles from "./pages/vehicles/Vehicles";
import VehicleDetailPage from "./pages/vehicles/Vehicles";
import Dashboard from "./pages/dashboard/Dashboard";
import SignUp from "./pages/auth/SignUp";
import SignIn from "./pages/auth/SignIn";
import Auditlog_Book from "./pages/admin_pages/Auditlog_Book";
import Inspection_Intervals from "./pages/admin_pages/Inspection_Intervals";
//import User_Management from "./pages/admin_pages/User_Management";
// import Roles_Company from "./pages/manager_pages/Roles_Company";
import { getStoredToken } from "./utils/authUtils";
import axios from "axios";
import RoleBasedRoute from "./components/auth/RoleBasedRoute";
import InsurancePage from "./components/insurance/InsurancePage";
import TestPage from "./pages/testPage/TestPage";

const App: React.FC = () => {
  useEffect(() => {
    const token = getStoredToken();
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
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
            /*
          path="/User_Management"
          element={
          /<RoleBasedRoute allowedRoles={["Admin"]}>
          <Layout>
          <User_Management />
          </Layout>
          </RoleBasedRoute>
          }
          */
            path="/vehicles"
            element={
              <RoleBasedRoute allowedRoles={["Admin", "Manager", "Driver"]}>
                <Layout>
                  <Vehicles />
                </Layout>
              </RoleBasedRoute>
            }
          />
          <Route
            path="/vehicle/:vehicleId"
            element={
              <RoleBasedRoute allowedRoles={["Driver", "Manager", "Driver"]}>
                <Layout>
                  <VehicleDetailPage />
                </Layout>
              </RoleBasedRoute>
            }
          />
          <Route
            path="/user_management"
            element={
              <RoleBasedRoute allowedRoles={["Admin", "Manager"]}>
                <Layout>
                  <Dashboard />
                </Layout>
              </RoleBasedRoute>
            }
          />
          <Route
            path="/Inspection_Intervals"
            element={
              <RoleBasedRoute allowedRoles={["Admin"]}>
                <Layout>
                  <Inspection_Intervals />
                </Layout>
              </RoleBasedRoute>
            }
          />
          <Route
            path="/Auditlog_Book"
            element={
              <RoleBasedRoute allowedRoles={["Admin"]}>
                <Layout>
                  <Auditlog_Book />
                </Layout>
              </RoleBasedRoute>
            }
          />
          <Route
          /*
            path="/Roles_Company"
            element={
              <RoleBasedRoute allowedRoles={["Manager"]}>
                <Layout>
                  <Roles_Company />
                  <Dashboard />
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
              */
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
