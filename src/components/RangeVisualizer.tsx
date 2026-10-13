import React from 'react';
import { ClassificationResult } from '../types/report';

interface RangeVisualizerProps {
  value: string;
  unit: string;
  referenceRange: string;
  classification: ClassificationResult;
}

export const RangeVisualizer: React.FC<RangeVisualizerProps> = ({
  value,
  unit,
  referenceRange,
  classification
}) => {
  const { numericValue, rangeMin, rangeMax, rangeType, status } = classification;

  if (rangeType === 'qualitative' || rangeType === 'missing' || rangeType === 'invalid' || numericValue === undefined) {
    return null;
  }

  // Calculate percentage positions for visual bar
  let minDisplay = rangeMin !== undefined ? rangeMin : 0;
  let maxDisplay = rangeMax !== undefined ? rangeMax : 100;

  // Provide padding around reference interval for visual context
  let span = maxDisplay - minDisplay;
  if (span <= 0) span = Math.max(1, maxDisplay * 0.2);

  const displayStart = Math.min(minDisplay - span * 0.35, numericValue - span * 0.2);
  const displayEnd = Math.max(maxDisplay + span * 0.35, numericValue + span * 0.2);
  const totalDisplaySpan = displayEnd - displayStart || 1;

  const getPercent = (val: number) => {
    const p = ((val - displayStart) / totalDisplaySpan) * 100;
    return Math.max(3, Math.min(97, p));
  };

  const valPercent = getPercent(numericValue);

  return (
    <div className="w-full mt-3.5 pt-3.5 border-t border-slate-100/90">
      <div className="flex items-center justify-between text-[11px] text-slate-500 mb-2 font-medium">
        <span className="font-semibold text-slate-600">Visual Range Comparison</span>
        <span>
          Result: <strong className="text-[#0B192C] font-extrabold">{value} {unit}</strong>
        </span>
      </div>

      {/* Two-sided interval bar */}
      {rangeType === 'two_sided' && rangeMin !== undefined && rangeMax !== undefined && (
        <div className="relative pt-4 pb-2">
          {/* Track Bar */}
          <div className="h-2.5 w-full rounded-full bg-slate-200 relative overflow-hidden flex shadow-inner">
            {/* Below zone */}
            <div
              style={{ width: `${getPercent(rangeMin)}%` }}
              className="h-full bg-blue-100"
            />
            {/* Normal reference zone */}
            <div
              style={{ width: `${getPercent(rangeMax) - getPercent(rangeMin)}%` }}
              className="h-full bg-gradient-to-r from-emerald-400 to-teal-400"
            />
            {/* Above zone */}
            <div className="flex-1 h-full bg-amber-100" />
          </div>

          {/* Marker pin */}
          <div
            style={{ left: `${valPercent}%` }}
            className="absolute top-1 -translate-x-1/2 flex flex-col items-center pointer-events-none transition-all duration-300 z-10"
          >
            <div
              className={`w-4 h-4 rounded-full border-2 border-white shadow-md ${
                status === 'WITHIN_RANGE'
                  ? 'bg-teal-600 ring-2 ring-teal-200'
                  : status === 'ABOVE_RANGE'
                  ? 'bg-amber-500 ring-2 ring-amber-200'
                  : 'bg-blue-600 ring-2 ring-blue-200'
              }`}
            />
            <div className="w-0.5 h-2.5 bg-slate-500" />
          </div>

          {/* Bound labels */}
          <div className="flex justify-between text-[10px] text-slate-500 mt-1.5 font-medium">
            <span style={{ marginLeft: `${getPercent(rangeMin)}%`, transform: 'translateX(-50%)' }}>
              Min: {rangeMin}
            </span>
            <span style={{ marginRight: `${100 - getPercent(rangeMax)}%`, transform: 'translateX(50%)' }}>
              Max: {rangeMax}
            </span>
          </div>
        </div>
      )}

      {/* One-sided less-than bar (e.g. < 5.7) */}
      {rangeType === 'less_than' && rangeMax !== undefined && (
        <div className="relative pt-4 pb-2">
          <div className="h-2.5 w-full rounded-full bg-slate-200 relative overflow-hidden flex shadow-inner">
            <div
              style={{ width: `${getPercent(rangeMax)}%` }}
              className="h-full bg-gradient-to-r from-emerald-400 to-teal-400"
            />
            <div className="flex-1 h-full bg-amber-100" />
          </div>

          <div
            style={{ left: `${valPercent}%` }}
            className="absolute top-1 -translate-x-1/2 flex flex-col items-center pointer-events-none transition-all duration-300 z-10"
          >
            <div
              className={`w-4 h-4 rounded-full border-2 border-white shadow-md ${
                status === 'WITHIN_RANGE'
                  ? 'bg-teal-600 ring-2 ring-teal-200'
                  : 'bg-amber-500 ring-2 ring-amber-200'
              }`}
            />
            <div className="w-0.5 h-2.5 bg-slate-500" />
          </div>

          <div className="flex justify-between text-[10px] text-slate-500 mt-1.5 font-medium">
            <span className="text-teal-800 font-semibold">Target limit (≤ {rangeMax})</span>
            <span className="text-amber-700 font-semibold">Above limit (&gt; {rangeMax})</span>
          </div>
        </div>
      )}

      {/* One-sided greater-than bar (e.g. > 40) */}
      {rangeType === 'greater_than' && rangeMin !== undefined && (
        <div className="relative pt-4 pb-2">
          <div className="h-2.5 w-full rounded-full bg-slate-200 relative overflow-hidden flex shadow-inner">
            <div
              style={{ width: `${getPercent(rangeMin)}%` }}
              className="h-full bg-blue-100"
            />
            <div className="flex-1 h-full bg-gradient-to-r from-emerald-400 to-teal-400" />
          </div>

          <div
            style={{ left: `${valPercent}%` }}
            className="absolute top-1 -translate-x-1/2 flex flex-col items-center pointer-events-none transition-all duration-300 z-10"
          >
            <div
              className={`w-4 h-4 rounded-full border-2 border-white shadow-md ${
                status === 'WITHIN_RANGE'
                  ? 'bg-teal-600 ring-2 ring-teal-200'
                  : 'bg-blue-600 ring-2 ring-blue-200'
              }`}
            />
            <div className="w-0.5 h-2.5 bg-slate-500" />
          </div>

          <div className="flex justify-between text-[10px] text-slate-500 mt-1.5 font-medium">
            <span className="text-blue-700 font-semibold">Below target (&lt; {rangeMin})</span>
            <span className="text-teal-800 font-semibold">Target range (≥ {rangeMin})</span>
          </div>
        </div>
      )}
    </div>
  );
};
