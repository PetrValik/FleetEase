import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Role = 'Owner' | 'Manager' | 'Driver' | null;

interface User {
  user_id: number;
  email: string;
  first_name: string;
  last_name: string;
  is_active: boolean;
  role: {
    role_id: number;
    role_name: Role;
  };
}

interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  isAuthenticated: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null); // Default to null for unauthenticated state

  const isAuthenticated = user !== null;

  return (
    <UserContext.Provider value={{ user, setUser, isAuthenticated }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

