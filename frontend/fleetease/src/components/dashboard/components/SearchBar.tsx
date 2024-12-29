import React, { useState } from 'react';
import { getAllVehicles } from '../../../database/vehicles/vehicles'; // Import the API method to fetch all vehicles
import * as Toast from "../../../utils/toastUtils";

interface SearchBarProps {
  onSearchResult: (vehicle: any | null) => void; // Using 'any' type for now based on the mock data structure
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearchResult }) => {
  const [searchTerm, setSearchTerm] = useState<string>(''); // State to store search term
  const [loading, setLoading] = useState<boolean>(false); // State for loading
  const [error, setError] = useState<string | null>(null); // State for error handling

  // Function to handle search
  const handleSearch = async (event: React.MouseEvent) => {
    event.preventDefault();
    if (!searchTerm.trim()) {
      setError('Please enter a valid registration number.');
      return;
    }
  
    setLoading(true);
    setError(null); // Reset error state
  
    try {
      // Fetch all vehicles from the API
      const vehicles = await getAllVehicles();
  
      if (vehicles.length === 0) {
        setError('No vehicles found.');
        return;
      }
  
      // Normalize both registration number and search term by removing spaces and converting to lowercase
      const formattedSearchTerm = searchTerm.replace(/\s+/g, '').toLowerCase();
  
      // Find the vehicle by its registration number
      const result = vehicles.find(
        (vehicle) =>
          vehicle.registration_number.replace(/\s+/g, '').toLowerCase() === formattedSearchTerm
      );
  
      // Pass the result back to the parent component
      onSearchResult(result || null);
    } catch (error) {
      console.error('Error fetching vehicles:', error);
      Toast.showErrorToast("Unable to fetch vehicles");
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
