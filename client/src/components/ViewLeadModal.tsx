
import type { Lead } from '../types';

interface ViewLeadModalProps {
    lead: Lead | null;
    onClose: () => void;
}

export default function ViewLeadModal(props: ViewLeadModalProps) {
    if (!props.lead) return null;

    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4">
            <div className="bg-slate-800 p-6 rounded w-full max-w-md">
                <div className="flex justify-between mb-4 border-b border-slate-700 pb-2">
                    <h2 className="text-xl font-bold text-white">Lead Details</h2>
                    <button onClick={props.onClose} className="text-slate-400 font-bold">X</button>
                </div>
                
                <div className="space-y-4">
                    <div>
                        <span className="text-slate-400 block">Name</span>
                        <p className="text-white text-lg">{props.lead.name}</p>
                    </div>
                    <div>
                        <span className="text-slate-400 block">Email</span>
                        <p className="text-white">{props.lead.email}</p>
                    </div>
                    <div>
                        <span className="text-slate-400 block">Status</span>
                        <p className="text-white">{props.lead.status}</p>
                    </div>
                    <div>
                        <span className="text-slate-400 block">Source</span>
                        <p className="text-white">{props.lead.source}</p>
                    </div>
                    <div>
                        <span className="text-slate-400 block">Created At</span>
                        <p className="text-white">{new Date(props.lead.created_at).toLocaleString()}</p>
                    </div>
                </div>

                <button 
                    onClick={props.onClose} 
                    className="w-full bg-slate-700 text-white mt-6 py-2 rounded"
                >
                    Close
                </button>
            </div>
        </div>
    );
}
