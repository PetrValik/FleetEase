import React, { useState, useEffect } from 'react';
import { getVehicleById, updateVehicle, deleteVehicle, Vehicle } from '../../database/vehicles/vehicles';
import { getVehicleBrandById } from '../../database/vehicles/vehicleBrand';
import { getVehicleModelById } from '../../database/vehicles/vehicleModel';
import { getCountryById, Country } from '../../database/vehicles/countries';
import { getVehicleCategoryById } from '../../database/vehicles/vehicleCategory';
import { getReservationsByVehicleId, Reservation } from '../../database/reservations/reservations';
import { Edit, Trash2, Car } from 'lucide-react';
import EditVehicleModal from './modals/EditVehicleModal';
import DeleteButton from './ui/DeleteButton';
import { useUser } from '../../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import * as Toast from "../../utils/toastUtils";

interface VehicleDetailsCardProps {
  vehicleId: number;
}

const VehicleDetailsCard: React.FC<VehicleDetailsCardProps> = ({ vehicleId }) => {
  const { user } = useUser();
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [vehicleBrand, setVehicleBrand] = useState<string | null>(null);
  const [vehicleModel, setVehicleModel] = useState<string | null>(null);
  const [vehicleCategory, setVehicleCategory] = useState<string | null>(null);
  const [registrationCountry, setRegistrationCountry] = useState<Country | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reservations, setReservations] = useState<Reservation[]>([]);

  const navigate = useNavigate();

  const isCurrentlyReserved = (reservations: Reservation[]): boolean => {
    const now = new Date();
    return reservations.some(res => {
      const startTime = new Date(res.start_time);
      const endTime = new Date(res.end_time);
      return now >= startTime && now <= endTime;
    });
  };

  useEffect(() => {
    const fetchVehicleData = async () => {
      try {
        setLoading(true);
        const fetchedVehicle = await getVehicleById(vehicleId);
        setVehicle(fetchedVehicle);

        if (fetchedVehicle) {
          const model = await getVehicleModelById(fetchedVehicle.model_id);
          const [brand, category, country, fetchedReservations] = await Promise.all([
            model ? getVehicleBrandById(model.brand_id) : null,
            getVehicleCategoryById(fetchedVehicle.category_id),
            getCountryById(fetchedVehicle.country_id),
            getReservationsByVehicleId(vehicleId),
          ]);

          setVehicleBrand(brand?.brand_name || 'Not available');
          setVehicleModel(model?.model_name || 'Not available');
          setVehicleCategory(category?.category_name || 'Not available');
          setRegistrationCountry(country || null);
          setReservations(fetchedReservations);

          // Update vehicle status if currently reserved
          if (isCurrentlyReserved(fetchedReservations)) {
            setVehicle(prev => prev ? { ...prev, vehicle_status: 'Reserved' } : null);
          }
        }
      } catch (err) {
        console.error('Error fetching vehicle details:', err);
        Toast.showErrorToast("Failed to load vehicle details");
        setError('Failed to load vehicle details.');
      } finally {
        setLoading(false);
      }
    };

    fetchVehicleData();
  }, [vehicleId]);

  const handleOpenModal = () => setIsEditModalOpen(true);
  const handleCloseModal = () => setIsEditModalOpen(false);

  const handleSave = async (updatedVehicle: Vehicle) => {
    try {
      fetchVehicle(); // Reload vehicle details after save
    } catch (error) {
      console.error('Error updating vehicle:', error);
      Toast.showErrorToast("Failed to save vehicle updates");
      setError('Failed to save vehicle updates.');
    } finally {
      handleCloseModal();
    }
  };

  const handleDelete = async () => {
    try {
      const success = await deleteVehicle(vehicleId);
      if (success) {
        setVehicle(null);
        Toast.showSuccessToast("Vehicle successfully deleted");
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Error deleting vehicle:', error);
      Toast.showErrorToast("Failed to delete vehicle");
      setError('Failed to delete vehicle.');
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
  const isAdminOrManager = user?.role?.role_name === 'Admin' || user?.role?.role_name === 'Manager';

  const statusColors = {
    Available: "bg-[#10b91d]",
    Reserved: "bg-[#3b82f6]",
    Maintenance: "bg-[#ef4444]",
    "In Maintenance": "bg-[#ef4444]",
    "Defect State": "bg-[#ef4444]",
    "Out of Order": "bg-[#ef4444]",
    Decommissioned: "bg-[#6b7280]",
    Disabled: "bg-[#6b7280]",
  };

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
        <span 
          className={`ml-auto px-4 py-2 text-sm font-semibold rounded-full ${
            statusColors[vehicle.vehicle_status as keyof typeof statusColors] || 'bg-gray-500'
          } text-white`}
        >
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
        {isAdminOrManager && (
          <>
            <button className="bg-blue-500 text-white py-2 px-4 rounded-lg flex items-center" onClick={handleOpenModal}>
              <Edit className="mr-2" />
              Edit
            </button>
            <DeleteButton
              vehicleId={vehicle.vehicle_id}
              vehicleRegistrationNumber={vehicle.registration_number}
              onDelete={handleDelete}
            />
          </>
        )}
      </div>

      <EditVehicleModal
        vehicle={vehicle}
        isOpen={isEditModalOpen}
        onClose={handleCloseModal}
        onSave={handleSave}
        loading={loading}
        error={error}
      />
    </div>
  );
};

export default VehicleDetailsCard;

