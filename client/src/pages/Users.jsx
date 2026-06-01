import { useState, useEffect } from 'react';
import api from '../api/axios';
import Avatar from '../components/Avatar';
import { Badge } from '../components/Badge';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/auth/users')
      .then((res) => setUsers(res.data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">Users</h2>
      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => <div key={i} className="bg-slate-800 rounded-xl p-4 animate-pulse h-16" />)}
        </div>
      ) : (
        <div className="bg-slate-800 rounded-xl ring-1 ring-white/10 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 text-slate-400">
                <th className="text-left py-3 px-4 font-medium">User</th>
                <th className="text-left py-3 px-4 font-medium">Email</th>
                <th className="text-left py-3 px-4 font-medium">Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id || u.id} className="border-b border-white/5 hover:bg-white/5">
                  <td className="py-3 px-4 flex items-center gap-3">
                    <Avatar name={u.name} size="w-8 h-8" textSize="text-xs" />
                    <span className="text-white font-medium">{u.name}</span>
                  </td>
                  <td className="py-3 px-4 text-slate-400">{u.email}</td>
                  <td className="py-3 px-4">
                    <Badge label={u.role} color={u.role === 'Admin' ? 'indigo' : 'slate'} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
