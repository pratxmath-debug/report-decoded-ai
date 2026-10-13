import React, { useState } from 'react';
import { 
  X, 
  BookOpen, 
  HelpCircle, 
  Activity, 
  CheckCircle2, 
  MessageSquare, 
  ShieldCheck, 
  Layers, 
  Sparkles,
  Zap,
  ArrowRight
} from 'lucide-react';
import { ProcessedParameter } from '../types/report';
import { UNKNOWN_TEST_EXPLANATION } from '../data/glossary';

interface ParameterDetailModalProps {
  parameter: ProcessedParameter | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ParameterDetailModal: React.FC<ParameterDetailModalProps> = ({
  parameter,
  isOpen,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'factors' | 'questions'>('overview');

  if (!isOpen || !parameter) return null;

  const { name, value, unit, referenceRange, classification, glossary } = parameter;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200/90 relative max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200">
                Scientific Deep-Dive
              </span>
              {glossary && (
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                  {glossary.category}
                </span>
              )}
            </div>
            <h3 className="text-2xl font-black text-[#0B192C] tracking-tight">
              {name}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Laboratory Parameter Education & Clinical Context
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Value Callout Card */}
        <div className="my-4 p-4 rounded-2xl bg-gradient-to-br from-slate-50 to-cyan-50/30 border border-slate-200/80 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              Your Extracted Result
            </span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-2xl font-black text-[#0B192C]">{value || '—'}</span>
              <span className="text-xs font-bold text-slate-600">{unit}</span>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              Printed Reference Range
            </span>
            <span className="text-sm font-extrabold text-slate-800 block mt-0.5">
              {referenceRange || 'Not printed on report'}
            </span>
          </div>

          <div className="text-right">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              Classification
            </span>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-900 text-white mt-1 inline-block">
              {classification.label}
            </span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-slate-100 pb-2 mb-4">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'overview'
                ? 'bg-slate-900 text-white shadow-2xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            What It Measures
          </button>
          <button
            onClick={() => setActiveTab('factors')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'factors'
                ? 'bg-slate-900 text-white shadow-2xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Clinical Context & Factors
          </button>
          <button
            onClick={() => setActiveTab('questions')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'questions'
                ? 'bg-slate-900 text-white shadow-2xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Doctor Questions
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-1 text-sm text-slate-700 leading-relaxed">
          {activeTab === 'overview' && (
            <div className="space-y-4">
              <div>
                <h4 className="font-extrabold text-[#0B192C] text-sm flex items-center gap-1.5 mb-1.5">
                  <BookOpen className="w-4 h-4 text-teal-600" />
                  <span>Biological Function</span>
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {glossary ? glossary.whatItMeasures : UNKNOWN_TEST_EXPLANATION}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-cyan-50/60 border border-cyan-200/70 text-xs text-cyan-950">
                <span className="font-bold block mb-1">Why Laboratory Reference Ranges Matter:</span>
                Reference intervals represent statistical ranges derived from healthy reference populations tested on the exact same instrumentation, assay reagents, and platform used by your laboratory. Even minor differences in calibration between laboratories can alter normal boundaries.
              </div>
            </div>
          )}

          {activeTab === 'factors' && (
            <div className="space-y-4">
              <div>
                <h4 className="font-extrabold text-[#0B192C] text-sm flex items-center gap-1.5 mb-1.5">
                  <HelpCircle className="w-4 h-4 text-cyan-600" />
                  <span>Why Healthcare Teams Order It</span>
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {glossary ? glossary.clinicalContext : 'No clinical ordering details available for this specific parameter.'}
                </p>
              </div>

              <div>
                <h4 className="font-extrabold text-[#0B192C] text-sm flex items-center gap-1.5 mb-1.5">
                  <Activity className="w-4 h-4 text-amber-600" />
                  <span>Temporary Biological Influences</span>
                </h4>
                <ul className="text-xs text-slate-600 space-y-1.5 list-disc pl-5">
                  <li><strong>Hydration & Fluid Balance:</strong> Mild dehydration or overhydration can concentrate or dilute serum concentrations.</li>
                  <li><strong>Fasting State:</strong> Test timing relative to meals, coffee, or carbohydrates affects metabolic assays.</li>
                  <li><strong>Physical Exertion:</strong> Intense workouts within 24–48 hours can elevate muscle and liver enzymes.</li>
                  <li><strong>Medications & Supplements:</strong> Over-the-counter pain relievers, vitamins (like biotin), and prescriptions can influence clearance rates.</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'questions' && (
            <div className="space-y-3">
              <p className="text-xs text-slate-500 font-medium">
                Specific questions to bring up during your medical appointment:
              </p>
              {glossary && glossary.commonQuestions.length > 0 ? (
                glossary.commonQuestions.map((q, i) => (
                  <div key={i} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800">
                    "{q}"
                  </div>
                ))
              ) : (
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600">
                  "What does this result mean in the context of my medical history, and should we verify it with repeat testing?"
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Safety Footer */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-1.5 text-teal-800 font-semibold text-[11px]">
            <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
            <span>Educational only • Not a diagnosis</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
