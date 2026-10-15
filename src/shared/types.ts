export type CustomerStatus = 'PendingReview' | 'Approved' | 'Rejected';

export interface Customer {
  id: string;
  fullName: string;
  email: string;
  cpf: string;
  birthDate: string;
  phone: string;
  status: CustomerStatus;
  rejectionReason: string | null;
  registeredAt: string;
  reviewedAt: string | null;
}

export interface AccountSummary {
  id: string;
  ownerId: string;
  holder: string;
  branch: string;
  number: string;
  currency: string;
  balance: number;
  status: 'Open' | 'Closed';
  version: number;
}

export interface CommandResult {
  id: string;
  version: number;
}
