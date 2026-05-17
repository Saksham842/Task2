export interface User {
    id: number;
    name: string;
    email: string;
    role?: string;
}

export interface Lead {
    id: number;
    name: string;
    email: string;
    status: 'New' | 'Contacted' | 'Qualified' | 'Lost';
    source: string;
    created_at: string;
    updated_at: string;
}

export interface LeadResponse {
    leads: Lead[];
    total: number;
    pages: number;
    currentPage: number;
}
