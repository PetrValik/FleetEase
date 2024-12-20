import React, { useState } from 'react';
import { Button } from '../ui/Button';
import CustomCheckbox from '../ui/Checkbox';
import { LucideX } from 'lucide-react';
import { Separator } from '../ui/Separator';

// Define the filters interface for each category
interface Filters {
  [key: string]: boolean;
}

interface FilterPopoverProps {
  typeFilters: Filters; // Add typeFilters to the props
  fuelFilters: Filters; // Add fuelFilters to the props
  stateFilters: Filters; // Add stateFilters to the props
  onApplyFilter: (filters: any) => void;
  onClearFilter: () => void;
}

const FilterPopover: React.FC<FilterPopoverProps> = ({
  typeFilters,
  fuelFilters,
  stateFilters,
  onApplyFilter,
  onClearFilter,
}) => {
  const [localTypeFilters, setTypeFilters] = useState<Filters>(typeFilters);
  const [localFuelFilters, setFuelFilters] = useState<Filters>(fuelFilters);
  const [localStateFilters, setStateFilters] = useState<Filters>({
    available: stateFilters.available || false,
    reserved: stateFilters.reserved || false, // Change 'inUse' to 'reserved'
  });

  const handleCheckboxChange = (category: string, option: string) => {
    const setState =
      category === 'type'
        ? setTypeFilters
        : category === 'fuel'
        ? setFuelFilters
        : setStateFilters;

    setState((prevState: Filters) => ({
      ...prevState,
      [option]: !prevState[option],
    }));
  };

  const handleClear = () => {
    setTypeFilters({ truck: false, van: false, car: false });
    setFuelFilters({ diesel: false, petrol: false, electric: false, hybrid: false });
    setStateFilters({
      available: false,
      reserved: false, // Reset 'reserved' instead of 'inUse'
    });
    onClearFilter(); // Call the clear filter callback
  };

  const handleApply = () => {
    console.log('Filters applied', { localTypeFilters, localFuelFilters, localStateFilters });
    onApplyFilter({
      typeFilters: localTypeFilters,
      fuelFilters: localFuelFilters,
      stateFilters: localStateFilters,
    }); // Pass the filters to the parent
  };

  return (
    <div className="space-y-4">
      {/* Filters Section */}
      <div className="flex flex-wrap gap-6">
        {/* Type Section */}
        <div className="flex-1 min-w-[150px]">
          <h3 className="font-semibold text-lg mb-2">Type</h3>
          <div className="space-y-2">
            {Object.keys(localTypeFilters).map((key) => (
              <CustomCheckbox
                key={key}
                checked={localTypeFilters[key]}
                onChange={() => handleCheckboxChange('type', key)}
                label={key.charAt(0).toUpperCase() + key.slice(1)}
              />
            ))}
          </div>
        </div>

        {/* Fuel Section */}
        <div className="flex-1 min-w-[150px]">
          <h3 className="font-semibold text-lg mb-2">Fuel</h3>
          <div className="space-y-2">
            {Object.keys(localFuelFilters).map((key) => (
              <CustomCheckbox
                key={key}
                checked={localFuelFilters[key]}
                onChange={() => handleCheckboxChange('fuel', key)}
                label={key.charAt(0).toUpperCase() + key.slice(1)}
              />
            ))}
          </div>
        </div>

        {/* State Section */}
        <div className="flex-1 min-w-[150px]">
          <h3 className="font-semibold text-lg mb-2">State</h3>
          <div className="space-y-2">
            {Object.keys(localStateFilters).map((key) => (
              <CustomCheckbox
                key={key}
                checked={localStateFilters[key]}
                onChange={() => handleCheckboxChange('state', key)}
                label={key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1').trim()} // Format "reserved" to "Reserved"
              />
            ))}
          </div>
        </div>
      </div>

      <Separator />

      {/* Action Buttons */}
      <div className="mt-4 flex justify-end space-x-4">
        <Button variant="outline" className="text-gray-700" onClick={handleClear}>
          <LucideX className="mr-2" /> Clear
        </Button>
        <Button
          className="bg-blue-600 text-white hover:bg-blue-700"
          onClick={handleApply}
        >
          Apply Filter
        </Button>
      </div>
    </div>
  );
};

export default FilterPopover;
