import React, { useState, useEffect } from 'react';
import { useUser } from '../../contexts/UserContext';
import About from '../../components/dashboard/components/About';
import { Truck, Shield, Clock, BarChart, Users, PlusCircle, Filter, Search } from 'lucide-react';
import VehicleList from '../../components/dashboard/components/VehicleList';
import { mockVehicles } from '../../database/vehicles/mocks'; // Corrected import
import { Button } from '../../components/dashboard/components/ui/Button';
import AddVehicleModal from '../../components/dashboard/components/popovers/AddNewVehicle';
import FilterPopover from '../../components/dashboard/components/popovers/FilterPopover';
import './Dashboard.css';
import { createVehicle, getAllVehicles } from '../../database/vehicles/vehicles'; // Adjust according to your file structure

type FuelType = 'gas' | 'diesel' | 'electric' | 'hybrid'; // Updated fuel types based on mock data
type VehicleState = 'inUse' | 'available' | 'maintenance';

const getFuelFilterValue = (fuelType: string, fuelFilters: { [key: string]: boolean }) => {
  const normalizedFuelType = fuelType.toLowerCase();
  return fuelFilters[normalizedFuelType] ?? false;
};

const Dashboard: React.FC = () => {
  const { isAuthenticated, user } = useUser();
  const [vehicles, setVehicles] = useState<typeof mockVehicles>([]); // Updated type
  const [isAddVehicleModalOpen, setIsAddVehicleModalOpen] = useState<boolean>(false);
  const [filters, setFilters] = useState({
    typeFilters: { truck: false, van: false, car: false },
    fuelFilters: { gas: false, diesel: false, electric: false, hybrid: false }, // Updated fuel filters
    stateFilters: { inUse: false, available: false, maintenance: false },
  });
  const [isFilterPopoverVisible, setIsFilterPopoverVisible] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchResult, setSearchResult] = useState<typeof mockVehicles[0] | null>(null); // Adjusted to use the mock data type
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch vehicles on load
  useEffect(() => {
    if (isAuthenticated) {
      setLoading(true);
      getAllVehicles()
        .then((data) => setVehicles(data))
        .catch((err) => setError('Failed to fetch vehicles'))
        .finally(() => setLoading(false));
    }
  }, [isAuthenticated]);

  const handleAddVehicle = async (newVehicle: typeof mockVehicles[0]) => { // Updated to use the correct type
    setLoading(true);
    setError(null);

    try {
      const createdVehicle = await createVehicle(user?.company_id ?? 1, newVehicle);
      setVehicles((prevVehicles) => [...prevVehicles, createdVehicle]);
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
  };

  const handleClearFilter = () => {
    setFilters({
      typeFilters: { truck: false, van: false, car: false },
      fuelFilters: { gas: false, diesel: false, electric: false, hybrid: false }, // Updated filters
      stateFilters: { inUse: false, available: false, maintenance: false },
    });
    setIsFilterPopoverVisible(false);
  };

  const handleSearch = () => {
    const result = vehicles.find(
      (vehicle) => vehicle.registration_number.toLowerCase() === searchTerm.toLowerCase()
    );
    setSearchResult(result || null);
  };

  const filteredVehicles = searchResult ? [searchResult] : vehicles.filter((vehicle) => {
    const typeMatch =
      (!filters.typeFilters.truck && !filters.typeFilters.van && !filters.typeFilters.car) ||
      (filters.typeFilters.truck && vehicle.vehicle_status.toLowerCase().includes('truck')) ||
      (filters.typeFilters.van && vehicle.vehicle_status.toLowerCase().includes('van')) ||
      (filters.typeFilters.car && vehicle.vehicle_status.toLowerCase().includes('car'));

    const fuelMatch =
      (!filters.fuelFilters.gas && !filters.fuelFilters.diesel && !filters.fuelFilters.electric && !filters.fuelFilters.hybrid) ||
      getFuelFilterValue(vehicle.fuel_type, filters.fuelFilters);

    const stateMatch =
      (!filters.stateFilters.inUse && !filters.stateFilters.available && !filters.stateFilters.maintenance) ||
      (filters.stateFilters.inUse && vehicle.vehicle_status === 'In Use') ||
      (filters.stateFilters.available && vehicle.vehicle_status === 'Available') ||
      (filters.stateFilters.maintenance && vehicle.vehicle_status === 'Maintenance');

    return typeMatch && fuelMatch && stateMatch;
  });

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
          <div>Loading vehicles...</div>
        ) : vehicles.length === 0 ? (
          <div>No vehicles yet.</div>
        ) : (
          <VehicleList vehicles={filteredVehicles} />
        )}
      </section>

      {isAddVehicleModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <AddVehicleModal
              isOpen={isAddVehicleModalOpen}
              onClose={() => setIsAddVehicleModalOpen(false)}
              onSave={handleAddVehicle}
              loading={loading}
              error={error}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
