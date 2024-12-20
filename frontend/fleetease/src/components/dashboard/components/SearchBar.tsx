import React, { useState } from 'react';
import { getAllVehicles } from '../../../database/vehicles/vehicles'; // Import the API method to fetch all vehicles

interface SearchBarProps {
  onSearchResult: (vehicle: any | null) => void; // Using 'any' type for now based on the mock data structure
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearchResult }) => {
  const [searchTerm, setSearchTerm] = useState<string>(''); // State to store search term
  const [loading, setLoading] = useState<boolean>(false); // State for loading
  const [error, setError] = useState<string | null>(null); // State for error handling

  // Function to handle search
  const handleSearch = async () => {
    setLoading(true);
    setError(null); // Reset error state

    try {
      // Fetch all vehicles from the API
      const vehicles = await getAllVehicles();
      // Find the vehicle by its registration number
      const result = vehicles.find(
        (vehicle) => vehicle.registration_number.toLowerCase() === searchTerm.toLowerCase()
      );
      onSearchResult(result || null); // Pass the result back to the parent component
    } catch (error) {
      setError('Failed to fetch vehicles. Please try again later.');
    } finally {
      setLoading(false);
    }
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
      <button onClick={handleSearch} className="search-button" disabled={loading}>
        {loading ? 'Loading...' : 'Search'}
      </button>

      {error && <p className="error-message">{error}</p>} {/* Display error message if any */}
    </div>
  );
};

export default SearchBar;
