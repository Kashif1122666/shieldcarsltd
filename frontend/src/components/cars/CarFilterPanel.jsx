import React from 'react';
import { RotateCcw, X, SlidersHorizontal } from 'lucide-react';
const BODY_TYPES = ['Coupe', 'Sedan', 'SUV', 'Convertible', 'Wagon'];
const FUEL_TYPES = ['Petrol', 'Diesel', 'Hybrid', 'Electric'];
const TRANSMISSIONS = ['Automatic', 'Manual', 'Dual-Clutch'];
const CONDITIONS = ['New', 'Certified Pre-Owned', 'Used'];
const STATUSES = [
    { label: 'All Statuses', value: '' },
    { label: 'Available Only', value: 'available' },
    { label: 'Reserved', value: 'reserved' },
    { label: 'Sold', value: 'sold' },
];
export const CarFilterPanel = ({ filters, onFilterChange, onReset, availableMakes, isMobileDrawer = false, onCloseMobileDrawer, totalResultsCount, }) => {
    const content = (<div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-red-500"/>
          <h3 className="text-sm font-bold uppercase tracking-wider text-white">
            Refine Inventory
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <button type="button" onClick={onReset} className="flex items-center gap-1 text-xs text-zinc-400 hover:text-white transition-colors" title="Reset Filters">
            <RotateCcw className="w-3 h-3"/>
            <span>Reset</span>
          </button>
          {isMobileDrawer && onCloseMobileDrawer && (<button type="button" onClick={onCloseMobileDrawer} className="p-1 text-zinc-400 hover:text-white">
              <X className="w-5 h-5"/>
            </button>)}
        </div>
      </div>

      {/* Make Selector */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">
          Manufacturer
        </label>
        <select value={filters.make} onChange={(e) => onFilterChange('make', e.target.value)} className="w-full bg-[#16181f] border border-zinc-800 text-sm text-white rounded-lg px-3 py-2.5 focus:border-red-600 focus:outline-none">
          <option value="">All Manufacturers</option>
          {availableMakes.map((make) => (<option key={make} value={make}>
              {make}
            </option>))}
        </select>
      </div>

      {/* Body Type Select */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">
          Body Type
        </label>
        <select value={filters.bodyType} onChange={(e) => onFilterChange('bodyType', e.target.value)} className="w-full bg-[#16181f] border border-zinc-800 text-sm text-white rounded-lg px-3 py-2.5 focus:border-red-600 focus:outline-none">
          <option value="">All Body Styles</option>
          {BODY_TYPES.map((type) => (<option key={type} value={type}>
              {type}
            </option>))}
        </select>
      </div>

      {/* Price Range */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">
          Price Range (£ GBP)
        </label>
        <div className="grid grid-cols-2 gap-2">
          <input type="number" placeholder="Min £" value={filters.minPrice} onChange={(e) => onFilterChange('minPrice', e.target.value ? Number(e.target.value) : '')} className="w-full bg-[#16181f] border border-zinc-800 text-xs text-white rounded-lg px-3 py-2 focus:border-red-600 focus:outline-none tabular-nums"/>
          <input type="number" placeholder="Max £" value={filters.maxPrice} onChange={(e) => onFilterChange('maxPrice', e.target.value ? Number(e.target.value) : '')} className="w-full bg-[#16181f] border border-zinc-800 text-xs text-white rounded-lg px-3 py-2 focus:border-red-600 focus:outline-none tabular-nums"/>
        </div>
      </div>

      {/* Year Range */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">
          Year
        </label>
        <div className="grid grid-cols-2 gap-2">
          <input type="number" placeholder="From" value={filters.minYear} onChange={(e) => onFilterChange('minYear', e.target.value ? Number(e.target.value) : '')} className="w-full bg-[#16181f] border border-zinc-800 text-xs text-white rounded-lg px-3 py-2 focus:border-red-600 focus:outline-none tabular-nums"/>
          <input type="number" placeholder="To" value={filters.maxYear} onChange={(e) => onFilterChange('maxYear', e.target.value ? Number(e.target.value) : '')} className="w-full bg-[#16181f] border border-zinc-800 text-xs text-white rounded-lg px-3 py-2 focus:border-red-600 focus:outline-none tabular-nums"/>
        </div>
      </div>

      {/* Fuel Type */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">
          Fuel & Powertrain
        </label>
        <select value={filters.fuelType} onChange={(e) => onFilterChange('fuelType', e.target.value)} className="w-full bg-[#16181f] border border-zinc-800 text-sm text-white rounded-lg px-3 py-2.5 focus:border-red-600 focus:outline-none">
          <option value="">All Powertrains</option>
          {FUEL_TYPES.map((fuel) => (<option key={fuel} value={fuel}>
              {fuel}
            </option>))}
        </select>
      </div>

      {/* Transmission */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">
          Transmission
        </label>
        <select value={filters.transmission} onChange={(e) => onFilterChange('transmission', e.target.value)} className="w-full bg-[#16181f] border border-zinc-800 text-sm text-white rounded-lg px-3 py-2.5 focus:border-red-600 focus:outline-none">
          <option value="">All Transmissions</option>
          {TRANSMISSIONS.map((trans) => (<option key={trans} value={trans}>
              {trans}
            </option>))}
        </select>
      </div>

      {/* Condition */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">
          Vehicle Condition
        </label>
        <select value={filters.condition} onChange={(e) => onFilterChange('condition', e.target.value)} className="w-full bg-[#16181f] border border-zinc-800 text-sm text-white rounded-lg px-3 py-2.5 focus:border-red-600 focus:outline-none">
          <option value="">All Conditions</option>
          {CONDITIONS.map((cond) => (<option key={cond} value={cond}>
              {cond}
            </option>))}
        </select>
      </div>

      {/* Availability Status */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">
          Availability
        </label>
        <select value={filters.status} onChange={(e) => onFilterChange('status', e.target.value)} className="w-full bg-[#16181f] border border-zinc-800 text-sm text-white rounded-lg px-3 py-2.5 focus:border-red-600 focus:outline-none">
          {STATUSES.map((st) => (<option key={st.value} value={st.value}>
              {st.label}
            </option>))}
        </select>
      </div>

      {isMobileDrawer && (<button type="button" onClick={onCloseMobileDrawer} className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-semibold text-sm rounded-lg transition-colors mt-6">
          Show {totalResultsCount} Matching Vehicles
        </button>)}
    </div>);
    if (isMobileDrawer) {
        return (<div className="fixed inset-0 z-50 flex">
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" onClick={onCloseMobileDrawer}/>
        <div className="relative ml-auto w-full max-w-xs bg-[#111317] border-l border-zinc-800 h-full overflow-y-auto p-6 shadow-2xl">
          {content}
        </div>
      </div>);
    }
    return (<div className="sticky top-28 bg-[#111317] border border-zinc-800/80 rounded-xl p-5 shadow-lg">
      {content}
    </div>);
};
