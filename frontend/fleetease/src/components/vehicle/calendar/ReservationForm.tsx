import React, { useState } from 'react';

// List of cities from Czech Republic (CZ) and Slovakia (SK)
const cities = [
  // Czech Republic (CZ)
  'Prague', 'Brno', 'Ostrava', 'Plzen', 'Liberec', 'Olomouc', 'Hradec Králové', 'Ústí nad Labem', 'Pardubice', 'Zlín',
  'Mladá Boleslav', 'Kladno', 'Karviná', 'Opava', 'Teplice', 'Chomutov', 'Jihlava', 'Příbram', 'Kolín', 'Tábor',
  'Frýdek-Místek', 'Havířov', 'Kroměříž', 'Vsetín',

  // Slovakia (SK)
  'Bratislava', 'Košice', 'Prešov', 'Nitra', 'Žilina', 'Trnava', 'Martin', 'Trenčín', 'Poprad', 'Prievidza',
  'Pezinok', 'Komárno', 'Námestovo', 'Moldava nad Bodvou', 'Humenné', 'Považská Bystrica', 'Ružomberok', 'Kežmarok', 'Nové Zámky', 'Kremnica'
];

interface ReservationFormProps {
  selectedDates: Date[];
  pickupLocation: string;
  returnLocation: string;
  setPickupLocation: React.Dispatch<React.SetStateAction<string>>;
  setReturnLocation: React.Dispatch<React.SetStateAction<string>>;
  handleReservationSubmit: () => void;
  errorMessage: string;
}

const ReservationForm: React.FC<ReservationFormProps> = ({
  selectedDates,
  pickupLocation,
  returnLocation,
  setPickupLocation,
  setReturnLocation,
  handleReservationSubmit,
  errorMessage,
}) => {
  const [pickupSearch, setPickupSearch] = useState(pickupLocation);
  const [returnSearch, setReturnSearch] = useState(returnLocation);
  const [filteredPickupCities, setFilteredPickupCities] = useState(cities);
  const [filteredReturnCities, setFilteredReturnCities] = useState(cities);
  const [showPickupDropdown, setShowPickupDropdown] = useState(false);
  const [showReturnDropdown, setShowReturnDropdown] = useState(false);

  // Filter cities based on search query
  const handlePickupSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setPickupSearch(query);
    setFilteredPickupCities(cities.filter((city) => city.toLowerCase().includes(query.toLowerCase())));
    setShowPickupDropdown(true);  // Show dropdown while typing
  };

  const handleReturnSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setReturnSearch(query);
    setFilteredReturnCities(cities.filter((city) => city.toLowerCase().includes(query.toLowerCase())));
    setShowReturnDropdown(true); // Show dropdown while typing
  };

  // Select a city from the suggestions
  const handlePickupSelect = (city: string) => {
    setPickupLocation(city);
    setPickupSearch(city); // Set selected city to the search state as well
    setFilteredPickupCities(cities); // Reset to full city list
    setShowPickupDropdown(false); // Hide dropdown after selection
  };

  const handleReturnSelect = (city: string) => {
    setReturnLocation(city);
    setReturnSearch(city); // Set selected city to the search state as well
    setFilteredReturnCities(cities); // Reset to full city list
    setShowReturnDropdown(false); // Hide dropdown after selection
  };

  return (
    <div className="mt-4">
      <h3 className="text-xl font-bold mb-2">Reservation Details</h3>
      <div className="space-y-4">
        {/* Dates */}
        {selectedDates.length > 0 && (
          <div>
            <label className="block text-sm font-medium">Selected Dates</label>
            <div className="mt-1">{`${selectedDates[0].toLocaleDateString()} - ${selectedDates[selectedDates.length - 1].toLocaleDateString()}`}</div>
          </div>
        )}

        {/* Pickup Location Input */}
        <div>
          <label htmlFor="pickupLocation" className="block text-sm font-medium">
            Pickup Location <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="pickupLocation"
            value={pickupSearch} // Controlled by search state to allow typing
            onChange={handlePickupSearch}
            onClick={() => setShowPickupDropdown(true)} // Show dropdown when clicked
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Search Pickup Location"
          />
          {/* Show filtered suggestions only if there's a search input */}
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

        {/* Return Location Input */}
        <div>
          <label htmlFor="returnLocation" className="block text-sm font-medium">
            Return Location <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="returnLocation"
            value={returnSearch} // Controlled by search state to allow typing
            onChange={handleReturnSearch}
            onClick={() => setShowReturnDropdown(true)} // Show dropdown when clicked
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Search Return Location"
          />
          {/* Show filtered suggestions only if there's a search input */}
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

        {/* Display error message if there is one */}
        {errorMessage && <p className="text-red-500 text-xs">{errorMessage}</p>}

        <button
          onClick={handleReservationSubmit}
          className="w-full mt-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Submit Reservation
        </button>
      </div>
    </div>
  );
};

export default ReservationForm;
