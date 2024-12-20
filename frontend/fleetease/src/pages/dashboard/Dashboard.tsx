import React, { useState, useEffect } from 'react';
import { useUser } from '../../contexts/UserContext'; // Import user context if needed
import About from '../../components/dashboard/components/About';
import { Truck, Shield, Clock, BarChart, Users, PlusCircle, Filter, Search } from 'lucide-react';
import VehicleList from '../../components/dashboard/components/VehicleList'; // Correct import for VehicleList
import { Button } from '../../components/dashboard/components/ui/Button';
import AddVehicleModal from '../../components/dashboard/components/popovers/AddNewVehicle';
import FilterPopover from '../../components/dashboard/components/popovers/FilterPopover';
import './Dashboard.css';
import { createVehicle, getAllVehicles } from '../../database/vehicles/vehicles'; // Adjust according to your file structure
import { Vehicle } from '../../database/vehicles/vehicles'; // Import the correct Vehicle type

type FuelType = 'gas' | 'diesel' | 'electric' | 'hybrid'; // Updated fuel types based on real data
type VehicleState = 'inUse' | 'available' | 'maintenance';

const getFuelFilterValue = (fuelType: string, fuelFilters: { [key: string]: boolean }) => {
  const normalizedFuelType = fuelType.toLowerCase();
  return fuelFilters[normalizedFuelType] ?? false;
};

const Dashboard: React.FC = () => {
  const { isAuthenticated, user } = useUser();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]); // Correct type for state
  const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[]>([]); // To store filtered vehicles
  const [isAddVehicleModalOpen, setIsAddVehicleModalOpen] = useState<boolean>(false);
  const [filters, setFilters] = useState({
    typeFilters: { truck: false, van: false, car: false },
    fuelFilters: { gas: false, diesel: false, electric: false, hybrid: false },
    stateFilters: { inUse: false, available: false, maintenance: false },
  });
  const [isFilterPopoverVisible, setIsFilterPopoverVisible] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchResult, setSearchResult] = useState<Vehicle | null>(null); // Adjusted to use the Vehicle type
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch vehicles on load
  useEffect(() => {
    if (isAuthenticated) {
      setLoading(true);
      getAllVehicles()
        .then((data) => {
          setVehicles(data);
          setFilteredVehicles(data); // Initialize filtered vehicles with the fetched data
        })
        .catch((err) => setError('Failed to fetch vehicles'))
        .finally(() => setLoading(false));
    }
  }, [isAuthenticated]);

  const handleAddVehicle = async (newVehicle: Vehicle) => {
    setLoading(true);
    setError(null);

    try {
      const createdVehicle = await createVehicle(user?.company_id ?? 1, newVehicle);

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
    setFilters(newFilters);
    setIsFilterPopoverVisible(false);

    // Apply filters to vehicles
    const filtered = vehicles.filter((vehicle) => {
      const typeMatch =
        (!newFilters.typeFilters.truck && !newFilters.typeFilters.van && !newFilters.typeFilters.car) ||
        (newFilters.typeFilters.truck && vehicle.vehicle_status.toLowerCase().includes('truck')) ||
        (newFilters.typeFilters.van && vehicle.vehicle_status.toLowerCase().includes('van')) ||
        (newFilters.typeFilters.car && vehicle.vehicle_status.toLowerCase().includes('car'));

      const fuelMatch =
        (!newFilters.fuelFilters.gas && !newFilters.fuelFilters.diesel && !newFilters.fuelFilters.electric && !newFilters.fuelFilters.hybrid) ||
        getFuelFilterValue(vehicle.fuel_type, newFilters.fuelFilters);

      const stateMatch =
        (!newFilters.stateFilters.inUse && !newFilters.stateFilters.available && !newFilters.stateFilters.maintenance) ||
        (newFilters.stateFilters.inUse && vehicle.vehicle_status === 'In Use') ||
        (newFilters.stateFilters.available && vehicle.vehicle_status === 'Available') ||
        (newFilters.stateFilters.maintenance && vehicle.vehicle_status === 'Maintenance');

      return typeMatch && fuelMatch && stateMatch;
    });

    setFilteredVehicles(filtered);
  };

  const handleClearFilter = () => {
    setFilters({
      typeFilters: { truck: false, van: false, car: false },
      fuelFilters: { gas: false, diesel: false, electric: false, hybrid: false },
      stateFilters: { inUse: false, available: false, maintenance: false },
    });
    setIsFilterPopoverVisible(false);
    setFilteredVehicles(vehicles); // Reset filters and show all vehicles
  };

  const handleSearch = () => {
    const result = vehicles.find(
      (vehicle) => vehicle.registration_number.toLowerCase() === searchTerm.toLowerCase()
    );
    setSearchResult(result || null);
    setFilteredVehicles(result ? [result] : vehicles); // Show the result if found, otherwise show all vehicles
  };

  if (!isAuthenticated) {
    return <About />;
  }

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-header">Welcome to Your Dashboard</h1>
      <p className="dashboard-subheader">Here's an overview of your fleet management activities.</p>

      <div className="dashboard-stats">
        {[{ icon: Truck, title: 'Total Vehicles', value: vehicles.length },
          { icon: Shield, title: 'Vehicles Due for Inspection', value: '3' },
          { icon: Clock, title: 'Scheduled Maintenances', value: '7' },
          { icon: BarChart, title: 'Fleet Efficiency', value: '92%' },
          { icon: Users, title: 'Active Drivers', value: '18' },
        ].map((item, index) => (
          <div key={index} className="dashboard-stat-card">
            <item.icon className="w-8 h-8 text-indigo-600 mr-3" />
            <div>
              <h2>{item.title}</h2>
              <p>{item.value}</p>
            </div>
          </div>
        ))}
      </div>

      <section className="vehicle-list-section mt-12">
        <h2 className="text-2xl font-bold mb-4">Vehicle List</h2>

        <div className="dashboard-btn-container">
          <Button
            variant="outline"
            className="dashboard-btn-add"
            onClick={() => setIsAddVehicleModalOpen(true)}
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Add new vehicle
          </Button>

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

        {isFilterPopoverVisible && (
          <div className="filter-modal-overlay">
            <div className="filter-modal-content">
              <button
                className="filter-modal-close-btn"
                onClick={() => setIsFilterPopoverVisible(false)}
              >
                ×
              </button>
              <FilterPopover
                typeFilters={filters.typeFilters}
                fuelFilters={filters.fuelFilters}
                stateFilters={filters.stateFilters}
                onApplyFilter={handleApplyFilter}
                onClearFilter={handleClearFilter}
              />
            </div>
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
