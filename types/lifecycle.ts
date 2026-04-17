export type UserRole = 'CLIENT' | 'ADMIN' | 'CO_ADMIN';

export interface Client {
  id: string;
  name: string;
  business_name?: string;
  email: string;
  phone?: string;
  role: UserRole;
  created_at: string;
}

export interface Agreement {
  id: string;
  client_id: string;
  service_type: string;
  project_description?: string;
  total_amount: number;
  advance_amount: number;
  balance_amount: number;
  start_date?: string;
  delivery_date?: string;
  status: 'draft' | 'sent' | 'signed';
  pdf_url?: string;
  signed_at?: string;
  created_at: string;
}

export interface Invoice {
  id: string;
  client_id: string;
  agreement_id?: string;
  amount: number;
  advance_paid: boolean;
  balance_due: number;
  status: 'pending' | 'paid' | 'overdue';
  razorpay_order_id?: string;
  payment_id?: string;
  pdf_url?: string;
  due_date?: string;
  created_at: string;
}

export interface Project {
  id: string;
  client_id: string;
  title: string;
  status: 'active' | 'completed' | 'pending';
  progress: number;
  created_at: string;
}
