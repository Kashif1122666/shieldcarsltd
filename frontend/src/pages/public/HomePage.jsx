import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { HeroSection } from '../../components/home/HeroSection';
import { BodyTypeGrid } from '../../components/home/BodyTypeGrid';
import { WhyChooseSection } from '../../components/home/WhyChooseSection';
import { CtaBanner } from '../../components/home/CtaBanner';
import { CarCard } from '../../components/cars/CarCard';
import { CarCardSkeleton } from '../../components/common/Skeletons';
import { carService } from '../../services/carService';
import { ArrowRight, Sparkles, Shield, ChevronRight } from 'lucide-react';
import { DEALERSHIP_INFO } from '../../data/dealershipInfo';
export const HomePage = () => {
    const [featuredCars, setFeaturedCars] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        let isMounted = true;
        carService
            .getFeaturedCars()
            .then((cars) => {
            if (isMounted) {
                setFeaturedCars(cars);
                setLoading(false);
            }
        })
            .catch((err) => {
            console.error('Error fetching featured cars:', err);
            if (isMounted)
                setLoading(false);
        });
        return () => {
            isMounted = false;
        };
    }, []);
    return (<div className="flex flex-col min-h-screen">
      {/* Hero Section with Search */}
      <HeroSection />

      {/* Featured Vehicles Section */}
      <section className="py-24 bg-[#090a0d] border-b border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-red-500 mb-1">
                <Sparkles className="w-3.5 h-3.5"/>
                <span>Showroom Highlights</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
                Featured Vehicles
              </h2>
            </div>
            <Link to="/cars" className="mt-4 md:mt-0 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-300 hover:text-white px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-all">
              <span>Explore All ({featuredCars.length}+ Available)</span>
              <ArrowRight className="w-3.5 h-3.5 text-red-500"/>
            </Link>
          </div>

          {loading ? (<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (<CarCardSkeleton key={i}/>))}
            </div>) : featuredCars.length > 0 ? (<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredCars.slice(0, 6).map((car) => (<CarCard key={car.id} car={car}/>))}
            </div>) : (<div className="text-center py-12 text-zinc-400">
              No featured vehicles currently displayed.
            </div>)}
        </div>
      </section>

      {/* Browse By Body Type Grid */}
      <BodyTypeGrid />

      {/* Why Shield Cars Ltd Trust Pillars */}
      <WhyChooseSection />

      {/* About the Dealership Introduction Spotlight */}
      <section className="py-24 bg-[#090a0d] border-b border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-red-500">
                The Heritage of Precision
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
                Redefining the Prestige Motoring Experience
              </h2>
              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-light">
                Established with a singular ambition, Shield Cars Ltd serves discerning collectors, performance enthusiasts, and executives worldwide. We do not mass-market; each automobile in our custody is chosen for its exemplary provenance, immaculate mechanical health, and unmistakable presence.
              </p>
              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-red-600/20 text-red-500 flex items-center justify-center shrink-0 mt-0.5">
                    <Shield className="w-3 h-3"/>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Private Mayfair Viewing Gallery</h4>
                    <p className="text-xs text-zinc-400">Consult with specialists in our dedicated, confidential consultation suites.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-red-600/20 text-red-500 flex items-center justify-center shrink-0 mt-0.5">
                    <Shield className="w-3 h-3"/>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Transparent Acquisition & Bespoke Finance</h4>
                    <p className="text-xs text-zinc-400">Structured tailored hire purchase, balloon lease, and asset-backed financing solutions.</p>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Link to="/about" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white bg-zinc-900 border border-zinc-800 hover:border-zinc-700 px-6 py-3 rounded-lg transition-all">
                  <span>Learn More About Us</span>
                  <ChevronRight className="w-4 h-4 text-red-500"/>
                </Link>
              </div>
            </div>

            {/* Right Image Feature */}
            <div className="lg:col-span-6 relative">
              <div className="rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl relative">
                <img src="/images/car_luxury_suv_1790972902888.jpg" alt="Shield Cars Luxury Suite" className="w-full aspect-[4/3] object-cover"/>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"/>
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="text-xs uppercase tracking-widest text-red-400 font-bold mb-1">
                    Mayfair Showroom
                  </div>
                  <h3 className="text-lg font-bold text-white">
                    Private Viewings By Appointment
                  </h3>
                  <p className="text-xs text-zinc-300 mt-1">
                    {DEALERSHIP_INFO.address.full}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CtaBanner />
    </div>);
};
