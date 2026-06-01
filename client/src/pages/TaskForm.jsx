import { useState, useEffect } from 'react';
import Spinner from '../components/Spinner';

export default function TaskForm({ initial, users, onSubmit, onCancel }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [status, setStatus] = useState('Pending');
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (initial) {
      setTitle(initial.title || '');
      setDescription(initial.description || '');
      setAssignedTo(initial.assignedTo?._id || initial.assignedTo || '');
      setStatus(initial.status || 'Pending');
    }
  }, [initial]);

  const validate = () => {
    const e = {};
    if (!title.trim()) e.title = 'Title is required';
    if (!assignedTo) e.assignedTo = 'Assign to a user';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      await onSubmit({ title, description, assignedTo, status });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm text-slate-300 mb-1">Title <span className="text-red-400">*</span></label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}
          className={`w-full bg-slate-700 border ${errors.title ? 'border-red-500' : 'border-white/10'} rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 outline-none`} placeholder="Task title" />
        {errors.title && <p className="text-red-400 text-xs mt-1">{errors.title}</p>}
      </div>
      <div>
        <label className="block text-sm text-slate-300 mb-1">Description</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3}
          className="w-full bg-slate-700 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="Optional description" />
      </div>
      <div>
        <label className="block text-sm text-slate-300 mb-1">Assign To <span className="text-red-400">*</span></label>
        <select value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)}
          className={`w-full bg-slate-700 border ${errors.assignedTo ? 'border-red-500' : 'border-white/10'} rounded-lg px-3 py-2 text-sm text-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none`}>
          <option value="" className="bg-slate-700 text-slate-200">Select a user</option>
          {users.map((u) => (
            <option key={u._id || u.id} value={u._id || u.id} className="bg-slate-700 text-slate-200">{u.name} ({u.email})</option>
          ))}
        </select>
        {errors.assignedTo && <p className="text-red-400 text-xs mt-1">{errors.assignedTo}</p>}
      </div>
      <div>
        <label className="block text-sm text-slate-300 mb-1">Status</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}
          className="w-full bg-slate-700 border border-white/10 rounded-lg px-3 py-2 text-sm text-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none">
          <option className="bg-slate-700 text-slate-200">Pending</option>
          <option className="bg-slate-700 text-slate-200">In Progress</option>
          <option className="bg-slate-700 text-slate-200">Completed</option>
        </select>
      </div>
      <div className="flex gap-3 pt-2">
        <button type="button" onClick={onCancel}
          className="flex-1 bg-white/5 hover:bg-white/10 text-slate-200 rounded-lg py-2 text-sm transition ring-1 ring-white/10">
          Cancel
        </button>
        <button type="submit" disabled={submitting}
          className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg py-2 text-sm font-medium flex items-center justify-center gap-2 transition disabled:opacity-60">
          {submitting && <Spinner size="w-4 h-4" />}
          {submitting ? 'Saving...' : initial ? 'Update Task' : 'Create Task'}
        </button>
      </div>
    </form>
  );
}
