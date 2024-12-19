export interface MaintenanceEvent {
  id: number;
  eventType: string;
  date: string;
  description: string;
  reportedBy: string;
}

export interface Vehicle {
  id: number;
  vehicleType: string;
  brand: string;
  model: string;
  year: number;
  registrationNumber: string;
  vin: string;
  color: string;
  status: "Available" | "In Use" | "Maintenance" | "Disabled"; // Make sure status is typed correctly
  capacity: string;
  fuelType: string;
  equipment: string;
  owner: string;
  driver?: string;
  assignmentPeriod?: string; // Optional field
}

export const mockVehicles: Vehicle[] = [
  {
    id: 1,
    vehicleType: 'Car',
    brand: 'Toyota',
    model: 'Corolla',
    year: 2020,
    registrationNumber: 'ABC123',
    vin: '1HGBH41JXMN109186',
    color: 'Red',
    status: 'Available', // Ensure this matches the expected literal type
    capacity: '5',
    fuelType: 'Gasoline',
    equipment: 'Air Conditioning, GPS',
    owner: 'John Doe',
    driver: 'Jane Smith',
    assignmentPeriod: '2023-06-01 to 2023-12-31',
  },
  {
    id: 2,
    vehicleType: 'Truck',
    brand: 'Ford',
    model: 'F-150',
    year: 2022,
    registrationNumber: 'XYZ789',
    vin: '1FTFW1EF1EFB12345',
    color: 'Blue',
    status: 'In Use', // Ensure this matches the expected literal type
    capacity: '3',
    fuelType: 'Diesel',
    equipment: 'Tow Package, Backup Camera',
    owner: 'Mike Johnson',
    driver: 'John Doe',
    assignmentPeriod: '2023-05-01 to 2023-11-30',
  },
  {
    id: 3,
    vehicleType: 'Van',
    brand: 'Mercedes-Benz',
    model: 'Sprinter',
    year: 2021,
    registrationNumber: 'LMN456',
    vin: 'W1Y1R2Y2Y3Y4Y5Y6Y7Y8Y9Y0Y1Y2Y3Y4',
    color: 'White',
    status: 'Maintenance',
    capacity: '12',
    fuelType: 'Diesel',
    equipment: 'Refrigeration System, Cargo Space',
    owner: 'Sarah Lee',
    driver: 'David Brown',
    assignmentPeriod: '2023-02-01 to 2023-08-31',
  },
  {
    id: 4,
    vehicleType: 'Car',
    brand: 'Honda',
    model: 'Civic',
    year: 2019,
    registrationNumber: 'GHI012',
    vin: '2HGFB2F50KH510022',
    color: 'Black',
    status: 'Available',
    capacity: '5',
    fuelType: 'Gasoline',
    equipment: 'Bluetooth, Cruise Control',
    owner: 'Emma White',
    driver: 'Lucas Brown',
    assignmentPeriod: '2023-01-01 to 2023-06-30',
  },
  {
    id: 5,
    vehicleType: 'Truck',
    brand: 'Chevrolet',
    model: 'Silverado',
    year: 2023,
    registrationNumber: 'DEF234',
    vin: '3GCUYHEF9PG162555',
    color: 'Silver',
    status: 'In Use',
    capacity: '4',
    fuelType: 'Gasoline',
    equipment: 'Towing Package, Navigation System',
    owner: 'Ethan Harris',
    driver: 'Olivia Green',
    assignmentPeriod: '2023-03-01 to 2023-12-31',
  },
  {
    id: 6,
    vehicleType: 'SUV',
    brand: 'BMW',
    model: 'X5',
    year: 2021,
    registrationNumber: 'JKL567',
    vin: '5UXCR6C53L9A11288',
    color: 'Gray',
    status: 'Available',
    capacity: '7',
    fuelType: 'Hybrid',
    equipment: 'Panoramic Sunroof, Leather Seats',
    owner: 'Sophia Clark',
    driver: 'William Hall',
    assignmentPeriod: '2023-07-01 to 2023-12-31',
  },
  {
    id: 7,
    vehicleType: 'Car',
    brand: 'Ford',
    model: 'Mustang',
    year: 2020,
    registrationNumber: 'MNO890',
    vin: '1FA6P8CF9L5102929',
    color: 'Yellow',
    status: 'Available',
    capacity: '4',
    fuelType: 'Gasoline',
    equipment: 'Leather Seats, Sports Suspension',
    owner: 'Daniel Thompson',
    driver: 'Jessica White',
    assignmentPeriod: '2023-04-01 to 2023-10-31',
  },
  {
    id: 8,
    vehicleType: 'Truck',
    brand: 'RAM',
    model: '1500',
    year: 2022,
    registrationNumber: 'PQR123',
    vin: '1C6SRFJT7NN520336',
    color: 'Orange',
    status: 'Maintenance',
    capacity: '3',
    fuelType: 'Diesel',
    equipment: 'Bedliner, Trailer Hitch',
    owner: 'James Miller',
    driver: 'Emily Davis',
    assignmentPeriod: '2023-06-01 to 2023-12-31',
  },
];
