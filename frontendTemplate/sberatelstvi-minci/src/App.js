import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Coins, MessageSquare, Calendar, Bell, LogIn, Menu, User } from 'lucide-react';
import './App.css';

// Importujeme komponenty z nových souborů
import Home from './routes/Home';
import Collection from './routes/Collection';
import Discussions from './routes/Discussions';
import Events from './routes/Events';
import UserProfile from './routes/UserProfile';

function App() {
  return (
    <Router>
      <div className="app">
        <header>
          <button className="menu-button"><Menu /></button>
          <h1>Sběratel mincí</h1>
          <nav>
            <Link to="/">Domů</Link>
            <Link to="/sbirka">Moje sbírka</Link>
            <Link to="/diskuze">Diskuze</Link>
            <Link to="/udalosti">Události</Link>
            <Link to="/profil">Profil</Link>
          </nav>
        </header>
        <div className="main-content">
          <aside>
            <h2>Menu</h2>
            <nav>
              <Link to="/sbirka"><Coins /> Moje sbírka</Link>
              <Link to="/diskuze"><MessageSquare /> Diskuze</Link>
              <Link to="/udalosti"><Calendar /> Události</Link>
              <Link to="/oznameni"><Bell /> Oznámení</Link>
              <Link to="/profil"><User /> Profil</Link>
            </nav>
            <button className="login-button"><LogIn /> Přihlásit se</button>
          </aside>
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/sbirka" element={<Collection />} />
              <Route path="/diskuze" element={<Discussions />} />
              <Route path="/udalosti" element={<Events />} />
              <Route path="/profil" element={<UserProfile />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;