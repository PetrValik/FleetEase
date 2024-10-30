import React from 'react';
import { Link } from 'react-router-dom'; // Import Link komponenty pro navigaci mezi stránkami

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        {/* Jednotlivé odkazy pro navigaci do různých částí aplikace */}
        <li>
          <Link to="/">Dashboard</Link>
        </li>
        <li>
          <Link to="/add-entity">Add Entity</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
