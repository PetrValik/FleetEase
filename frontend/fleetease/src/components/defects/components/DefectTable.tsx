/** Komponenta pro zobrazení seznamu defektů v tabulce.
 * Podporuje různé funkce podle typu uživatele (manažer/řidič):
 * - Zobrazení detailů defektu
 * - Správu defektů (úprava, smazání)
 * - Změnu statusu
 * - Barevné označení závažnosti a statusu
 */

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

/**
 * Props rozhraní pro DefectTable komponentu
 * @property {Defect[]} defects - Seznam defektů k zobrazení
 * @property {DefectType[]} defectTypes - Seznam typů defektů pro mapování ID na názvy
 * @property {boolean} isManager - Určuje, zda má uživatel manažerská oprávnění
 * @property {function} onEdit - Callback pro úpravu defektu
 * @property {function} onDelete - Callback pro smazání defektu
 * @property {function} onStatusChange - Callback pro změnu statusu defektu
 * @property {boolean} loading - Indikátor načítání dat
 */
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
    return defectType?.type_name || 'Unknown Type';
  };

  /**
   * Vrátí CSS třídy pro barevné označení závažnosti
   */
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

  /**
   * Vrátí CSS třídy pro barevné označení statusu
   */
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

  // Zobrazení stavu načítání
  if (loading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  // Zobrazení prázdného stavu
  if (defects.length === 0) {
    return <div className="text-center py-4">No defects to display</div>;
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-gray-50">
            <TableHead className="font-semibold">Vehicle ID</TableHead>
            <TableHead className="font-semibold">Defect Type</TableHead>
            <TableHead className="font-semibold">Severity</TableHead>
            <TableHead className="font-semibold">Status</TableHead>
            <TableHead className="font-semibold">Description</TableHead>
            <TableHead className="font-semibold">Report Date</TableHead>
            {isManager && <TableHead className="font-semibold">Repair Cost</TableHead>}
            {(onEdit || onDelete || onStatusChange) && (
              <TableHead className="font-semibold text-right">Actions</TableHead>
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
              <TableCell>{new Date(defect.date_reported).toLocaleDateString('en-US')}</TableCell>
              {isManager && (
                <TableCell>
                  {defect.repair_cost ? `$${defect.repair_cost}` : 'N/A'}
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
                        aria-label="Close defect"
                      >
                        <CheckCircle className="h-4 w-4" />
                        <span className="sr-only">Close</span>
                      </Button>
                    )}
                    {onEdit && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onEdit(defect)}
                        className="h-8 w-8 p-0 border-[#061f3f] text-[#061f3f] hover:bg-gray-50"
                        aria-label="Edit defect"
                      >
                        <Edit2 className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                    )}
                    {onDelete && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onDelete(defect.defect_id)}
                        className="h-8 w-8 p-0 border-[#061f3f] text-[#061f3f] hover:bg-gray-50"
                        aria-label="Delete defect"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
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