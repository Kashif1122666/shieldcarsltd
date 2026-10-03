import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldLogo } from '../common/ShieldLogo';
import { DEALERSHIP_INFO } from '../../data/dealershipInfo';
import { MapPin, Phone, Mail, Clock, ShieldCheck } from 'lucide-react';
export const Footer = () => {
    return (<footer className="bg-[#07080a] border-t border-zinc-800/80 text-zinc-400">
      {/* Upper Pre-Footer Trust Bar */}
      <div className="border-b border-zinc-900 py-8 bg-[#090a0d]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center md:text-left">
            {DEALERSHIP_INFO.trustPillars.map((pillar, i) => (<div key={i} className="flex flex-col space-y-1">
                <div className="flex items-center justify-center md:justify-start gap-2 text-white font-semibold text-sm">
                  <ShieldCheck className="w-4 h-4 text-red-500 shrink-0"/>
                  <span>{pillar.title}</span>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed line-clamp-2">
                  {pillar.description}
                </p>
              </div>))}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand & Introduction */}
          <div className="lg:col-span-2 space-y-4">
            <ShieldLogo size="md"/>
            <p className="text-sm text-zinc-400 leading-relaxed max-w-sm mt-3">
              Shield Cars Ltd is a premier automotive dealership specializing in hand-selected, certified luxury and performance sports vehicles. Every automobile in our curation represents uncompromising engineering excellence and flawless provenance.
            </p>
            <div className="pt-2 text-xs text-zinc-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"/>
              <span>Showroom Open for Consultations & Test Drives</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-white font-bold">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/cars" className="hover:text-white transition-colors">All Inventory</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">About Shield Cars</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">Contact & Location</Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-white transition-colors">Buyer FAQs</Link>
              </li>
              <li>
                <Link to="/admin" className="text-zinc-400 hover:text-zinc-300 transition-colors">
                  Staff Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Vehicle Body Types */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-white font-bold">
              Curations
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/cars?bodyType=Coupe" className="hover:text-white transition-colors">
                  High-Performance Coupes
                </Link>
              </li>
              <li>
                <Link to="/cars?bodyType=SUV" className="hover:text-white transition-colors">
                  Luxury Flagship SUVs
                </Link>
              </li>
              <li>
                <Link to="/cars?bodyType=Sedan" className="hover:text-white transition-colors">
                  Executive Sports Sedans
                </Link>
              </li>
              <li>
                <Link to="/cars?bodyType=Convertible" className="hover:text-white transition-colors">
                  Grand Tourer Convertibles
                </Link>
              </li>
              <li>
                <Link to="/cars?fuelType=Electric" className="hover:text-white transition-colors">
                  High-Output EV & Hybrids
                </Link>
              </li>
            </ul>
          </div>

          {/* Dealership Coordinates & Hours */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-white font-bold">
              Showroom Coordinates
            </h4>
            <div className="space-y-2.5 text-xs text-zinc-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-red-500 shrink-0 mt-0.5"/>
                <span>{DEALERSHIP_INFO.address.full}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-red-500 shrink-0"/>
                <a href={`tel:${DEALERSHIP_INFO.phone.raw}`} className="hover:text-white tabular-nums">
                  {DEALERSHIP_INFO.phone.display}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-red-500 shrink-0"/>
                <a href={`mailto:${DEALERSHIP_INFO.email.sales}`} className="hover:text-white">
                  {DEALERSHIP_INFO.email.sales}
                </a>
              </div>
              <div className="flex items-start gap-2.5 pt-1">
                <Clock className="w-4 h-4 text-zinc-400 shrink-0 mt-0.5"/>
                <div>
                  <div className="text-zinc-300 font-medium">Mon–Fri: 08:30 – 19:00</div>
                  <div className="text-zinc-400">Sat: 09:00 – 18:00 · Sun: Appt Only</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright & legal */}
        <div className="mt-12 pt-8 border-t border-zinc-900 flex flex-col md:flex-row items-center justify-between text-xs text-zinc-400 gap-4">
          <p>© {new Date().getFullYear()} {DEALERSHIP_INFO.name}. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Confidential Vehicle Procurement</span>
            <span>·</span>
            <span>Bespoke Automotive Financing</span>
            <span>·</span>
            <span>Enclosed Global Transport</span>
          </div>
        </div>
      </div>
    </footer>);
};
