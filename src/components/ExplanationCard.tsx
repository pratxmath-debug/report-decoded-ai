import React, { useState } from 'react';
import { 
  CheckCircle2, 
  ArrowUpRight, 
  ArrowDownRight, 
  AlertTriangle, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  BookOpen, 
  FileText,
  Edit3,
  Sparkles
} from 'lucide-react';
import { ProcessedParameter, RangeClassification } from '../types/report';
import { UNKNOWN_TEST_EXPLANATION } from '../data/glossary';
import { RangeVisualizer } from './RangeVisualizer';

interface ExplanationCardProps {
  parameter: ProcessedParameter;
  onEditRequest?: () => void;
  onSelectDetail?: (param: ProcessedParameter) => void;
}

export const ExplanationCard: React.FC<ExplanationCardProps> = ({
  parameter,
  onEditRequest,
  onSelectDetail
}) => {
  const [showSnippet, setShowSnippet] = useState(false);
  const { name, value, unit, referenceRange, originalFlag, classification, glossary, pageNumber, sourceSnippet, needsVerification, verificationReasons } = parameter;

  const hasMissingRange = !referenceRange || !referenceRange.trim();

  // Status badge styling
  const getStatusBadge = (status: RangeClassification) => {
    switch (status) {
      case 'WITHIN_RANGE':
        return {
          bg: 'bg-emerald-50 text-emerald-800 border-emerald-200/90',
          dot: 'bg-emerald-500',
          icon: <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />,
          label: 'Within lab reference range'
        };
      case 'ABOVE_RANGE':
        return {
          bg: 'bg-amber-50 text-amber-800 border-amber-200/90',
          dot: 'bg-amber-500',
          icon: <ArrowUpRight className="w-3.5 h-3.5 text-amber-600" />,
          label: 'Above lab reference range'
        };
      case 'BELOW_RANGE':
        return {
          bg: 'bg-blue-50 text-blue-800 border-blue-200/90',
          dot: 'bg-blue-500',
          icon: <ArrowDownRight className="w-3.5 h-3.5 text-blue-600" />,
          label: 'Below lab reference range'
        };
      case 'QUALITATIVE':
        return {
          bg: 'bg-slate-100 text-slate-800 border-slate-300',
          dot: 'bg-slate-500',
          icon: <FileText className="w-3.5 h-3.5 text-slate-600" />,
          label: 'Qualitative observation'
        };
      case 'NEEDS_VERIFICATION':
      default:
        return {
          bg: 'bg-purple-50 text-purple-800 border-purple-200/90',
          dot: 'bg-purple-500',
          icon: <AlertTriangle className="w-3.5 h-3.5 text-purple-600" />,
          label: 'Needs verification'
        };
    }
  };

  const badge = getStatusBadge(classification.status);

  return (
    <div
      className={`rounded-3xl border transition-all ${
        classification.status === 'NEEDS_VERIFICATION' || needsVerification
          ? 'bg-purple-50/20 border-purple-200/90 shadow-2xs hover:shadow-sm'
          : 'bg-white border-slate-200/90 hover:border-cyan-300/80 shadow-glass hover:shadow-glass-hover'
      } p-6 sm:p-7 flex flex-col justify-between`}
    >
      <div>
        {/* Card Header: Test Name & Category */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4.5">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-black text-[#0B192C] text-base sm:text-lg tracking-tight">
                {name || 'Unnamed Parameter'}
              </h3>
              {glossary && (
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                  {glossary.category}
                </span>
              )}
              {originalFlag && (
                <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200" title="Flag printed by laboratory on physical report">
                  Lab Flag: {originalFlag}
                </span>
              )}
            </div>
            {glossary && glossary.canonicalName !== name && (
              <p className="text-xs text-slate-500 mt-1 font-medium">
                Standard: {glossary.canonicalName}
              </p>
            )}
          </div>

          {/* Status Badge */}
          <div
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border shrink-0 ${badge.bg}`}
          >
            {badge.icon}
            <span>{classification.label || badge.label}</span>
          </div>
        </div>

        {/* Distinctive Lab Result and Reference Range Surface */}
        <div className="grid grid-cols-2 gap-3.5 p-4 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100/60 border border-slate-200/80 mb-4 text-xs">
          <div>
            <span className="text-slate-500 block mb-1 font-semibold text-[11px] uppercase tracking-wider">
              Your Reported Value
            </span>
            <div className="flex items-baseline gap-1">
              <span className="font-black text-[#0B192C] text-xl sm:text-2xl tracking-tight">
                {value || '—'}
              </span>
              {unit && (
                <span className="text-xs font-bold text-slate-600">
                  {unit}
                </span>
              )}
            </div>
          </div>
          <div>
            <span className="text-slate-500 block mb-1 font-semibold text-[11px] uppercase tracking-wider">
              Printed Reference Range
            </span>
            <span className={`font-bold text-sm sm:text-base block mt-0.5 ${
              hasMissingRange ? 'text-purple-700 italic' : 'text-slate-800'
            }`}>
              {hasMissingRange ? 'Reference range not found on report' : referenceRange}
            </span>
          </div>
        </div>

        {/* Mathematical Reference Range Scale */}
        <RangeVisualizer
          value={value}
          unit={unit}
          referenceRange={referenceRange}
          classification={classification}
        />

        {/* Verification Warning Alert Banner */}
        {(needsVerification || classification.status === 'NEEDS_VERIFICATION' || hasMissingRange) && (
          <div className="my-3.5 p-3.5 rounded-2xl bg-purple-50/90 border border-purple-200 text-purple-950 text-xs flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-bold text-purple-950">Needs verification:</p>
              <p className="text-purple-800 mt-0.5 leading-relaxed">
                {hasMissingRange 
                  ? 'Reference interval was not detected on report. Please verify against your physical printout.'
                  : (classification.reason || verificationReasons.join(', ') || 'Value or range format requires patient confirmation.')}
              </p>
              {onEditRequest && (
                <button
                  onClick={onEditRequest}
                  className="mt-2 font-bold text-purple-900 underline hover:text-purple-950 inline-flex items-center gap-1 cursor-pointer"
                >
                  <Edit3 className="w-3 h-3" />
                  <span>Edit and verify this parameter →</span>
                </button>
              )}
            </div>
          </div>
        )}

        {/* What this test generally measures (Glossary) */}
        <div className="mt-4.5 pt-4.5 border-t border-slate-100 space-y-3.5">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 mb-1">
              <BookOpen className="w-3.5 h-3.5 text-[#0D9488]" />
              <span>What this test generally measures</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              {glossary ? glossary.whatItMeasures : UNKNOWN_TEST_EXPLANATION}
            </p>
          </div>

          {/* Neutral Clinical Context (Non-diagnostic) */}
          {glossary && (
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 mb-1">
                <HelpCircle className="w-3.5 h-3.5 text-cyan-600" />
                <span>Why healthcare teams order it</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                {glossary.clinicalContext}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Card Footer: Source snippet toggle & Page indicator & Deep-Dive */}
      <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 gap-2 flex-wrap">
        <div className="flex items-center gap-3">
          <span>Page {pageNumber || 1} of document</span>
          {sourceSnippet && (
            <button
              onClick={() => setShowSnippet(!showSnippet)}
              className="text-slate-500 hover:text-slate-800 font-medium underline inline-flex items-center gap-0.5 cursor-pointer"
            >
              <span>{showSnippet ? 'Hide source' : 'View report source'}</span>
              {showSnippet ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>
          )}
        </div>

        {onSelectDetail && (
          <button
            onClick={() => onSelectDetail(parameter)}
            className="text-teal-700 hover:text-teal-900 font-bold inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-teal-50 hover:bg-teal-100 border border-teal-200 transition-colors cursor-pointer"
            title="Open comprehensive medical deep-dive"
          >
            <Sparkles className="w-3 h-3 text-cyan-600" />
            <span>Scientific Deep-Dive</span>
          </button>
        )}
      </div>

      {showSnippet && sourceSnippet && (
        <div className="mt-2.5 p-2.5 rounded-xl bg-slate-100/90 text-[11px] font-mono text-slate-600 break-all border border-slate-200/80 animate-in fade-in">
          Raw scan text: "{sourceSnippet}"
        </div>
      )}
    </div>
  );
};
