import React, { useEffect, useState } from 'react';
import { Defect, DefectFormData, DefectType, DefectSeverityLevel } from '../types';
import { getAllDefectTypes } from '../../../database/defects/defectTypeService';
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
    defect?: Defect;
    mode: 'create' | 'edit';
    defectTypes: DefectType[]; 
  }

export default function DefectDialog({ 
  isOpen, 
  onClose, 
  onSave,
  defect,
  mode 
}: DefectDialogProps) {
  const [formData, setFormData] = useState<DefectFormData>({
    vehicle_id: defect?.vehicle_id || 0,
    defect_severity: defect?.defect_severity || 'Medium',
    type_id: defect?.type_id || 0,
    description: defect?.description || '',
    repair_cost: defect?.repair_cost || undefined
  });

  const [defectTypes, setDefectTypes] = useState<DefectType[]>([]);

  useEffect(() => {
    const fetchDefectTypes = async () => {
      const types = await getAllDefectTypes();
      if (types) {
        setDefectTypes(types);
      }
    };
    fetchDefectTypes();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
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
                type="number"
                value={formData.vehicle_id}
                onChange={(e) => setFormData({ ...formData, vehicle_id: Number(e.target.value) })}
                placeholder="Zadejte ID vozidla"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="type">Typ defektu</Label>
              <Select
                value={formData.type_id.toString()}
                onValueChange={(value) => setFormData({ ...formData, type_id: Number(value) })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Vyberte typ defektu" />
                </SelectTrigger>
                <SelectContent>
                  {defectTypes.map((type) => (
                    <SelectItem key={type.type_id} value={type.type_id.toString()}>
                      {type.type_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="severity">Závažnost</Label>
              <Select 
                value={String(formData.defect_severity)}
                onValueChange={(value: string) => 
                setFormData({ ...formData, defect_severity: value as DefectSeverityLevel })}
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
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
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
                  value={formData.repair_cost || ''}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    repair_cost: e.target.value ? Number(e.target.value) : undefined 
                  })}
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