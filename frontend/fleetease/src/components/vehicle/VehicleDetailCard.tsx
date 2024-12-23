import React, { useState, useEffect } from 'react';
import { getVehicleById, updateVehicle, deleteVehicle, Vehicle } from '../../database/vehicles/vehicles';
import { getVehicleBrandById } from '../../database/vehicles/vehicleBrand';
import { getVehicleModelById } from '../../database/vehicles/vehicleModel';
import { getCountryById, Country } from '../../database/vehicles/countries';
import { getVehicleCategoryById } from '../../database/vehicles/vehicleCategory';
import { Edit, Trash2, Car } from 'lucide-react';
import EditVehicleModal from './modals/EditVehicleModal';
import DeleteButton from './ui/DeleteButton';

interface VehicleDetailsCardProps {
  vehicleId: number;
}

const VehicleDetailsCard: React.FC<VehicleDetailsCardProps> = ({ vehicleId }) => {
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [vehicleBrand, setVehicleBrand] = useState<string | null>(null);
  const [vehicleModel, setVehicleModel] = useState<string | null>(null);
  const [vehicleCategory, setVehicleCategory] = useState<string | null>(null);
  const [registrationCountry, setRegistrationCountry] = useState<Country | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // State for error

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        setLoading(true);
        const fetchedVehicle = await getVehicleById(vehicleId);
        setVehicle(fetchedVehicle);

        if (fetchedVehicle) {
          const brand = await getVehicleBrandById(fetchedVehicle.category_id);
          const model = await getVehicleModelById(fetchedVehicle.model_id);
          const category = await getVehicleCategoryById(fetchedVehicle.category_id);
          const country = await getCountryById(fetchedVehicle.country_id);

          setVehicleBrand(brand?.brand_name || 'Not available');
          setVehicleModel(model?.model_name || 'Not available');
          setVehicleCategory(category?.category_name || 'Not available');
          setRegistrationCountry(country || null);
        }
      } catch (err) {
        console.error('Error fetching vehicle details:', err);
        setError('Failed to load vehicle details.'); // Set error state
      } finally {
        setLoading(false);
      }
    };

    fetchVehicle();
  }, [vehicleId]);

  const handleOpenModal = () => setIsEditModalOpen(true);
  const handleCloseModal = () => setIsEditModalOpen(false);

  const handleSave = async (updatedVehicle: Vehicle) => {
    try {
      const { vehicle_id, ...updateData } = updatedVehicle;
      const savedVehicle = await updateVehicle(vehicleId, updateData);
      setVehicle(savedVehicle);
    } catch (error) {
      console.error('Error updating vehicle:', error);
      setError('Failed to save vehicle updates.'); // Set error state on failure
    } finally {
      handleCloseModal();
    }
  };

  const handleDelete = async () => {
    try {
      const success = await deleteVehicle(vehicleId);
      if (success) {
        setVehicle(null); // Clear vehicle state after deletion
      }
    } catch (error) {
      console.error('Error deleting vehicle:', error);
      setError('Failed to delete vehicle.'); // Set error state on failure
    }
  };

  if (loading) {
    return <p>Loading vehicle details...</p>;
  }

  if (!vehicle) {
    return <p>Vehicle not found or deleted.</p>;
  }

  const createdAtDate = new Date(vehicle.created_at).toLocaleString();
  const formattedVIN = vehicle.vin.toUpperCase();

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center">
        <div className="w-16 h-16 bg-gray-300 rounded-full mr-4 flex items-center justify-center">
          <Car className="text-gray-600" size={32} />
        </div>
        <div>
          <h2 className="text-xl font-semibold">{vehicleModel} ({vehicleBrand})</h2>
          <p className="text-gray-600 text-sm">{vehicle.registration_number}</p>
        </div>
        <span className={`ml-auto px-4 py-2 text-sm font-semibold rounded-full ${vehicle.vehicle_status === 'Available' ? 'bg-green-500 text-white' : 'bg-gray-500 text-white'}`}>
          {vehicle.vehicle_status}
        </span>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-semibold">Vehicle Details</h3>
          <p><strong>VIN:</strong> {formattedVIN}</p>
          <p><strong>Created at:</strong> {createdAtDate}</p>
          <p><strong>Registration State:</strong> {registrationCountry?.country_name || 'Not available'}</p>
          <p><strong>Vehicle Type:</strong> {vehicleCategory}</p>
        </div>
        <div>
          <h3 className="font-semibold">Technical Specifications</h3>
          <p><strong>Fuel Type:</strong> {vehicle.fuel_type || 'Not available'}</p>
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
          onDelete={handleDelete}
        />
      </div>

      {/* Edit Vehicle Modal */}
      <EditVehicleModal
        vehicle={vehicle}
        isOpen={isEditModalOpen}
        onClose={handleCloseModal}
        onSave={handleSave}
        loading={loading} // Pass loading state
        error={error} // Pass error state
      />
    </div>
  );
};

export default VehicleDetailsCard;
