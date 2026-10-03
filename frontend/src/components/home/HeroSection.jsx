import React from 'react';
import { Link } from 'react-router-dom';
import { HeroSearchModule } from '../search/HeroSearchModule';
import { ArrowRight, PhoneCall, ShieldCheck } from 'lucide-react';
export const HeroSection = () => {
    return (<section className="relative min-h-[92vh] flex flex-col justify-between pt-8 pb-16 overflow-hidden">
      {/* Background Hero Asset with Scrim Overlay */}
      <div className="absolute inset-0 z-0">
        <img src="/images/hero_porsche_dark_1790972867748.jpg" alt="Shield Cars Luxury Automotive Showroom" className="w-full h-full object-cover object-center brightness-[0.72] contrast-[1.08] scale-100 animate-[fadeIn_1.2s_ease-out]"/>
        {/* Cinematic Scrim & Radial Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#090a0d] via-[#090a0d]/40 to-black/80"/>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-950/20 via-transparent to-transparent pointer-events-none"/>
      </div>

      {/* Hero Headline & Value Proposition */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 w-full">
        <div className="max-w-3xl space-y-6">
          {/* Brand trust label */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 border border-zinc-700/60 backdrop-blur-md">
            <ShieldCheck className="w-3.5 h-3.5 text-red-500"/>
            <span className="text-xs uppercase tracking-widest font-semibold text-zinc-300">
              Premier Motoring · Certified Curations
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.05] uppercase">
            Drive Something <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-400">
              Exceptional.
            </span>
          </h1>

          {/* Supporting Copy */}
          <p className="text-base sm:text-lg text-zinc-300 max-w-2xl font-normal leading-relaxed">
            Shield Cars Ltd curates the world’s most sought-after performance, luxury, and supercar icons. Hand-inspected with forensic precision, verified provenance, and uncompromising client dedication.
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link to="/cars" className="inline-flex items-center gap-2 px-7 py-3.5 bg-red-600 hover:bg-red-700 active:scale-[0.98] text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-all shadow-xl shadow-red-950/50">
              <span>Browse Inventory</span>
              <ArrowRight className="w-4 h-4"/>
            </Link>

            <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3.5 bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-700/80 active:scale-[0.98] text-zinc-200 hover:text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-all backdrop-blur-sm">
              <PhoneCall className="w-3.5 h-3.5 text-red-500"/>
              <span>Contact Showroom</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Floating Hero Search Module */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-12 sm:mt-16">
        <HeroSearchModule />
      </div>
    </section>);
};
