import React from 'react';
import { Edit2, Check, Trash2 } from 'lucide-react';
import type { Defect, DefectType } from '../../database/database';

interface DefectCardProps {
  defect: Defect & { registrationNumber?: string; reportedByUser?: string };
  isManager: boolean;
  getDefectTypeName: (typeId: number) => string;
  getSeverityColor: (severity: string) => string;
  onEdit: () => void;
  onDelete: () => void;
  onStatusProgress: () => void;
}

export const DefectCard: React.FC<DefectCardProps> = ({
  defect,
  isManager,
  getDefectTypeName,
  getSeverityColor,
  onEdit,
  onDelete,
  onStatusProgress,
}) => {
  return (
    <div className="bg-white rounded-lg shadow p-4 space-y-3">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium">{defect.registrationNumber || 'N/A'}</h3>
          <p className="text-sm text-gray-500">{getDefectTypeName(defect.type_id)}</p>
        </div>
        <span className={`${getSeverityColor(defect.defect_severity)} px-2 py-1 text-xs font-semibold rounded-full`}>
          {defect.defect_severity}
        </span>
      </div>
      
      <p className="text-sm">{defect.description}</p>
      
      <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
        <div>
          <p className="font-medium">Status</p>
          <p>{defect.defect_status}</p>
        </div>
        <div>
          <p className="font-medium">Report Date</p>
          <p>{new Date(defect.date_reported).toLocaleDateString()}</p>
        </div>
      </div>
      
      <div className="text-sm">
        <p className="font-medium">Reported By</p>
        <p className="text-gray-600">{defect.reportedByUser}</p>
      </div>

      {isManager && (
        <div className="flex justify-end gap-2 pt-2 border-t">
          <button
            onClick={onEdit}
            className="p-2 hover:bg-gray-100 rounded-full"
            aria-label="Edit"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          {defect.defect_status !== 'Closed' && (
            <button
              onClick={onStatusProgress}
              className="p-2 hover:bg-gray-100 rounded-full text-green-600"
              aria-label="Progress Status"
            >
              <Check className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onDelete}
            className="p-2 hover:bg-gray-100 rounded-full"
            aria-label="Delete"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};

