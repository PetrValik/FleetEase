import React, { useState, createContext } from 'react';

// Vytvoření kontextu pro uživatele
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // Stav uživatele (původně null = nepřihlášen)
  const [user, setUser] = useState(null);

  // Funkce pro přihlášení uživatele
  const login = (name) => {
    setUser({ name });
  };

  // Funkce pro odhlášení uživatele
  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children} {/* Zde budou renderovány všechny děti (komponenty), které mají přístup ke kontextu */}
    </UserContext.Provider>
  );
};
