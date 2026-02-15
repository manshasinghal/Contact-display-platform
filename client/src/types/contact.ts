export interface Contact {
  id: number;
  name: string;
  email: string | null;
  phone: string | null;
  company: string | null;
  createdAt: string;
}

export interface ContactListResponse {
  items: Contact[];
  meta: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

export interface CreateContactPayload {
  name: string;
  email?: string;
  phone?: string;
  company?: string;
}
