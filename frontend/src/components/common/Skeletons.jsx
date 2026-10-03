import React from 'react';
export const CarCardSkeleton = () => {
    return (<div className="bg-[#111317] border border-zinc-800/80 rounded-xl overflow-hidden animate-pulse">
      {/* Skeleton Image */}
      <div className="w-full aspect-[16/10] bg-zinc-800/60"/>
      {/* Skeleton Content */}
      <div className="p-5 space-y-4">
        {/* Unboxed Metadata Skeleton */}
        <div className="flex items-center gap-2">
          <div className="h-3 w-12 bg-zinc-800 rounded"/>
          <div className="h-3 w-3 bg-zinc-800 rounded"/>
          <div className="h-3 w-16 bg-zinc-800 rounded"/>
          <div className="h-3 w-3 bg-zinc-800 rounded"/>
          <div className="h-3 w-14 bg-zinc-800 rounded"/>
        </div>
        {/* Title */}
        <div className="h-5 w-3/4 bg-zinc-800 rounded"/>
        {/* Price */}
        <div className="flex justify-between items-center pt-2 border-t border-zinc-800/60">
          <div className="h-6 w-24 bg-zinc-800 rounded"/>
          <div className="h-4 w-20 bg-zinc-800 rounded"/>
        </div>
      </div>
    </div>);
};
export const VehicleDetailsSkeleton = () => {
    return (<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-pulse space-y-8">
      {/* Breadcrumb skeleton */}
      <div className="h-4 w-48 bg-zinc-800 rounded"/>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Gallery skeleton */}
        <div className="lg:col-span-8 space-y-4">
          <div className="w-full aspect-[16/10] bg-zinc-800 rounded-xl"/>
          <div className="grid grid-cols-4 gap-3">
            {[1, 2, 3, 4].map((i) => (<div key={i} className="aspect-[16/10] bg-zinc-800 rounded-lg"/>))}
          </div>
        </div>

        {/* Sidebar purchase module skeleton */}
        <div className="lg:col-span-4 space-y-6 bg-[#111317] p-6 border border-zinc-800 rounded-xl h-fit">
          <div className="h-4 w-24 bg-zinc-800 rounded"/>
          <div className="h-8 w-3/4 bg-zinc-800 rounded"/>
          <div className="h-9 w-1/2 bg-zinc-800 rounded"/>
          <div className="space-y-3 pt-4 border-t border-zinc-800">
            <div className="h-10 w-full bg-zinc-800 rounded"/>
            <div className="h-10 w-full bg-zinc-800 rounded"/>
          </div>
        </div>
      </div>
    </div>);
};
export const AdminLoading = () => {
    return (<div className="flex flex-col items-center justify-center min-h-[300px] p-8">
      <div className="w-10 h-10 border-2 border-zinc-800 border-t-red-600 rounded-full animate-spin mb-4"/>
      <span className="text-xs uppercase tracking-widest text-zinc-400 font-mono">
        Retrieving Data...
      </span>
    </div>);
};
export const ButtonLoader = ({ text = 'Processing' }) => {
    return (<span className="inline-flex items-center gap-2">
      <svg className="animate-spin h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
      </svg>
      {text && <span>{text}</span>}
    </span>);
};
