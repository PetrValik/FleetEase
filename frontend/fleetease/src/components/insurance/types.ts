export type InsuranceType = 'Driver' | 'Vehicle' | 'Liability';
export type PaymentMethod = 'Monthly' | 'Quarterly' | 'Yearly' | 'One-Time';
export type InsuranceStatus = 'Active' | 'Pending' | 'Expired' | 'Cancelled';

export interface InsuranceCompany {
  insurance_company_id: number;
  company_name: string;
}

export interface Insurance {
  insurance_id?: number;
  insurance_types: InsuranceType;
  registration_number: string | null;
  start_date: string;
  end_date: string;
  name: string | null;
  payment_method: PaymentMethod;
  insurance_company_id: number;
  insurance_status: InsuranceStatus;
  company_id: number;
  description: string | null;
}