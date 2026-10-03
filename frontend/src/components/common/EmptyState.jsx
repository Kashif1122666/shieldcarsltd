import React from 'react';
import { SlidersHorizontal, RotateCcw } from 'lucide-react';
export const EmptyState = ({ title = 'No vehicles match your search', description = 'Try expanding your price range, clearing specific filters, or searching for a different make or model.', onReset, resetLabel = 'Clear All Filters', }) => {
    return (<div className="flex flex-col items-center justify-center p-12 text-center bg-[#111317]/60 border border-zinc-800/80 rounded-2xl max-w-xl mx-auto my-8">
      {/* Automotive empty visual */}
      <div className="w-16 h-16 rounded-full bg-zinc-800/60 border border-zinc-700/50 flex items-center justify-center mb-5 text-red-500 shadow-inner">
        <SlidersHorizontal className="w-7 h-7"/>
      </div>

      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-sm text-zinc-400 max-w-md mb-6 leading-relaxed">
        {description}
      </p>

      {onReset && (<button onClick={onReset} type="button" className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 active:scale-[0.98] rounded-lg transition-all shadow-lg shadow-red-900/20">
          <RotateCcw className="w-3.5 h-3.5"/>
          {resetLabel}
        </button>)}
    </div>);
};
