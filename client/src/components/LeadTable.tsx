
import type { Lead, User } from '../types';

interface LeadTableProps {
    leads: Lead[];
    loading: boolean;
    user: User | null;
    onViewLead: (lead: Lead) => void;
    onEditLead: (lead: Lead) => void;
    onDeleteLead: (id: number) => void;
}

export default function LeadTable(props: LeadTableProps) {
    if (props.loading) {
        return <p className="text-center p-10">Loading leads...</p>;
    }

    if (props.leads.length === 0) {
        return <p className="text-center p-10">No leads found. Try a different search.</p>;
    }

    return (
        <div className="bg-slate-800 rounded overflow-hidden">
            <table className="w-full text-left">
                <thead className="bg-slate-700">
                    <tr>
                        <th className="p-4">Name</th>
                        <th className="p-4">Email</th>
                        <th className="p-4">Status</th>
                        <th className="p-4">Source</th>
                        <th className="p-4">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {props.leads.map(lead => (
                        <tr key={lead.id} className="border-t border-slate-700">
                            <td className="p-4">{lead.name}</td>
                            <td className="p-4">{lead.email}</td>
                            <td className="p-4">{lead.status}</td>
                            <td className="p-4">{lead.source}</td>
                            <td className="p-4 flex gap-2">
                                <button onClick={() => props.onViewLead(lead)} className="text-blue-400">View</button>
                                <button onClick={() => props.onEditLead(lead)} className="text-yellow-400">Edit</button>
                                {props.user?.role === 'Admin' ? (
                                    <button onClick={() => props.onDeleteLead(lead.id)} className="text-red-400">Delete</button>
                                ) : (
                                    <span className="text-slate-500">Delete</span>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
