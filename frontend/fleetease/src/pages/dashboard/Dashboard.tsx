import React, { useState } from 'react';
import { useUser } from '../../contexts/UserContext';
import About from '../../components/dashboard/componenets/About';
import { Truck, Shield, Clock, BarChart, Users, PlusCircle, Filter } from 'lucide-react';
import VehicleList from '../../components/dashboard/componenets/VehicleList';
import { mockVehicles, Vehicle } from '../../database/vehicles/mocks';
import { Button } from '../../components/dashboard/componenets/ui/Button';
import AddVehicleModal from '../../components/dashboard/componenets/popovers/AddNewVehicle';
import FilterPopover from '../../components/dashboard/componenets/popovers/FilterPopover';
import './Dashboard.css';

type FuelType = 'gas' | 'diesel' | 'electric';
type VehicleState = 'inUse' | 'available' | 'maintenance';

const getFuelFilterValue = (fuelType: string, fuelFilters: { [key: string]: boolean }) => {
  const normalizedFuelType = fuelType.toLowerCase();
  return fuelFilters[normalizedFuelType] ?? false;
};

const Dashboard: React.FC = () => {
  const { isAuthenticated } = useUser();
  const [vehicles, setVehicles] = useState<Vehicle[]>(mockVehicles as Vehicle[]);
  const [isAddVehicleModalOpen, setIsAddVehicleModalOpen] = useState<boolean>(false);
  const [filters, setFilters] = useState({
    typeFilters: { truck: false, van: false, car: false },
    fuelFilters: { gas: false, diesel: false, electric: false },
    stateFilters: { inUse: false, available: false, maintenance: false },
  });
  const [isFilterPopoverVisible, setIsFilterPopoverVisible] = useState<boolean>(false);

  const handleAddVehicle = (newVehicle: Vehicle) => {
    setVehicles([...vehicles, newVehicle]);
    setIsAddVehicleModalOpen(false);
  };

  const handleApplyFilter = (newFilters: any) => {
    setFilters(newFilters); // Update filters with the new values
    setIsFilterPopoverVisible(false); // Close the filter popover after applying
  };

  const handleClearFilter = () => {
    setFilters({
      typeFilters: { truck: false, van: false, car: false },
      fuelFilters: { gas: false, diesel: false, electric: false },
      stateFilters: { inUse: false, available: false, maintenance: false },
    });
    setIsFilterPopoverVisible(false); // Close the filter popover after clearing
  };

  const filteredVehicles = vehicles.filter((vehicle) => {
    const typeMatch =
      (!filters.typeFilters.truck && !filters.typeFilters.van && !filters.typeFilters.car) ||
      (filters.typeFilters.truck && vehicle.vehicleType.toLowerCase().includes('truck')) ||
      (filters.typeFilters.van && vehicle.vehicleType.toLowerCase().includes('van')) ||
      (filters.typeFilters.car && vehicle.vehicleType.toLowerCase().includes('car'));

    const fuelMatch =
      (!filters.fuelFilters.gas && !filters.fuelFilters.diesel && !filters.fuelFilters.electric) ||
      getFuelFilterValue(vehicle.fuelType, filters.fuelFilters);

    const stateMatch =
      (!filters.stateFilters.inUse && !filters.stateFilters.available && !filters.stateFilters.maintenance) ||
      (filters.stateFilters.inUse && vehicle.status === 'In Use') ||
      (filters.stateFilters.available && vehicle.status === 'Available') ||
      (filters.stateFilters.maintenance && vehicle.status === 'Maintenance');

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

          <div className="filter-button-container">
            <Button
              variant="outline"
              className="dashboard-btn-filter"
              onClick={() => setIsFilterPopoverVisible((prev) => !prev)}
            >
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
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
                typeFilters={filters.typeFilters}  // Pass individual filters
                fuelFilters={filters.fuelFilters}
                stateFilters={filters.stateFilters}
                onApplyFilter={handleApplyFilter}
                onClearFilter={handleClearFilter}
              />
            </div>
          </div>
        )}

        {vehicles.length === 0 ? (
          <div>No vehicles yet.</div>
        ) : (
          <VehicleList vehicles={filteredVehicles} />
        )}
      </section>

      {isAddVehicleModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button
              className="modal-close-btn"
              onClick={() => setIsAddVehicleModalOpen(false)}
            >
              ×
            </button>
            <AddVehicleModal
              isOpen={isAddVehicleModalOpen}
              onClose={() => setIsAddVehicleModalOpen(false)}
              onSave={handleAddVehicle}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;