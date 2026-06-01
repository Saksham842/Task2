import { useState, useEffect } from 'react';
import { getTasks, createTask, updateTask, deleteTask, getUsers } from '../api';
import { useAuth } from '../context/AuthContext';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';

export default function Dashboard() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const loadTasks = async () => {
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const loadUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    loadTasks();
    loadUsers();
  }, []);

  const clearMessages = () => {
    setError('');
    setSuccess('');
  };

  const handleCreate = async (taskData) => {
    clearMessages();
    try {
      await createTask(taskData);
      setSuccess('Task created successfully');
      setShowForm(false);
      loadTasks();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpdate = async (taskData) => {
    clearMessages();
    try {
      await updateTask(editingTask._id || editingTask.id, taskData);
      setSuccess('Task updated successfully');
      setEditingTask(null);
      loadTasks();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    clearMessages();
    if (!window.confirm('Delete this task?')) return;
    try {
      await deleteTask(id);
      setSuccess('Task deleted successfully');
      loadTasks();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 px-4">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>

      {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm">{error}</div>}
      {success && <div className="bg-green-100 text-green-700 p-3 rounded mb-4 text-sm">{success}</div>}

      {user?.role === 'Admin' && (
        <button onClick={() => { setShowForm(!showForm); setEditingTask(null); }}
          className="bg-blue-600 text-white px-4 py-2 rounded text-sm mb-4 cursor-pointer hover:bg-blue-700">
          {showForm ? 'Cancel' : 'Create Task'}
        </button>
      )}

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h3 className="text-lg font-semibold mb-3">{editingTask ? 'Edit Task' : 'New Task'}</h3>
          <TaskForm
            onSubmit={editingTask ? handleUpdate : handleCreate}
            initialData={editingTask}
            users={users}
            buttonText={editingTask ? 'Update Task' : 'Create Task'}
          />
        </div>
      )}

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-3">Tasks</h3>
        <TaskList tasks={tasks} onEdit={handleEdit} onDelete={handleDelete} userRole={user?.role} />
      </div>
    </div>
  );
}
