export type InsuranceType = 'Driver' | 'Vehicle' | 'Liability';
export type PaymentMethod = 'Monthly' | 'Quarterly' | 'Semi-Annual' | 'Annual' | 'One-Time';
export type InsuranceStatus = 'Pending' | 'Active' | 'Archived' | 'Ending soon';

export interface InsuranceCompany {
  insurance_company_id: number;
  company_name: string;
}

export interface Insurance {
  insurance_id?: number;
  insurance_types: InsuranceType;
  policy_number: string;
  start_date: string;
  end_date: string;
  premium_amount: number;
  payment_method: PaymentMethod;
  insurance_company_id: number;
  insurance_status: InsuranceStatus;
  company_id: number;
  description?: string;
  insurance_company?: InsuranceCompany;
}