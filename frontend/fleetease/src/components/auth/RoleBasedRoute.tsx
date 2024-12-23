import React from "react";
import { useUser, Role } from "../../contexts/UserContext";
import MainPage from "../../pages/dashboard/MainPage"; // Import MainPage
import Layout from "../layout/Layout"; // Import Layout component

interface RoleBasedRouteProps {
  children: React.ReactNode;
  allowedRoles: Role[];
}

const RoleBasedRoute: React.FC<RoleBasedRouteProps> = ({
  children,
  allowedRoles,
}) => {
  const { user, isAuthenticated } = useUser();

  // If the user is not authenticated, show MainPage
  if (!isAuthenticated || !user) {
    return (
      <Layout>
        <MainPage />
      </Layout>
    );
  }

  // If the user does not have the required role, show MainPage
  if (!user.role || !allowedRoles.includes(user.role.role_name)) {
    return (
      <Layout>
        <MainPage />
      </Layout>
    );
  }

  // If the user is authenticated and has the required role, render the children
  return <>{children}</>;
};

export default RoleBasedRoute;
