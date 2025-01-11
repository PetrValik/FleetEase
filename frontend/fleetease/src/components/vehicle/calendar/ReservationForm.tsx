import React, { useState, useEffect } from 'react';
import { isSameDay } from 'date-fns';

const cities = [
  'Prague', 'Brno', 'Ostrava', 'Plzen', 'Liberec', 'Olomouc', 'Hradec Králové', 'Ústí nad Labem', 'Pardubice', 'Zlín',
  'Mladá Boleslav', 'Kladno', 'Karviná', 'Opava', 'Teplice', 'Chomutov', 'Jihlava', 'Příbram', 'Kolín', 'Tábor',
  'Frýdek-Místek', 'Havířov', 'Kroměříž', 'Vsetín',
  'Bratislava', 'Košice', 'Prešov', 'Nitra', 'Žilina', 'Trnava', 'Martin', 'Trenčín', 'Poprad', 'Prievidza',
  'Pezinok', 'Komárno', 'Námestovo', 'Moldava nad Bodvou', 'Humenné', 'Považská Bystrica', 'Ružomberok', 'Kežmarok', 'Nové Zámky', 'Kremnica',
];

interface ReservationFormProps {
  selectedDates: Date[];
  pickupLocation: string;
  returnLocation: string;
  setPickupLocation: React.Dispatch<React.SetStateAction<string>>;
  setReturnLocation: React.Dispatch<React.SetStateAction<string>>;
  handleReservationSubmit: () => void;
  reservedDates: Date[];
  isDateRangeOverlapping: (start: Date, end: Date) => boolean;
  isFormVisible: boolean;
}

const ReservationForm: React.FC<ReservationFormProps> = ({
  selectedDates,
  pickupLocation,
  returnLocation,
  setPickupLocation,
  setReturnLocation,
  handleReservationSubmit,
  reservedDates,
  isDateRangeOverlapping,
  isFormVisible,
}) => {
  const [pickupSearch, setPickupSearch] = useState(pickupLocation);
  const [returnSearch, setReturnSearch] = useState(returnLocation);
  const [filteredPickupCities, setFilteredPickupCities] = useState(cities);
  const [filteredReturnCities, setFilteredReturnCities] = useState(cities);
  const [showPickupDropdown, setShowPickupDropdown] = useState(false);
  const [showReturnDropdown, setShowReturnDropdown] = useState(false);
  const [pickupError, setPickupError] = useState('');
  const [returnError, setReturnError] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formErrorMessage, setFormErrorMessage] = useState('');

  useEffect(() => {
    if (selectedDates.length > 0) {
      setFormSubmitted(false);
      setFormErrorMessage('');
    }
  }, [selectedDates]);

  const handlePickupSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setPickupSearch(query);
    setFilteredPickupCities(cities.filter((city) => city.toLowerCase().includes(query.toLowerCase())));
    setShowPickupDropdown(true);
    setPickupError('');
  };

  const handleReturnSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setReturnSearch(query);
    setFilteredReturnCities(cities.filter((city) => city.toLowerCase().includes(query.toLowerCase())));
    setShowReturnDropdown(true);
    setReturnError('');
  };

  const handlePickupSelect = (city: string) => {
    setPickupLocation(city);
    setPickupSearch(city);
    setFilteredPickupCities(cities);
    setShowPickupDropdown(false);
    setPickupError('');
  };

  const handleReturnSelect = (city: string) => {
    setReturnLocation(city);
    setReturnSearch(city);
    setFilteredReturnCities(cities);
    setShowReturnDropdown(false);
    setReturnError('');
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    let hasError = false;

    if (!pickupLocation) {
      setPickupError('Pickup Location is required.');
      hasError = true;
    } else {
      setPickupError('');
    }

    if (!returnLocation) {
      setReturnError('Return Location is required.');
      hasError = true;
    } else {
      setReturnError('');
    }

    if (selectedDates.length === 0) {
      setFormErrorMessage('Please select at least one date.');
      hasError = true;
    } else {
      const [startDate, endDate] = selectedDates.length === 1 
        ? [selectedDates[0], selectedDates[0]] 
        : [selectedDates[0], selectedDates[selectedDates.length - 1]];

      if (isDateRangeOverlapping(startDate, endDate)) {
        setFormErrorMessage('Selected date range overlaps with existing reservations.');
        hasError = true;
      } else {
        setFormErrorMessage('');
      }
    }

    if (!hasError) {
      handleReservationSubmit();
    }
  };

  if (!isFormVisible) {
    return null;
  }

  return (
    <div className="mt-4">
      <form onSubmit={onSubmit}>
        <h3 className="text-xl font-bold mb-2">Reservation Details</h3>
        <div className="space-y-4">
          {selectedDates.length > 0 && (
            <div>
              <label className="block text-sm font-medium">Selected Dates</label>
              <div className="mt-1">{`${selectedDates[0].toLocaleDateString()} - ${selectedDates[selectedDates.length - 1].toLocaleDateString()}`}</div>
            </div>
          )}

          <div>
            <label htmlFor="pickupLocation" className="block text-sm font-medium">
              Pickup Location <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="pickupLocation"
              value={pickupSearch}
              onChange={handlePickupSearch}
              onClick={() => setShowPickupDropdown(true)}
              className={`mt-1 block w-full px-3 py-2 border ${
                formSubmitted && pickupError ? 'border-red-500' : 'border-gray-300'
              } rounded-md`}
              placeholder="Search Pickup Location"
            />
            {formSubmitted && pickupError && <p className="text-red-500 text-xs mt-1">{pickupError}</p>}
            {showPickupDropdown && pickupSearch && (
              <ul className="mt-2 max-h-40 overflow-y-auto border border-gray-300 bg-white rounded-md shadow-md">
                {filteredPickupCities.map((city) => (
                  <li
                    key={city}
                    onClick={() => handlePickupSelect(city)}
                    className="cursor-pointer hover:bg-gray-100 p-2"
                  >
                    {city}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div>
            <label htmlFor="returnLocation" className="block text-sm font-medium">
              Return Location <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="returnLocation"
              value={returnSearch}
              onChange={handleReturnSearch}
              onClick={() => setShowReturnDropdown(true)}
              className={`mt-1 block w-full px-3 py-2 border ${
                formSubmitted && returnError ? 'border-red-500' : 'border-gray-300'
              } rounded-md`}
              placeholder="Search Return Location"
            />
            {formSubmitted && returnError && <p className="text-red-500 text-xs mt-1">{returnError}</p>}
            {showReturnDropdown && returnSearch && (
              <ul className="mt-2 max-h-40 overflow-y-auto border border-gray-300 bg-white rounded-md shadow-md">
                {filteredReturnCities.map((city) => (
                  <li
                    key={city}
                    onClick={() => handleReturnSelect(city)}
                    className="cursor-pointer hover:bg-gray-100 p-2"
                  >
                    {city}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {formSubmitted && formErrorMessage && (
            <div className="mt-2 text-red-500 text-sm">{formErrorMessage}</div>
          )}

          <button
            type="submit"
            className="w-full mt-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Submit Reservation
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReservationForm;

