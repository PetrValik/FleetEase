import apiClient from '../../utils/apiClient';
import { handleApiError } from '../../utils/apiErrorHandler';
import { config } from '../../config';

const BASE_URL = config.LOGS_ENDPOINT;

// Interface for Audit Logs response.
export interface AuditLog {
  id: number;
  table_name: string;
  operation: string;
  record_id: number | null;
  performed_by: string | null;
  timestamp: string;
}

// Fetch all audit logs from the backend.
export const getAllLogs = async (): Promise<AuditLog[]> => {
  try {
    const response = await apiClient.get<AuditLog[]>(BASE_URL);
    return response.data;
  } catch (error) {
    return handleApiError(error, []);
  }
};
