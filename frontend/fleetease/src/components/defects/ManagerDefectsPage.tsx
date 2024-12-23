import { useState, useEffect } from 'react';
import { Defect, DefectType, DefectFormData, DefectSeverityLevel, DefectStatus } from './types';
import { getAllDefects, createDefect, updateDefect, deleteDefect } from '../../database/defects/defects';
import { getAllDefectTypes } from '../../database/defects/defectTypeService';
import DefectTable from './components/DefectTable';
import DefectDialog from './components/DefectDialog';
import DefectStats from './components/DefectStats';
import DefectFilters from './components/DefectFilters';

export default function ManagerDefectsPage() {
  const [defects, setDefects] = useState<Defect[]>([]);
  const [defectTypes, setDefectTypes] = useState<DefectType[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDefect, setSelectedDefect] = useState<Defect | undefined>();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSeverity, setSelectedSeverity] = useState<DefectSeverityLevel | 'all'>('all');
  const [selectedStatus, setSelectedStatus] = useState<DefectStatus | 'all'>('all');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      const [defectsData, typesData] = await Promise.all([
        getAllDefects(),
        getAllDefectTypes()
      ]);
      setDefects(defectsData);
      setDefectTypes(typesData);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateDefect = async (formData: DefectFormData) => {
    try {
      const defectData: Omit<Defect, 'defect_id' | 'created_at'> = {
        ...formData,
        date_reported: formData.date_reported || new Date().toISOString(),
        user_id: formData.user_id || 1, // nebo getCurrentUserId()
        defect_status: formData.defect_status || 'Reported',
        repair_cost: formData.repair_cost ?? null
      };
      
      const newDefect = await createDefect(defectData);
      if (newDefect) {
        setDefects([...defects, newDefect]);
        setIsDialogOpen(false);
      }
    } catch (error) {
      console.error('Error creating defect:', error);
    }
  };

  const handleEditDefect = async (defectId: number, data: DefectFormData) => {
    try {
      const updatedDefect = await updateDefect(defectId, data);
      if (updatedDefect) {
        setDefects(defects.map(d => d.defect_id === defectId ? updatedDefect : d));
        setIsDialogOpen(false);
      }
    } catch (error) {
      console.error('Error updating defect:', error);
    }
  };

  const handleDeleteDefect = async (defectId: number) => {
    try {
      await deleteDefect(defectId);
      setDefects(defects.filter(d => d.defect_id !== defectId));
    } catch (error) {
      console.error('Error deleting defect:', error);
    }
  };

  const handleStatusChange = async (defectId: number, newStatus: DefectStatus) => {
    try {
      const updatedDefect = await updateDefect(defectId, {
        defect_status: newStatus
      });
      if (updatedDefect) {
        setDefects(defects.map(d => d.defect_id === defectId ? updatedDefect : d));
      }
    } catch (error) {
      console.error('Error updating defect status:', error);
    }
  };

  const filteredDefects = defects.filter(defect => {
    const matchesSearch = defect.vehicle_id.toString().includes(searchTerm);
    const matchesSeverity = selectedSeverity === 'all' || defect.defect_severity === selectedSeverity;
    const matchesStatus = selectedStatus === 'all' || defect.defect_status === selectedStatus;
    return matchesSearch && matchesSeverity && matchesStatus;
  });

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#061f3f]">Správa defektů</h1>
          <p className="text-muted-foreground">Přehled všech nahlášených defektů vozidel</p>
        </div>
        <button
          onClick={() => {
            setSelectedDefect(undefined);
            setIsDialogOpen(true);
          }}
          className="bg-[#3b82ff] hover:bg-[#1e3a8f] text-white px-4 py-2 rounded-md"
        >
          Přidat defekt
        </button>
      </div>

      <DefectStats defects={defects} />

      <DefectFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedSeverity={selectedSeverity}
        onSeverityChange={setSelectedSeverity}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
      />

    <DefectTable
      defects={filteredDefects}
      defectTypes={defectTypes}
      loading={isLoading}
      isManager={true}
      onEdit={(defect) => {
        setSelectedDefect(defect);
        setIsDialogOpen(true);
      }}
      onDelete={handleDeleteDefect}
      onStatusChange={handleStatusChange}
    />

<DefectDialog
  isOpen={isDialogOpen}
  onClose={() => {
    setIsDialogOpen(false);
    setSelectedDefect(undefined);
  }}
  onSave={async (data: DefectFormData) => {
    if (selectedDefect) {
      await handleEditDefect(selectedDefect.defect_id, data);
    } else {
      await handleCreateDefect(data);
    }
  }}
  mode={selectedDefect ? 'edit' : 'create'}
  defect={selectedDefect}
  defectTypes={defectTypes}
/>
    </div>
  );
}