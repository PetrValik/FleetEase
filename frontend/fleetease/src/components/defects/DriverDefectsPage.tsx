import { useState, useEffect } from 'react';
import { Defect, DefectType, DefectFormData, DefectStatus } from './types';
import { getAllDefects, createDefect } from '../../database/defects/defects';
import { getAllDefectTypes } from '../../database/defects/defectTypeService';
import DefectTable from './components/DefectTable';
import DefectDialog from './components/DefectDialog';

const DriverDefectsPage: React.FC = () => {
  const [defects, setDefects] = useState<Defect[]>([]);
  const [defectTypes, setDefectTypes] = useState<DefectType[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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
      const currentDate = new Date().toISOString();
      const userId = 1; // Zde použijte skutečné ID přihlášeného uživatele
      
      const newDefect = {
        ...formData,
        date_reported: currentDate,
        user_id: userId,
        defect_status: 'Reported' as DefectStatus
      };
      
      const createdDefect = await createDefect(newDefect);
      if (createdDefect) {
        setDefects([...defects, createdDefect]);
        setIsDialogOpen(false);
      }
    } catch (error) {
      console.error('Error creating defect:', error);
    }
  };

  return (
    <div>
      <h1>Moje nahlášené defekty</h1>
      <button onClick={() => setIsDialogOpen(true)}>Nahlásit defect</button>
      
      <DefectTable 
        defects={defects}
        defectTypes={defectTypes}
        loading={isLoading}
      />
      
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