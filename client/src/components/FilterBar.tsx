

interface FilterBarProps {
    search: string;
    onSearchChange: (value: string) => void;
    statusFilter: string;
    onStatusFilterChange: (value: string) => void;
    sourceFilter: string;
    onSourceFilterChange: (value: string) => void;
    sortOrder: string;
    onSortOrderChange: (value: string) => void;
    onExportCSV: () => void;
    onAddLead: () => void;
}

export default function FilterBar(props: FilterBarProps) {
    return (
        <div className="bg-slate-800 p-4 rounded mb-6 flex gap-4">
            <input 
                type="text" 
                placeholder="Search name or email..."
                className="bg-slate-700 text-white p-2 rounded flex-1"
                value={props.search}
                onChange={(e) => props.onSearchChange(e.target.value)}
            />
            
            <select 
                className="bg-slate-700 text-white p-2 rounded"
                value={props.statusFilter}
                onChange={(e) => props.onStatusFilterChange(e.target.value)}
            >
                <option value="">All Statuses</option>
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="Qualified">Qualified</option>
                <option value="Lost">Lost</option>
            </select>

            <select 
                className="bg-slate-700 text-white p-2 rounded"
                value={props.sourceFilter}
                onChange={(e) => props.onSourceFilterChange(e.target.value)}
            >
                <option value="">All Sources</option>
                <option value="Website">Website</option>
                <option value="Instagram">Instagram</option>
                <option value="Referral">Referral</option>
            </select>

            <select 
                className="bg-slate-700 text-white p-2 rounded"
                value={props.sortOrder}
                onChange={(e) => props.onSortOrderChange(e.target.value)}
            >
                <option value="latest">Latest First</option>
                <option value="oldest">Oldest First</option>
            </select>

            <button onClick={props.onExportCSV} className="bg-green-600 text-white p-2 rounded">
                Export CSV
            </button>
            
            <button onClick={props.onAddLead} className="bg-blue-600 text-white p-2 rounded">
                + Add Lead
            </button>
        </div>
    );
}
