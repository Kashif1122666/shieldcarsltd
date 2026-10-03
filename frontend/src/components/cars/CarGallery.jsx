import React, { useState, useEffect, useCallback } from 'react';
import { OptimizedImage } from '../common/OptimizedImage';
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react';
export const CarGallery = ({ images, vehicleTitle }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    // Fallback if images array is empty
    const displayImages = images.length > 0 ? images : [''];
    const handleNext = useCallback(() => {
        setActiveIndex((prev) => (prev + 1) % displayImages.length);
    }, [displayImages.length]);
    const handlePrev = useCallback(() => {
        setActiveIndex((prev) => (prev - 1 + displayImages.length) % displayImages.length);
    }, [displayImages.length]);
    // Keyboard navigation for lightbox
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!isLightboxOpen)
                return;
            if (e.key === 'ArrowRight')
                handleNext();
            if (e.key === 'ArrowLeft')
                handlePrev();
            if (e.key === 'Escape')
                setIsLightboxOpen(false);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isLightboxOpen, handleNext, handlePrev]);
    return (<div className="flex flex-col space-y-4">
      {/* Primary Large Image Frame */}
      <div className="relative group rounded-xl overflow-hidden bg-zinc-950 border border-zinc-800">
        <div className="aspect-[16/10] w-full">
          <OptimizedImage src={displayImages[activeIndex]} alt={`${vehicleTitle} - Photo ${activeIndex + 1}`} fallbackText={vehicleTitle} className="w-full h-full object-cover transition-transform duration-300"/>
        </div>

        {/* Ambient Overlay Controls */}
        <div className="absolute inset-0 flex items-center justify-between p-4 pointer-events-none">
          {displayImages.length > 1 && (<>
              <button type="button" onClick={handlePrev} className="pointer-events-auto p-2.5 rounded-full bg-black/60 hover:bg-black/90 backdrop-blur-md text-white border border-white/10 transition-all opacity-0 group-hover:opacity-100 hover:scale-105" aria-label="Previous Photo">
                <ChevronLeft className="w-5 h-5"/>
              </button>
              <button type="button" onClick={handleNext} className="pointer-events-auto p-2.5 rounded-full bg-black/60 hover:bg-black/90 backdrop-blur-md text-white border border-white/10 transition-all opacity-0 group-hover:opacity-100 hover:scale-105" aria-label="Next Photo">
                <ChevronRight className="w-5 h-5"/>
              </button>
            </>)}
        </div>

        {/* Lightbox / Fullscreen Button & Counter */}
        <div className="absolute bottom-4 right-4 flex items-center gap-3">
          <span className="px-3 py-1 rounded bg-black/70 backdrop-blur text-xs font-mono text-zinc-300 border border-white/10">
            {activeIndex + 1} / {displayImages.length}
          </span>
          <button type="button" onClick={() => setIsLightboxOpen(true)} className="p-2 rounded bg-black/70 hover:bg-black/90 backdrop-blur text-zinc-300 hover:text-white border border-white/10 transition-all" aria-label="Open Fullscreen Lightbox" title="Expand Fullscreen">
            <Maximize2 className="w-4 h-4"/>
          </button>
        </div>
      </div>

      {/* Thumbnails Row */}
      {displayImages.length > 1 && (<div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
          {displayImages.map((img, idx) => (<button key={idx} type="button" onClick={() => setActiveIndex(idx)} className={`relative rounded-lg overflow-hidden aspect-[16/10] bg-zinc-900 border transition-all ${activeIndex === idx
                    ? 'border-red-600 ring-2 ring-red-600/30'
                    : 'border-zinc-800 opacity-60 hover:opacity-100'}`}>
              <OptimizedImage src={img} alt={`Thumbnail ${idx + 1}`} fallbackText="Thumb" className="w-full h-full object-cover"/>
            </button>))}
        </div>)}

      {/* Fullscreen Lightbox Modal */}
      {isLightboxOpen && (<div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-8 animate-in fade-in duration-200">
          {/* Header */}
          <div className="flex items-center justify-between text-white border-b border-zinc-800 pb-4">
            <div>
              <h3 className="text-base font-bold">{vehicleTitle}</h3>
              <span className="text-xs text-zinc-400 font-mono">
                Image {activeIndex + 1} of {displayImages.length}
              </span>
            </div>
            <button type="button" onClick={() => setIsLightboxOpen(false)} className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200" aria-label="Close Lightbox">
              <X className="w-6 h-6"/>
            </button>
          </div>

          {/* Central Image View */}
          <div className="relative flex-1 flex items-center justify-center p-4">
            <img src={displayImages[activeIndex]} alt={`${vehicleTitle} fullscreen`} className="max-h-[80vh] max-w-full object-contain rounded-lg shadow-2xl"/>

            {/* Left/Right Controls */}
            {displayImages.length > 1 && (<>
                <button type="button" onClick={handlePrev} className="absolute left-4 p-3 rounded-full bg-black/70 hover:bg-red-600 text-white transition-colors" aria-label="Previous">
                  <ChevronLeft className="w-6 h-6"/>
                </button>
                <button type="button" onClick={handleNext} className="absolute right-4 p-3 rounded-full bg-black/70 hover:bg-red-600 text-white transition-colors" aria-label="Next">
                  <ChevronRight className="w-6 h-6"/>
                </button>
              </>)}
          </div>

          {/* Bottom Thumbnails Strip */}
          <div className="flex justify-center gap-2 overflow-x-auto py-2">
            {displayImages.map((img, idx) => (<button key={idx} type="button" onClick={() => setActiveIndex(idx)} className={`w-16 h-12 rounded overflow-hidden border shrink-0 ${activeIndex === idx ? 'border-red-600' : 'border-zinc-800 opacity-50'}`}>
                <img src={img} alt="thumb" className="w-full h-full object-cover"/>
              </button>))}
          </div>
        </div>)}
    </div>);
};
