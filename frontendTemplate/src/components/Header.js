import React, { useContext } from 'react'; 
import { UserContext } from '../context/UserContext'; // Importování uživatelského kontextu

const Header = () => {
  // Získání uživatelských dat z kontextu
  const { user } = useContext(UserContext);

  return (
    <header className="header">
      <h1>App Header</h1>
      {/* Pokud je uživatel přihlášen, zobrazíme jeho jméno. Pokud ne, vyzveme k přihlášení */}
      <div className="user-info">
        {user ? <span>Welcome, {user.name}!</span> : <span>Please log in</span>}
      </div>
    </header>
  );
};

export default Header;
