

interface PaginationProps {
    loading: boolean;
    totalPages: number;
    page: number;
    totalLeads: number;
    onPageChange: (newPage: number) => void;
}

export default function Pagination(props: PaginationProps) {
    if (props.loading || props.totalPages <= 1) return null;

    return (
        <div className="flex justify-between items-center bg-slate-800 p-4 rounded mt-6">
            <div className="text-white">
                Page {props.page} of {props.totalPages} ({props.totalLeads} leads)
            </div>
            <div className="flex gap-2">
                <button 
                    onClick={() => props.onPageChange(props.page - 1)}
                    disabled={props.page === 1}
                    className="bg-slate-700 text-white p-2 rounded disabled:opacity-50"
                >
                    Previous
                </button>
                <button 
                    onClick={() => props.onPageChange(props.page + 1)}
                    disabled={props.page === props.totalPages}
                    className="bg-slate-700 text-white p-2 rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
}
