import React from 'react'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import Header from './components/Header'; // Komponenta pro hlavičku aplikace
import Sidebar from './components/Sidebar'; // Komponenta pro postranní menu
import Dashboard from './pages/Dashboard'; // Hlavní stránka (přehled)
import AddEntity from './components/AddEntity'; // Komponenta pro přidání nové entity
import EntityDetail from './pages/EntityDetail'; // Stránka pro detail konkrétní entity
import { UserProvider } from './context/UserContext'; // Poskytovatel kontextu uživatele pro celou aplikaci
import './App.css'; // Globální CSS styly

function App() {
  return (
    // Poskytovatel uživatelského kontextu, který zajistí, že bude informace o uživateli dostupná v celé aplikaci
    <UserProvider>
      {/* Definování routeru pro řízení navigace v aplikaci */}
      <Router>
        <div className="app">
          {/* Vložení hlavičky */}
          <Header />
          <div className="main">
            {/* Vložení postranního menu */}
            <Sidebar />
            {/* Definování jednotlivých cest (routes), které aplikace nabízí */}
            <Routes>
              {/* Každá cesta se mapuje na specifickou komponentu */}
              <Route path="/" element={<Dashboard />} />
              <Route path="/add-entity" element={<AddEntity />} />
              <Route path="/entity/:id" element={<EntityDetail />} />
            </Routes>
          </div>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
