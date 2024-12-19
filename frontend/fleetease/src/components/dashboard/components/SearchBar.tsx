import React, { useState } from 'react';
import { mockVehicles } from '../../../database/vehicles/mocks'; // Import mockVehicles from mocks

interface SearchBarProps {
  onSearchResult: (vehicle: any | null) => void; // Using 'any' type for now based on the mock data structure
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearchResult }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleSearch = () => {
    // Find a vehicle by its registration number
    const result = mockVehicles.find(
      (vehicle) => vehicle.registration_number.toLowerCase() === searchTerm.toLowerCase()
    );
    onSearchResult(result || null); // Pass the result back to the parent component
  };

  return (
    <div className="search-bar-container">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Enter registration number"
        className="search-input"
      />
      <button onClick={handleSearch} className="search-button">Search</button>
    </div>
  );
};

export default SearchBar;
