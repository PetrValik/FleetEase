import React, { useEffect, useState } from "react";
import { Card, CardContent } from "./ui/Card";
import { Badge } from "./ui/Badge";
import { Fuel, UserIcon, Calendar } from "lucide-react";
import { Link } from "react-router-dom"; // Import Link from React Router
import { VehicleModel, getVehicleModelById } from "../../../database/vehicles/vehicleModel";

interface VehicleCardProps {
  id: string;
  modelId: number; // Model ID passed from Vehicle
  registrationNumber: string;
  fuelType: string;
  driver?: string;
  assignmentPeriod?: string;
  status: "Available" | "In Use" | "Maintenance" | "Reserved" | "Disabled"; // Status of the vehicle
}

export const VehicleCard: React.FC<VehicleCardProps> = ({
  id,
  modelId,
  registrationNumber,
  fuelType,
  driver,
  assignmentPeriod,
  status,
}) => {
  // State to hold the model info (brand and model name)
  const [vehicleModel, setVehicleModel] = useState<VehicleModel | null>(null);

  useEffect(() => {
    // Fetch model information using modelId
    const fetchModel = async () => {
      const modelData = await getVehicleModelById(modelId);
      setVehicleModel(modelData);
    };
    
    fetchModel();
  }, [modelId]); // Re-fetch if modelId changes

  // Formatting registration number for Czech format (e.g., "ABC 1234")
  const formattedRegistrationNumber = registrationNumber.replace(
    /^([A-Z]{1}[A-Z0-9]{2})(\d{4})$/,
    "$1 $2"
  );

  // Status color mapping
  const statusColors = {
    Available: "bg-[#10b91d]",
    "In Use": "bg-[#3b82f6]",
    Reserved: "bg-[#eab308]",
    Maintenance: "bg-[#ef4444]",
    Disabled: "bg-[#6b7280]", // Gray for disabled status
  };

  return (
    // Wrap the entire card in a Link to make it clickable
    <Link to={`/vehicle/${id}`}>
      <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105 p-6 bg-white rounded-lg border">
        <CardContent className="space-y-4">
          {/* Display model name and brand if available */}
          <h3 className="text-lg font-semibold">
            {vehicleModel ? `${vehicleModel.model_name}` : "Loading Model..."}
          </h3>

          {/* Vehicle Details */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm font-medium">Registration:</span>
              <span className="text-sm text-gray-500">{formattedRegistrationNumber}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm font-medium flex items-center">
                <Fuel className="mr-2 h-4 w-4" />
                Fuel Type:
              </span>
              <span className="text-sm text-gray-500">{fuelType || "N/A"}</span>
            </div>

            {/* Assigned Driver */}
            {driver && (
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium flex items-center">
                  <UserIcon className="mr-2 h-4 w-4" />
                  Assigned Driver:
                </span>
                <span className="text-sm text-gray-500">{driver}</span>
              </div>
            )}

            {/* Assignment Period */}
            {assignmentPeriod && (
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium flex items-center">
                  <Calendar className="mr-2 h-4 w-4" />
                  Assignment Period:
                </span>
                <span className="text-sm text-gray-500">{assignmentPeriod}</span>
              </div>
            )}

            {/* Status Badge */}
            <div className="flex justify-end mt-2">
              <Badge
                variant={
                  status === "Available"
                    ? "success"
                    : status === "In Use"
                    ? "default"
                    : "destructive"
                }
                className={`${statusColors[status]} text-white`}
              >
                {status}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
