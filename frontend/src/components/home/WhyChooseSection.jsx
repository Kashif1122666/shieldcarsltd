import React from 'react';
import { ShieldCheck, FileCheck, Award, Truck } from 'lucide-react';
const REASONS = [
    {
        icon: ShieldCheck,
        title: '150-Point Precision Verification',
        description: 'Every motorcar in our showroom undergoes exhaustive diagnostic, dyno, mechanical, and cosmetic inspection by factory-trained specialists before passing certification.',
    },
    {
        icon: FileCheck,
        title: 'Complete Provenance & Transparency',
        description: 'We provide complete forensic vehicle histories, verified single-owner lineages, fully documented service books, and guaranteed clean titles with no unrecorded discrepancies.',
    },
    {
        icon: Award,
        title: 'VIP Concierge Service',
        description: 'Private viewing suites, confidential discreet transactions, flexible bespoke acquisition structuring, and direct access to dedicated automotive advisors.',
    },
    {
        icon: Truck,
        title: 'Enclosed Climate-Controlled Transport',
        description: 'White-glove nationwide and international delivery straight to your residence or private collection facility inside covered, climate-regulated single-car transporters.',
    },
];
export const WhyChooseSection = () => {
    return (<section className="py-24 bg-[#0d0f13] border-b border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-red-500">
            The Shield Benchmark
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
            Why Shield Cars Ltd
          </h2>
          <p className="text-sm text-zinc-400 leading-relaxed">
            Acquiring an exceptional motorcar should be as thrilling and refined as the machine itself. We uphold rigorous standards in curation, verification, and client confidentiality.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {REASONS.map((item, idx) => (<div key={idx} className="flex flex-col p-8 rounded-2xl bg-[#111317] border border-zinc-800/80 hover:border-zinc-700 transition-all duration-300 relative group">
              <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-red-500 mb-6 group-hover:scale-105 group-hover:bg-red-950/20 transition-all">
                <item.icon className="w-6 h-6"/>
              </div>

              <h3 className="text-base font-bold text-white mb-2 leading-snug">
                {item.title}
              </h3>

              <p className="text-xs text-zinc-400 leading-relaxed">
                {item.description}
              </p>
            </div>))}
        </div>
      </div>
    </section>);
};
