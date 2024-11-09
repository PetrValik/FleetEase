import React, { useState } from 'react';
import { Search } from 'lucide-react';

const Collection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');

  const coins = [
    { id: 1, name: 'Československá koruna', year: 1922, value: 1000 },
    { id: 2, name: 'Pražský groš', year: 1300, value: 5000 },
    { id: 3, name: 'Svatováclavský dukát', year: 1923, value: 10000 },
    { id: 4, name: 'Tolar Marie Terezie', year: 1780, value: 2000 },
  ];

  const filteredAndSortedCoins = coins
    .filter(coin => coin.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'year') return a.year - b.year;
      if (sortBy === 'value') return a.value - b.value;
      return a.name.localeCompare(b.name);
    });

  return (
    <div>
      <h2>Moje sbírka mincí</h2>
      <div className="search-container">
        <input
          type="text"
          placeholder="Hledat mince..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Search className="search-icon" />
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="name">Název</option>
          <option value="year">Rok</option>
          <option value="value">Hodnota</option>
        </select>
      </div>
      <div className="coin-list">
        {filteredAndSortedCoins.map(coin => (
          <div key={coin.id} className="coin-card">
            <h3>{coin.name}</h3>
            <p>Rok: {coin.year}</p>
            <p>Hodnota: {coin.value} Kč</p>
            <button>Zobrazit detail</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Collection;