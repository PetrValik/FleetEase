import React, { useState, useEffect } from 'react';
import { useUser } from '../../contexts/UserContext'; // Import user context if needed
import About from '../../components/dashboard/components/About';
import { Truck, Shield, Clock, BarChart, Users, PlusCircle, Filter, Search } from 'lucide-react';
import VehicleList from '../../components/dashboard/components/VehicleList'; // Correct import for VehicleList
import { Button } from '../../components/dashboard/components/ui/Button';
import AddVehicleModal from '../../components/dashboard/components/popovers/AddNewVehicle';
import FilterPopover from '../../components/dashboard/components/popovers/FilterPopover';
import './Dashboard.css';
import * as Database from '../../database/database';


type FuelType = 'gas' | 'diesel' | 'electric' | 'hybrid'; // Updated fuel types based on real data
type VehicleState = 'inUse' | 'available' | 'maintenance';

const getFuelFilterValue = (fuelType: string, fuelFilters: { [key: string]: boolean }) => {
  const normalizedFuelType = fuelType.toLowerCase();
  return fuelFilters[normalizedFuelType] ?? false;
};

const Dashboard: React.FC = () => {
  const { user, isAuthenticated } = useUser();
  const [vehicles, setVehicles] = useState<Database.Vehicle[]>([]); // Correct type for state
  const [filteredVehicles, setFilteredVehicles] = useState<Database.Vehicle[]>([]); // To store filtered vehicles
  const [isAddVehicleModalOpen, setIsAddVehicleModalOpen] = useState<boolean>(false);
  const [filters, setFilters] = useState({
    typeFilters: { 
      trailer: false,
      bus: false,
      motorcycle: false,
      cargo: false,
      personal: false,
      special: false, 
    },
    fuelFilters: { 
      diesel: false,
      natural95: false,
      natural98: false,
      electric: false,
      hybrid: false,
      plugInHybrid: false,
      cng: false,
      lpg: false,
      hydrogen: false,
      ethanol: false,
      bioDiesel: false,
      syntheticFuels: false, 
    },
    stateFilters: { 
      available: false,
      reserved: false, 
    },
  });
  const [isFilterPopoverVisible, setIsFilterPopoverVisible] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');  // State to track the search term
  const [searchResult, setSearchResult] = useState<Database.Vehicle | null>(null); // Store the search result
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch vehicles on load
  useEffect(() => {
    if (isAuthenticated) {
      setLoading(true);
      Database.getAllVehicles()
        .then((data) => {
          setVehicles(data);
          setFilteredVehicles(data); // Initialize filtered vehicles with the fetched data
        })
        .catch((err) => setError('Failed to fetch vehicles'))
        .finally(() => setLoading(false));
    }
  }, [isAuthenticated]);

  const handleAddVehicle = async (newVehicle: Database.Vehicle) => {
    setLoading(true);
    setError(null);

    try {
      const createdVehicle = await Database.createVehicle(newVehicle);

      if (createdVehicle) {
        setVehicles((prevVehicles) => [...prevVehicles, createdVehicle]);
        setFilteredVehicles((prevVehicles) => [...prevVehicles, createdVehicle]);
      } else {
        setError('Failed to create vehicle. No data returned.');
      }
      setIsAddVehicleModalOpen(false);
    } catch (err) {
      setError('Failed to create vehicle. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleApplyFilter = (newFilters: any) => {
    setFilters(newFilters); // Update filters state
  
    // Apply filters to vehicles
    const filtered = vehicles.filter((vehicle) => {
      // Type filters
      const typeMatch =
        (!newFilters.typeFilters.trailer && !newFilters.typeFilters.bus && !newFilters.typeFilters.motorcycle &&
          !newFilters.typeFilters.cargo && !newFilters.typeFilters.personal && !newFilters.typeFilters.special) ||
        (newFilters.typeFilters.trailer && vehicle.category_id === 1) || // Use category_id instead of registration number
        (newFilters.typeFilters.bus && vehicle.category_id === 2) ||       // Change category_id according to your data
        (newFilters.typeFilters.motorcycle && vehicle.category_id === 3) ||
        (newFilters.typeFilters.cargo && vehicle.category_id === 4) ||
        (newFilters.typeFilters.personal && vehicle.category_id === 5) ||
        (newFilters.typeFilters.special && vehicle.category_id === 6);
  
      // Fuel filters
      const fuelMatch =
        (!newFilters.fuelFilters.diesel && !newFilters.fuelFilters.natural95 && !newFilters.fuelFilters.natural98 &&
          !newFilters.fuelFilters.electric && !newFilters.fuelFilters.hybrid && !newFilters.fuelFilters.plugInHybrid &&
          !newFilters.fuelFilters.cng && !newFilters.fuelFilters.lpg && !newFilters.fuelFilters.hydrogen &&
          !newFilters.fuelFilters.ethanol && !newFilters.fuelFilters.bioDiesel && !newFilters.fuelFilters.syntheticFuels) ||
        (newFilters.fuelFilters.diesel && vehicle.fuel_type === 'Diesel') ||
        (newFilters.fuelFilters.natural95 && vehicle.fuel_type === 'Natural 95') ||
        (newFilters.fuelFilters.natural98 && vehicle.fuel_type === 'Natural 98') ||
        (newFilters.fuelFilters.electric && vehicle.fuel_type === 'Electric') ||
        (newFilters.fuelFilters.hybrid && vehicle.fuel_type === 'Hybrid') ||
        (newFilters.fuelFilters.plugInHybrid && vehicle.fuel_type === 'Plug-in Hybrid') ||
        (newFilters.fuelFilters.cng && vehicle.fuel_type === 'CNG') ||
        (newFilters.fuelFilters.lpg && vehicle.fuel_type === 'LPG') ||
        (newFilters.fuelFilters.hydrogen && vehicle.fuel_type === 'Hydrogen') ||
        (newFilters.fuelFilters.ethanol && vehicle.fuel_type === 'Ethanol') ||
        (newFilters.fuelFilters.bioDiesel && vehicle.fuel_type === 'Bio-Diesel') ||
        (newFilters.fuelFilters.syntheticFuels && vehicle.fuel_type === 'Synthetic Fuels');
  
      // State filters
      const stateMatch =
        (!newFilters.stateFilters.reserved && !newFilters.stateFilters.available && !newFilters.stateFilters.maintenance) ||
        (newFilters.stateFilters.reserved && vehicle.vehicle_status === 'Reserved') || 
        (newFilters.stateFilters.available && vehicle.vehicle_status === 'Available');
  
      return typeMatch && fuelMatch && stateMatch;
    });
  
    setFilteredVehicles(filtered);
  };
  
  const handleClearFilter = () => {
    setFilters({
      typeFilters: { 
        trailer: false,
        bus: false,
        motorcycle: false,
        cargo: false,
        personal: false,
        special: false, 
      },
      fuelFilters: { 
        diesel: false,
        natural95: false,
        natural98: false,
        electric: false,
        hybrid: false,
        plugInHybrid: false,
        cng: false,
        lpg: false,
        hydrogen: false,
        ethanol: false,
        bioDiesel: false,
        syntheticFuels: false, 
      },
      stateFilters: { 
        available: false,
        reserved: false, 
      },
    });
    setFilteredVehicles(vehicles); // Reset filters and show all vehicles
  };
  

  const handleSearch = async () => {
    setLoading(true);  // Set loading when searching
    console.log("Searching for:", searchTerm); // Log search term
  
    if (!searchTerm.trim()) {
      // If search term is empty or just spaces, show all vehicles
      setFilteredVehicles(vehicles);
      setSearchResult(null);
      setLoading(false);
      return;
    }
  
    // Normalize the search term by removing spaces and converting to lowercase for comparison
    const normalizedSearchTerm = searchTerm.replace(/\s+/g, '').toLowerCase();
    console.log("Normalized search term:", normalizedSearchTerm); // Log normalized search term
  
    // Find the vehicle with a matching registration number (case insensitive, space insensitive)
    const result = vehicles.find((vehicle) => {
      const normalizedRegistrationNumber = vehicle.registration_number.replace(/\s+/g, '').toLowerCase();
      return normalizedRegistrationNumber === normalizedSearchTerm;
    });
  
    console.log("Search result:", result); // Log search result
  
    setSearchResult(result || null);
    setFilteredVehicles(result ? [result] : vehicles); // Show the result if found, otherwise show all vehicles
    setLoading(false);  // Reset loading state after search
  };
  

  if (!isAuthenticated) {
    return <About />;
  }

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-header">Welcome to Your Dashboard</h1>
      {/* Removed "Here's an overview of your fleet management activities." and the statistics block */}
      
      <section className="vehicle-list-section mt-12">
        <h2 className="text-2xl font-bold mb-4">Vehicle List</h2>

        <div className="dashboard-btn-container">
        {(user?.role?.role_name === 'Manager' || user?.role?.role_name === 'Admin') && (
          <Button
            variant="outline"
            className="dashboard-btn-add"
            onClick={() => setIsAddVehicleModalOpen(true)}
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Add new vehicle
          </Button>
)}
          <Button
            variant="outline"
            className="dashboard-btn-filter"
            onClick={() => setIsFilterPopoverVisible((prev) => !prev)}
          >
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>

          <div className="search-bar-container">
            <div className="input-container">
              <input
                type="text"
                placeholder="Enter Registration Number"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              <button onClick={handleSearch} className="search-button">
                <Search className="search-icon" />
              </button>
            </div>
          </div>
        </div>

        {/* Filter Popover: Positioned below the filter button */}
        {isFilterPopoverVisible && (
          <div className="filter-popover-container">
            <FilterPopover
               typeFilters={filters.typeFilters}
               fuelFilters={filters.fuelFilters}
               stateFilters={filters.stateFilters}
               onApplyFilter={handleApplyFilter}
               onClearFilter={handleClearFilter}
               onClose={() => setIsFilterPopoverVisible(false)}
            />
          </div>
        )}

        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : (
          <VehicleList vehicles={filteredVehicles} />
        )}
      </section>

      <AddVehicleModal
        isOpen={isAddVehicleModalOpen}
        onClose={() => setIsAddVehicleModalOpen(false)}
        onSave={handleAddVehicle}
        loading={loading}
        error={error}
      />
    </div>
  );
};

export default Dashboard;
