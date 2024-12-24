import React, { createContext, useContext, useState, ReactNode } from "react";
import { setLogoutHandler } from "../utils/apiClient";
import { removeStoredToken } from "../utils/authUtils";

export type Role = "Admin" | "Manager" | "Driver";
export interface BackendUser {
  user_id: number;
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string | null;
  created_at: string; // time without time zone
  is_active: boolean;
  company_id: number | null;
  role: {
    role_id: number;
    role_name: Role;
  };
}

interface UserContextType {
  user: BackendUser | null;
  setUser: React.Dispatch<React.SetStateAction<BackendUser | null>>;
  isAuthenticated: boolean;
  logout: () => void;
}

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<BackendUser | null>(null);
  console.log("Context", user)

  const isAuthenticated = user !== null;

  const logout = () => {
    setUser(null);
    removeStoredToken();
  };

  // Set the logout handler for API client
  React.useEffect(() => {
    setLogoutHandler(logout);
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, logout, isAuthenticated }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
