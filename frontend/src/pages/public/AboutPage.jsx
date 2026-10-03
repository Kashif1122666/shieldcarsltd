import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Award, Clock, Users, ArrowRight } from 'lucide-react';
export const AboutPage = () => {
    return (<div className="min-h-screen bg-[#090a0d] py-16 text-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        {/* Hero Banner */}
        <div className="max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs uppercase tracking-widest text-red-500 font-semibold">
            <Shield className="w-3.5 h-3.5"/>
            <span>The Shield Philosophy</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-white uppercase tracking-tight">
            Excellence Without Compromise.
          </h1>

          <p className="text-base sm:text-lg text-zinc-300 leading-relaxed font-light">
            Founded with an unwavering vision for automotive distinction, Shield Cars Ltd has emerged as London’s premier destination for certified pre-owned and delivery-mileage luxury, sports, and collector vehicles.
          </p>
        </div>

        {/* Feature Visual Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl">
            <img src="/images/hero_porsche_dark_1790972867748.jpg" alt="Shield Cars Facility" className="w-full aspect-[16/10] object-cover"/>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs uppercase tracking-widest text-red-500 font-bold">
              Provenance & Curation
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white uppercase">
              We Only Acquire What We Would Personally Cherish
            </h2>
            <p className="text-sm text-zinc-400 leading-relaxed">
              In a crowded market filled with ordinary vehicles, Shield Cars operates under an uncompromising filter. Fewer than 4% of vehicles evaluated by our purchasing team are ever admitted to our Mayfair showroom.
            </p>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Every example must satisfy stringent requirements: verified documented history, verifiable low mileage, factory paint depth tolerance, and immaculate cosmetic integrity.
            </p>
          </div>
        </div>

        {/* The 150-Point Standard */}
        <div className="bg-[#111317] border border-zinc-800 rounded-2xl p-8 sm:p-12 space-y-8">
          <div className="max-w-2xl">
            <span className="text-xs uppercase tracking-widest text-red-500 font-bold">
              Engineering Rigor
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight mt-1">
              The 150-Point Shield Inspection
            </h2>
            <p className="text-sm text-zinc-400 mt-3 leading-relaxed">
              Every motorcar undergoes forensic examination across four rigorous phases before being presented to clients.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-2">
              <div className="text-red-500 font-mono text-sm font-bold">Phase 01</div>
              <h3 className="text-base font-bold text-white">Powertrain & Mechanical</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Full dyno check, compression test, turbocharger boost telemetry, and electronic gearbox adaptation diagnostics.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-2">
              <div className="text-red-500 font-mono text-sm font-bold">Phase 02</div>
              <h3 className="text-base font-bold text-white">Chassis & Dynamics</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Laser wheel alignment, suspension damper health, carbon ceramic/steel rotor micrometer measurement, and ABS checks.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-2">
              <div className="text-red-500 font-mono text-sm font-bold">Phase 03</div>
              <h3 className="text-base font-bold text-white">Electronics & Firmware</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                OEM diagnostic scans for stored fault codes, infotainment firmware upgrades, and calibration of driver assistance cameras.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-2">
              <div className="text-red-500 font-mono text-sm font-bold">Phase 04</div>
              <h3 className="text-base font-bold text-white">Aesthetic Restoration</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Multi-stage paint correction, Swissvax protective sealant, leather deep hydration, and ozone interior sanitization.
              </p>
            </div>
          </div>
        </div>

        {/* Leadership & Values */}
        <div className="space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs uppercase tracking-widest text-red-500 font-bold">
              Our Principles
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight">
              Founding Commitments
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-xl bg-[#111317] border border-zinc-800/80 space-y-3">
              <Award className="w-8 h-8 text-red-500"/>
              <h3 className="text-base font-bold text-white">Guaranteed Title & Provenance</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Every vehicle includes a certified Certificate of Provenance confirming no finance encumbrances, zero unrecorded structural repairs, and verified mileage.
              </p>
            </div>
            <div className="p-8 rounded-xl bg-[#111317] border border-zinc-800/80 space-y-3">
              <Users className="w-8 h-8 text-red-500"/>
              <h3 className="text-base font-bold text-white">Discreet VIP Concierge</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                We cater to privacy-conscious high-net-worth individuals, executives, and international buyers with complete transaction discretion.
              </p>
            </div>
            <div className="p-8 rounded-xl bg-[#111317] border border-zinc-800/80 space-y-3">
              <Clock className="w-8 h-8 text-red-500"/>
              <h3 className="text-base font-bold text-white">Long-Term Custodianship</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Our relationship begins at vehicle handover. We manage future buy-backs, private consignment sales, collection storage, and maintenance servicing.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Strip */}
        <div className="text-center py-12 border-t border-zinc-800">
          <h3 className="text-2xl font-bold text-white mb-3">
            Experience the Shield standard in person
          </h3>
          <p className="text-sm text-zinc-400 max-w-md mx-auto mb-6">
            Schedule a private appointment in Mayfair or browse our currently available vehicles online.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/cars" className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors inline-flex items-center gap-2">
              <span>View Inventory</span>
              <ArrowRight className="w-4 h-4"/>
            </Link>
            <Link to="/contact" className="px-6 py-3 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-200 text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors">
              Schedule Consultation
            </Link>
          </div>
        </div>
      </div>
    </div>);
};
