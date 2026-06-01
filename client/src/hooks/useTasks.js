import { useState, useEffect, useCallback } from 'react';
import api from '../api/axios';
import toast from 'react-hot-toast';

export function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get('/tasks');
      setTasks(res.data);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const create = async (data) => {
    const res = await api.post('/tasks', data);
    toast.success('Task created');
    await load();
    return res.data;
  };

  const update = async (id, data) => {
    const res = await api.put(`/tasks/${id}`, data);
    toast.success('Task updated');
    await load();
    return res.data;
  };

  const remove = async (id) => {
    await api.delete(`/tasks/${id}`);
    toast.success('Task deleted');
    await load();
  };

  return { tasks, loading, create, update, remove, load };
}
