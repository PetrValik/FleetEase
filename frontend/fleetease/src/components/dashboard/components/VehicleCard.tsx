import React, { useEffect, useState } from "react";
import { Card, CardContent } from "./ui/Card";
import { Badge } from "./ui/Badge";
import { Fuel, UserIcon, Calendar } from 'lucide-react';
import { Link } from "react-router-dom";
import { VehicleModel, getVehicleModelById } from "../../../database/vehicles/vehicleModel";
import { VehicleBrand, getVehicleBrandById } from "../../../database/vehicles/vehicleBrand";
import { getReservationsByVehicleId, Reservation } from "../../../database/reservations/reservations";
import * as Toast from "../../../utils/toastUtils";

interface VehicleCardProps {
  id: string;
  modelId: number;
  registrationNumber: string;
  fuelType: string;
  status: "Available" | "Reserved" | "Maintenance" | "Disabled";
}

export const VehicleCard: React.FC<VehicleCardProps> = ({
  id,
  modelId,
  registrationNumber,
  fuelType,
  status: initialStatus,
}) => {
  const [vehicleModel, setVehicleModel] = useState<VehicleModel | null>(null);
  const [vehicleBrand, setVehicleBrand] = useState<VehicleBrand | null>(null);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [status, setStatus] = useState(initialStatus);

  const getClosestFutureReservation = (reservations: Reservation[]): Reservation | null => {
    const now = new Date();
    return reservations
      .filter(res => new Date(res.end_time) > now)
      .sort((a, b) => new Date(a.start_time).getTime() - new Date(b.start_time).getTime())[0] || null;
  };

  const isCurrentlyReserved = (reservations: Reservation[]): boolean => {
    const now = new Date();
    return reservations.some(res => {
      const startTime = new Date(res.start_time);
      const endTime = new Date(res.end_time);
      return now >= startTime && now <= endTime;
    });
  };

  useEffect(() => {
    const fetchVehicleData = async () => {
      try {
        const modelData = await getVehicleModelById(modelId);
        setVehicleModel(modelData);

        if (modelData) {
          const brandData = await getVehicleBrandById(modelData.brand_id);
          setVehicleBrand(brandData);
        }

        const fetchedReservations = await getReservationsByVehicleId(parseInt(id));
        setReservations(fetchedReservations);

        if (isCurrentlyReserved(fetchedReservations)) {
          setStatus("Reserved");
        } else if (initialStatus !== "Maintenance" && initialStatus !== "Disabled") {
          setStatus("Available");
        }
      } catch (error) {
        Toast.showErrorToast("Unable to fetch vehicle data");
        console.error("Error fetching vehicle data:", error);
      }
    };

    fetchVehicleData();
  }, [id, modelId, initialStatus]);

  const formattedRegistrationNumber = registrationNumber.replace(
    /^([A-Z]{1}[A-Z0-9]{2})(\d{4})$/,
    "$1 $2"
  );

  const statusColors = {
    Available: "bg-[#10b91d]",
    Reserved: "bg-[#eab308]",
    Maintenance: "bg-[#ef4444]",
    Disabled: "bg-[#6b7280]",
  };

  const closestReservation = getClosestFutureReservation(reservations);

  return (
    <Link to={`/vehicle/${id}`}>
      <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105 p-6 bg-white rounded-lg border">
        <CardContent className="space-y-4">
          <h3 className="text-lg font-semibold">
            {vehicleBrand && vehicleModel
              ? `${vehicleBrand.brand_name} ${vehicleModel.model_name}`
              : "Loading Vehicle Info..."}
          </h3>

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

            <div className="flex justify-between items-center">
              <span className="text-sm font-medium flex items-center">
                <UserIcon className="mr-2 h-4 w-4" />
                Assigned Driver:
              </span>
              <span className="text-sm text-gray-500">
                {closestReservation?.user_id || "-"}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium flex items-center">
                <Calendar className="mr-2 h-4 w-4" />
                Assignment Period:
              </span>
              <span className="text-sm text-gray-500">
                {closestReservation
                  ? `${new Date(closestReservation.start_time).toLocaleDateString()} - ${new Date(closestReservation.end_time).toLocaleDateString()}`
                  : "-"}
              </span>
            </div>

            <div className="flex justify-end mt-2">
              <Badge
                variant={
                  status === "Available"
                    ? "success"
                    : status === "Reserved"
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

