import React from 'react';
export const StatusBadge = ({ status, size = 'md' }) => {
    const isSm = size === 'sm';
    const sizeClasses = isSm ? 'text-[10px] px-2 py-0.5' : 'text-xs px-2.5 py-1';
    switch (status) {
        case 'available':
            return (<span className={`inline-flex items-center gap-1.5 font-semibold tracking-wider uppercase border border-emerald-500/30 text-emerald-400 bg-emerald-500/10 rounded ${sizeClasses}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"/>
          Available
        </span>);
        case 'reserved':
            return (<span className={`inline-flex items-center gap-1.5 font-semibold tracking-wider uppercase border border-amber-500/30 text-amber-400 bg-amber-500/10 rounded ${sizeClasses}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400"/>
          Reserved
        </span>);
        case 'sold':
            return (<span className={`inline-flex items-center gap-1.5 font-semibold tracking-wider uppercase border border-zinc-700 text-zinc-400 bg-zinc-800/60 rounded ${sizeClasses}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-zinc-500"/>
          Sold
        </span>);
        default:
            return null;
    }
};
