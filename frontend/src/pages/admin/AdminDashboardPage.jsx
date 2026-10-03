import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { carService } from '../../services/carService';
import { inquiryService } from '../../services/inquiryService';
import { StatusBadge } from '../../components/common/StatusBadge';
import { AdminLoading } from '../../components/common/Skeletons';
import { CarFront, CheckCircle, Clock, Sparkles, ShoppingBag, MessageSquare, ArrowUpRight, PlusCircle, } from 'lucide-react';
export const AdminDashboardPage = () => {
    const [cars, setCars] = useState([]);
    const [inquiries, setInquiries] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        let isMounted = true;
        Promise.all([carService.getCars(), inquiryService.getInquiries()])
            .then(([carData, inqData]) => {
            if (isMounted) {
                setCars(carData);
                setInquiries(inqData);
                setLoading(false);
            }
        })
            .catch((err) => {
            console.error('Failed to load dashboard data:', err);
            if (isMounted)
                setLoading(false);
        });
        return () => {
            isMounted = false;
        };
    }, []);
    if (loading) {
        return <AdminLoading />;
    }
    const totalCars = cars.length;
    const availableCount = cars.filter((c) => c.status === 'available').length;
    const reservedCount = cars.filter((c) => c.status === 'reserved').length;
    const soldCount = cars.filter((c) => c.status === 'sold').length;
    const featuredCount = cars.filter((c) => c.featured).length;
    const totalInventoryValue = cars
        .filter((c) => c.status !== 'sold')
        .reduce((sum, c) => sum + c.price, 0);
    const formattedInventoryValue = new Intl.NumberFormat('en-GB', {
        style: 'currency',
        currency: 'GBP',
        maximumFractionDigits: 0,
    }).format(totalInventoryValue);
    return (<div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Real-time showroom telemetry, inventory health, and VIP client inquiries.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/admin/cars/new" className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors shadow-md shadow-red-950/40">
            <PlusCircle className="w-3.5 h-3.5"/>
            <span>Add Vehicle</span>
          </Link>
        </div>
      </div>

      {/* Metric Cards Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-[#12151a] border border-zinc-800 p-5 rounded-xl space-y-1">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Total</span>
            <CarFront className="w-4 h-4 text-zinc-400"/>
          </div>
          <div className="text-2xl font-black text-white tabular-nums">
            {totalCars}
          </div>
          <div className="text-[10px] text-zinc-400">Vehicles in system</div>
        </div>

        <div className="bg-[#12151a] border border-zinc-800 p-5 rounded-xl space-y-1">
          <div className="flex items-center justify-between text-emerald-400">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Available</span>
            <CheckCircle className="w-4 h-4 text-emerald-400"/>
          </div>
          <div className="text-2xl font-black text-white tabular-nums">
            {availableCount}
          </div>
          <div className="text-[10px] text-zinc-400">Ready for acquisition</div>
        </div>

        <div className="bg-[#12151a] border border-zinc-800 p-5 rounded-xl space-y-1">
          <div className="flex items-center justify-between text-amber-400">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Reserved</span>
            <Clock className="w-4 h-4 text-amber-400"/>
          </div>
          <div className="text-2xl font-black text-white tabular-nums">
            {reservedCount}
          </div>
          <div className="text-[10px] text-zinc-400">Deposit secured</div>
        </div>

        <div className="bg-[#12151a] border border-zinc-800 p-5 rounded-xl space-y-1">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Sold</span>
            <ShoppingBag className="w-4 h-4 text-zinc-400"/>
          </div>
          <div className="text-2xl font-black text-white tabular-nums">
            {soldCount}
          </div>
          <div className="text-[10px] text-zinc-400">Acquisitions completed</div>
        </div>

        <div className="bg-[#12151a] border border-zinc-800 p-5 rounded-xl space-y-1">
          <div className="flex items-center justify-between text-red-400">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Featured</span>
            <Sparkles className="w-4 h-4 text-red-400"/>
          </div>
          <div className="text-2xl font-black text-white tabular-nums">
            {featuredCount}
          </div>
          <div className="text-[10px] text-zinc-400">Homepage highlights</div>
        </div>

        <div className="bg-[#12151a] border border-zinc-800 p-5 rounded-xl space-y-1">
          <div className="flex items-center justify-between text-blue-400">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Inquiries</span>
            <MessageSquare className="w-4 h-4 text-blue-400"/>
          </div>
          <div className="text-2xl font-black text-white tabular-nums">
            {inquiries.length}
          </div>
          <div className="text-[10px] text-zinc-400">Active client leads</div>
        </div>
      </div>

      {/* Inventory Value & Health Breakdown Bar */}
      <div className="bg-[#12151a] border border-zinc-800 rounded-xl p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
              Active Showroom Valuation
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold text-white tabular-nums mt-0.5">
              {formattedInventoryValue}
            </div>
          </div>
          <div className="text-xs text-zinc-400">
            {availableCount} Available · {reservedCount} Under Contract
          </div>
        </div>

        {/* Visual Progress Proportion */}
        {totalCars > 0 && (<div className="w-full h-3 rounded-full bg-zinc-900 overflow-hidden flex">
            <div style={{ width: `${(availableCount / totalCars) * 100}%` }} className="bg-emerald-500 h-full" title={`Available: ${availableCount}`}/>
            <div style={{ width: `${(reservedCount / totalCars) * 100}%` }} className="bg-amber-500 h-full" title={`Reserved: ${reservedCount}`}/>
            <div style={{ width: `${(soldCount / totalCars) * 100}%` }} className="bg-zinc-700 h-full" title={`Sold: ${soldCount}`}/>
          </div>)}
      </div>

      {/* Two Column Grid: Recent Inventory + Latest Inquiries */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Inventory (7 Cols) */}
        <div className="lg:col-span-7 bg-[#12151a] border border-zinc-800 rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white uppercase tracking-tight">
              Recently Added Vehicles
            </h3>
            <Link to="/admin/cars" className="text-xs font-semibold text-red-400 hover:text-red-300 flex items-center gap-1">
              <span>View All</span>
              <ArrowUpRight className="w-3.5 h-3.5"/>
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="text-zinc-400 uppercase tracking-wider border-b border-zinc-800">
                <tr>
                  <th className="pb-3 font-semibold">Vehicle</th>
                  <th className="pb-3 font-semibold">Price</th>
                  <th className="pb-3 font-semibold">Status</th>
                  <th className="pb-3 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60">
                {cars.slice(0, 5).map((car) => (<tr key={car.id} className="hover:bg-zinc-800/30">
                    <td className="py-3 pr-3">
                      <div className="font-bold text-white">
                        {car.year} {car.make} {car.model}
                      </div>
                      <div className="text-[11px] font-mono text-zinc-400">
                        {car.stockNumber}
                      </div>
                    </td>
                    <td className="py-3 font-semibold text-zinc-200 tabular-nums">
                      {new Intl.NumberFormat('en-GB', {
                style: 'currency',
                currency: 'GBP',
                maximumFractionDigits: 0,
            }).format(car.price)}
                    </td>
                    <td className="py-3">
                      <StatusBadge status={car.status} size="sm"/>
                    </td>
                    <td className="py-3 text-right">
                      <Link to={`/admin/cars/${car.id}/edit`} className="px-2.5 py-1 text-xs rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200">
                        Edit
                      </Link>
                    </td>
                  </tr>))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Latest Inquiries (5 Cols) */}
        <div className="lg:col-span-5 bg-[#12151a] border border-zinc-800 rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white uppercase tracking-tight">
              Recent Inquiries
            </h3>
            <Link to="/admin/inquiries" className="text-xs font-semibold text-red-400 hover:text-red-300 flex items-center gap-1">
              <span>View All</span>
              <ArrowUpRight className="w-3.5 h-3.5"/>
            </Link>
          </div>

          <div className="space-y-3">
            {inquiries.slice(0, 4).map((inq) => (<div key={inq.id} className="p-3.5 rounded-lg bg-zinc-900/80 border border-zinc-800/80 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-xs">{inq.fullName}</span>
                  <span className="text-[10px] text-zinc-400 font-mono">
                    {new Date(inq.createdAt).toLocaleDateString()}
                  </span>
                </div>
                {inq.vehicleTitle && (<div className="text-[11px] text-red-400 font-medium truncate">
                    Ref: {inq.vehicleTitle}
                  </div>)}
                <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                  {inq.message}
                </p>
              </div>))}
          </div>
        </div>
      </div>
    </div>);
};
