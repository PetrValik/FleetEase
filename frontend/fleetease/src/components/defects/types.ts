// Enum typy podle databáze
export type DefectSeverityLevel = 'Minor' | 'Low' | 'Medium' | 'High' | 'Critical';
export const DEFECT_STATUSES = {
  REPORTED: 'Reported',
  IN_PROGRESS: 'In Progress',
  REPAIRED: 'Repaired',
  CLOSED: 'Closed',
  DEFERRED: 'Deferred'
} as const;

export type DefectStatus = typeof DEFECT_STATUSES[keyof typeof DEFECT_STATUSES];

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
  defect_status?: DefectStatus;
  repair_cost?: number;
}