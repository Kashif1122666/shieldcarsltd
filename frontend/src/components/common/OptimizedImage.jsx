import React, { useState } from 'react';
export const OptimizedImage = ({ src, alt, fallbackText, className = '', containerClassName = '', aspectRatioClass = 'aspect-[16/10]', ...rest }) => {
    const [hasError, setHasError] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    return (<div className={`relative overflow-hidden bg-zinc-900 ${aspectRatioClass} ${containerClassName}`}>
      {/* Background skeleton while loading */}
      {!isLoaded && !hasError && (<div className="absolute inset-0 bg-zinc-800/60 animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border border-zinc-700 border-t-red-600 animate-spin"/>
        </div>)}

      {hasError ? (
        /* Sleek fallback graphic if asset fails to load */
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-zinc-900 to-zinc-950 p-4 text-center">
          <svg className="w-12 h-12 text-zinc-700 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.125-.504 1.125-1.125V14.25m-19.5 0h19.5M3 14.25l2.25-5.25a2.25 2.25 0 012.072-1.375h9.356a2.25 2.25 0 012.072 1.375L21 14.25"/>
          </svg>
          <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
            {fallbackText || 'Shield Cars Showcase'}
          </span>
        </div>) : (<img src={src} alt={alt} loading="lazy" decoding="async" referrerPolicy="no-referrer" onLoad={() => setIsLoaded(true)} onError={() => setHasError(true)} className={`w-full h-full object-cover transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'} ${className}`} {...rest}/>)}
    </div>);
};
