import React, { useState } from 'react';
import { NavLink, Link, useNavigate, Outlet, Navigate } from 'react-router-dom';
import { ShieldLogo } from '../common/ShieldLogo';
import { useAuth } from '../../context/AuthContext';
import { LayoutDashboard, CarFront, PlusCircle, MessageSquare, ExternalLink, LogOut, Menu, X, } from 'lucide-react';
export const AdminLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    if (!user) {
        return <Navigate to="/admin/login" replace />;
    }
    const handleLogout = () => {
        logout();
        navigate('/admin/login');
    };
    const menuItems = [
        { label: 'Overview', path: '/admin', icon: LayoutDashboard, end: true },
        { label: 'Inventory', path: '/admin/cars', icon: CarFront, end: false },
        { label: 'Add Vehicle', path: '/admin/cars/new', icon: PlusCircle, end: false },
        { label: 'Inquiries', path: '/admin/inquiries', icon: MessageSquare, end: false },
    ];
    return (<div className="min-h-screen bg-[#0d0f12] text-zinc-200 flex">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (<div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden" onClick={() => setSidebarOpen(false)}/>)}

      {/* Sidebar */}
      <aside className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-[#12151a] border-r border-zinc-800 flex flex-col transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        {/* Brand Header */}
        <div className="h-20 px-6 flex items-center justify-between border-b border-zinc-800/80">
          <ShieldLogo size="sm" asLink={false}/>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-1 text-zinc-400 hover:text-white">
            <X className="w-5 h-5"/>
          </button>
        </div>

        {/* User Brief */}
        <div className="p-4 mx-4 my-4 rounded-lg bg-zinc-900/60 border border-zinc-800">
          <div className="text-[11px] font-medium tracking-wider text-red-400 uppercase">
            Management Portal
          </div>
          <div className="text-sm font-bold text-white truncate">
            {user?.name || 'Administrator'}
          </div>
          <div className="text-xs text-zinc-400 truncate">
            {user?.email || 'admin@shieldcars.co.uk'}
          </div>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto">
          {menuItems.map((item) => (<NavLink key={item.path} to={item.path} end={item.end} onClick={() => setSidebarOpen(false)} className={({ isActive }) => `flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive
                ? 'bg-red-600/10 text-red-400 border border-red-500/20 font-semibold'
                : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-white'}`}>
              <item.icon className="w-4 h-4 shrink-0"/>
              <span>{item.label}</span>
            </NavLink>))}
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-zinc-800 space-y-2">
          <Link to="/" target="_blank" className="flex items-center justify-between px-3.5 py-2 text-xs font-medium text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800/50 transition-colors">
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5"/>
              <span>Live Dealership Site</span>
            </span>
            <span className="text-[10px] text-zinc-400">View</span>
          </Link>

          <button onClick={handleLogout} type="button" className="flex items-center gap-2 w-full px-3.5 py-2 text-xs font-semibold text-zinc-400 hover:text-red-400 rounded-lg hover:bg-red-950/20 transition-colors text-left">
            <LogOut className="w-3.5 h-3.5"/>
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        {/* Top Navbar */}
        <header className="h-16 bg-[#12151a]/90 backdrop-blur border-b border-zinc-800 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 text-zinc-400 hover:text-white" aria-label="Open Sidebar">
              <Menu className="w-5 h-5"/>
            </button>
            <span className="text-xs font-bold tracking-widest text-zinc-400 uppercase hidden sm:inline-block">
              Shield Cars Ltd · Inventory Management System
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"/>
              <span>Live · System Online</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>);
};
