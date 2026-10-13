import React, { useState } from 'react';
import { 
  CheckCircle, 
  AlertTriangle, 
  Plus, 
  Trash2, 
  ArrowRight, 
  ArrowLeft, 
  Info,
  Zap,
  Sparkles
} from 'lucide-react';
import { ExtractedParameter } from '../types/report';
import { MEDICAL_GLOSSARY } from '../data/glossary';

interface VerificationScreenProps {
  parameters: ExtractedParameter[];
  sourceDocumentName: string;
  isSampleMode?: boolean;
  onConfirm: (parameters: ExtractedParameter[]) => void;
  onBack: () => void;
}

export const VerificationScreen: React.FC<VerificationScreenProps> = ({
  parameters: initialParams,
  sourceDocumentName,
  isSampleMode,
  onConfirm,
  onBack
}) => {
  const [params, setParams] = useState<ExtractedParameter[]>(initialParams);

  const handleUpdate = (id: string, field: keyof ExtractedParameter, value: any) => {
    setParams((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const updated = { ...item, [field]: value };
          // Re-evaluate verification status
          const reasons: string[] = [];
          if (!updated.name.trim()) reasons.push('Parameter name is required.');
          if (!updated.value.trim()) reasons.push('Result value is missing.');
          if (!updated.referenceRange.trim()) reasons.push('Reference range is missing.');
          updated.verificationReasons = reasons;
          updated.needsVerification = reasons.length > 0;
          return updated;
        }
        return item;
      })
    );
  };

  const handleDelete = (id: string) => {
    setParams((prev) => prev.filter((item) => item.id !== id));
  };

  const handleAddNew = () => {
    const newParam: ExtractedParameter = {
      id: `custom-${Date.now()}`,
      name: '',
      value: '',
      unit: '',
      referenceRange: '',
      originalFlag: null,
      pageNumber: 1,
      sourceSnippet: 'Manually added by patient',
      confidence: 1.0,
      needsVerification: true,
      verificationReasons: ['Manually added parameter. Please verify all fields.']
    };
    setParams((prev) => [...prev, newParam]);
  };

  const handleApplyGlossaryPreset = (id: string, glossaryCanonical: string) => {
    const entry = MEDICAL_GLOSSARY.find((g) => g.canonicalName === glossaryCanonical);
    if (entry) {
      handleUpdate(id, 'name', entry.canonicalName);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Top Banner */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200">
              Step 2 of 3: Verification
            </span>
            {isSampleMode && (
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-300">
                Illustrative Demo Data
              </span>
            )}
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0B192C] tracking-tight">
            Verify Extracted Parameters
          </h2>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Please compare the values below with your printed paper report. You can edit any parameter,
            correct typos, add missing reference ranges, or remove unwanted items before generating explanations.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onBack}
            className="px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 text-sm font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>

          <button
            onClick={() => onConfirm(params)}
            disabled={params.length === 0}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#0D9488] to-[#06B6D4] hover:from-[#0F766E] hover:to-[#0891B2] disabled:bg-slate-300 disabled:cursor-not-allowed text-white text-sm font-bold shadow-md shadow-teal-700/20 flex items-center gap-2 transition-all cursor-pointer"
          >
            <Zap className="w-4 h-4 fill-white" />
            <span>Generate Results & Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Verification Safety Notice */}
      <div className="mb-6 p-4 rounded-2xl bg-cyan-50/70 border border-cyan-200/80 text-cyan-950 text-xs flex items-start gap-3 backdrop-blur-xs">
        <Info className="w-4 h-4 text-cyan-700 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>Patient Review Step:</strong> Optical character recognition (OCR) can occasionally misread smudged decimals (e.g. <code>.5</code> vs <code>5</code>) or unit abbreviations. Reviewing each row ensures your doctor-prep questions and range comparisons remain 100% faithful to what your laboratory printed.
        </p>
      </div>

      {/* Extracted Parameters Table / Cards */}
      <div className="space-y-4 mb-8">
        {params.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-3xl border border-dashed border-slate-300 p-8">
            <p className="text-slate-500 mb-4 font-medium">No parameters found or all were removed.</p>
            <button
              onClick={handleAddNew}
              className="px-5 py-2.5 rounded-xl bg-teal-50 text-teal-800 hover:bg-teal-100 font-bold text-sm inline-flex items-center gap-2 cursor-pointer border border-teal-200"
            >
              <Plus className="w-4 h-4" />
              <span>Add Your First Parameter Manually</span>
            </button>
          </div>
        ) : (
          params.map((item) => (
            <div
              key={item.id}
              className={`p-5 rounded-2xl border transition-all ${
                item.needsVerification
                  ? 'bg-purple-50/40 border-purple-200/90 shadow-2xs'
                  : 'bg-white border-slate-200/90 shadow-2xs hover:border-slate-300'
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                {/* Field 1: Test Name */}
                <div className="flex-1 min-w-[200px]">
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Test / Parameter Name
                  </label>
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) => handleUpdate(item.id, 'name', e.target.value)}
                    placeholder="e.g. HbA1c, TSH, ALT"
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white font-semibold text-slate-900"
                  />
                  {/* Preset quick suggestions */}
                  <div className="mt-1.5 flex flex-wrap gap-1">
                    <span className="text-[10px] text-slate-400 font-medium">Suggestions:</span>
                    {MEDICAL_GLOSSARY.slice(0, 4).map((g) => (
                      <button
                        key={g.id}
                        type="button"
                        onClick={() => handleApplyGlossaryPreset(item.id, g.canonicalName)}
                        className="text-[10px] text-slate-500 hover:text-teal-700 bg-slate-100 hover:bg-teal-50 px-2 py-0.5 rounded-md transition-colors cursor-pointer"
                      >
                        {g.id}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Field 2: Value */}
                <div className="w-full sm:w-32">
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Result Value
                  </label>
                  <input
                    type="text"
                    value={item.value}
                    onChange={(e) => handleUpdate(item.id, 'value', e.target.value)}
                    placeholder="e.g. 6.2, Neg"
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white font-extrabold text-slate-900"
                  />
                </div>

                {/* Field 3: Unit */}
                <div className="w-full sm:w-28">
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Unit
                  </label>
                  <input
                    type="text"
                    value={item.unit}
                    onChange={(e) => handleUpdate(item.id, 'unit', e.target.value)}
                    placeholder="e.g. mg/dL, %"
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white font-medium text-slate-700"
                  />
                </div>

                {/* Field 4: Printed Reference Range */}
                <div className="w-full sm:w-44">
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Printed Ref. Range
                  </label>
                  <input
                    type="text"
                    value={item.referenceRange}
                    onChange={(e) => handleUpdate(item.id, 'referenceRange', e.target.value)}
                    placeholder="e.g. 70 - 99, < 5.7"
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white font-medium text-slate-800"
                  />
                </div>

                {/* Field 5: Original Flag */}
                <div className="w-full sm:w-24">
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Lab Flag
                  </label>
                  <select
                    value={item.originalFlag || ''}
                    onChange={(e) =>
                      handleUpdate(item.id, 'originalFlag', e.target.value ? e.target.value : null)
                    }
                    className="w-full px-2.5 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white text-slate-800"
                  >
                    <option value="">None</option>
                    <option value="H">H (High)</option>
                    <option value="L">L (Low)</option>
                    <option value="*">*</option>
                    <option value="ABNORMAL">Abnormal</option>
                  </select>
                </div>

                {/* Actions & Delete */}
                <div className="flex items-center gap-2 pt-4 lg:pt-5">
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
                    title="Remove parameter"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Status & Verification Reason Banner */}
              <div className="mt-3.5 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2">
                  {item.needsVerification ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 font-bold text-[11px]">
                      <AlertTriangle className="w-3 h-3 text-purple-600" />
                      Needs verification
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[11px]">
                      <CheckCircle className="w-3 h-3 text-emerald-600" />
                      Verified
                    </span>
                  )}

                  {item.verificationReasons.length > 0 && (
                    <span className="text-purple-900 font-medium">
                      ({item.verificationReasons.join(', ')})
                    </span>
                  )}
                </div>

                {item.sourceSnippet && (
                  <span className="text-slate-400 text-[11px] truncate max-w-xs sm:max-w-md">
                    Page {item.pageNumber || 1} OCR: "{item.sourceSnippet}"
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Bottom Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200">
        <button
          onClick={handleAddNew}
          className="px-4.5 py-2.5 rounded-xl border border-dashed border-teal-500 text-teal-700 hover:bg-teal-50 text-sm font-bold flex items-center gap-2 transition-colors w-full sm:w-auto justify-center cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Another Test Parameter</span>
        </button>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          <button
            onClick={onBack}
            className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-sm font-semibold hover:bg-slate-50 transition-colors cursor-pointer"
          >
            Back to Upload
          </button>
          <button
            onClick={() => onConfirm(params)}
            disabled={params.length === 0}
            className="px-7 py-2.5 rounded-xl bg-gradient-to-r from-[#0D9488] to-[#06B6D4] hover:from-[#0F766E] hover:to-[#0891B2] disabled:bg-slate-300 disabled:cursor-not-allowed text-white text-sm font-bold shadow-md shadow-teal-700/20 flex items-center gap-2 transition-all cursor-pointer"
          >
            <Zap className="w-4 h-4 fill-white" />
            <span>Proceed to Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
