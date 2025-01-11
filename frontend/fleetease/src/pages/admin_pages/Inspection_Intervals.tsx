import React, { useEffect, useState } from "react";
import { Pencil } from "lucide-react";
import * as Database from "../../database/database";
import * as Toast from "../../utils/toastUtils";

const CATEGORY_ORDER = [
  "Personal",
  "Cargo",
  "Special",
  "Motorcycle",
  "Bus",
  "Trailer",
];

export default function InspectionIntervals() {
  const [categories, setCategories] = useState<Database.VehicleCategory[]>([]);
  const [selectedCategory, setSelectedCategory] =
    useState<Database.VehicleCategory | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newIntervals, setNewIntervals] = useState({
    inspection_period: 0,
    emissions_period: 0,
  });

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    const data = await Database.getAllVehicleCategories();
    setCategories(data);
  };

  const handleEdit = (category: Database.VehicleCategory) => {
    setSelectedCategory(category);
    setNewIntervals({
      inspection_period: category.inspection_period,
      emissions_period: category.emissions_period,
    });
    setIsDialogOpen(true);
  };

  const handleSave = async () => {
    if (!selectedCategory) return;

    try {
      const updatedData = {
        category_name: selectedCategory.category_name,
        inspection_period: newIntervals.inspection_period,
        emissions_period: newIntervals.emissions_period,
      };

      await Database.updateVehicleCategory(
        selectedCategory.category_id,
        updatedData
      );

      setCategories((prevCategories) =>
        prevCategories.map((category) =>
          category.category_id === selectedCategory.category_id
            ? { ...category, ...updatedData }
            : category
        )
      );
      Toast.showSuccessToast("Interval successfully changed");
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Failed to update intervals:", error);
      Toast.showErrorToast("Unable to change interval");
    }
  };

  // Sort categories based on the predefined order
  const sortedCategories = [...categories].sort(
    (a, b) =>
      CATEGORY_ORDER.indexOf(a.category_name) -
      CATEGORY_ORDER.indexOf(b.category_name)
  );

  return (
    <div className="space-y-6">
      <div className="rounded-lg border bg-white shadow-sm p-6 mb-6">
        <h1 className="text-2xl font-semibold">
          Vehicle technical inspection and emissions testing intervals
        </h1>
      </div>

      <div className="rounded-lg border bg-white shadow-sm">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Vehicle Categories</h2>
          <div className="space-y-4">
            {sortedCategories.map((category) => (
              <div
                key={category.category_id}
                className="flex items-center justify-between py-3 px-4 rounded-lg border bg-white"
              >
                <span className="text-sm font-medium">
                  {category.category_name}
                </span>
                <button
                  onClick={() => handleEdit(category)}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md flex items-center"
                >
                  <Pencil className="h-4 w-4 mr-1" />
                  Modify
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {isDialogOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-4 sm:p-6 w-[90%] max-w-[400px]">
            <h2 className="text-lg font-semibold mb-4">
              Modify Inspection Intervals - {selectedCategory?.category_name}
            </h2>

            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium">Current Inspection Intervals</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-500 mb-1">
                      Technical Inspection
                    </div>
                    <div className="px-4 py-2 bg-gray-50 rounded-md">
                      {selectedCategory?.inspection_period} Months
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Emissions</div>
                    <div className="px-4 py-2 bg-gray-50 rounded-md">
                      {selectedCategory?.emissions_period} Months
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">New Inspection Intervals</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-500 mb-1">
                      Technical Inspection
                    </div>
                    <input
                      type="number"
                      className="w-full px-3 py-2 border rounded-md"
                      value={newIntervals.inspection_period}
                      onChange={(e) =>
                        setNewIntervals({
                          ...newIntervals,
                          inspection_period: parseInt(e.target.value) || 0,
                        })
                      }
                    />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Emissions</div>
                    <input
                      type="number"
                      className="w-full px-3 py-2 border rounded-md"
                      value={newIntervals.emissions_period}
                      onChange={(e) =>
                        setNewIntervals({
                          ...newIntervals,
                          emissions_period: parseInt(e.target.value) || 0,
                        })
                      }
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-6 space-x-2">
              <button
                onClick={() => setIsDialogOpen(false)}
                className="px-4 py-2 border rounded-md hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
