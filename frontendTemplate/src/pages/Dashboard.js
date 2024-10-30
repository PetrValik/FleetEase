import React, { useState } from 'react';
import EntityList from '../components/EntityList'; // Import seznamu entit

const Dashboard = () => {
  // Seznam entit (simulovaný)
  const [entities] = useState([
    { id: 1, name: 'Entity One' },
    { id: 2, name: 'Entity Two' }
  ]);

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      {/* Zobrazení seznamu entit */}
      <EntityList entities={entities} />
    </div>
  );
};

export default Dashboard;
