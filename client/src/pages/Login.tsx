import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await login(email, password);
            navigate('/');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
            <div className="bg-slate-800 p-8 rounded-lg shadow-xl w-full max-w-md border border-slate-700">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">Login</h1>
                    <p className="text-slate-400">Welcome to Smart Leads</p>
                </div>

                {error && <p className="bg-red-500/10 text-red-500 p-3 rounded mb-4 text-sm text-center">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-slate-300 text-sm mb-1">Email</label>
                        <input 
                            type="email" 
                            className="w-full bg-slate-700 border border-slate-600 rounded p-2 text-white outline-none focus:border-indigo-500" 
                            placeholder="email@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-slate-300 text-sm mb-1">Password</label>
                        <input 
                            type="password" 
                            className="w-full bg-slate-700 border border-slate-600 rounded p-2 text-white outline-none focus:border-indigo-500" 
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded font-bold transition">
                        Sign In
                    </button>
                </form>

                <p className="mt-6 text-center text-slate-400 text-sm">
                    No account? <Link to="/register" className="text-indigo-400 hover:underline">Register here</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
