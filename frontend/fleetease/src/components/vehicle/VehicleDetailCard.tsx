import React, { useState, useEffect } from 'react';
import { getVehicleById, updateVehicle, deleteVehicle, Vehicle } from '../../database/vehicles/vehicles'; // Import API methods
import { getVehicleBrandById } from '../../database/vehicles/vehicleBrand'; // Import brand fetching method
import { getVehicleModelById } from '../../database/vehicles/vehicleModel'; // Import model fetching method
import { getCountryById, Country } from '../../database/vehicles/countries'; // Import country fetching method
import { getVehicleCategoryById } from '../../database/vehicles/vehicleCategory'; // Import category fetching method
import { Edit, Trash2 } from 'lucide-react'; // Importing the icons from lucide-react
import EditVehicleModal from './modals/EditVehicleModal'; // Import the Edit Modal component
import DeleteButton from './ui/DeleteButton'; // Import the DeleteButton component

interface VehicleDetailsCardProps {
  vehicleId: number; // Use vehicle ID instead of the full vehicle object
}

const VehicleDetailsCard: React.FC<VehicleDetailsCardProps> = ({ vehicleId }) => {
  const [vehicle, setVehicle] = useState<Vehicle | null>(null); // Vehicle state
  const [vehicleBrand, setVehicleBrand] = useState<string | null>(null); // Vehicle brand state
  const [vehicleModel, setVehicleModel] = useState<string | null>(null); // Vehicle model state
  const [vehicleCategory, setVehicleCategory] = useState<string | null>(null); // Vehicle type state
  const [registrationCountry, setRegistrationCountry] = useState<Country | null>(null); // Country state
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // State for the delete confirmation modal
  const [loading, setLoading] = useState(true); // State to track loading

  // Fetch the vehicle details by ID
  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        setLoading(true);
        const fetchedVehicle = await getVehicleById(vehicleId);
        setVehicle(fetchedVehicle);

        // Fetch brand, model, and category details
        if (fetchedVehicle) {
          const brand = await getVehicleBrandById(fetchedVehicle.category_id);
          const model = await getVehicleModelById(fetchedVehicle.model_id);
          const category = await getVehicleCategoryById(fetchedVehicle.category_id); // Fetch category (vehicle type)

          if (brand) {
            setVehicleBrand(brand.brand_name); // Set the brand name
          }
          if (model) {
            setVehicleModel(model.model_name); // Set the model name
          }
          if (category) {
            setVehicleCategory(category.category_name); // Set the vehicle type
          }

          // Fetch country for registration state
          const country = await getCountryById(fetchedVehicle.country_id);
          setRegistrationCountry(country); // Set the registration country
        }
      } catch (error) {
        console.error('Error fetching vehicle:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicle();
  }, [vehicleId]);

  // Handle modal open/close for edit
  const handleOpenModal = () => setIsEditModalOpen(true);
  const handleCloseModal = () => setIsEditModalOpen(false);

  // Handle save (onSave) from the edit modal
  const handleSave = async (updatedVehicle: Vehicle) => {
    try {
      const { vehicle_id, ...updateData } = updatedVehicle; // Exclude vehicle_id from the update payload
      const savedVehicle = await updateVehicle(vehicleId, updateData); // Pass only the update data
      if (savedVehicle) {
        setVehicle(savedVehicle);
      }
    } catch (error) {
      console.error('Error updating vehicle:', error);
    } finally {
      handleCloseModal();
    }
  };

  // Handle deletion
  const handleDelete = async () => {
    try {
      const success = await deleteVehicle(vehicleId);
      if (success) {
        console.log(`Vehicle with ID: ${vehicleId} has been deleted`);
        setIsDeleteModalOpen(false);
        setVehicle(null); // Clear the vehicle state after deletion
      }
    } catch (error) {
      console.error(`Error deleting vehicle with ID: ${vehicleId}`, error);
    }
  };

  if (loading) {
    return <p>Loading vehicle details...</p>;
  }

  if (!vehicle) {
    return <p>Vehicle not found or deleted.</p>;
  }

  // Format the created date
  const createdAtDate = new Date(vehicle.created_at).toLocaleString();

  // Format VIN to uppercase
  const formattedVIN = vehicle.vin.toUpperCase(); // Convert VIN to uppercase

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center">
        <div className="w-16 h-16 bg-gray-300 rounded-full mr-4">
          {/* Placeholder for vehicle image */}
        </div>
        <div>
          <h2 className="text-xl font-semibold">{vehicleModel} ({vehicleBrand})</h2>
          <p className="text-gray-600 text-sm">{vehicle.registration_number}</p>
        </div>
        <span
          className={`ml-auto px-4 py-2 text-sm font-semibold rounded-full ${
            vehicle.vehicle_status === 'Available'
              ? 'bg-green-500 text-white'
              : vehicle.vehicle_status === 'Reserved'
              ? 'bg-blue-500 text-white'
              : vehicle.vehicle_status === 'In Maintenance'
              ? 'bg-red-500 text-white'
              : vehicle.vehicle_status === 'Defect State'
              ? 'bg-yellow-500 text-white'
              : vehicle.vehicle_status === 'Out of Order'
              ? 'bg-gray-500 text-white'
              : vehicle.vehicle_status === 'Decommissioned'
              ? 'bg-black text-white'
              : 'bg-gray-500 text-white' // default case
          }`}
        >
          {vehicle.vehicle_status}
        </span>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-semibold">Vehicle Details</h3>
          <p><strong>VIN:</strong> {formattedVIN}</p> {/* Display the VIN in uppercase */}
          <p><strong>Created at:</strong> {createdAtDate}</p> {/* Display full date */}
          <p><strong>Registration State:</strong> {registrationCountry?.country_name || 'Not available'}</p> {/* Display the registration country */}
          <p><strong>Vehicle Type:</strong> {vehicleCategory || 'Not available'}</p> {/* Display the vehicle type */}
        </div>
        <div>
          <h3 className="font-semibold">Technical Specifications</h3>
          <p><strong>Fuel Type:</strong> {vehicle.fuel_type || 'Not available'}</p> {/* Display fuel type or placeholder */}
        </div>
      </div>

      <div className="mt-6 flex justify-end space-x-4">
        <button className="bg-blue-500 text-white py-2 px-4 rounded-lg flex items-center" onClick={handleOpenModal}>
          <Edit className="mr-2" />
          Edit
        </button>
        <DeleteButton
          vehicleId={vehicle.vehicle_id}
          vehicleRegistrationNumber={vehicle.registration_number}
          onDelete={handleDelete} // Trigger the delete function on confirmation
        />
      </div>

      {/* Edit Vehicle Modal */}
      <EditVehicleModal
        vehicle={vehicle}
        isOpen={isEditModalOpen}
        onClose={handleCloseModal}
        onSave={handleSave}
      />
    </div>
  );
};

export default VehicleDetailsCard;
