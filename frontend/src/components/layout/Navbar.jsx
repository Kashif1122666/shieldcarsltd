import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { ShieldLogo } from '../common/ShieldLogo';
import { useFavorites } from '../../context/FavoritesContext';
import { Phone, Heart, Menu, X, Shield, ArrowUpRight } from 'lucide-react';
import { DEALERSHIP_INFO } from '../../data/dealershipInfo';
export const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { totalFavorites } = useFavorites();
    const location = useLocation();
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    // Close mobile menu on route change
    useEffect(() => {
        setMobileMenuOpen(false);
    }, [location.pathname]);
    const navLinks = [
        { label: 'Home', path: '/' },
        { label: 'Inventory', path: '/cars' },
        { label: 'About', path: '/about' },
        { label: 'Contact', path: '/contact' },
        { label: 'FAQ', path: '/faq' },
    ];
    return (<>
      <header className={`sticky top-0 z-40 transition-all duration-300 ${isScrolled
            ? 'bg-[#090a0d]/95 backdrop-blur-md border-b border-zinc-800/80 shadow-xl shadow-black/40'
            : 'bg-[#090a0d] border-b border-zinc-900'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Zone 1: Brand Wordmark / Shield */}
            <div className="flex-shrink-0">
              <ShieldLogo size="md"/>
            </div>

            {/* Zone 2: 4-6 Clean Text Navigation Links */}
            <nav className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide">
              {navLinks.map((link) => (<NavLink key={link.path} to={link.path} className={({ isActive }) => `relative py-1 text-sm transition-colors duration-200 ${isActive
                ? 'text-white font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-red-600'
                : 'text-zinc-400 hover:text-white'}`}>
                  {link.label}
                </NavLink>))}
            </nav>

            {/* Zone 3: 1-2 Primary Actions & Controls */}
            <div className="hidden lg:flex items-center gap-4">
              {/* Direct Phone Affordance */}
              <a href={`tel:${DEALERSHIP_INFO.phone.raw}`} className="flex items-center gap-2 text-xs font-semibold text-zinc-300 hover:text-white px-3 py-2 rounded-lg hover:bg-zinc-800/50 transition-colors" title="Call Dealership Concierge">
                <Phone className="w-3.5 h-3.5 text-red-500"/>
                <span className="tabular-nums">{DEALERSHIP_INFO.phone.display}</span>
              </a>

              {/* Saved Vehicles / Shortlist Link */}
              <Link to="/cars?saved=true" className="relative p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800/50 transition-colors" title="View Saved Vehicles">
                <Heart className="w-5 h-5"/>
                {totalFavorites > 0 && (<span className="absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 bg-red-600 text-white text-[10px] font-bold rounded-full">
                    {totalFavorites}
                  </span>)}
              </Link>

              {/* Primary Call to Action */}
              <Link to="/cars" className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold tracking-wider uppercase text-white bg-red-600 hover:bg-red-700 active:scale-[0.98] rounded-lg transition-all shadow-md shadow-red-950/40">
                <span>Explore Cars</span>
                <ArrowUpRight className="w-3.5 h-3.5"/>
              </Link>

              {/* Subtle Admin Link */}
              <Link to="/admin" className="text-[11px] uppercase tracking-wider text-zinc-400 hover:text-zinc-200 transition-colors p-1" title="Staff Portal">
                Portal
              </Link>
            </div>

            {/* Mobile Menu & Saved Button */}
            <div className="flex md:hidden items-center gap-2">
              <Link to="/cars?saved=true" className="relative p-2 text-zinc-300 hover:text-white" aria-label="Favorites">
                <Heart className="w-5 h-5"/>
                {totalFavorites > 0 && (<span className="absolute top-0 right-0 flex items-center justify-center w-4 h-4 bg-red-600 text-white text-[9px] font-bold rounded-full">
                    {totalFavorites}
                  </span>)}
              </Link>

              <button type="button" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-zinc-400 hover:text-white focus:outline-none" aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}>
                {mobileMenuOpen ? <X className="w-6 h-6"/> : <Menu className="w-6 h-6"/>}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (<div className="md:hidden fixed inset-0 top-20 z-50 bg-[#090a0d] border-t border-zinc-800 flex flex-col p-6 animate-in fade-in duration-200">
          <div className="flex flex-col space-y-4 text-base font-medium">
            {navLinks.map((link) => (<NavLink key={link.path} to={link.path} className={({ isActive }) => `py-2.5 px-3 rounded-lg transition-colors ${isActive
                    ? 'bg-zinc-800 text-red-500 font-semibold'
                    : 'text-zinc-300 hover:bg-zinc-900 hover:text-white'}`}>
                {link.label}
              </NavLink>))}
          </div>

          <div className="mt-8 pt-6 border-t border-zinc-800 space-y-4">
            <a href={`tel:${DEALERSHIP_INFO.phone.raw}`} className="flex items-center justify-center gap-2 w-full py-3 bg-zinc-900 border border-zinc-800 text-zinc-200 text-sm font-semibold rounded-lg">
              <Phone className="w-4 h-4 text-red-500"/>
              <span>Call Concierge: {DEALERSHIP_INFO.phone.display}</span>
            </a>

            <Link to="/cars" className="flex items-center justify-center gap-2 w-full py-3 bg-red-600 text-white text-sm font-semibold rounded-lg shadow-lg shadow-red-950/50">
              <span>View Available Inventory</span>
              <ArrowUpRight className="w-4 h-4"/>
            </Link>

            <Link to="/admin" className="flex items-center justify-center gap-2 w-full py-2.5 text-zinc-400 hover:text-zinc-200 text-xs uppercase tracking-wider font-semibold">
              <Shield className="w-3.5 h-3.5"/>
              <span>Dealership Admin Portal</span>
            </Link>
          </div>
        </div>)}
    </>);
};
