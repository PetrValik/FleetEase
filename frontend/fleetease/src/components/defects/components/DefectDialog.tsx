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
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";

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
  const [formData, setFormData] = useState<DefectFormData>({
    vehicle_id: defect?.vehicle_id || 0,
    type_id: defect?.type_id || 0,
    defect_severity: defect?.defect_severity || 'Medium',
    description: defect?.description || '',
    repair_cost: defect?.repair_cost ?? null
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
          <DialogTitle>{mode === 'create' ? 'Nahlášení defektu' : 'Úprava defektu'}</DialogTitle>
          <DialogDescription>
            Vyplňte prosím všechny údaje o zjištěném defektu vozidla.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="vehicle">ID Vozidla</Label>
              <Input
                id="vehicle"
                name="vehicle_id"
                type="number"
                value={formData.vehicle_id}
                onChange={handleInputChange}
                placeholder="Zadejte ID vozidla"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="type">Typ defektu</Label>
              <Select
                value={String(formData.type_id)}
                onValueChange={(value) => handleSelectChange('type_id', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Vyberte typ defektu" />
                </SelectTrigger>
                <SelectContent>
                  {defectTypes.map((type) => (
                    <SelectItem key={type.type_id} value={String(type.type_id)}>
                      {type.type_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="severity">Závažnost</Label>
              <Select
                value={formData.defect_severity}
                onValueChange={(value) => handleSelectChange('defect_severity', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Vyberte závažnost" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Critical">Kritická</SelectItem>
                  <SelectItem value="High">Vysoká</SelectItem>
                  <SelectItem value="Medium">Střední</SelectItem>
                  <SelectItem value="Low">Nízká</SelectItem>
                  <SelectItem value="Minor">Minimální</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Popis defektu</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Popište zjištěný defekt..."
                className="h-24"
                required
              />
            </div>
            {mode === 'edit' && (
              <div className="grid gap-2">
                <Label htmlFor="repair_cost">Náklady na opravu</Label>
                <Input
                  id="repair_cost"
                  type="number"
                  value={formData.repair_cost ?? ''}
                  onChange={handleNumberChange}
                  placeholder="Zadejte náklady na opravu"
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
              Zrušit
            </Button>
            <Button 
              type="submit"
              className="bg-[#3b82ff] hover:bg-[#1e3a8f] text-white"
            >
              {mode === 'create' ? 'Nahlásit defekt' : 'Uložit změny'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}