
import type { User } from '../types';

interface NavbarProps {
    user: User | null;
    onLogout: () => void;
}

export default function Navbar(props: NavbarProps) {
    return (
        <header className="flex justify-between items-center mb-8 bg-slate-800 p-6 rounded">
            <div>
                <h1 className="text-3xl font-bold flex gap-3 text-white">
                    Leads Dashboard
                    {props.user?.role && (
                        <span className="bg-indigo-600 text-white text-sm px-2 py-1 rounded">
                            {props.user.role}
                        </span>
                    )}
                </h1>
                <p className="text-slate-400 mt-2">Welcome back, {props.user?.name}</p>
            </div>
            <button 
                onClick={props.onLogout} 
                className="bg-red-600 text-white px-4 py-2 rounded"
            >
                Logout
            </button>
        </header>
    );
}
