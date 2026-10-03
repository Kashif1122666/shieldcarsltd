import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
const CATEGORIES = [
    {
        name: 'Coupe',
        subtitle: 'Track-Tuned Supercars & GTs',
        query: 'Coupe',
        bgClass: 'from-zinc-900 to-black',
        count: '6 Available',
    },
    {
        name: 'SUV',
        subtitle: 'All-Terrain Luxury Flagships',
        query: 'SUV',
        bgClass: 'from-zinc-900 to-black',
        count: '4 Available',
    },
    {
        name: 'Sedan',
        subtitle: 'Executive High-Speed Cruisers',
        query: 'Sedan',
        bgClass: 'from-zinc-900 to-black',
        count: '3 Available',
    },
    {
        name: 'Convertible',
        subtitle: 'Open-Air Grand Tourers',
        query: 'Convertible',
        bgClass: 'from-zinc-900 to-black',
        count: '2 Available',
    },
    {
        name: 'Wagon',
        subtitle: 'High-Velocity Sports Tourers',
        query: 'Wagon',
        bgClass: 'from-zinc-900 to-black',
        count: '2 Available',
    },
];
export const BodyTypeGrid = () => {
    return (<section className="py-20 bg-[#090a0d] border-b border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-red-500">
              Curation By Form
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-1 uppercase">
              Browse By Body Style
            </h2>
          </div>
          <Link to="/cars" className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-zinc-400 hover:text-white transition-colors">
            <span>View All Curations</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-red-500"/>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {CATEGORIES.map((cat) => (<Link key={cat.name} to={`/cars?bodyType=${cat.query}`} className="group relative flex flex-col justify-between p-6 rounded-xl bg-[#111317] border border-zinc-800/80 hover:border-red-600/50 hover:bg-[#14171d] transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-red-950/20">
              <div className="flex justify-between items-start">
                <span className="text-[11px] font-mono text-zinc-400">
                  {cat.count}
                </span>
                <div className="w-8 h-8 rounded-full bg-zinc-800/80 flex items-center justify-center text-zinc-400 group-hover:text-white group-hover:bg-red-600 transition-colors">
                  <ArrowUpRight className="w-4 h-4"/>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-bold text-white group-hover:text-red-400 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-zinc-400 mt-1 line-clamp-1">
                  {cat.subtitle}
                </p>
              </div>
            </Link>))}
        </div>
      </div>
    </section>);
};
