import { useState, useEffect } from "react";
import {
  Plus,
  Filter,
  Search,
  CheckCircle,
  Edit2,
  Trash2,
  History,
  AlertTriangle,
} from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import * as Tabs from "@radix-ui/react-tabs";
import { Select, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import {
  Defect,
  DefectType,
  DefectFormData,
  DefectSeverityLevel,
  FrontendUser,
} from "./types";
import {
  getAllDefects,
  createDefect,
  updateDefect,
  deleteDefect,
} from "../../database/defects/defects";
import { getAllDefectTypes } from "../../database/defects/defectTypeService";
import DefectDialog from "./components/DefectDialog";
import { useUser } from "./../../contexts/UserContext";
import { BackendUser } from "./types";

export function ManagerDefectsPage() {
  const { user } = useUser();
  const [defects, setDefects] = useState<Defect[]>([]);
  const [defectTypes, setDefectTypes] = useState<DefectType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedDefect, setSelectedDefect] = useState<Defect | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [severityFilter, setSeverityFilter] = useState<
    DefectSeverityLevel | "all"
  >("all");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      const [defectsData, typesData] = await Promise.all([
        getAllDefects(),
        getAllDefectTypes(),
      ]);
      setDefects(defectsData);
      setDefectTypes(
        typesData.map((type) => ({
          ...type,
          name: type.type_name,
        })),
      );
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateDefect = async (data: DefectFormData) => {
    try {
    const newDefect = await createDefect({
        ...data,
        user_id: user?.user_id || 0,
        date_reported: new Date().toISOString(),
        defect_status: "Reported",
    });
    
    if (newDefect) {
      setDefects((prev) => [...prev, newDefect]);
      setIsDialogOpen(false);
  }
} catch (error) {
  console.error("Error creating defect:", error);
}
};

const handleEditDefect = async (defectId: number, data: DefectFormData) => {
  try {
  const updatedDefect = await updateDefect(defectId, {
      ...data,
  });
 
  if (updatedDefect) {
  setDefects((prev) =>
      prev.map((d) => (d.defect_id === defectId ? updatedDefect : d))
   );
       setIsDialogOpen(false);
       setSelectedDefect(null);
  }
 } catch (error) {
 console.error("Error updating defect:", error);
}
};

const handleCloseDefect = async (defectId: number) => {
  try {
  const updatedDefect = await updateDefect(defectId, {
      defect_status: "Closed",
      user_id: user?.user_id,
   });

    if (updatedDefect) {
        setDefects((prev) =>
        prev.map((d) => (d.defect_id === defectId ? updatedDefect : d))
       );
      }
   } catch (error) {
      console.error("Error closing defect:", error);
      }
 };

  const handleDeleteDefect = async (defectId: number) => {
    try {
      await deleteDefect(defectId);
      setDefects((prev) => prev.filter((d) => d.defect_id !== defectId));
    } catch (error) {
      console.error("Error deleting defect:", error);
    }
  };

  const activeDefects = defects.filter((d) => d.defect_status !== "Closed");
  const resolvedDefects = defects.filter((d) => d.defect_status === "Closed");

  const filteredDefects = defects.filter((defect) => {
    const matchesSearch = defect.vehicle_id
      .toString()
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesSeverity =
      severityFilter === "all" || defect.defect_severity === severityFilter;
    return matchesSearch && matchesSeverity;
  });

  return (
    <div className="flex flex-col gap-6 p-6 bg-[#F8F9FC]">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-[#061f3f]">Správa defektů</h1>
          <p className="text-muted-foreground">
            Přehled všech nahlášených defektů vozidel
          </p>
        </div>
        <Button
          onClick={() => setIsDialogOpen(true)}
          className="bg-[#3b82ff] hover:bg-[#1e3a8f] text-white"
        >
          <Plus className="mr-2 h-4 w-4" />
          Přidat defekt
        </Button>
      </div>

      {/* Stats Cards */}
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
              Vyřešené tento měsíc
            </CardTitle>
            <History className="h-8 w-8 text-[#061f3f]" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-[#061f3f]">
              {resolvedDefects.length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Card className="bg-white shadow-sm">
        <CardContent className="p-6">
          <Tabs.Root defaultValue="active">
            {/* Tab List */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <Tabs.List className="bg-gray-100 rounded-lg p-1">
                <Tabs.Trigger
                  value="active"
                  className="px-4 py-2 rounded-md data-[state=active]:bg-white"
                >
                  Aktivní defekty
                </Tabs.Trigger>
                <Tabs.Trigger
                  value="history"
                  className="px-4 py-2 rounded-md data-[state=active]:bg-white"
                >
                  Historie
                </Tabs.Trigger>
              </Tabs.List>

              {/* Filters */}
              <div className="flex items-center gap-4">
                <div className="relative flex-1 min-w-[200px]">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Hledat podle SPZ..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8"
                  />
                </div>

                <Select
                  value={severityFilter}
                  onValueChange={(value) =>
                    setSeverityFilter(value as DefectSeverityLevel | "all")
                  }
                >
                  <SelectTrigger className="w-[180px]">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Filtrovat" />
                  </SelectTrigger>
                  <SelectItem value="all">Všechny</SelectItem>
                  <SelectItem value="Critical">Kritická</SelectItem>
                  <SelectItem value="High">Vysoká</SelectItem>
                  <SelectItem value="Medium">Střední</SelectItem>
                  <SelectItem value="Low">Nízká</SelectItem>
                </Select>
              </div>
            </div>

            {/* Content */}
            <Tabs.Content value="active">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>SPZ</TableHead>
                    <TableHead>Typ defektu</TableHead>
                    <TableHead>Závažnost</TableHead>
                    <TableHead>Popis</TableHead>
                    <TableHead>Datum nahlášení</TableHead>
                    <TableHead>Nahlásil</TableHead>
                    <TableHead className="text-right">Akce</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center">
                        Načítání...
                      </TableCell>
                    </TableRow>
                  ) : filteredDefects.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center">
                        Žádné defekty k zobrazení
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredDefects.map((defect) => (
                      <TableRow key={defect.defect_id}>
                        <TableCell>{defect.vehicle_id}</TableCell>
                        <TableCell>
                          {defectTypes.find((t) => t.type_id === defect.type_id)
                            ?.type_name || "Neznámý typ"}
                        </TableCell>
                        <TableCell>
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              defect.defect_severity === "Critical"
                                ? "bg-red-100 text-red-800"
                                : defect.defect_severity === "High"
                                  ? "bg-orange-100 text-orange-800"
                                  : defect.defect_severity === "Medium"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-green-100 text-green-800"
                            }`}
                          >
                            {defect.defect_severity}
                          </span>
                        </TableCell>
                        <TableCell>{defect.description}</TableCell>
                        <TableCell>
                          {new Date(defect.date_reported).toLocaleDateString(
                            "cs-CZ",
                          )}
                        </TableCell>
                        <TableCell>{defect.user_id}</TableCell>
                        <TableCell>
                          <div className="flex justify-end space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() =>
                                handleCloseDefect(defect.defect_id)
                              }
                              className="h-8 w-8 p-0"
                            >
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setSelectedDefect(defect);
                                setIsDialogOpen(true);
                              }}
                              className="h-8 w-8 p-0"
                            >
                              <Edit2 className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() =>
                                handleDeleteDefect(defect.defect_id)
                              }
                              className="h-8 w-8 p-0"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </Tabs.Content>

            <Tabs.Content value="history">
              {/* Similar table structure for historical defects */}
            </Tabs.Content>
          </Tabs.Root>
        </CardContent>
      </Card>

      {/* Dialog */}
      {selectedDefect && (
        <DefectDialog
          isOpen={isDialogOpen}
          onClose={() => {
            setIsDialogOpen(false);
            setSelectedDefect(null);
          }}
          onSave={
            selectedDefect
              ? (data) => handleEditDefect(selectedDefect.defect_id, data)
              : handleCreateDefect
          }
          defect={selectedDefect}
          defectTypes={defectTypes}
          mode={selectedDefect ? "edit" : "create"}
        />
      )}
    </div>
  );
}
