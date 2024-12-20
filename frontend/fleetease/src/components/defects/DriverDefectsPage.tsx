import React, { useState, useEffect } from 'react';
import { Defect } from './types'; 
import { getAllDefects, createDefect } from '../../database/defects/defects';
import DefectTable from './components/DefectTable';
import DefectDialog from './components/DefectDialog';

const DriverDefectsPage: React.FC = () => {
    const [defects, setDefects] = useState<Defect[]>([]);
    const [dialogOpen, setDialogOpen] = useState(false);
  
    useEffect(() => {
      loadDefects();
    }, []);
  
    const loadDefects = async () => {
      try {
        const data = await getAllDefects();
        setDefects(data);
      } catch (error) {
        console.error('Error fetching defects:', error);
      }
    };
  
    const handleCreateDefect = async (newDefect: Omit<Defect, 'defect_id' | 'created_at'>) => {
        try {
          const createdDefect = await createDefect(newDefect);
          if (createdDefect) {
            setDefects([...defects, createdDefect]);
            setDialogOpen(false);
          }
        } catch (error) {
          console.error('Error creating defect:', error);
        }
      };
  
    return (
      <div>
        <h1>Moje nahlášené defekty</h1>
        <button onClick={() => setDialogOpen(true)}>Nahlásit defekt</button>
        
        <DefectTable defects={defects} />
        
        <DefectDialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          onSubmit={handleCreateDefect}
        />
      </div>
    );
  };
  
  export default DriverDefectsPage;