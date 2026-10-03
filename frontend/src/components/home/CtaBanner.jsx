import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, PhoneCall, Shield } from 'lucide-react';
import { DEALERSHIP_INFO } from '../../data/dealershipInfo';
export const CtaBanner = () => {
    return (<section className="relative py-20 overflow-hidden bg-gradient-to-b from-[#090a0d] to-[#0d0f14] border-t border-zinc-900">
      {/* Subtle crimson ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-red-950/20 blur-[140px] pointer-events-none"/>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs uppercase tracking-widest font-semibold text-red-500">
          <Shield className="w-3.5 h-3.5"/>
          <span>Private Client Consultations Available</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
          Find Your Next Icon
        </h2>

        <p className="text-sm sm:text-base text-zinc-400 max-w-xl mx-auto leading-relaxed">
          Whether you seek a weekend track instrument or a commanding luxury grand tourer, our private acquisition team is ready to assist.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Link to="/cars" className="inline-flex items-center gap-2 px-8 py-4 bg-red-600 hover:bg-red-700 active:scale-[0.98] text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-all shadow-xl shadow-red-950/50">
            <span>Explore Full Inventory</span>
            <ArrowRight className="w-4 h-4"/>
          </Link>

          <a href={`tel:${DEALERSHIP_INFO.phone.raw}`} className="inline-flex items-center gap-2 px-7 py-4 bg-[#14161c] hover:bg-zinc-800 border border-zinc-800 text-zinc-200 hover:text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-all">
            <PhoneCall className="w-4 h-4 text-red-500"/>
            <span>Call Showroom Direct</span>
          </a>
        </div>
      </div>
    </section>);
};
