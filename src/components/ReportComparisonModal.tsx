import React, { useState } from 'react';
import { 
  X, 
  ArrowRight, 
  TrendingUp, 
  TrendingDown, 
  CheckCircle2, 
  AlertTriangle, 
  Activity, 
  Printer, 
  Copy, 
  Check, 
  ShieldCheck,
  FileSpreadsheet
} from 'lucide-react';
import { ProcessedParameter } from '../types/report';
import { compareReports, ReportComparisonResult } from '../utils/comparator';
import { SAMPLE_REPORTS } from '../data/sampleReports';
import { classifyParameter } from '../utils/classifier';
import { findGlossaryEntry } from '../data/glossary';

interface ReportComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentParameters: ProcessedParameter[];
  currentDocumentName: string;
}

export const ReportComparisonModal: React.FC<ReportComparisonModalProps> = ({
  isOpen,
  onClose,
  currentParameters,
  currentDocumentName
}) => {
  // Pre-process baseline sample report for instant comparison
  const defaultBaseline = SAMPLE_REPORTS[0];
  const [selectedBaselineId, setSelectedBaselineId] = useState<string>(defaultBaseline.id);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  // Process chosen baseline
  const chosenSample = SAMPLE_REPORTS.find((s) => s.id === selectedBaselineId) || defaultBaseline;
  const processedBaseline: ProcessedParameter[] = chosenSample.parameters.map((p) => ({
    ...p,
    classification: classifyParameter({
      value: p.value,
      referenceRange: p.referenceRange,
      unit: p.unit,
      testName: p.name
    }),
    glossary: findGlossaryEntry(p.name) || undefined
  }));

  const comparison: ReportComparisonResult = compareReports(
    processedBaseline,
    currentParameters,
    chosenSample.title,
    currentDocumentName || 'Current Report'
  );

  const handleCopySummary = () => {
    const text = comparison.deltas
      .map(
        (d) =>
          `• ${d.parameterName}: Baseline ${d.baselineValue} ${d.unit} (${d.baselineStatus}) → Current ${d.currentValue} ${d.unit} (${d.currentStatus}) [Δ: ${d.numericDifference !== null ? (d.numericDifference > 0 ? `+${d.numericDifference}` : `${d.numericDifference}`) : 'N/A'}]`
      )
      .join('\n');

    navigator.clipboard.writeText(
      `Spark Decoded — Report Comparison Summary\nBaseline: ${comparison.baselineTitle}\nCurrent: ${comparison.currentTitle}\n\n${text}\n\n*Clinical Note: Numerical changes describe laboratory test differences. Discuss clinical context with your physician.`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/65 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200/90 relative max-h-[92vh] flex flex-col animate-in zoom-in-95 duration-150">
        
        {/* Modal Header */}
        <div className="flex items-start justify-between pb-5 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200">
                Longitudinal Analysis
              </span>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-cyan-50 text-cyan-800 border border-cyan-200">
                Multi-Report Comparison
              </span>
            </div>
            <h3 className="text-2xl font-black text-[#0B192C] tracking-tight">
              Report Comparison & Parameter Shifts
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Compare matched laboratory test parameters across consecutive blood draws or test dates.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
            title="Close comparison"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Comparison Source Selector Bar */}
        <div className="py-4 border-b border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-slate-50/80 -mx-6 sm:-mx-8 px-6 sm:px-8">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
            <span>Comparing with Baseline:</span>
            <select
              value={selectedBaselineId}
              onChange={(e) => setSelectedBaselineId(e.target.value)}
              className="px-3 py-1.5 text-xs rounded-xl border border-slate-300 bg-white font-bold text-[#0B192C] cursor-pointer"
            >
              {SAMPLE_REPORTS.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.title} ({s.collectionDate})
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopySummary}
              className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold flex items-center gap-1.5 shadow-2xs cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-teal-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
              <span>{copied ? 'Copied' : 'Copy Delta Summary'}</span>
            </button>
            <button
              onClick={() => window.print()}
              className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold flex items-center gap-1.5 shadow-2xs cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-slate-500" />
              <span>Print</span>
            </button>
          </div>
        </div>

        {/* Scrollable Comparison Content */}
        <div className="flex-1 overflow-y-auto py-5 space-y-4 pr-1">
          
          {/* Clinical Context Safety Banner */}
          <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/80 text-amber-950 text-xs flex items-center gap-2.5">
            <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0" />
            <p className="leading-relaxed">
              <strong>Clinical Context Rule:</strong> Numerical differences represent measurement variance across laboratories or time intervals. They are not automated diagnoses of clinical recovery or deterioration. Discuss all trends with your doctor.
            </p>
          </div>

          {/* Matched Deltas List */}
          {comparison.deltas.length === 0 ? (
            <div className="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-300 p-8">
              <FileSpreadsheet className="w-8 h-8 text-slate-400 mx-auto mb-2" />
              <p className="text-sm font-bold text-slate-700">No overlapping parameters found.</p>
              <p className="text-xs text-slate-500 mt-1">
                The baseline and current reports do not share any identical test parameter names.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {comparison.deltas.map((delta, idx) => (
                <div
                  key={idx}
                  className="p-4.5 rounded-2xl border border-slate-200 bg-white hover:border-cyan-300/80 transition-all shadow-2xs"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <h4 className="font-extrabold text-[#0B192C] text-sm sm:text-base">
                        {delta.parameterName}
                      </h4>
                      {delta.statusShift === 'IMPROVED' && (
                        <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                          Shifted Within Range
                        </span>
                      )}
                      {delta.statusShift === 'CHANGED' && (
                        <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300">
                          Status Changed
                        </span>
                      )}
                      {delta.statusShift === 'UNCHANGED' && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                          Status Unchanged
                        </span>
                      )}
                    </div>

                    {/* Numeric Delta Chip */}
                    {delta.numericDifference !== null ? (
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-100 font-mono text-xs font-bold text-slate-800">
                        {delta.numericDifference > 0 ? (
                          <span className="text-amber-700 flex items-center gap-0.5">
                            <TrendingUp className="w-3.5 h-3.5" /> +{delta.numericDifference} {delta.unit}
                          </span>
                        ) : delta.numericDifference < 0 ? (
                          <span className="text-teal-700 flex items-center gap-0.5">
                            <TrendingDown className="w-3.5 h-3.5" /> {delta.numericDifference} {delta.unit}
                          </span>
                        ) : (
                          <span className="text-slate-600">0.0 {delta.unit} (No Change)</span>
                        )}
                        {delta.percentChange !== null && (
                          <span className="text-[10px] text-slate-500 font-normal">
                            ({delta.percentChange > 0 ? `+${delta.percentChange}%` : `${delta.percentChange}%`})
                          </span>
                        )}
                      </div>
                    ) : (
                      <span className="text-xs text-slate-400 font-medium italic">
                        Units Incompatible
                      </span>
                    )}
                  </div>

                  {/* Side by side comparison row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <div>
                      <span className="text-slate-400 font-semibold block text-[10px] uppercase">
                        Baseline ({comparison.baselineTitle})
                      </span>
                      <div className="font-bold text-slate-800 mt-0.5">
                        {delta.baselineValue} {delta.unit} •{' '}
                        <span className="text-slate-600 font-medium">Ref: {delta.baselineReferenceRange || 'None'}</span>
                      </div>
                    </div>
                    <div>
                      <span className="text-slate-400 font-semibold block text-[10px] uppercase">
                        Current ({comparison.currentTitle})
                      </span>
                      <div className="font-bold text-[#0B192C] mt-0.5">
                        {delta.currentValue} {delta.unit} •{' '}
                        <span className="text-slate-600 font-medium">Ref: {delta.currentReferenceRange || 'None'}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-500 mt-2 font-medium">
                    {delta.clinicalSummary}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>Matched {comparison.matchedCount} parameters across reports</span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-colors cursor-pointer"
          >
            Close Comparison
          </button>
        </div>

      </div>
    </div>
  );
};
