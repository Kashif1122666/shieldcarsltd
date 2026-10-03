import React from 'react';
import { Link } from 'react-router-dom';
import { StatusBadge } from '../common/StatusBadge';
import { OptimizedImage } from '../common/OptimizedImage';
import { useFavorites } from '../../context/FavoritesContext';
import { Heart, Gauge, Fuel, Cog, ArrowRight, Sparkles } from 'lucide-react';
export const CarCard = ({ car }) => {
    const { isFavorite, toggleFavorite } = useFavorites();
    const favorite = isFavorite(car.id);
    const formattedPrice = new Intl.NumberFormat('en-GB', {
        style: 'currency',
        currency: 'GBP',
        maximumFractionDigits: 0,
    }).format(car.price);
    const formattedMileage = new Intl.NumberFormat('en-GB').format(car.mileage);
    return (<div className="group relative flex flex-col bg-[#111317] border border-zinc-800/80 hover:border-zinc-700/80 rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/70">
      {/* Top Image Container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-zinc-900">
        <Link to={`/cars/${car.id}`} className="block w-full h-full">
          <OptimizedImage src={car.images[0] || ''} alt={`${car.year} ${car.make} ${car.model}`} className="transition-transform duration-500 ease-out group-hover:scale-105" fallbackText={`${car.make} ${car.model}`}/>
        </Link>

        {/* Gradient Scrim for Contrast */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/80 via-transparent to-black/30"/>

        {/* Top Badges: Status & Featured */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <div className="pointer-events-auto">
            <StatusBadge status={car.status} size="sm"/>
          </div>

          <div className="flex items-center gap-2 pointer-events-auto">
            {car.featured && (<span className="inline-flex items-center gap-1 text-[10px] font-bold tracking-wider uppercase bg-red-600/90 text-white px-2 py-0.5 rounded shadow">
                <Sparkles className="w-3 h-3"/>
                Featured
              </span>)}
            {/* Quick Favorite Action */}
            <button type="button" onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleFavorite(car.id);
        }} aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'} className="p-1.5 rounded-full bg-black/60 backdrop-blur-md text-zinc-300 hover:text-white border border-white/10 transition-colors">
              <Heart className={`w-4 h-4 transition-colors ${favorite ? 'text-red-500 fill-red-500' : ''}`}/>
            </button>
          </div>
        </div>

        {/* Body Type on Bottom Image Corner */}
        <div className="absolute bottom-2.5 left-3 text-[11px] font-semibold text-zinc-300 tracking-wider uppercase">
          {car.bodyType}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex flex-col flex-1 p-5">
        {/* Unboxed Metadata: Year · Condition */}
        <div className="flex items-center gap-2 text-xs text-zinc-400 font-medium mb-1">
          <span>{car.year}</span>
          <span aria-hidden="true" className="text-zinc-600">·</span>
          <span>{car.condition}</span>
          {car.stockNumber && (<>
              <span aria-hidden="true" className="text-zinc-600">·</span>
              <span className="font-mono text-[11px] text-zinc-400">{car.stockNumber}</span>
            </>)}
        </div>

        {/* Title */}
        <Link to={`/cars/${car.id}`} className="group-hover:text-red-500 transition-colors">
          <h3 className="text-lg font-bold text-white tracking-tight leading-snug line-clamp-1">
            {car.make} {car.model}
          </h3>
          {car.trim && (<p className="text-xs text-zinc-400 font-medium line-clamp-1 mt-0.5">
              {car.trim}
            </p>)}
        </Link>

        {/* Key Quick Specs Row (Zero-pill clean layout) */}
        <div className="grid grid-cols-3 gap-2 py-3.5 my-3 border-y border-zinc-800/80 text-xs text-zinc-300">
          <div className="flex items-center gap-1.5 truncate">
            <Gauge className="w-3.5 h-3.5 text-zinc-400 shrink-0"/>
            <span className="tabular-nums truncate">{formattedMileage} mi</span>
          </div>
          <div className="flex items-center gap-1.5 truncate">
            <Cog className="w-3.5 h-3.5 text-zinc-400 shrink-0"/>
            <span className="truncate">{car.transmission}</span>
          </div>
          <div className="flex items-center gap-1.5 truncate">
            <Fuel className="w-3.5 h-3.5 text-zinc-400 shrink-0"/>
            <span className="truncate">{car.fuelType}</span>
          </div>
        </div>

        {/* Price & Action Row */}
        <div className="mt-auto flex items-center justify-between pt-1">
          <div>
            <span className="block text-[10px] uppercase tracking-wider text-zinc-400 font-medium">
              Offered At
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-extrabold text-white tracking-tight tabular-nums">
                {formattedPrice}
              </span>
              {car.originalPrice && car.originalPrice > car.price && (<span className="text-xs text-zinc-400 line-through tabular-nums">
                  {new Intl.NumberFormat('en-GB', {
                style: 'currency',
                currency: 'GBP',
                maximumFractionDigits: 0,
            }).format(car.originalPrice)}
                </span>)}
            </div>
          </div>

          <Link to={`/cars/${car.id}`} className="inline-flex items-center gap-1 px-3.5 py-2 text-xs font-semibold text-white bg-zinc-800 group-hover:bg-red-600 rounded-lg transition-all">
            <span>Details</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5"/>
          </Link>
        </div>
      </div>
    </div>);
};
