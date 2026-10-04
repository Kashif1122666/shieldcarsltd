import React, { useState } from 'react';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import { ShieldLogo } from '../../components/common/ShieldLogo';
import { useAuth } from '../../context/AuthContext';
import { Lock, Mail, KeyRound, Info } from 'lucide-react';
import { ButtonLoader } from '../../components/common/Skeletons';
export const AdminLoginPage = () => {
    const navigate = useNavigate();
    const { login, user } = useAuth();
    if (user) {
        return <Navigate to="/admin" replace />;
    }
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMsg('');
        try {
            await login(email, password);
            navigate('/admin');
        }
        catch (err) {
            setErrorMsg(err.message || 'Login failed. Please verify credentials.');
        }
        finally {
            setLoading(false);
        }
    };
    return (<div className="min-h-screen bg-[#090a0d] flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background ambient automotive light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-950/20 blur-[130px] pointer-events-none"/>

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-4">
        <ShieldLogo size="lg" asLink={false}/>
        <div>
          <h2 className="text-2xl font-black uppercase tracking-tight text-white">
            Staff & Inventory Portal
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            Secure administrative control interface for Shield Cars Ltd.
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-[#111317] border border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
          {/* Backend connection notice */}
          <div className="p-3 bg-zinc-900/90 border border-zinc-800 rounded-lg flex items-start gap-2 text-xs text-zinc-400">
            <Info className="w-4 h-4 text-red-500 shrink-0 mt-0.5"/>
            <div>
              <span className="font-semibold text-zinc-300">Staff sign in:</span>{' '}
              Authenticate with your administrator account to manage inventory and inquiries.
            </div>
          </div>

          {errorMsg && (<div className="p-3 bg-red-950/40 border border-red-800/60 rounded-lg text-xs text-red-300">
              {errorMsg}
            </div>)}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1.5">
                Staff Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-4 h-4 text-zinc-400"/>
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-[#16181f] border border-zinc-800 rounded-lg pl-9 pr-3 py-2.5 text-sm text-white focus:border-red-600 focus:outline-none"/>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300">
                  Password
                </label>
                <span className="text-[10px] text-zinc-400">Demo preset</span>
              </div>
              <div className="relative">
                <KeyRound className="absolute left-3 top-3 w-4 h-4 text-zinc-400"/>
                <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-[#16181f] border border-zinc-800 rounded-lg pl-9 pr-3 py-2.5 text-sm text-white focus:border-red-600 focus:outline-none"/>
              </div>
            </div>

            <button type="submit" disabled={loading} className="w-full py-3 bg-red-600 hover:bg-red-700 active:scale-[0.98] text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-all shadow-lg shadow-red-950/50 flex items-center justify-center gap-2 mt-2">
              {loading ? (<ButtonLoader text="Authenticating..."/>) : (<>
                  <Lock className="w-3.5 h-3.5"/>
                  <span>Access Dashboard</span>
                </>)}
            </button>
          </form>

          <div className="pt-4 border-t border-zinc-800 text-center">
            <Link to="/" className="text-xs text-zinc-400 hover:text-white transition-colors">
              ← Return to Public Dealership Website
            </Link>
          </div>
        </div>
      </div>
    </div>);
};
