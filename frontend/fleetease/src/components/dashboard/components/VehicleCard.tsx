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

  const formatDate = (date: Date) => {
    return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
  };

  return (
    <Link to={`/vehicle/${id}`}>
      <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105 p-4 sm:p-6 bg-white rounded-lg border relative">
        <CardContent className="space-y-3 sm:space-y-4">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
            <h3 className="text-base sm:text-lg font-semibold pr-16 sm:pr-0">
              {vehicleBrand && vehicleModel
                ? `${vehicleBrand.brand_name} ${vehicleModel.model_name}`
                : "Loading Vehicle Info..."}
            </h3>
            <div className="absolute top-3 right-3 sm:static sm:mt-0">
              <Badge
                variant={
                  status === "Available"
                    ? "success"
                    : status === "Reserved"
                    ? "default"
                    : "destructive"
                }
                className={`${statusColors[status]} text-white text-xs sm:text-sm`}
              >
                {status}
              </Badge>
            </div>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="font-medium">Registration:</span>
              <span className="text-gray-500">{formattedRegistrationNumber}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="font-medium flex items-center">
                <Fuel className="mr-2 h-4 w-4" />
                Fuel Type:
              </span>
              <span className="text-gray-500">{fuelType || "N/A"}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="font-medium flex items-center">
                <UserIcon className="mr-2 h-4 w-4" />
                Assigned Driver:
              </span>
              <span className="text-gray-500">
                {closestReservation?.user_id || "-"}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
              <span className="font-medium flex items-center mb-1 sm:mb-0">
                <Calendar className="mr-2 h-4 w-4" />
                Assignment Period:
              </span>
              <span className="text-gray-500 text-right">
                {closestReservation ? (
                  <>
                    <div>{formatDate(new Date(closestReservation.start_time))}</div>
                    <div>{formatDate(new Date(closestReservation.end_time))}</div>
                  </>
                ) : (
                  "-"
                )}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

