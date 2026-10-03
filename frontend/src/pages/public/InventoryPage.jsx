import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { carService } from '../../services/carService';
import { CarCard } from '../../components/cars/CarCard';
import { CarFilterPanel } from '../../components/cars/CarFilterPanel';
import { CarSortSelect } from '../../components/cars/CarSortSelect';
import { CarCardSkeleton } from '../../components/common/Skeletons';
import { EmptyState } from '../../components/common/EmptyState';
import { useFavorites } from '../../context/FavoritesContext';
import { SlidersHorizontal, Search, Heart } from 'lucide-react';
const INITIAL_FILTERS = {
    searchQuery: '',
    make: '',
    bodyType: '',
    condition: '',
    minPrice: '',
    maxPrice: '',
    minYear: '',
    maxYear: '',
    fuelType: '',
    transmission: '',
    status: '',
};
export const InventoryPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { favoriteIds } = useFavorites();
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
    const [sortOption, setSortOption] = useState('newest');
    // Filter state initialized from URL search params if present
    const [filters, setFilters] = useState(() => ({
        searchQuery: searchParams.get('search') || '',
        make: searchParams.get('make') || '',
        bodyType: searchParams.get('bodyType') || '',
        condition: searchParams.get('condition') || '',
        minPrice: searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : '',
        maxPrice: searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : '',
        minYear: searchParams.get('minYear') ? Number(searchParams.get('minYear')) : '',
        maxYear: searchParams.get('maxYear') ? Number(searchParams.get('maxYear')) : '',
        fuelType: searchParams.get('fuelType') || '',
        transmission: searchParams.get('transmission') || '',
        status: searchParams.get('status') || '',
    }));
    const showOnlySaved = searchParams.get('saved') === 'true';
    // Fetch cars when filters or sort change
    useEffect(() => {
        let isMounted = true;
        setLoading(true);
        carService
            .getCars(filters, sortOption)
            .then((data) => {
            if (isMounted) {
                setCars(data);
                setLoading(false);
            }
        })
            .catch((err) => {
            console.error('Failed to load inventory:', err);
            if (isMounted)
                setLoading(false);
        });
        return () => {
            isMounted = false;
        };
    }, [filters, sortOption]);
    // Keep URL search params synchronized
    const handleFilterChange = (key, value) => {
        const updated = { ...filters, [key]: value };
        setFilters(updated);
        const newParams = new URLSearchParams(searchParams);
        if (value !== '' && value !== undefined && value !== null) {
            newParams.set(key, String(value));
        }
        else {
            newParams.delete(key);
        }
        setSearchParams(newParams, { replace: true });
    };
    const handleResetFilters = () => {
        setFilters(INITIAL_FILTERS);
        setSearchParams(new URLSearchParams(), { replace: true });
    };
    // Derive unique makes for dropdown
    const availableMakes = useMemo(() => {
        return Array.from(new Set(cars.map((c) => c.make))).sort();
    }, [cars]);
    // Filter if saved wishlist filter is active
    const displayedCars = useMemo(() => {
        if (showOnlySaved) {
            return cars.filter((c) => favoriteIds.includes(c.id));
        }
        return cars;
    }, [cars, showOnlySaved, favoriteIds]);
    return (<div className="min-h-screen bg-[#090a0d] py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Title & Breadcrumb */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 border-b border-zinc-800/80 gap-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-red-500 mb-1">
              Shield Cars Ltd Showroom
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
              {showOnlySaved ? 'Your Saved Vehicles' : 'Available Inventory'}
            </h1>
            <p className="text-sm text-zinc-400 mt-2">
              Forensically certified pre-owned and delivery-mileage luxury & performance automobiles.
            </p>
          </div>

          {/* Quick Search Bar & Saved filter switch */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-zinc-400"/>
              <input type="text" placeholder="Search make, model, stock#..." value={filters.searchQuery} onChange={(e) => handleFilterChange('searchQuery', e.target.value)} className="w-64 bg-[#111317] border border-zinc-800 rounded-lg pl-9 pr-4 py-2 text-xs text-white placeholder-zinc-400 focus:border-red-600 focus:outline-none"/>
            </div>

            {/* Mobile Filter Button */}
            <button type="button" onClick={() => setMobileFilterOpen(true)} className="lg:hidden inline-flex items-center gap-2 px-3.5 py-2 bg-zinc-900 border border-zinc-800 text-xs font-semibold text-white rounded-lg hover:bg-zinc-800">
              <SlidersHorizontal className="w-3.5 h-3.5 text-red-500"/>
              <span>Filters</span>
            </button>
          </div>
        </div>

        {/* Results Bar */}
        <div className="py-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold text-white tabular-nums">
              {loading ? 'Searching...' : `${displayedCars.length} Vehicles Available`}
            </span>
            {showOnlySaved && (<span className="inline-flex items-center gap-1 text-xs text-red-400 bg-red-950/40 border border-red-800/40 px-2 py-0.5 rounded">
                <Heart className="w-3 h-3 fill-current"/>
                Wishlist Filter Active
              </span>)}
          </div>

          <div className="flex items-center gap-4">
            <CarSortSelect value={sortOption} onChange={setSortOption}/>
          </div>
        </div>

        {/* Main Grid & Filters Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Desktop Left Filter Sidebar */}
          <aside className="hidden lg:block lg:col-span-3">
            <CarFilterPanel filters={filters} onFilterChange={handleFilterChange} onReset={handleResetFilters} availableMakes={availableMakes} totalResultsCount={displayedCars.length}/>
          </aside>

          {/* Mobile Filter Drawer */}
          {mobileFilterOpen && (<CarFilterPanel filters={filters} onFilterChange={handleFilterChange} onReset={handleResetFilters} availableMakes={availableMakes} isMobileDrawer={true} onCloseMobileDrawer={() => setMobileFilterOpen(false)} totalResultsCount={displayedCars.length}/>)}

          {/* Right Inventory Results Column */}
          <div className="lg:col-span-9">
            {loading ? (<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (<CarCardSkeleton key={i}/>))}
              </div>) : displayedCars.length > 0 ? (<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayedCars.map((car) => (<CarCard key={car.id} car={car}/>))}
              </div>) : (<EmptyState title={showOnlySaved ? 'No Saved Vehicles' : 'No vehicles match your search'} description={showOnlySaved
                ? 'You have not added any vehicles to your wishlist yet. Click the heart icon on any vehicle card to save it.'
                : 'Try clearing specific filters, widening your price range, or searching for a different manufacturer.'} onReset={handleResetFilters} resetLabel={showOnlySaved ? 'Browse All Inventory' : 'Clear All Filters'}/>)}
          </div>
        </div>
      </div>
    </div>);
};
