import axios from 'axios';
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
    const response = await axios.get<AuditLog[]>(`${BASE_URL}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error fetching logs:', error.response?.data?.error || error.message);
    } else {
      console.error('Unexpected error fetching logs:', error);
    }
    throw new Error('Failed to fetch logs');
  }
};
