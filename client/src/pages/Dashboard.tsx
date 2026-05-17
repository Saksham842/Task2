import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import API from '../api';
import type { Lead, LeadResponse } from '../types';
import Navbar from '../components/Navbar';
import FilterBar from '../components/FilterBar';
import LeadTable from '../components/LeadTable';
import Pagination from '../components/Pagination';
import ViewLeadModal from '../components/ViewLeadModal';
import LeadFormModal from '../components/LeadFormModal';

export default function Dashboard() {
    const { user, logout } = useAuth();
    const [leads, setLeads] = useState<Lead[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [sourceFilter, setSourceFilter] = useState('');
    const [sortOrder, setSortOrder] = useState('latest');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalLeads, setTotalLeads] = useState(0);
    const [error, setError] = useState('');
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentLead, setCurrentLead] = useState<Partial<Lead>>({ name: '', email: '', status: 'New', source: 'Website' });
    const [isEditing, setIsEditing] = useState(false);
    const [viewLead, setViewLead] = useState<Lead | null>(null);

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedSearch(search), 400);
        return () => clearTimeout(timer);
    }, [search]);

    const fetchLeads = async () => {
        try {
            setLoading(true);
            setError('');
            const { data } = await API.get<LeadResponse>(`/leads?search=${debouncedSearch}&status=${statusFilter}&source=${sourceFilter}&sort=${sortOrder}&page=${page}&limit=10`);
            setLeads(data.leads);
            setTotalPages(data.pages);
            setTotalLeads(data.total);
            setLoading(false);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Error fetching leads');
            setLoading(false);
        }
    };

    useEffect(() => {
        setPage(1);
    }, [debouncedSearch, statusFilter, sourceFilter, sortOrder]);

    useEffect(() => {
        fetchLeads();
    }, [debouncedSearch, statusFilter, sourceFilter, sortOrder, page]);

    const handleSaveLead = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (isEditing && currentLead.id) {
                await API.put(`/leads/${currentLead.id}`, currentLead);
            } else {
                await API.post('/leads', currentLead);
            }
            setIsModalOpen(false);
            fetchLeads();
        } catch (err: any) {
            setError(err.response?.data?.message || 'Error saving lead');
        }
    };

    const handleDeleteLead = async (id: number) => {
        if (window.confirm('Delete this lead?')) {
            try {
                await API.delete(`/leads/${id}`);
                fetchLeads();
            } catch (err: any) {
                setError(err.response?.data?.message || 'Error deleting lead');
            }
        }
    };

    const handleExportCSV = () => {
        const headers = ['ID,Name,Email,Status,Source,Created At'];
        const rows = leads.map(lead => `"${lead.id}","${lead.name}","${lead.email}","${lead.status}","${lead.source}","${lead.created_at}"`);
        const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', 'leads_export.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="min-h-screen bg-slate-900 text-white p-6">
            <div className="max-w-6xl mx-auto">
                <Navbar user={user} onLogout={logout} />

                {error && (
                    <div className="bg-red-500/20 text-red-400 p-4 rounded mb-6">
                        {error}
                    </div>
                )}

                <FilterBar 
                    search={search}
                    onSearchChange={setSearch}
                    statusFilter={statusFilter}
                    onStatusFilterChange={setStatusFilter}
                    sourceFilter={sourceFilter}
                    onSourceFilterChange={setSourceFilter}
                    sortOrder={sortOrder}
                    onSortOrderChange={setSortOrder}
                    onExportCSV={handleExportCSV}
                    onAddLead={() => {
                        setIsEditing(false);
                        setCurrentLead({ name: '', email: '', status: 'New', source: 'Website' });
                        setIsModalOpen(true);
                    }}
                />

                <LeadTable 
                    leads={leads}
                    loading={loading}
                    user={user}
                    onViewLead={setViewLead}
                    onEditLead={(lead) => {
                        setCurrentLead(lead);
                        setIsEditing(true);
                        setIsModalOpen(true);
                    }}
                    onDeleteLead={handleDeleteLead}
                />

                <Pagination 
                    loading={loading}
                    totalPages={totalPages}
                    page={page}
                    totalLeads={totalLeads}
                    onPageChange={setPage}
                />
            </div>

            <ViewLeadModal 
                lead={viewLead}
                onClose={() => setViewLead(null)}
            />

            <LeadFormModal 
                isOpen={isModalOpen}
                isEditing={isEditing}
                currentLead={currentLead}
                onLeadChange={setCurrentLead}
                onSubmit={handleSaveLead}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    );
}
