import { useState, useEffect } from "react";
import { AlertTriangle, Plus, History } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import DefectDialog from "./components/DefectDialog";
import DefectTable from "./components/DefectTable";
import { Defect, DefectType, DefectFormData, FrontendUser } from "./types";
import { getAllDefects, createDefect } from "../../database/defects/defects";
import { getAllDefectTypes } from "../../database/defects/defectTypeService";
import { useUser } from "../../contexts/UserContext";
import { BackendUser } from "./types";

export const DriverDefectsPage = () => {
  const { user } = useUser();
  const [defects, setDefects] = useState<Defect[]>([]);
  const [defectTypes, setDefectTypes] = useState<DefectType[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadData();
    }
  }, [user]);

  const loadData = async () => {
    try {
      setIsLoading(true);
      const [defectsData, typesData] = await Promise.all([
        getAllDefects(),
        getAllDefectTypes(),
      ]);
      console.log(defectsData, typesData);
      const userDefects = defectsData.filter(
        (d) => user && d.user_id === user.user_id,
      );
      setDefects(userDefects);
      setDefectTypes(typesData);
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateDefect = async (formData: DefectFormData) => {
    if (!user || !user.user_id) return;

    try {
      const newDefect = await createDefect({
        ...formData,
        user_id: user.user_id,
        date_reported: new Date().toISOString(),
        defect_status: formData.defect_status || "Reported",
      });

      if (newDefect) {
        setDefects((prev) => [...prev, newDefect]);
        setIsDialogOpen(false);
      }
    } catch (error) {
      console.error("Error creating defect:", error);
    }
  };

  const activeDefects = defects.filter((d) => d.defect_status !== "Closed");

  return (
    <div className="flex flex-col gap-6 p-6 bg-[#F8F9FC]">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#061f3f]">
            Moje nahlášené defekty
          </h1>
          <p className="text-muted-foreground">
            Přehled a nahlášení defektů vozidel
          </p>
        </div>
        <Button
          className="bg-[#3b82ff] hover:bg-[#1e3a8f] text-white"
          onClick={() => setIsDialogOpen(true)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Nahlásit defekt
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-white shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-semibold text-[#061f3f]">
              Aktivní defekty
            </CardTitle>
            <AlertTriangle className="h-8 w-8 text-[#061f3f]" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-[#061f3f]">
              {activeDefects.length}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-semibold text-[#061f3f]">
              Celkem nahlášeno
            </CardTitle>
            <History className="h-8 w-8 text-[#061f3f]" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-[#061f3f]">
              {defects.length}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-[#061f3f]">
            Přehled defektů
          </CardTitle>
        </CardHeader>
        <CardContent>
          <DefectTable
            defects={defects}
            defectTypes={defectTypes}
            loading={isLoading}
          />
        </CardContent>
      </Card>

      <DefectDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSave={handleCreateDefect}
        mode="create"
        defectTypes={defectTypes}
      />
    </div>
  );
};

export default DriverDefectsPage;
