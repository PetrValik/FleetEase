import React, { createContext, useContext, useState, ReactNode } from "react";
import { setLogoutHandler } from "../utils/apiClient";
import { removeStoredToken } from "../utils/authUtils";

export type Role = "Admin" | "Manager" | "Driver";

export interface User {
  user_id: number;
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  created_at: string; // time without time zone
  is_active: boolean;
  company_id: number;
  role: {
    role_id: number;
    role_name: Role;
  };
}

interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  isAuthenticated: boolean;
  logout: () => void;
}

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

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
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
