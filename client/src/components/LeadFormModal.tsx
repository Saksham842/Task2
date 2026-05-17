import React from 'react';
import type { Lead } from '../types';

interface LeadFormModalProps {
    isOpen: boolean;
    isEditing: boolean;
    currentLead: Partial<Lead>;
    onLeadChange: (updatedLead: Partial<Lead>) => void;
    onSubmit: (e: React.FormEvent) => void;
    onClose: () => void;
}

export default function LeadFormModal(props: LeadFormModalProps) {
    if (!props.isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4">
            <div className="bg-slate-800 p-6 rounded w-full max-w-md">
                <div className="flex justify-between mb-4 border-b border-slate-700 pb-2">
                    <h2 className="text-xl font-bold text-white">
                        {props.isEditing ? 'Edit Lead' : 'Add Lead'}
                    </h2>
                    <button onClick={props.onClose} className="text-slate-400 font-bold">X</button>
                </div>
                
                <form onSubmit={props.onSubmit} className="space-y-4">
                    <div>
                        <label className="block text-slate-400 mb-1">Name</label>
                        <input 
                            className="w-full bg-slate-700 text-white p-2 rounded" 
                            value={props.currentLead.name || ''} 
                            onChange={(e) => props.onLeadChange({ ...props.currentLead, name: e.target.value })} 
                            required 
                        />
                    </div>
                    
                    <div>
                        <label className="block text-slate-400 mb-1">Email</label>
                        <input 
                            type="email"
                            className="w-full bg-slate-700 text-white p-2 rounded" 
                            value={props.currentLead.email || ''} 
                            onChange={(e) => props.onLeadChange({ ...props.currentLead, email: e.target.value })} 
                            required 
                        />
                    </div>
                    
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <label className="block text-slate-400 mb-1">Status</label>
                            <select 
                                className="w-full bg-slate-700 text-white p-2 rounded" 
                                value={props.currentLead.status || 'New'} 
                                onChange={(e) => props.onLeadChange({ ...props.currentLead, status: e.target.value as Lead['status'] })}
                            >
                                <option value="New">New</option>
                                <option value="Contacted">Contacted</option>
                                <option value="Qualified">Qualified</option>
                                <option value="Lost">Lost</option>
                            </select>
                        </div>
                        
                        <div className="flex-1">
                            <label className="block text-slate-400 mb-1">Source</label>
                            <select 
                                className="w-full bg-slate-700 text-white p-2 rounded" 
                                value={props.currentLead.source || 'Website'} 
                                onChange={(e) => props.onLeadChange({ ...props.currentLead, source: e.target.value })}
                            >
                                <option value="Website">Website</option>
                                <option value="Instagram">Instagram</option>
                                <option value="Referral">Referral</option>
                            </select>
                        </div>
                    </div>
                    
                    <div className="flex gap-4 mt-6">
                        <button 
                            type="button" 
                            onClick={props.onClose} 
                            className="flex-1 bg-slate-700 text-white py-2 rounded"
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit" 
                            className="flex-1 bg-blue-600 text-white py-2 rounded"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
