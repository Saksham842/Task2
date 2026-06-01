import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 text-white px-6 py-3 flex justify-between items-center">
      <Link to="/dashboard" className="font-bold text-lg">Task Manager</Link>
      {user && (
        <div className="flex items-center gap-4">
          <span className="text-sm opacity-80">{user.name} ({user.role})</span>
          <button onClick={handleLogout}
            className="border border-white text-white px-3 py-1 rounded text-xs cursor-pointer hover:bg-blue-700">
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
