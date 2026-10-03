import React from 'react';
import { Link } from 'react-router-dom';
export const ShieldLogo = ({ className = '', size = 'md', asLink = true, }) => {
    const iconSize = size === 'sm' ? 22 : size === 'lg' ? 36 : 28;
    const textSize = size === 'sm' ? 'text-base' : size === 'lg' ? 'text-2xl' : 'text-xl';
    const subSize = size === 'sm' ? 'text-[9px]' : size === 'lg' ? 'text-xs' : 'text-[10px]';
    const content = (<div className={`inline-flex items-center gap-2.5 font-bold tracking-tight select-none ${className}`}>
      {/* Precision Geometric Automotive Shield */}
      <div className="relative flex items-center justify-center shrink-0">
        <svg width={iconSize} height={iconSize} viewBox="0 0 40 46" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-transform duration-300 group-hover:scale-105">
          {/* Outer Shield Frame */}
          <path d="M20 1L38 8V24C38 35 20 44 20 44C20 44 2 35 2 24V8L20 1Z" fill="#12141a" stroke="#27272a" strokeWidth="2"/>
          {/* Inner Accent Blade */}
          <path d="M20 7L32 12V22C32 29.5 20 37 20 37C20 37 8 29.5 8 22V12L20 7Z" fill="#181a20" stroke="#dc2626" strokeWidth="1.5"/>
          {/* Central Precision Speed Slash */}
          <path d="M17 14L24 14L20 30L16 30L17 14Z" fill="#dc2626"/>
          <path d="M20 10V33" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round"/>
        </svg>
      </div>

      <div className="flex flex-col leading-none">
        <div className="flex items-center gap-1">
          <span className={`${textSize} font-black tracking-wider text-white uppercase`}>
            SHIELD
          </span>
          <span className={`${textSize} font-light tracking-widest text-red-500 uppercase`}>
            CARS
          </span>
        </div>
        <span className={`${subSize} tracking-[0.28em] font-semibold text-zinc-400 uppercase mt-0.5`}>
          LTD · PREMIER MOTORING
        </span>
      </div>
    </div>);
    if (asLink) {
        return (<Link to="/" className="group inline-flex items-center outline-none focus-visible:ring-1 focus-visible:ring-red-500 rounded">
        {content}
      </Link>);
    }
    return content;
};
