import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext";
import Layout from "./components/layout/Layout";
import RedirectIfAuthenticated from "./components/auth/RedirectIfAuthenticated";
import MainPage from "./pages/dashboard/MainPage";
import SignUp from "./pages/auth/SignUp";
import SignIn from "./pages/auth/SignIn";
import Auditlog_Book from "./pages/admin_pages/Auditlog_Book";
import Inspection_Intervals from "./pages/admin_pages/Inspection_Intervals";
//import User_Management from "./pages/admin_pages/User_Management";
// import Roles_Company from "./pages/manager_pages/Roles_Company";
import { getStoredToken } from "./utils/authUtils";
import axios from "axios";
import RoleBasedRoute from "./components/auth/RoleBasedRoute"; // Import nové komponenty

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
            path="/"
            element={
              <RoleBasedRoute allowedRoles={["Admin", "Manager", "Driver"]}>
                <Layout>
                  <MainPage />
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
                  <MainPage />
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
