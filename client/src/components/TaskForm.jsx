import { useState, useEffect } from 'react';

export default function TaskForm({ onSubmit, initialData, users, buttonText }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [status, setStatus] = useState('Pending');

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || '');
      setDescription(initialData.description || '');
      setAssignedTo(initialData.assignedTo?._id || initialData.assignedTo || '');
      setStatus(initialData.status || 'Pending');
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, description, assignedTo, status });
    if (!initialData) {
      setTitle('');
      setDescription('');
      setAssignedTo('');
      setStatus('Pending');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="block text-sm font-medium mb-1">Title</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm" />
      </div>
      <div className="mb-3">
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm min-h-[60px]" />
      </div>
      <div className="mb-3">
        <label className="block text-sm font-medium mb-1">Assign To</label>
        <select value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)} required
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm">
          <option value="">Select a user</option>
          {users.map((u) => (
            <option key={u._id || u.id} value={u._id || u.id}>{u.name} ({u.email})</option>
          ))}
        </select>
      </div>
      <div className="mb-3">
        <label className="block text-sm font-medium mb-1">Status</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm">
          <option>Pending</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>
      </div>
      <button type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded text-sm cursor-pointer hover:bg-blue-700">
        {buttonText || 'Create Task'}
      </button>
    </form>
  );
}
