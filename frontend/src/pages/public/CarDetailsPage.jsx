import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { carService } from '../../services/carService';
import { CarGallery } from '../../components/cars/CarGallery';
import { CarCard } from '../../components/cars/CarCard';
import { StatusBadge } from '../../components/common/StatusBadge';
import { VehicleDetailsSkeleton } from '../../components/common/Skeletons';
import { CarInquiryModal } from '../../components/cars/CarInquiryModal';
import { useFavorites } from '../../context/FavoritesContext';
import { DEALERSHIP_INFO } from '../../data/dealershipInfo';
import { Phone, MessageCircle, Mail, ShieldCheck, Calendar, CheckCircle2, Heart, Share2, ChevronRight, Sliders, Award, Sparkles, } from 'lucide-react';
export const CarDetailsPage = () => {
    const { id } = useParams();
    const [car, setCar] = useState(null);
    const [relatedCars, setRelatedCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
    const [inquiryType, setInquiryType] = useState('vehicle');
    const [copiedLink, setCopiedLink] = useState(false);
    const { isFavorite, toggleFavorite } = useFavorites();
    useEffect(() => {
        let isMounted = true;
        if (!id)
            return;
        setLoading(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        carService
            .getCarById(id)
            .then(async (data) => {
            if (!isMounted)
                return;
            setCar(data);
            if (data) {
                // Update page title dynamically for SEO
                document.title = `${data.year} ${data.make} ${data.model} | Shield Cars Ltd`;
                // Fetch related cars by bodyType or make
                const all = await carService.getCars();
                const related = all.filter((c) => c.id !== data.id && (c.bodyType === data.bodyType || c.make === data.make));
                setRelatedCars(related.slice(0, 3));
            }
            setLoading(false);
        })
            .catch((err) => {
            console.error('Failed to load vehicle details:', err);
            if (isMounted)
                setLoading(false);
        });
        return () => {
            isMounted = false;
        };
    }, [id]);
    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: `${car?.year} ${car?.make} ${car?.model} | Shield Cars Ltd`,
                url: window.location.href,
            }).catch(() => { });
        }
        else {
            navigator.clipboard.writeText(window.location.href);
            setCopiedLink(true);
            setTimeout(() => setCopiedLink(false), 2000);
        }
    };
    if (loading) {
        return <VehicleDetailsSkeleton />;
    }
    if (!car) {
        return (<div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center bg-[#090a0d]">
        <h2 className="text-2xl font-bold text-white mb-2">Vehicle Not Found</h2>
        <p className="text-sm text-zinc-400 mb-6 max-w-sm">
          The requested vehicle may have been acquired or is no longer listed in current inventory.
        </p>
        <Link to="/cars" className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors">
          Return to Inventory
        </Link>
      </div>);
    }
    const favorite = isFavorite(car.id);
    const formattedPrice = new Intl.NumberFormat('en-GB', {
        style: 'currency',
        currency: 'GBP',
        maximumFractionDigits: 0,
    }).format(car.price);
    const formattedMileage = new Intl.NumberFormat('en-GB').format(car.mileage);
    return (<div className="min-h-screen bg-[#090a0d] py-8 text-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Bar */}
        <nav className="flex items-center gap-2 text-xs text-zinc-400 mb-6 overflow-x-auto whitespace-nowrap">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5"/>
          <Link to="/cars" className="hover:text-white transition-colors">Inventory</Link>
          <ChevronRight className="w-3.5 h-3.5"/>
          <Link to={`/cars?make=${car.make}`} className="hover:text-white transition-colors">
            {car.make}
          </Link>
          <ChevronRight className="w-3.5 h-3.5"/>
          <span className="text-zinc-200 font-semibold">{car.model}</span>
        </nav>

        {/* Header Block: Title, Stock#, Price, Status */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between pb-8 border-b border-zinc-800 gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-3">
              <StatusBadge status={car.status} size="md"/>
              {car.featured && (<span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider bg-red-600/90 text-white px-2.5 py-0.5 rounded">
                  <Sparkles className="w-3 h-3"/>
                  Featured Curation
                </span>)}
              <span className="text-xs font-mono text-zinc-400">
                Stock: {car.stockNumber}
              </span>
              <span className="text-zinc-600">·</span>
              <span className="text-xs font-mono text-zinc-400">
                VIN: {car.vin}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
              {car.year} {car.make} {car.model}
            </h1>
            {car.trim && (<p className="text-sm sm:text-base text-zinc-300 font-medium">
                {car.trim}
              </p>)}
          </div>

          {/* Pricing & Share Controls */}
          <div className="flex flex-col sm:items-end gap-3">
            <div className="text-left sm:text-right">
              <span className="text-xs uppercase tracking-wider text-zinc-400 font-medium">
                Showroom Price
              </span>
              <div className="flex items-baseline gap-3">
                <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight tabular-nums">
                  {formattedPrice}
                </span>
                {car.originalPrice && car.originalPrice > car.price && (<span className="text-sm text-zinc-400 line-through tabular-nums">
                    {new Intl.NumberFormat('en-GB', {
                style: 'currency',
                currency: 'GBP',
                maximumFractionDigits: 0,
            }).format(car.originalPrice)}
                  </span>)}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button type="button" onClick={() => toggleFavorite(car.id)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-semibold text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors">
                <Heart className={`w-4 h-4 ${favorite ? 'text-red-500 fill-red-500' : ''}`}/>
                <span>{favorite ? 'Saved' : 'Save'}</span>
              </button>

              <button type="button" onClick={handleShare} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-semibold text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors">
                <Share2 className="w-4 h-4"/>
                <span>{copiedLink ? 'Link Copied!' : 'Share'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Grid: Gallery Left + Sticky Purchase/Inquiry Module Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-10 items-start">
          {/* Gallery & Full Description (8 Cols) */}
          <div className="lg:col-span-8 space-y-10">
            {/* Gallery */}
            <CarGallery images={car.images} vehicleTitle={`${car.year} ${car.make} ${car.model}`}/>

            {/* Quick Performance Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-xl bg-[#111317] border border-zinc-800">
              <div className="space-y-1">
                <span className="text-[11px] uppercase tracking-wider text-zinc-400">
                  Mileage
                </span>
                <div className="text-base sm:text-lg font-bold text-white tabular-nums">
                  {formattedMileage} mi
                </div>
              </div>
              <div className="space-y-1">
                <span className="text-[11px] uppercase tracking-wider text-zinc-400">
                  Transmission
                </span>
                <div className="text-base sm:text-lg font-bold text-white">
                  {car.transmission}
                </div>
              </div>
              <div className="space-y-1">
                <span className="text-[11px] uppercase tracking-wider text-zinc-400">
                  Engine
                </span>
                <div className="text-base sm:text-lg font-bold text-white truncate" title={car.engine}>
                  {car.engine}
                </div>
              </div>
              <div className="space-y-1">
                <span className="text-[11px] uppercase tracking-wider text-zinc-400">
                  Acceleration
                </span>
                <div className="text-base sm:text-lg font-bold text-red-500 tabular-nums">
                  {car.acceleration || '3.5s (0-60)'}
                </div>
              </div>
            </div>

            {/* Vehicle Narrative Description */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold uppercase tracking-tight text-white">
                Vehicle Overview
              </h2>
              <div className="prose prose-invert max-w-none text-sm text-zinc-300 leading-relaxed font-light whitespace-pre-line">
                {car.description}
              </div>
            </div>

            {/* Specifications Technical Matrix */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold uppercase tracking-tight text-white">
                Technical Specifications
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="flex justify-between py-2.5 px-4 bg-[#111317] border border-zinc-800/80 rounded-lg">
                  <span className="text-zinc-400">Manufacturer</span>
                  <span className="text-white font-semibold">{car.make}</span>
                </div>
                <div className="flex justify-between py-2.5 px-4 bg-[#111317] border border-zinc-800/80 rounded-lg">
                  <span className="text-zinc-400">Model & Series</span>
                  <span className="text-white font-semibold">{car.model}</span>
                </div>
                <div className="flex justify-between py-2.5 px-4 bg-[#111317] border border-zinc-800/80 rounded-lg">
                  <span className="text-zinc-400">Year of Manufacture</span>
                  <span className="text-white font-semibold tabular-nums">{car.year}</span>
                </div>
                <div className="flex justify-between py-2.5 px-4 bg-[#111317] border border-zinc-800/80 rounded-lg">
                  <span className="text-zinc-400">Condition Grade</span>
                  <span className="text-white font-semibold">{car.condition}</span>
                </div>
                <div className="flex justify-between py-2.5 px-4 bg-[#111317] border border-zinc-800/80 rounded-lg">
                  <span className="text-zinc-400">Body Architecture</span>
                  <span className="text-white font-semibold">{car.bodyType}</span>
                </div>
                <div className="flex justify-between py-2.5 px-4 bg-[#111317] border border-zinc-800/80 rounded-lg">
                  <span className="text-zinc-400">Drivetrain</span>
                  <span className="text-white font-semibold">{car.drivetrain}</span>
                </div>
                <div className="flex justify-between py-2.5 px-4 bg-[#111317] border border-zinc-800/80 rounded-lg">
                  <span className="text-zinc-400">Fuel & Propulsion</span>
                  <span className="text-white font-semibold">{car.fuelType}</span>
                </div>
                <div className="flex justify-between py-2.5 px-4 bg-[#111317] border border-zinc-800/80 rounded-lg">
                  <span className="text-zinc-400">Power Output</span>
                  <span className="text-white font-semibold">{car.power || 'High Output'}</span>
                </div>
                <div className="flex justify-between py-2.5 px-4 bg-[#111317] border border-zinc-800/80 rounded-lg">
                  <span className="text-zinc-400">Exterior Finish</span>
                  <span className="text-white font-semibold">{car.exteriorColor}</span>
                </div>
                <div className="flex justify-between py-2.5 px-4 bg-[#111317] border border-zinc-800/80 rounded-lg">
                  <span className="text-zinc-400">Interior Upholstery</span>
                  <span className="text-white font-semibold">{car.interiorColor}</span>
                </div>
              </div>
            </div>

            {/* Equipment & Factory Options */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold uppercase tracking-tight text-white">
                Equipment & Options
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {car.features.map((feature, i) => (<div key={i} className="flex items-center gap-2.5 p-3 rounded-lg bg-[#111317] border border-zinc-800/80 text-xs text-zinc-300">
                    <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0"/>
                    <span>{feature}</span>
                  </div>))}
              </div>
            </div>
          </div>

          {/* Sticky Purchase & Contact Module (4 Cols) */}
          <div className="lg:col-span-4 sticky top-28 space-y-6">
            <div className="bg-[#111317] border border-zinc-800 rounded-2xl p-6 shadow-xl space-y-6">
              <div>
                <span className="text-xs uppercase tracking-widest text-red-500 font-bold">
                  Client Concierge
                </span>
                <h3 className="text-lg font-bold text-white mt-1">
                  Interested in this vehicle?
                </h3>
                <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                  Arrange a private viewing in Mayfair, request an accompanied test drive, or discuss bespoke financing.
                </p>
              </div>

              {/* Direct Actions */}
              <div className="space-y-3">
                {/* Send Inquiry Modal Trigger */}
                <button type="button" onClick={() => {
            setInquiryType('vehicle');
            setInquiryModalOpen(true);
        }} className="w-full py-3.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-2 shadow-lg shadow-red-950/50">
                  <Mail className="w-4 h-4"/>
                  <span>Send Inquiry</span>
                </button>

                {/* Call Dealer */}
                <a href={`tel:${DEALERSHIP_INFO.phone.raw}`} className="w-full py-3 bg-[#181a22] hover:bg-zinc-800 border border-zinc-700/80 text-white font-semibold text-xs uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-2">
                  <Phone className="w-4 h-4 text-red-500"/>
                  <span>Call {DEALERSHIP_INFO.phone.display}</span>
                </a>

                {/* WhatsApp Chat Direct */}
                <a href={`https://wa.me/${DEALERSHIP_INFO.whatsapp.number}?text=Hello%20Shield%20Cars,%20I%20am%20interested%20in%20the%20${encodeURIComponent(car.year + ' ' + car.make + ' ' + car.model + ' (' + car.stockNumber + ')')}`} target="_blank" rel="noopener noreferrer" className="w-full py-3 bg-emerald-950/30 hover:bg-emerald-900/40 border border-emerald-800/40 text-emerald-400 font-semibold text-xs uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-2">
                  <MessageCircle className="w-4 h-4"/>
                  <span>WhatsApp Concierge</span>
                </a>
              </div>

              {/* Schedule Private Test Drive or Part Exchange */}
              <div className="pt-4 border-t border-zinc-800 space-y-2">
                <button type="button" onClick={() => {
            setInquiryType('test_drive');
            setInquiryModalOpen(true);
        }} className="w-full py-2.5 text-xs font-semibold text-zinc-300 hover:text-white bg-zinc-900/80 rounded-lg hover:bg-zinc-800 transition-colors flex items-center justify-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-red-500"/>
                  <span>Book Private Test Drive</span>
                </button>

                <button type="button" onClick={() => {
            setInquiryType('trade_in');
            setInquiryModalOpen(true);
        }} className="w-full py-2.5 text-xs font-semibold text-zinc-300 hover:text-white bg-zinc-900/80 rounded-lg hover:bg-zinc-800 transition-colors flex items-center justify-center gap-2">
                  <Sliders className="w-3.5 h-3.5 text-red-500"/>
                  <span>Propose Part-Exchange Valuation</span>
                </button>
              </div>

              {/* Trust Badge Callouts */}
              <div className="pt-4 border-t border-zinc-800 space-y-2 text-xs text-zinc-400">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0"/>
                  <span>150-Point Forensic Inspection Passed</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-emerald-400 shrink-0"/>
                  <span>12-Month Shield Premier Warranty Included</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Vehicles Section */}
        {relatedCars.length > 0 && (<section className="pt-16 mt-16 border-t border-zinc-800">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold uppercase tracking-tight text-white">
                Similar High-Performance Vehicles
              </h3>
              <Link to="/cars" className="text-xs uppercase tracking-wider font-semibold text-zinc-400 hover:text-white">
                View Full Inventory
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedCars.map((related) => (<CarCard key={related.id} car={related}/>))}
            </div>
          </section>)}
      </div>

      {/* Inquiry & Test Drive Modal */}
      <CarInquiryModal car={car} isOpen={inquiryModalOpen} onClose={() => setInquiryModalOpen(false)} defaultType={inquiryType}/>
    </div>);
};
