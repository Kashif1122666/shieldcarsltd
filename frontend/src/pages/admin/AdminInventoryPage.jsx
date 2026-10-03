import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { carService } from '../../services/carService';
import { OptimizedImage } from '../../components/common/OptimizedImage';
import { AdminLoading } from '../../components/common/Skeletons';
import { PlusCircle, Search, ExternalLink, Edit, Trash2, Sparkles, AlertCircle, } from 'lucide-react';
export const AdminInventoryPage = () => {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [deleteConfirmId, setDeleteConfirmId] = useState(null);
    const loadData = () => {
        setLoading(true);
        carService
            .getCars()
            .then((data) => {
            setCars(data);
            setLoading(false);
        })
            .catch((err) => {
            console.error('Failed to load cars:', err);
            setLoading(false);
        });
    };
    useEffect(() => {
        loadData();
    }, []);
    const handleStatusChange = async (id, newStatus) => {
        try {
            await carService.updateCarStatus(id, newStatus);
            setCars((prev) => prev.map((c) => (c.id === id ? { ...c, status: newStatus } : c)));
        }
        catch (err) {
            console.error('Failed to update status:', err);
        }
    };
    const handleToggleFeatured = async (id) => {
        try {
            const updated = await carService.toggleFeatured(id);
            setCars((prev) => prev.map((c) => (c.id === id ? { ...c, featured: updated.featured } : c)));
        }
        catch (err) {
            console.error('Failed to toggle featured:', err);
        }
    };
    const handleDelete = async (id) => {
        try {
            await carService.deleteCar(id);
            setCars((prev) => prev.filter((c) => c.id !== id));
            setDeleteConfirmId(null);
        }
        catch (err) {
            console.error('Failed to delete car:', err);
        }
    };
    const filteredCars = cars.filter((car) => {
        const matchesSearch = car.make.toLowerCase().includes(searchQuery.toLowerCase()) ||
            car.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
            car.stockNumber.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = !statusFilter || car.status === statusFilter;
        return matchesSearch && matchesStatus;
    });
    return (<div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
            Inventory Management
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Maintain vehicle records, manage live status, feature highlights, or add acquisitions.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/admin/cars/new" className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors shadow-md shadow-red-950/40">
            <PlusCircle className="w-3.5 h-3.5"/>
            <span>Add Vehicle</span>
          </Link>
        </div>
      </div>

      {/* Filter / Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-[#12151a] p-4 rounded-xl border border-zinc-800">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-zinc-400"/>
          <input type="text" placeholder="Search make, model, stock#..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full bg-[#181a22] border border-zinc-800 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-zinc-400 focus:border-red-600 focus:outline-none"/>
        </div>

        {/* Status Filters */}
        <div className="flex items-center gap-1 p-1 bg-[#181a22] rounded-lg border border-zinc-800/80 text-xs">
          {[
            { label: 'All', value: '' },
            { label: 'Available', value: 'available' },
            { label: 'Reserved', value: 'reserved' },
            { label: 'Sold', value: 'sold' },
        ].map((item) => (<button key={item.value} type="button" onClick={() => setStatusFilter(item.value)} className={`px-3 py-1.5 rounded-md font-semibold transition-all ${statusFilter === item.value
                ? 'bg-zinc-800 text-white shadow-sm'
                : 'text-zinc-400 hover:text-white'}`}>
              {item.label}
            </button>))}
        </div>
      </div>

      {/* Inventory Table */}
      {loading ? (<AdminLoading />) : (<div className="bg-[#12151a] border border-zinc-800 rounded-xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#161920] text-zinc-400 uppercase tracking-wider border-b border-zinc-800">
                <tr>
                  <th className="py-3 px-4 font-semibold">Vehicle</th>
                  <th className="py-3 px-4 font-semibold">Stock Number</th>
                  <th className="py-3 px-4 font-semibold">Year</th>
                  <th className="py-3 px-4 font-semibold">Price</th>
                  <th className="py-3 px-4 font-semibold">Mileage</th>
                  <th className="py-3 px-4 font-semibold">Status</th>
                  <th className="py-3 px-4 font-semibold text-center">Featured</th>
                  <th className="py-3 px-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60">
                {filteredCars.map((car) => (<tr key={car.id} className="hover:bg-zinc-800/30 transition-colors">
                    {/* Image & Title */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-14 h-10 rounded overflow-hidden bg-zinc-900 shrink-0">
                          <OptimizedImage src={car.images[0] || ''} alt={car.model} fallbackText="Car" className="w-full h-full object-cover"/>
                        </div>
                        <div>
                          <div className="font-bold text-white leading-tight">
                            {car.make} {car.model}
                          </div>
                          {car.trim && (<div className="text-[11px] text-zinc-400 truncate max-w-[180px]">
                              {car.trim}
                            </div>)}
                        </div>
                      </div>
                    </td>

                    {/* Stock# */}
                    <td className="py-3 px-4 font-mono text-zinc-300">
                      {car.stockNumber}
                    </td>

                    {/* Year */}
                    <td className="py-3 px-4 text-zinc-300 tabular-nums">
                      {car.year}
                    </td>

                    {/* Price */}
                    <td className="py-3 px-4 font-bold text-white tabular-nums">
                      {new Intl.NumberFormat('en-GB', {
                    style: 'currency',
                    currency: 'GBP',
                    maximumFractionDigits: 0,
                }).format(car.price)}
                    </td>

                    {/* Mileage */}
                    <td className="py-3 px-4 text-zinc-300 tabular-nums">
                      {new Intl.NumberFormat('en-GB').format(car.mileage)} mi
                    </td>

                    {/* Quick Status Dropdown */}
                    <td className="py-3 px-4">
                      <select value={car.status} onChange={(e) => handleStatusChange(car.id, e.target.value)} className={`text-[11px] font-semibold uppercase tracking-wider rounded px-2 py-1 border focus:outline-none cursor-pointer ${car.status === 'available'
                    ? 'bg-emerald-950/40 text-emerald-400 border-emerald-800/50'
                    : car.status === 'reserved'
                        ? 'bg-amber-950/40 text-amber-400 border-amber-800/50'
                        : 'bg-zinc-800 text-zinc-400 border-zinc-700'}`}>
                        <option value="available">Available</option>
                        <option value="reserved">Reserved</option>
                        <option value="sold">Sold</option>
                      </select>
                    </td>

                    {/* Featured Toggle */}
                    <td className="py-3 px-4 text-center">
                      <button type="button" onClick={() => handleToggleFeatured(car.id)} className={`p-1.5 rounded transition-colors ${car.featured
                    ? 'text-red-500 bg-red-950/40 border border-red-800/40'
                    : 'text-zinc-500 hover:text-zinc-300'}`} title={car.featured ? 'Featured on Homepage' : 'Not Featured'}>
                        <Sparkles className="w-4 h-4"/>
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {/* Live page link */}
                        <Link to={`/cars/${car.id}`} target="_blank" className="p-1.5 text-zinc-400 hover:text-white rounded hover:bg-zinc-800 transition-colors" title="View Live Listing">
                          <ExternalLink className="w-3.5 h-3.5"/>
                        </Link>

                        {/* Edit link */}
                        <Link to={`/admin/cars/${car.id}/edit`} className="p-1.5 text-zinc-400 hover:text-white rounded hover:bg-zinc-800 transition-colors" title="Edit Vehicle">
                          <Edit className="w-3.5 h-3.5"/>
                        </Link>

                        {/* Delete button */}
                        <button type="button" onClick={() => setDeleteConfirmId(car.id)} className="p-1.5 text-zinc-400 hover:text-red-400 rounded hover:bg-red-950/30 transition-colors" title="Delete Vehicle">
                          <Trash2 className="w-3.5 h-3.5"/>
                        </button>
                      </div>
                    </td>
                  </tr>))}
              </tbody>
            </table>
          </div>

          {filteredCars.length === 0 && (<div className="text-center py-12 text-zinc-400">
              No vehicles found matching current filter criteria.
            </div>)}
        </div>)}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (<div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setDeleteConfirmId(null)}/>
          <div className="relative bg-[#16181f] border border-zinc-800 rounded-xl p-6 max-w-sm w-full space-y-4 shadow-2xl z-10">
            <div className="flex items-center gap-3 text-red-500">
              <AlertCircle className="w-6 h-6"/>
              <h3 className="text-base font-bold text-white">Confirm Removal</h3>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Are you sure you want to permanently remove this vehicle from the showroom database? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3 pt-2">
              <button type="button" onClick={() => setDeleteConfirmId(null)} className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold rounded-lg">
                Cancel
              </button>
              <button type="button" onClick={() => handleDelete(deleteConfirmId)} className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-lg">
                Delete Vehicle
              </button>
            </div>
          </div>
        </div>)}
    </div>);
};
