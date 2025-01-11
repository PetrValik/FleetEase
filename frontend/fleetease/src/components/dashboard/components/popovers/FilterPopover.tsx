import React, { useState, useEffect } from 'react';
import { Button } from '../ui/Button';
import CustomCheckbox from '../ui/Checkbox';
import { LucideX } from 'lucide-react';
import Separator from '../ui/Separator'; // Updated import for Separator
import * as Toast from "../../../../utils/toastUtils";

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
  onClose: () => void; // Add onClose to the props
}

const FilterPopover: React.FC<FilterPopoverProps> = ({
  typeFilters,
  fuelFilters,
  stateFilters,
  onApplyFilter,
  onClearFilter,
  onClose, // Destructure onClose from props
}) => {
  const [localTypeFilters, setTypeFilters] = useState<Filters>(typeFilters);
  const [localFuelFilters, setFuelFilters] = useState<Filters>(fuelFilters);
  const [localStateFilters, setStateFilters] = useState<Filters>({
    available: stateFilters.available || false,
    reserved: stateFilters.reserved || false, // Change 'inUse' to 'reserved'
  });

  useEffect(() => {
    setTypeFilters(typeFilters);
    setFuelFilters(fuelFilters);
    setStateFilters({
      available: stateFilters.available || false,
      reserved: stateFilters.reserved || false,
    });
  }, [typeFilters, fuelFilters, stateFilters]);

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
    setTypeFilters({
      trailer: false,
      bus: false,
      motorcycle: false,
      cargo: false,
      personal: false,
      special: false,
    });
    setFuelFilters({
      diesel: false,
      natural95: false,
      natural98: false,
      electric: false,
      hybrid: false,
      plugInHybrid: false,
      cng: false,
      lpg: false,
      hydrogen: false,
      ethanol: false,
      bioDiesel: false,
      syntheticFuels: false,
    });
    setStateFilters({
      available: false,
      reserved: false, // Reset 'reserved' instead of 'inUse'
    });
    onClearFilter(); // Call the clear filter callback
  };

  const handleApply = () => {
    console.log('Filters applied', { localTypeFilters, localFuelFilters, localStateFilters });
    Toast.showInfoToast("Filters applied");
    onApplyFilter({
      typeFilters: localTypeFilters,
      fuelFilters: localFuelFilters,
      stateFilters: localStateFilters,
    }); // Pass the filters to the parent
    onClose(); // Close the popover after applying filters
  };

  // A helper to capitalize and format the filters
  const formatLabel = (label: string) => {
    return label
      .replace(/([A-Z])/g, ' $1')  // Add a space before each capital letter
      .trim()
      .charAt(0)
      .toUpperCase() + label.slice(1); // Capitalize the first letter
  };

  return (
    <div className="space-y-4">
      {/* Filters Section */}
      <div className="flex gap-6 justify-between"> {/* Ensure filters are placed next to each other horizontally */}
        {/* Type Section */}
        <div className="flex-1 min-w-[150px] max-w-[250px]">
          <h3 className="font-semibold text-lg mb-2">Type</h3>
          <div className="space-y-2">
            {Object.keys(localTypeFilters).map((key) => (
              <CustomCheckbox
                key={key}
                checked={localTypeFilters[key]}
                onChange={() => handleCheckboxChange('type', key)}
                label={formatLabel(key)}
              />
            ))}
          </div>
        </div>

        {/* Fuel Section */}
        <div className="flex-1 min-w-[150px] max-w-[250px]">
          <h3 className="font-semibold text-lg mb-2">Fuel</h3>
          <div className="space-y-2">
            {Object.keys(localFuelFilters).map((key) => (
              <CustomCheckbox
                key={key}
                checked={localFuelFilters[key]}
                onChange={() => handleCheckboxChange('fuel', key)}
                label={formatLabel(key)}
              />
            ))}
          </div>
        </div>

        {/* State Section */}
        <div className="flex-1 min-w-[150px] max-w-[250px]">
          <h3 className="font-semibold text-lg mb-2">State</h3>
          <div className="space-y-2">
            {Object.keys(localStateFilters).map((key) => (
              <CustomCheckbox
                key={key}
                checked={localStateFilters[key]}
                onChange={() => handleCheckboxChange('state', key)}
                label={formatLabel(key)} // Use the helper function for formatting
              />
            ))}
          </div>
        </div>
      </div>

      <Separator /> {/* Horizontal separator */}

      {/* Action Buttons */}
      <div className="mt-4 flex justify-end space-x-4">
        <Button variant="outline" className="text-gray-700" onClick={handleClear}>
          Clear
        </Button>
        <Button className="bg-blue-600 text-white hover:bg-blue-700" onClick={handleApply}>
          Apply Filter
        </Button>
      </div>
    </div>
  );
};

export default FilterPopover;
