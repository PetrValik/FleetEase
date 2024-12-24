import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Label } from '../ui/Label';
import { useUser } from '../../../../contexts/UserContext';
import * as Database from '../../../../database/database';

// Define the fuel type options
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
] as const;

type FuelType = typeof fuelTypeOptions[number]['value'];

interface VehicleFormData {
  vehicleType: { value: number; label: string };
  brand: { value: number; label: string };
  model: { value: number; label: string };
  registrationState: { value: number; label: string };
  registrationNumber: string;
  vin: string;
  fuelType: { value: FuelType; label: string };
}

interface AddVehicleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (newVehicle: any) => void;
  loading: boolean;
  error: string | null;
}

const AddVehicleModal: React.FC<AddVehicleModalProps> = ({ isOpen, onClose, onSave }) => {
  const { control, handleSubmit, formState: { errors } } = useForm<VehicleFormData>();
  const [categories, setCategories] = useState<{ value: number, label: string }[]>([]);
  const [stateOptions, setStateOptions] = useState<{ value: number, label: string }[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [brands, setBrands] = useState<{ value: number; label: string }[]>([]);
  const [models, setModels] = useState<{ value: number; label: string }[]>([]);
  const [loadingModels, setLoadingModels] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesResponse = await Database.getAllVehicleCategories();
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
  }, []);

  useEffect(() => {
    const fetchStateOptions = async () => {
      try {
        const countries: Database.Country[] = await Database.getAllCountries();
        const options = countries.map(country => ({
          value: country.country_id,
          label: country.country_name,
        }));
        setStateOptions(options);
      } catch (error) {
        console.error("Error fetching state options:", error);
      }
    };

    fetchStateOptions();
  }, []);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const brandsResponse = await Database.getAllVehicleBrands();
        const brandOptions = brandsResponse.map((brand: any) => ({
          value: brand.brand_id,
          label: brand.brand_name,
        }));
        setBrands(brandOptions);
      } catch (error) {
        console.error('Error fetching brands:', error);
      }
    };

    fetchBrands();
  }, []);

  const handleBrandChange = async (selectedBrand: { value: number; label: string } | null) => {
    if (!selectedBrand) {
      setModels([]);
      return;
    }

    setLoadingModels(true);
    try {
      const modelsResponse = await Database.getModelsByBrandId(selectedBrand.value);
      const modelOptions = modelsResponse.map((model: any) => ({
        value: model.model_id,
        label: model.model_name,
      }));
      setModels(modelOptions);
    } catch (error) {
      console.error('Error fetching models:', error);
      setModels([]);
    } finally {
      setLoadingModels(false);
    }
  };

  const onSubmit = async (data: VehicleFormData) => {
    try {
      const vehicleStatus: "Available" | "Reserved" | "In Maintenance" | "Defect State" | "Out of Order" | "Decommissioned" = 'Available';

      if (!user || !user.company_id) {
        throw new Error('User or company_id not found');
      }

      const newVehicle = {
        model_id: data.model?.value || 0,
        registration_number: data.registrationNumber,
        vin: data.vin,
        category_id: data.vehicleType?.value,
        country_id: data.registrationState?.value,
        fuel_type: data.fuelType?.value,
        vehicle_status: vehicleStatus,
        company_id: user.company_id,
      };

      onSave(newVehicle);
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
              <p className="text-red-500 text-xs">{errors.vehicleType.message}</p>
            )}
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <Label htmlFor="brand" required>
                Brand
              </Label>
              <Controller
                name="brand"
                control={control}
                rules={{ required: 'Brand is required' }}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={brands}
                    placeholder="Select a brand..."
                    onChange={(value) => {
                      field.onChange(value);
                      handleBrandChange(value);
                    }}
                    styles={customSelectStyles}
                  />
                )}
              />
              {errors.brand && (
                <p className="text-red-500 text-xs">{errors.brand.message}</p>
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
                render={({ field }) => (
                  <Select
                    {...field}
                    options={models}
                    placeholder={loadingModels ? 'Loading models...' : 'Select a model...'}
                    isDisabled={models.length === 0 || loadingModels}
                    styles={customSelectStyles}
                  />
                )}
              />
              {errors.model && (
                <p className="text-red-500 text-xs">{errors.model.message}</p>
              )}
            </div>
          </div>

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
                <p className="text-red-500 text-xs">{errors.registrationState.message}</p>
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
                render={({ field }) => (
                  <Input
                    {...field}
                    id="registrationNumber"
                    placeholder="ABC 1234"
                  />
                )}
              />
              {errors.registrationNumber && (
                <p className="text-red-500 text-xs">{errors.registrationNumber.message}</p>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="vin" required>
              VIN
            </Label>
            <Controller
              name="vin"
              control={control}
              rules={{ required: 'VIN is required' }}
              render={({ field }) => (
                <Input
                  {...field}
                  id="vin"
                  placeholder="Enter Vehicle Identification Number"
                />
              )}
            />
            {errors.vin && (
              <p className="text-red-500 text-xs">{errors.vin.message}</p>
            )}
          </div>

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
              <p className="text-red-500 text-xs">{errors.fuelType.message}</p>
            )}
          </div>

          <Button type="submit" className="bg-green-500 text-white mt-4 w-full">
            Add Vehicle
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddVehicleModal;

