import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, ArrowLeft } from 'lucide-react';
export const NotFoundPage = () => {
    return (<div className="min-h-[75vh] flex flex-col items-center justify-center p-6 text-center bg-[#090a0d] text-zinc-100">
      <div className="w-16 h-16 rounded-full bg-red-600/10 border border-red-500/20 text-red-500 flex items-center justify-center mb-6">
        <ShieldAlert className="w-8 h-8"/>
      </div>

      <div className="text-xs uppercase tracking-widest text-zinc-400 font-mono mb-2">
        Error 404
      </div>

      <h1 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight mb-3">
        Page Not Located
      </h1>

      <p className="text-sm text-zinc-400 max-w-md mx-auto mb-8 leading-relaxed">
        The destination you requested does not exist or may have been repositioned within our inventory archives.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-4">
        <Link to="/" className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors">
          <ArrowLeft className="w-4 h-4"/>
          <span>Return to Homepage</span>
        </Link>
        <Link to="/cars" className="px-6 py-3 bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors">
          Browse Inventory
        </Link>
      </div>
    </div>);
};
