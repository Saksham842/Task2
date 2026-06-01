import { useState } from 'react';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import toast from 'react-hot-toast';

export default function TaskCard({ task, onEdit, onDelete }) {
  const { isAdmin } = useAuth();
  const [status, setStatus] = useState(task.status);

  const statusColors = {
    'Pending': 'bg-yellow-400/20 text-yellow-400',
    'In Progress': 'bg-blue-400/20 text-blue-400',
    'Completed': 'bg-green-400/20 text-green-400',
  };

  const handleStatusChange = async (e) => {
    const val = e.target.value;
    const prev = status;
    setStatus(val);
    try {
      await api.put(`/tasks/${task._id || task.id}`, { status: val });
    } catch (err) {
      setStatus(prev);
      toast.error(err.message);
    }
  };

  const initials = (name) =>
    name?.split(' ').map((n) => n[0]).join('').toUpperCase() || '?';

  return (
    <div className="bg-slate-800 rounded-xl p-4 ring-1 ring-white/10 shadow-lg hover:scale-[1.01] hover:shadow-indigo-500/20 transition-all duration-200">
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-semibold text-white truncate">{task.title}</h3>
        <span className={`shrink-0 px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[status] || 'bg-slate-600 text-slate-300'}`}>
          {status}
        </span>
      </div>
      <p className="text-slate-400 text-sm line-clamp-2 mb-3">{task.description || 'No description'}</p>
      <div className="flex items-center gap-2 mb-3">
        <div className="w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center text-[10px] font-semibold">
          {initials(task.assignedTo?.name)}
        </div>
        <span className="text-xs text-slate-400">{task.assignedTo?.name || 'Unassigned'}</span>
      </div>
      <div className="flex items-center justify-between pt-2 border-t border-white/5">
        {isAdmin ? (
          <div className="flex gap-2">
            <button onClick={() => onEdit(task)} className="text-slate-400 hover:text-indigo-400 transition">
              <PencilIcon className="w-4 h-4" />
            </button>
            <button onClick={() => onDelete(task._id || task.id)} className="text-slate-400 hover:text-red-400 transition">
              <TrashIcon className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <select value={status} onChange={handleStatusChange} className="bg-slate-700 text-xs text-slate-200 border border-white/10 rounded-lg px-2 py-1 focus:ring-2 focus:ring-indigo-500 outline-none">
            <option>Pending</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>
        )}
      </div>
    </div>
  );
}
