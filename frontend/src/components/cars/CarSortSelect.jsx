import React from 'react';
import { ArrowDownUp } from 'lucide-react';
export const CarSortSelect = ({ value, onChange }) => {
    return (<div className="flex items-center gap-2">
      <ArrowDownUp className="w-3.5 h-3.5 text-zinc-400 shrink-0"/>
      <span className="text-xs text-zinc-400 font-medium whitespace-nowrap">Sort:</span>
      <select value={value} onChange={(e) => onChange(e.target.value)} className="bg-[#14161d] border border-zinc-800 text-xs font-medium text-zinc-200 rounded-lg px-2.5 py-1.5 focus:border-red-600 focus:outline-none cursor-pointer">
        <option value="newest">Recently Added</option>
        <option value="price_asc">Price: Low to High</option>
        <option value="price_desc">Price: High to Low</option>
        <option value="mileage_asc">Lowest Mileage</option>
        <option value="year_desc">Model Year: Newest</option>
      </select>
    </div>);
};
