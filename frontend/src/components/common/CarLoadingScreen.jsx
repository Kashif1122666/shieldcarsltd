import React from 'react';
import { ShieldLogo } from './ShieldLogo';
export const CarLoadingScreen = ({ message = 'Initiating Inventory...', }) => {
    return (<div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#090a0d] text-white">
      {/* Background radial glow */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-red-950/20 blur-[120px] pointer-events-none"/>

      <div className="relative flex flex-col items-center max-w-sm px-6 text-center">
        {/* Shield Logo with gentle pulse */}
        <div className="mb-8 transform transition-transform animate-[pulse_2s_ease-in-out_infinite]">
          <ShieldLogo size="lg" asLink={false}/>
        </div>

        {/* Animated Road Track & Sleek Moving Vehicle Silhouette */}
        <div className="relative w-64 h-12 overflow-hidden mb-6 flex items-center justify-center">
          {/* Animated Road Line */}
          <div className="absolute bottom-2 left-0 right-0 h-[2px] bg-zinc-800">
            <div className="w-full h-full bg-[linear-gradient(90deg,transparent_0%,#dc2626_50%,transparent_100%)] opacity-80"/>
          </div>

          {/* Sleek moving car silhouette icon */}
          <div className="absolute bottom-2.5 animate-[carRide_1.8s_ease-in-out_infinite]">
            <svg className="w-10 h-6 text-red-500 fill-current drop-shadow-[0_0_8px_rgba(220,38,38,0.6)]" viewBox="0 0 24 24">
              <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.85 7h10.29l1.04 3H5.81l1.04-3zM19 17H5v-4.66l.12-.34h13.77l.11.34V17z"/>
              <circle cx="7.5" cy="14.5" r="1.5" className="text-zinc-950"/>
              <circle cx="16.5" cy="14.5" r="1.5" className="text-zinc-950"/>
            </svg>
          </div>
        </div>

        {/* Status text */}
        <span className="text-xs uppercase tracking-[0.25em] text-zinc-400 font-semibold font-mono animate-pulse">
          {message}
        </span>
      </div>

      <style>{`
        @keyframes carRide {
          0% {
            transform: translateX(-120px) scale(0.95);
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          80% {
            opacity: 1;
          }
          100% {
            transform: translateX(120px) scale(1);
            opacity: 0;
          }
        }
      `}</style>
    </div>);
};
