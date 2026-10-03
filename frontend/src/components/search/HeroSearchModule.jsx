import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
export const HeroSearchModule = ({ availableMakes = ['Porsche', 'Mercedes-Benz', 'BMW', 'Land Rover', 'Audi', 'Aston Martin', 'Tesla', 'Bentley'], }) => {
    const navigate = useNavigate();
    const [make, setMake] = useState('');
    const [bodyType, setBodyType] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [minYear, setMinYear] = useState('');
    const handleSearch = (e) => {
        e.preventDefault();
        const params = new URLSearchParams();
        if (make)
            params.set('make', make);
        if (bodyType)
            params.set('bodyType', bodyType);
        if (maxPrice)
            params.set('maxPrice', maxPrice);
        if (minYear)
            params.set('minYear', minYear);
        navigate(`/cars?${params.toString()}`);
    };
    return (<div className="w-full max-w-4xl mx-auto bg-[#111317]/90 backdrop-blur-md border border-zinc-800/90 rounded-2xl p-4 sm:p-6 shadow-2xl shadow-black/80">
      <div className="flex items-center justify-between pb-4 border-b border-zinc-800/80 mb-4">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"/>
          <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-300">
            Showroom Fast Locator
          </h2>
        </div>
        <span className="text-xs text-zinc-400">
          Instant inventory search
        </span>
      </div>

      <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {/* Make */}
        <div className="space-y-1">
          <label className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
            Make
          </label>
          <select value={make} onChange={(e) => setMake(e.target.value)} className="w-full bg-[#181a22] border border-zinc-700/60 rounded-lg px-3 py-2.5 text-xs text-white focus:border-red-600 focus:outline-none">
            <option value="">Any Manufacturer</option>
            {availableMakes.map((m) => (<option key={m} value={m}>
                {m}
              </option>))}
          </select>
        </div>

        {/* Body Type */}
        <div className="space-y-1">
          <label className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
            Body Type
          </label>
          <select value={bodyType} onChange={(e) => setBodyType(e.target.value)} className="w-full bg-[#181a22] border border-zinc-700/60 rounded-lg px-3 py-2.5 text-xs text-white focus:border-red-600 focus:outline-none">
            <option value="">Any Body Style</option>
            <option value="Coupe">Coupe</option>
            <option value="SUV">SUV</option>
            <option value="Sedan">Sedan</option>
            <option value="Convertible">Convertible</option>
            <option value="Wagon">Wagon</option>
          </select>
        </div>

        {/* Max Budget */}
        <div className="space-y-1">
          <label className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
            Max Price (£)
          </label>
          <select value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} className="w-full bg-[#181a22] border border-zinc-700/60 rounded-lg px-3 py-2.5 text-xs text-white focus:border-red-600 focus:outline-none tabular-nums">
            <option value="">No Maximum</option>
            <option value="100000">Up to £100,000</option>
            <option value="150000">Up to £150,000</option>
            <option value="200000">Up to £200,000</option>
            <option value="300000">Up to £300,000</option>
          </select>
        </div>

        {/* Min Year */}
        <div className="space-y-1">
          <label className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
            Min Year
          </label>
          <select value={minYear} onChange={(e) => setMinYear(e.target.value)} className="w-full bg-[#181a22] border border-zinc-700/60 rounded-lg px-3 py-2.5 text-xs text-white focus:border-red-600 focus:outline-none tabular-nums">
            <option value="">Any Year</option>
            <option value="2024">2024 or Newer</option>
            <option value="2023">2023 or Newer</option>
            <option value="2022">2022 or Newer</option>
          </select>
        </div>

        {/* Action Button */}
        <div className="flex items-end">
          <button type="submit" className="w-full h-[42px] bg-red-600 hover:bg-red-700 active:scale-[0.98] text-white text-xs font-bold tracking-wider uppercase rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-red-950/50">
            <Search className="w-3.5 h-3.5"/>
            <span>Find Car</span>
          </button>
        </div>
      </form>
    </div>);
};
