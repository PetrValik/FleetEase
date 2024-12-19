import React from 'react';
import { useForm, Controller, FieldValues, FieldError } from 'react-hook-form';
import { Button } from '../ui/Button'; // Assuming you have your own Button component
import { Input } from '../ui/Input'; // Assuming you have your own Input component
import { Textarea } from '../ui/Textarea'; // Assuming you have your own Textarea component
import { Select } from '../ui/Select'; // Assuming you have your own Select component
import { Label } from '../ui/Label'; // Assuming you have your own Label component

interface AddVehicleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (newVehicle: any) => void; // Add specific type for new vehicle
}

const AddVehicleModal: React.FC<AddVehicleModalProps> = ({ isOpen, onClose, onSave }) => {
  const { control, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data: FieldValues) => {
    try {
      const newVehicle = {
        id: Date.now(),
        vehicleType: data.vehicleType,
        brand: data.brand,
        model: data.model,
        year: data.year,
        registrationNumber: data.registrationNumber,
        vin: data.vin,
        color: data.color,
        status: data.status,
        capacity: data.capacity,
        fuelType: data.fuelType,
        enginePower: data.enginePower,
        maxSpeed: data.maxSpeed,
        equipment: data.equipment,
        owner: data.owner,
        maintenanceHistory: data.maintenanceHistory || [],
      };

      onSave(newVehicle);
      onClose();
    } catch (error) {
      console.error('Error creating vehicle:', error);
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
                  <Select {...field} id="vehicleType">
                    <option value="Car">Car</option>
                    <option value="Truck">Truck</option>
                    <option value="Motorcycle">Motorcycle</option>
                    <option value="Armored">Armored</option>
                  </Select>
                </div>
              )}
            />
            {errors.vehicleType && (
              <p className="text-red-500 text-xs">{(errors.vehicleType as FieldError).message}</p>
            )}
          </div>

          {/* Brand */}
          <div>
            <Label htmlFor="brand" required>
              Brand
            </Label>
            <Controller
              name="brand"
              control={control}
              rules={{ required: 'Brand is required' }}
              render={({ field }) => <Input {...field} id="brand" placeholder="Enter brand and model (e.g., Ford F-150)" />}
            />
            {errors.brand && (
              <p className="text-red-500 text-xs">{(errors.brand as FieldError).message}</p>
            )}
          </div>

          {/* Model */}
          <div>
            <Label htmlFor="model" required>
              Model
            </Label>
            <Controller
              name="model"
              control={control}
              rules={{ required: 'Model is required' }}
              render={({ field }) => <Input {...field} id="model" placeholder="Enter brand and model (e.g., Ford F-150)" />}
            />
            {errors.model && (
              <p className="text-red-500 text-xs">{(errors.model as FieldError).message}</p>
            )}
          </div>

          {/* Year */}
          <div>
            <Label htmlFor="year" required>
              Year
            </Label>
            <Controller
              name="year"
              control={control}
              rules={{ 
                required: 'Year is required',
                min: { value: 1900, message: 'Year must be 1900 or later' }, // Optional: Ensure the year is not before 1900
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  type="number"
                  id="year"
                  defaultValue={2010} // Autofill with 2010
                  min={1900} // Prevents entering numbers below 1900
                  max={new Date().getFullYear()} // Prevents entering future years
                  placeholder="Enter year"
                />
              )}
            />
            {errors.year && (
              <p className="text-red-500 text-xs">{(errors.year as FieldError).message}</p>
            )}
          </div>

          {/* Registration Number */}
          <div>
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

          {/* VIN */}
          <div>
            <Label htmlFor="vin" required>
              VIN
            </Label>
            <Controller
              name="vin"
              control={control}
              rules={{ required: 'VIN is required' }}
              render={({ field }) => <Input {...field} id="vin" placeholder="" />}
            />
            {errors.vin && (
              <p className="text-red-500 text-xs">{(errors.vin as FieldError).message}</p>
            )}
          </div>

          {/* Color */}
          <div>
            <Label htmlFor="color">Color</Label>
            <Controller
              name="color"
              control={control}
              render={({ field }) => <Input {...field} id="color" />}
            />
          </div>

          {/* Status */}
          <div>
            <Label htmlFor="status" required>
              Status
            </Label>
            <Controller
              name="status"
              control={control}
              rules={{ required: 'Status is required' }}
              render={({ field }) => (
                <div className="dropdown-container relative">
                  <Select {...field} id="status">
                    <option value="New">New</option>
                    <option value="Used">Used</option>
                    <option value="Damaged">Damaged</option>
                  </Select>
                </div>
              )}
            />
            {errors.status && (
              <p className="text-red-500 text-xs">{(errors.status as FieldError).message}</p>
            )}
          </div>

          {/* Capacity */}
          <div>
            <Label htmlFor="capacity">Capacity</Label>
            <Controller
              name="capacity"
              control={control}
              render={({ field }) => <Input {...field} id="capacity" placeholder="e.g., 5 passengers or 2000 kg" />}
            />
          </div>

          {/* Fuel Type */}
          <div>
            <Label htmlFor="fuelType">Fuel Type</Label>
            <Controller
              name="fuelType"
              control={control}
              render={({ field }) => (
                <div className="dropdown-container relative">
                  <Select {...field} id="fuelType">
                    <option value="Gasoline">Gasoline</option>
                    <option value="Diesel">Diesel</option>
                    <option value="Electric">Electric</option>
                    <option value="Hybrid">Hybrid</option>
                  </Select>
                </div>
              )}
            />
          </div>

          {/* Engine Power */}
          <div>
            <Label htmlFor="enginePower">Engine Power</Label>
            <Controller
              name="enginePower"
              control={control}
              render={({ field }) => <Input {...field} id="enginePower" placeholder="e.g., 300 hp or 224 kW" />}
            />
          </div>

          {/* Maximum Speed */}
          <div>
            <Label htmlFor="maxSpeed">Maximum Speed</Label>
            <Controller
              name="maxSpeed"
              control={control}
              render={({ field }) => <Input {...field} id="maxSpeed" placeholder="e.g., 180 km/h" />}
            />
          </div>

          {/* Equipment */}
          <div>
            <Label htmlFor="equipment">Equipment</Label>
            <Controller
              name="equipment"
              control={control}
              render={({ field }) => <Textarea {...field} id="equipment" />}
            />
          </div>

          {/* Maintenance History */}
          <div>
            <Label htmlFor="maintenanceHistory">Maintenance History</Label>
            <Controller
              name="maintenanceHistory"
              control={control}
              render={({ field }) => <Textarea {...field} id="maintenanceHistory" />}
            />
          </div>

          {/* Owner */}
          <div>
            <Label htmlFor="owner" required>
              Owner
            </Label>
            <Controller
              name="owner"
              control={control}
              rules={{ required: 'Owner is required' }}
              render={({ field }) => <Input {...field} id="owner" />}
            />
            {errors.owner && (
              <p className="text-red-500 text-xs">{(errors.owner as FieldError).message}</p>
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
