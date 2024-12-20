import React, { useState, useEffect } from 'react';
import { useForm, Controller, FieldValues, FieldError } from 'react-hook-form';
import Select from 'react-select'; // Using react-select for auto-suggestions
import { Button } from '../ui/Button'; // Assuming you have your own Button component
import { Input } from '../ui/Input'; // Assuming you have your own Input component
import { Label } from '../ui/Label'; // Assuming you have your own Label component
import { createVehicle } from '../../../../database/vehicles/vehicles'; // Import the createVehicle API function
import { getAllVehicleCategories } from '../../../../database/vehicles/vehicleCategory'; // Import your API function to get vehicle categories

// List of states for suggestions
const stateOptions = [
  { value: 'Czechia', label: 'Czechia' },
  { value: 'Germany', label: 'Germany' },
  { value: 'Austria', label: 'Austria' },
  { value: 'Poland', label: 'Poland' },
  { value: 'Slovakia', label: 'Slovakia' },
  { value: 'Hungary', label: 'Hungary' },
  { value: 'France', label: 'France' },
  { value: 'Italy', label: 'Italy' },
];

const fuelTypeOptions = [
  { value: 'Diesel', label: 'Diesel' },
  { value: 'Natural 95', label: 'Natural 95' },
  { value: 'Natural 98', label: 'Natural 98' },
  { value: 'Electric', label: 'Electric' },
  { value: 'Hybrid', label: 'Hybrid' },
  { value: 'Plug-in Hybrid', label: 'Plug-in Hybrid' },
  { value: 'CNG', label: 'CNG' },
  { value: 'LPG', label: 'LPG' },
  { value: 'Hydrogen', label: 'Hydrogen' },
  { value: 'Ethanol', label: 'Ethanol' },
  { value: 'Bio-Diesel', label: 'Bio-Diesel' },
  { value: 'Synthetic Fuels', label: 'Synthetic Fuels' }
];

interface AddVehicleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (newVehicle: any) => void; 
  loading: boolean; 
  error: string | null; 
}

const AddVehicleModal: React.FC<AddVehicleModalProps> = ({ isOpen, onClose, onSave }) => {
  const { control, handleSubmit, formState: { errors } } = useForm();
  const [categories, setCategories] = useState<{ value: number, label: string }[]>([]); // State for categories
  const [loadingCategories, setLoadingCategories] = useState(true); // Loading state for categories

  // Fetch categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesResponse = await getAllVehicleCategories(); 
        const categoriesOptions = categoriesResponse.map((category: any) => ({
          value: category.category_id,
          label: category.category_name,
        }));
        setCategories(categoriesOptions);
      } catch (error) {
        console.error("Error fetching vehicle categories:", error);
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []); // Empty array means this will run once on component mount

  const onSubmit = async (data: FieldValues) => {
    try {
      const newVehicle = {
        vehicle_id: 0,
        model_id: data.model?.value || 0,
        registration_number: data.registrationNumber,
        vin: data.vin,
        category_id: data.vehicleType?.value, // Dynamically assign category ID
        country_id: 1,
        fuel_type: data.fuelType?.value,
        vehicle_status: 'Active',
        created_at: new Date().toISOString(),
        company_id: 1,
      };

      const company_id = 1; // You can update this based on your context
      const createdVehicle = await createVehicle(company_id, newVehicle);
      onSave(createdVehicle); 
      onClose();
    } catch (error) {
      console.error('Error creating vehicle:', error);
    }
  };

  if (!isOpen) return null;

  const customSelectStyles = {
    control: (styles: any) => ({
      ...styles,
      borderRadius: '0.375rem',
      height: '2.5rem',
      padding: '0 0.5rem',
      border: '1px solid #e5e7eb',
      boxShadow: 'none',
      display: 'flex',
      alignItems: 'center',
      '&:hover': {
        borderColor: '#3b82f6',
      },
    }),
    menu: (styles: any) => ({
      ...styles,
      borderRadius: '0.375rem',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      marginTop: 0,
    }),
    option: (styles: any, { isSelected }: { isSelected: boolean }) => ({
      ...styles,
      backgroundColor: isSelected ? '#3b82f6' : 'transparent',
      color: isSelected ? '#ffffff' : '#000000',
      display: 'flex',
      alignItems: 'center',
      padding: '0.5rem 1rem',
      '&:hover': {
        backgroundColor: '#d1d5db',
      },
    }),
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-5 text-2xl font-bold text-gray-700 hover:text-gray-500"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold text-[#061f39] mb-4">Add New Vehicle</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Vehicle Type */}
          <div>
            <Label htmlFor="vehicleType" required>
              Vehicle Type
            </Label>
            <Controller
              name="vehicleType"
              control={control}
              rules={{ required: 'Vehicle Type is required' }}
              render={({ field }) => (
                <div className="dropdown-container relative">
                  {loadingCategories ? (
                    <p>Loading categories...</p>
                  ) : (
                    <Select {...field} id="vehicleType" options={categories} placeholder="Select a vehicle type..." styles={customSelectStyles} />
                  )}
                </div>
              )}
            />
            {errors.vehicleType && (
              <p className="text-red-500 text-xs">{(errors.vehicleType as FieldError).message}</p>
            )}
          </div>

          {/* Brand and Model */}
          <div className="flex gap-4">
            <div className="flex-1">
              <Label htmlFor="brand" required>
                Brand
              </Label>
              <Controller
                name="brand"
                control={control}
                rules={{ required: 'Brand is required' }}
                render={({ field }) => <Input {...field} id="brand" placeholder="Enter brand (e.g., Ford)" />}
              />
              {errors.brand && (
                <p className="text-red-500 text-xs">{(errors.brand as FieldError).message}</p>
              )}
            </div>
            <div className="flex-1">
              <Label htmlFor="model" required>
                Model
              </Label>
              <Controller
                name="model"
                control={control}
                rules={{ required: 'Model is required' }}
                render={({ field }) => <Input {...field} id="model" placeholder="Enter model (e.g., F-150)" />}
              />
              {errors.model && (
                <p className="text-red-500 text-xs">{(errors.model as FieldError).message}</p>
              )}
            </div>
          </div>

          {/* Registration Row (State and Registration Number in the same row) */}
          <div className="flex gap-4">
            <div className="flex-1">
              <Label htmlFor="registrationState" required>
                Registration State
              </Label>
              <Controller
                name="registrationState"
                control={control}
                rules={{ required: 'Registration State is required' }}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={stateOptions}
                    placeholder="Start typing to search..."
                    styles={customSelectStyles}
                  />
                )}
              />
              {errors.registrationState && (
                <p className="text-red-500 text-xs">{(errors.registrationState as FieldError).message}</p>
              )}
            </div>

            <div className="flex-1">
              <Label htmlFor="registrationNumber" required>
                Registration Number
              </Label>
              <Controller
                name="registrationNumber"
                control={control}
                rules={{ required: 'Registration Number is required' }}
                render={({ field }) => <Input {...field} id="registrationNumber" placeholder="ABC 1234" />}
              />
              {errors.registrationNumber && (
                <p className="text-red-500 text-xs">{(errors.registrationNumber as FieldError).message}</p>
              )}
            </div>
          </div>

          {/* VIN */}
          <div>
            <Label htmlFor="vin" required>
              VIN
            </Label>
            <Controller
              name="vin"
              control={control}
              rules={{ required: 'VIN is required' }}
              render={({ field }) => <Input {...field} id="vin" placeholder="Enter Vehicle Identification Number" />}
            />
            {errors.vin && (
              <p className="text-red-500 text-xs">{(errors.vin as FieldError).message}</p>
            )}
          </div>

          {/* Fuel Type */}
          <div>
            <Label htmlFor="fuelType" required>
              Fuel Type
            </Label>
            <Controller
              name="fuelType"
              control={control}
              rules={{ required: 'Fuel Type is required' }}
              render={({ field }) => (
                <div className="dropdown-container relative">
                  <Select {...field} id="fuelType" options={fuelTypeOptions} placeholder="Start typing to search..." styles={customSelectStyles} />
                </div>
              )}
            />
            {errors.fuelType && (
              <p className="text-red-500 text-xs">{(errors.fuelType as FieldError).message}</p>
            )}
          </div>

          {/* Submit Button */}
          <Button type="submit" className="bg-green-500 text-white mt-4 w-full">
            Add Vehicle
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddVehicleModal;
