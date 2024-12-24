/**
 * DefectDialog.tsx
 * 
 * Modální dialogové okno pro vytváření a úpravu defektů.
 * Komponenta poskytuje formulář s validací pro zadání všech potřebných
 * informací o defektu. Podporuje dva módy:
 * - vytvoření nového defektu
 * - úprava existujícího defektu
 */

import { useState, useEffect } from 'react';
import { Defect, DefectFormData, DefectType, DefectSeverityLevel } from '../types';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";

/**
 * Props rozhraní pro DefectDialog komponentu
 * @property {boolean} isOpen - Určuje, zda je dialog otevřený
 * @property {function} onClose - Callback pro zavření dialogu
 * @property {function} onSave - Callback pro uložení dat z formuláře
 * @property {'create' | 'edit'} mode - Mód dialogu (vytvoření/úprava)
 * @property {Defect} defect - Data existujícího defektu (pouze pro edit mód)
 * @property {DefectType[]} defectTypes - Seznam dostupných typů defektů
 */
interface DefectDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (defect: DefectFormData) => Promise<void>;
  mode: 'create' | 'edit';
  defect?: Defect;
  defectTypes: DefectType[];
}

export default function DefectDialog({
  isOpen,
  onClose,
  onSave,
  mode,
  defect,
  defectTypes
}: DefectDialogProps) {
  // --- State Management ---
  const [formData, setFormData] = useState<DefectFormData>({
    vehicle_id: defect?.vehicle_id || 0,
    type_id: defect?.type_id || 0,
    defect_severity: defect?.defect_severity || 'Medium',
    description: defect?.description || '',
    repair_cost: defect?.repair_cost ?? 0
  });

  useEffect(() => {
    if (defect) {
      setFormData({
        vehicle_id: defect.vehicle_id,
        type_id: defect.type_id,
        defect_severity: defect.defect_severity,
        description: defect.description,
        repair_cost: defect.repair_cost
      });
    }
  }, [defect]);

  // --- Event Handlers ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSave(formData);
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value ? Number(e.target.value) : null;
    setFormData(prev => ({
      ...prev,
      repair_cost: value
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {mode === 'create' ? 'Report Defect' : 'Edit Defect'}
          </DialogTitle>
          <DialogDescription>
            Please fill in all details about the vehicle defect.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="vehicle">Vehicle ID</Label>
              <Input
                id="vehicle"
                name="vehicle_id"
                type="number"
                value={formData.vehicle_id}
                onChange={handleInputChange}
                placeholder="Enter vehicle ID"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="type">Defect Type</Label>
              <Select
                value={String(formData.type_id)}
                onValueChange={(value) => handleSelectChange('type_id', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select defect type" />
                </SelectTrigger>
                  {defectTypes.map((type) => (
                    <SelectItem key={type.type_id} value={String(type.type_id)}>
                      {type.type_name}
                    </SelectItem>
                  ))}
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="severity">Severity</Label>
              <Select
                value={formData.defect_severity}
                onValueChange={(value) => handleSelectChange('defect_severity', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select severity" />
                </SelectTrigger>
                  <SelectItem value="Critical">Critical</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Low">Low</SelectItem>
                  <SelectItem value="Minor">Minor</SelectItem>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe the defect..."
                className="h-24"
                required
              />
            </div>

            {mode === 'edit' && (
              <div className="grid gap-2">
                <Label htmlFor="repair_cost">Repair Cost</Label>
                <Input
                  id="repair_cost"
                  type="number"
                  value={formData.repair_cost ?? ''}
                  onChange={handleNumberChange}
                  placeholder="Enter repair cost"
                />
              </div>
            )}
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              className="bg-[#3b82ff] hover:bg-[#1e3a8f] text-white"
            >
              {mode === 'create' ? 'Report Defect' : 'Save Changes'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}