import React from 'react';
import { Defect, DefectType, DefectStatus } from '../types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import { CheckCircle, Edit2, Trash2 } from 'lucide-react';

interface DefectTableProps {
  defects: Defect[];
  defectTypes: DefectType[];
  isManager?: boolean;
  onEdit?: (defect: Defect) => void;
  onDelete?: (id: number) => void;
  onStatusChange?: (id: number, newStatus: DefectStatus) => void;
  loading: boolean;
}

export default function DefectTable({ 
  defects, 
  defectTypes,
  isManager = false,
  onEdit,
  onDelete,
  onStatusChange,
  loading 
}: DefectTableProps) {
  const getDefectTypeName = (typeId: number) => {
    const defectType = defectTypes.find(type => type.type_id === typeId);
    return defectType?.type_name || 'Neznámý typ';
  };

  const getSeverityColor = (severity: Defect['defect_severity']) => {
    switch (severity) {
      case 'Critical':
        return 'bg-red-100 text-red-800';
      case 'High':
        return 'bg-orange-100 text-orange-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'Low':
        return 'bg-blue-100 text-blue-800';
      case 'Minor':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: Defect['defect_status']) => {
    switch (status) {
      case 'Reported':
        return 'bg-yellow-100 text-yellow-800';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800';
      case 'Repaired':
        return 'bg-green-100 text-green-800';
      case 'Closed':
        return 'bg-gray-100 text-gray-800';
      case 'Deferred':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return <div className="text-center py-4">Načítání...</div>;
  }

  if (defects.length === 0) {
    return <div className="text-center py-4">Žádné defekty k zobrazení</div>;
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-gray-50">
            <TableHead className="font-semibold">SPZ</TableHead>
            <TableHead className="font-semibold">Typ defektu</TableHead>
            <TableHead className="font-semibold">Závažnost</TableHead>
            <TableHead className="font-semibold">Status</TableHead>
            <TableHead className="font-semibold">Popis</TableHead>
            <TableHead className="font-semibold">Datum nahlášení</TableHead>
            {isManager && <TableHead className="font-semibold">Náklady</TableHead>}
            {(onEdit || onDelete || onStatusChange) && (
              <TableHead className="font-semibold text-right">Akce</TableHead>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {defects.map((defect) => (
            <TableRow key={defect.defect_id} className="hover:bg-gray-50">
              <TableCell className="font-medium">{defect.vehicle_id}</TableCell>
              <TableCell>{getDefectTypeName(defect.type_id)}</TableCell>
              <TableCell>
                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                  getSeverityColor(defect.defect_severity)
                }`}>
                  {defect.defect_severity}
                </span>
              </TableCell>
              <TableCell>
                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                  getStatusColor(defect.defect_status)
                }`}>
                  {defect.defect_status}
                </span>
              </TableCell>
              <TableCell>{defect.description}</TableCell>
              <TableCell>{new Date(defect.date_reported).toLocaleDateString('cs-CZ')}</TableCell>
              {isManager && (
                <TableCell>
                  {defect.repair_cost ? `${defect.repair_cost} Kč` : 'N/A'}
                </TableCell>
              )}
              {(onEdit || onDelete || onStatusChange) && (
  <TableCell className="text-right">
    <div className="flex justify-end space-x-2">
      {onStatusChange && defect.defect_status !== 'Closed' && (
        <Button
          size="sm"
          variant="outline"
          onClick={() => onStatusChange(defect.defect_id, 'Closed')}
          className="h-8 w-8 p-0 border-[#061f3f] text-[#061f3f] hover:bg-gray-50"
        >
          <CheckCircle className="h-4 w-4" />
          <span className="sr-only">Uzavřít</span>
        </Button>
      )}
      {onEdit && (
        <Button
          size="sm"
          variant="outline"
          onClick={() => onEdit(defect)}
          className="h-8 w-8 p-0 border-[#061f3f] text-[#061f3f] hover:bg-gray-50"
        >
          <Edit2 className="h-4 w-4" />
          <span className="sr-only">Upravit</span>
        </Button>
      )}
      {onDelete && (
        <Button
          size="sm"
          variant="outline"
          onClick={() => onDelete(defect.defect_id)}
          className="h-8 w-8 p-0 border-[#061f3f] text-[#061f3f] hover:bg-gray-50"
        >
          <Trash2 className="h-4 w-4" />
          <span className="sr-only">Smazat</span>
        </Button>
      )}
    </div>
  </TableCell>
)}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}