export type DefectSeverityLevel = 'Minor' | 'Low' | 'Medium' | 'High' | 'Critical';
export type DefectStatus = 'Reported' | 'In Progress' | 'Repaired' | 'Closed' | 'Deferred';

// Interface pro typ defektu
export interface DefectType {
  type_id: number;
  type_name: string;
  description: string | null;
}

// Interface pro defekt
export interface Defect {
  defect_id: number;
  vehicle_id: number;
  type_id: number;
  defect_severity: DefectSeverityLevel;
  description: string;
  date_reported: string;
  defect_status: DefectStatus;
  created_at: string;
  repair_cost: number | null;
  user_id: number;
}

// Interface pro formulářová data
export interface DefectFormData {
  vehicle_id: number;
  type_id: number;
  defect_severity: DefectSeverityLevel;
  description: string;
  repair_cost: number | null;
  date_reported?: string;
  user_id?: number;
  defect_status?: DefectStatus;
}