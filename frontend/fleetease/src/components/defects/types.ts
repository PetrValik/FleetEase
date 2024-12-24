//types.ts
export type Role = 'Admin' | 'Manager' | 'Driver';

export type DefectSeverityLevel = 'Minor' | 'Low' | 'Medium' | 'High' | 'Critical';
export type DefectStatus = 'Reported' | 'In Progress' | 'Repaired' | 'Closed' | 'Deferred';

export interface DefectType {
  type_id: number;
  type_name: string;
  description: string | null;
}
export interface FrontendUser {
  id: number;
  role: string;
  name?: string;  // Pro reported_by
}

export interface BackendUser {
    user_id: number;
    email: string;
    first_name: string;
    last_name: string;
    phone_number: string | null;
    created_at: string; // time without time zone
    is_active: boolean;
    company_id: number | null;
    role: {
        role_id: number;
        role_name: Role;
    };
}

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
  reported_by?: string;
}

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