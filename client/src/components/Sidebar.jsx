import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ClipboardDocumentListIcon } from '@heroicons/react/24/outline';

const links = (isAdmin) => [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/tasks', label: isAdmin ? 'All Tasks' : 'My Tasks' },
  ...(isAdmin ? [{ to: '/users', label: 'Users' }] : []),
];

export default function Sidebar({ open, onClose }) {
  const { user, isAdmin, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const initials = user?.name?.split(' ').map((n) => n[0]).join('').toUpperCase() || '?';

  return (
    <>
      {open && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={onClose} />}
      <aside className={`fixed top-0 left-0 z-50 h-full w-64 bg-slate-900 border-r border-white/10 transform transition-transform duration-200 lg:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full p-4">
          <div className="flex items-center gap-3 mb-8 px-2">
            <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center">
              <ClipboardDocumentListIcon className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold text-white">TaskFlow</span>
          </div>
          <nav className="flex-1 space-y-1">
            {links(isAdmin).map((link) => {
              const active = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={onClose}
                  className={`block px-3 py-2 rounded-lg text-sm transition ${active ? 'bg-indigo-600/20 text-indigo-400 font-medium' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
          <div className="pt-4 border-t border-white/10 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-indigo-600 flex items-center justify-center text-sm font-semibold">
              {initials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{user?.name}</p>
              <span className="inline-block px-2 py-0.5 rounded-full text-xs bg-indigo-600/30 text-indigo-400">{user?.role}</span>
            </div>
            <button onClick={handleLogout} className="text-xs text-slate-500 hover:text-red-400 transition">Exit</button>
          </div>
        </div>
      </aside>
    </>
  );
}
