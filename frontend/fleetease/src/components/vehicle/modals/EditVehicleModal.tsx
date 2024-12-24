import React from 'react';
import { useForm, Controller, FieldValues, FieldError } from 'react-hook-form';
import { Button } from '../../dashboard/components/ui/Button'; // Assuming you have your own Button component
import { Input } from '../../dashboard/components/ui/Input'; // Assuming you have your own Input component
import { Select } from '../../dashboard/components/ui/Select'; // Assuming you have your own Select component
import { Label } from '../../dashboard/components/ui/Label'; // Assuming you have your own Label component

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
  // Add more states as needed
];

const vehicleTypeOptions = [
  { value: 'Car', label: 'Car' },
  { value: 'Truck', label: 'Truck' },
  { value: 'Motorcycle', label: 'Motorcycle' },
  { value: 'Armored', label: 'Armored' }
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

interface EditVehicleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedVehicle: any) => void; // Add specific type for updated vehicle
  vehicle: any; // Current vehicle data to prefill the form
}

const EditVehicleModal: React.FC<EditVehicleModalProps> = ({ isOpen, onClose, onSave, vehicle }) => {
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: vehicle, // Prefill with the existing vehicle data
  });

  const onSubmit = async (data: FieldValues) => {
    try {
      const updatedVehicle = {
        ...vehicle, // Retain existing data
        ...data,    // Update with the new data
      };

      onSave(updatedVehicle);
      onClose(); // Close the modal after saving
    } catch (error) {
      console.error('Error updating vehicle:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-2xl font-bold text-gray-700 hover:text-gray-500"
        >
          &times; {/* This is the "X" symbol */}
        </button>

        <h2 className="text-2xl font-bold text-[#061f39] mb-4">Edit Vehicle</h2>

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
                  <Select {...field} id="vehicleType">
                    {vehicleTypeOptions.map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </Select>
                </div>
              )}
            />
            {errors.vehicleType && (
              <p className="text-red-500 text-xs">{(errors.vehicleType as FieldError).message}</p>
            )}
          </div>

          {/* Brand and Model in the same row */}
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
                  <Select {...field} id="registrationState">
                    {stateOptions.map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </Select>
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
              render={({ field }) => <Input {...field} id="vin" placeholder="Enter VIN" />}
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
                  <Select {...field} id="fuelType">
                    {fuelTypeOptions.map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </Select>
                </div>
              )}
            />
            {errors.fuelType && (
              <p className="text-red-500 text-xs">{(errors.fuelType as FieldError).message}</p>
            )}
          </div>

          {/* Submit Button */}
          <Button type="submit" className="bg-blue-500 text-white mt-4 w-full">
            Update Vehicle
          </Button>
        </form>
      </div>
    </div>
  );
};

export default EditVehicleModal;
