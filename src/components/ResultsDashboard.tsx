import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Edit3, 
  RotateCcw, 
  Printer, 
  CheckCircle2, 
  ArrowUpRight, 
  ArrowDownRight, 
  AlertTriangle, 
  FileText,
  Activity,
  Zap,
  Info,
  TrendingUp,
  Sparkles,
  LayoutGrid,
  List
} from 'lucide-react';
import { ProcessedParameter, RangeClassification, ReportSummaryStats } from '../types/report';
import { ExplanationCard } from './ExplanationCard';
import { DoctorQuestionsPanel } from './DoctorQuestionsPanel';
import { generateDoctorQuestions } from '../utils/doctorQuestions';
import { SparkLogo } from './SparkLogo';

// Common medical alias mappings so patients can search in natural everyday language
const MEDICAL_CONCEPT_SYNONYMS: Record<string, string[]> = {
  sugar: ['glucose', 'hba1c', 'glycated', 'fbs', 'rbs', 'diabetes'],
  diabetes: ['glucose', 'hba1c', 'fbs', 'rbs'],
  liver: ['alt', 'ast', 'sgpt', 'sgot', 'bilirubin', 'alp', 'albumin', 'alkaline phosphatase'],
  kidney: ['creatinine', 'egfr', 'bun', 'urea', 'uric acid'],
  renal: ['creatinine', 'egfr', 'bun', 'urea'],
  cholesterol: ['lipid', 'triglycerides', 'hdl', 'ldl', 'vldl', 'total cholesterol'],
  lipid: ['cholesterol', 'triglycerides', 'hdl', 'ldl'],
  fat: ['cholesterol', 'triglycerides', 'lipid'],
  thyroid: ['tsh', 't3', 't4', 'thyroxine', 'thyrotropin'],
  blood: ['hemoglobin', 'hb', 'rbc', 'wbc', 'platelet', 'hematocrit', 'cbc'],
  anemia: ['hemoglobin', 'hb', 'iron', 'ferritin', 'mcv', 'mch', 'mchc', 'rbc'],
  iron: ['ferritin', 'iron', 'tibc', 'transferrin', 'hemoglobin'],
  infection: ['wbc', 'leukocyte', 'crp', 'neutrophil', 'lymphocyte'],
  heart: ['crp', 'troponin', 'lipid', 'cholesterol', 'ldl', 'ast'],
  bone: ['calcium', 'vitamin d', 'alp', 'phosphorus']
};

interface ResultsDashboardProps {
  parameters: ProcessedParameter[];
  documentName: string;
  isSampleMode: boolean;
  onEditParameters: () => void;
  onReset: () => void;
  onOpenComparison?: () => void;
  onSelectDetail?: (param: ProcessedParameter) => void;
}

export const ResultsDashboard: React.FC<ResultsDashboardProps> = ({
  parameters,
  documentName,
  isSampleMode,
  onEditParameters,
  onReset,
  onOpenComparison,
  onSelectDetail
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | RangeClassification>('ALL');
  const [viewDensity, setViewDensity] = useState<'spacious' | 'compact'>('spacious');

  // Compute summary metrics dynamically from real report data
  const stats: ReportSummaryStats = useMemo(() => {
    let within = 0;
    let above = 0;
    let below = 0;
    let verify = 0;
    let qual = 0;

    for (const p of parameters) {
      if (p.classification.status === 'WITHIN_RANGE') within++;
      else if (p.classification.status === 'ABOVE_RANGE') above++;
      else if (p.classification.status === 'BELOW_RANGE') below++;
      else if (p.classification.status === 'QUALITATIVE') qual++;
      else verify++;
    }

    return {
      totalCount: parameters.length,
      withinRangeCount: within,
      aboveRangeCount: above,
      belowRangeCount: below,
      needsVerificationCount: verify,
      qualitativeCount: qual
    };
  }, [parameters]);

  // Enhanced search filter supporting clinical and lay medical synonyms
  const filteredParameters = useMemo(() => {
    const rawQuery = searchTerm.toLowerCase().trim();

    // Expand search query with any related concept aliases
    const relatedTokens: string[] = rawQuery ? [rawQuery] : [];
    if (rawQuery) {
      for (const [concept, aliases] of Object.entries(MEDICAL_CONCEPT_SYNONYMS)) {
        if (rawQuery.includes(concept) || concept.includes(rawQuery)) {
          relatedTokens.push(...aliases);
        }
      }
    }

    return parameters.filter((p) => {
      const pName = p.name.toLowerCase();
      const pCategory = p.glossary?.category.toLowerCase() || '';
      const pWhat = p.glossary?.whatItMeasures.toLowerCase() || '';
      const pSynonyms = p.glossary?.synonyms?.map((s) => s.toLowerCase()) || [];

      const matchesSearch =
        !rawQuery ||
        relatedTokens.some(
          (token) =>
            pName.includes(token) ||
            pCategory.includes(token) ||
            pWhat.includes(token) ||
            pSynonyms.some((syn) => syn.includes(token))
        );

      const matchesStatus =
        statusFilter === 'ALL' ? true : p.classification.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [parameters, searchTerm, statusFilter]);

  // Generate safe doctor questions
  const doctorQuestions = useMemo(() => {
    return generateDoctorQuestions(parameters);
  }, [parameters]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-300">
      
      {/* Dashboard Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-gradient-to-r from-teal-50 to-cyan-50 text-teal-800 border border-teal-200/80">
              Spark Decoded Dashboard
            </span>
            {isSampleMode ? (
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-300">
                Fictional Illustrative Sample
              </span>
            ) : (
              <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                Source: {documentName}
              </span>
            )}
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0B192C] tracking-tight">
            Your Report Overview
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Review extracted parameters and verify your laboratory reference ranges.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5 flex-wrap">
          {onOpenComparison && (
            <button
              onClick={onOpenComparison}
              className="px-3.5 py-2 rounded-xl border border-teal-300/80 bg-gradient-to-r from-teal-50 to-cyan-50 hover:from-teal-100/80 hover:to-cyan-100/80 text-teal-900 text-xs font-bold flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer active:scale-95"
              title="Compare this report side-by-side with prior visit or baseline"
            >
              <TrendingUp className="w-3.5 h-3.5 text-teal-700" />
              <span>Compare Reports</span>
            </button>
          )}

          <button
            onClick={onEditParameters}
            className="px-3.5 py-2 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold flex items-center gap-1.5 shadow-2xs hover:border-slate-400 transition-all cursor-pointer"
            title="Modify extracted values or add parameters"
          >
            <Edit3 className="w-3.5 h-3.5 text-slate-500" />
            <span>Edit Values</span>
          </button>

          <button
            onClick={handlePrint}
            className="px-3.5 py-2 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold flex items-center gap-1.5 shadow-2xs hover:border-slate-400 transition-all cursor-pointer"
            title="Print or export clean summary"
          >
            <Printer className="w-3.5 h-3.5 text-slate-500" />
            <span>Print Summary</span>
          </button>

          <button
            onClick={onReset}
            className="px-3.5 py-2 rounded-xl bg-slate-100/90 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer border border-slate-200"
            title="Start new report session"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
            <span>New Report</span>
          </button>
        </div>
      </div>

      {/* 5 Dimensional Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3.5 my-6">
        
        {/* Total Parameters */}
        <div
          onClick={() => setStatusFilter('ALL')}
          className={`p-4.5 rounded-2xl border transition-all cursor-pointer shadow-glass hover:-translate-y-0.5 ${
            statusFilter === 'ALL'
              ? 'bg-gradient-to-br from-[#0B192C] to-[#1E293B] text-white border-slate-900 shadow-md ring-2 ring-cyan-500/40'
              : 'bg-white border-slate-200/90 hover:border-slate-300 text-slate-900'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className={`text-xs font-bold ${statusFilter === 'ALL' ? 'text-cyan-200' : 'text-slate-500'}`}>
              Total Parameters
            </span>
            <Activity className={`w-3.5 h-3.5 ${statusFilter === 'ALL' ? 'text-cyan-400' : 'text-slate-400'}`} />
          </div>
          <span className="text-2xl sm:text-3xl font-black mt-2 block tracking-tight">
            {stats.totalCount}
          </span>
          <span className={`text-[10px] font-medium block mt-0.5 ${statusFilter === 'ALL' ? 'text-slate-300' : 'text-slate-400'}`}>
            Extracted tests
          </span>
        </div>

        {/* Within Range */}
        <div
          onClick={() => setStatusFilter('WITHIN_RANGE')}
          className={`p-4.5 rounded-2xl border transition-all cursor-pointer shadow-glass hover:-translate-y-0.5 ${
            statusFilter === 'WITHIN_RANGE'
              ? 'bg-gradient-to-br from-[#0D9488] to-[#0F766E] text-white border-teal-700 shadow-md ring-2 ring-teal-400/40'
              : 'bg-emerald-50/60 border-emerald-200/90 hover:border-emerald-300 text-emerald-950'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className={`text-xs font-bold ${statusFilter === 'WITHIN_RANGE' ? 'text-teal-100' : 'text-emerald-800'}`}>
              Within Range
            </span>
            <CheckCircle2 className={`w-3.5 h-3.5 ${statusFilter === 'WITHIN_RANGE' ? 'text-teal-200' : 'text-emerald-600'}`} />
          </div>
          <span className="text-2xl sm:text-3xl font-black mt-2 block tracking-tight">
            {stats.withinRangeCount}
          </span>
          <span className={`text-[10px] font-medium block mt-0.5 ${statusFilter === 'WITHIN_RANGE' ? 'text-teal-100' : 'text-emerald-700'}`}>
            Inside reference interval
          </span>
        </div>

        {/* Above Range */}
        <div
          onClick={() => setStatusFilter('ABOVE_RANGE')}
          className={`p-4.5 rounded-2xl border transition-all cursor-pointer shadow-glass hover:-translate-y-0.5 ${
            statusFilter === 'ABOVE_RANGE'
              ? 'bg-gradient-to-br from-[#D97706] to-[#B45309] text-white border-amber-700 shadow-md ring-2 ring-amber-400/40'
              : 'bg-amber-50/60 border-amber-200/90 hover:border-amber-300 text-amber-950'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className={`text-xs font-bold ${statusFilter === 'ABOVE_RANGE' ? 'text-amber-100' : 'text-amber-800'}`}>
              Above Range
            </span>
            <ArrowUpRight className={`w-3.5 h-3.5 ${statusFilter === 'ABOVE_RANGE' ? 'text-amber-200' : 'text-amber-600'}`} />
          </div>
          <span className="text-2xl sm:text-3xl font-black mt-2 block tracking-tight">
            {stats.aboveRangeCount}
          </span>
          <span className={`text-[10px] font-medium block mt-0.5 ${statusFilter === 'ABOVE_RANGE' ? 'text-amber-100' : 'text-amber-700'}`}>
            Exceeds upper limit
          </span>
        </div>

        {/* Below Range */}
        <div
          onClick={() => setStatusFilter('BELOW_RANGE')}
          className={`p-4.5 rounded-2xl border transition-all cursor-pointer shadow-glass hover:-translate-y-0.5 ${
            statusFilter === 'BELOW_RANGE'
              ? 'bg-gradient-to-br from-[#2563EB] to-[#1D4ED8] text-white border-blue-700 shadow-md ring-2 ring-blue-400/40'
              : 'bg-blue-50/60 border-blue-200/90 hover:border-blue-300 text-blue-950'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className={`text-xs font-bold ${statusFilter === 'BELOW_RANGE' ? 'text-blue-100' : 'text-blue-800'}`}>
              Below Range
            </span>
            <ArrowDownRight className={`w-3.5 h-3.5 ${statusFilter === 'BELOW_RANGE' ? 'text-blue-200' : 'text-blue-600'}`} />
          </div>
          <span className="text-2xl sm:text-3xl font-black mt-2 block tracking-tight">
            {stats.belowRangeCount}
          </span>
          <span className={`text-[10px] font-medium block mt-0.5 ${statusFilter === 'BELOW_RANGE' ? 'text-blue-100' : 'text-blue-700'}`}>
            Under lower limit
          </span>
        </div>

        {/* Needs Verification */}
        <div
          onClick={() => setStatusFilter('NEEDS_VERIFICATION')}
          className={`p-4.5 rounded-2xl border transition-all cursor-pointer shadow-glass hover:-translate-y-0.5 col-span-2 sm:col-span-1 ${
            statusFilter === 'NEEDS_VERIFICATION'
              ? 'bg-gradient-to-br from-[#7C3AED] to-[#6D28D9] text-white border-purple-700 shadow-md ring-2 ring-purple-400/40'
              : 'bg-purple-50/60 border-purple-200/90 hover:border-purple-300 text-purple-950'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className={`text-xs font-bold ${statusFilter === 'NEEDS_VERIFICATION' ? 'text-purple-100' : 'text-purple-800'}`}>
              Needs Verification
            </span>
            <AlertTriangle className={`w-3.5 h-3.5 ${statusFilter === 'NEEDS_VERIFICATION' ? 'text-purple-200' : 'text-purple-600'}`} />
          </div>
          <span className="text-2xl sm:text-3xl font-black mt-2 block tracking-tight">
            {stats.needsVerificationCount}
          </span>
          <span className={`text-[10px] font-medium block mt-0.5 ${statusFilter === 'NEEDS_VERIFICATION' ? 'text-purple-100' : 'text-purple-700'}`}>
            Missing range or data
          </span>
        </div>

      </div>

      {/* Clinical Information Notice */}
      <div className="mb-6 p-4 rounded-2xl bg-white/80 border border-slate-200/90 text-slate-700 text-xs flex items-center gap-3 shadow-glass backdrop-blur-md">
        <Info className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>Clinical Principle:</strong> Reference-range comparisons describe how a result relates to the laboratory’s stated interval. They are not diagnoses or measures of disease severity.
        </p>
      </div>

      {/* Search and Filters Bar */}
      <div className="bg-white/90 backdrop-blur-md rounded-2xl border border-slate-200/90 p-4 mb-6 flex flex-col sm:flex-row items-center justify-between gap-3.5 shadow-glass">
        {/* Search input */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by parameter or category..."
            className="w-full pl-9.5 pr-3 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-slate-50 focus:bg-white text-slate-800 font-medium"
          />
        </div>

        {/* View Density Toggle & Filter Chips */}
        <div className="flex items-center gap-3 flex-wrap w-full sm:w-auto justify-between sm:justify-end">
          {/* Density Toggle */}
          <div className="flex items-center bg-slate-100 p-0.5 rounded-xl border border-slate-200">
            <button
              onClick={() => setViewDensity('spacious')}
              className={`px-2.5 py-1 text-xs font-bold rounded-lg flex items-center gap-1 transition-all cursor-pointer ${
                viewDensity === 'spacious'
                  ? 'bg-white text-[#0B192C] shadow-2xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
              title="Spacious Card View"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span className="hidden md:inline text-[11px]">Cards</span>
            </button>
            <button
              onClick={() => setViewDensity('compact')}
              className={`px-2.5 py-1 text-xs font-bold rounded-lg flex items-center gap-1 transition-all cursor-pointer ${
                viewDensity === 'compact'
                  ? 'bg-white text-[#0B192C] shadow-2xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
              title="Compact Clinical Table View"
            >
              <List className="w-3.5 h-3.5" />
              <span className="hidden md:inline text-[11px]">Table</span>
            </button>
          </div>

          {/* Compact Filter Chips */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[11px] font-bold text-slate-400 mr-1 flex items-center gap-1">
              <Filter className="w-3 h-3" /> Filter:
            </span>

            {[
              { id: 'ALL', label: 'All', count: stats.totalCount },
              { id: 'ABOVE_RANGE', label: 'Above', count: stats.aboveRangeCount },
              { id: 'BELOW_RANGE', label: 'Below', count: stats.belowRangeCount },
              { id: 'WITHIN_RANGE', label: 'Within', count: stats.withinRangeCount },
              { id: 'NEEDS_VERIFICATION', label: 'Verify', count: stats.needsVerificationCount }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setStatusFilter(tab.id as any)}
                className={`px-3 py-1.5 text-xs rounded-xl font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  statusFilter === tab.id
                    ? 'bg-[#0B192C] text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                <span>{tab.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  statusFilter === tab.id ? 'bg-cyan-500 text-slate-900 font-extrabold' : 'bg-slate-200/80 text-slate-600'
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Explanation Cards or Compact Table View */}
      {filteredParameters.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-slate-300 p-8 shadow-2xs">
          <p className="text-sm font-bold text-slate-700">No parameters match your search or filter.</p>
          <p className="text-xs text-slate-500 mt-1">Try resetting the filter tabs or clearing the search query.</p>
          <button
            onClick={() => {
              setSearchTerm('');
              setStatusFilter('ALL');
            }}
            className="mt-4 px-4 py-2 rounded-xl bg-teal-50 text-teal-800 text-xs font-bold hover:bg-teal-100 border border-teal-200 cursor-pointer"
          >
            Clear Filters
          </button>
        </div>
      ) : viewDensity === 'compact' ? (
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-glass overflow-hidden mb-8">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50/90 border-b border-slate-200 text-slate-500 font-extrabold uppercase tracking-wider text-[11px]">
                  <th className="py-3.5 px-5">Test / Parameter</th>
                  <th className="py-3.5 px-4">Reported Value</th>
                  <th className="py-3.5 px-4">Printed Ref Range</th>
                  <th className="py-3.5 px-4">Range Assessment</th>
                  <th className="py-3.5 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredParameters.map((param) => {
                  const status = param.classification.status;
                  const isAbove = status === 'ABOVE_RANGE';
                  const isBelow = status === 'BELOW_RANGE';
                  const isWithin = status === 'WITHIN_RANGE';
                  const isVerify = status === 'NEEDS_VERIFICATION' || param.needsVerification;

                  return (
                    <tr key={param.id} className="hover:bg-teal-50/30 transition-colors">
                      <td className="py-3.5 px-5">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-bold text-[#0B192C] text-sm">
                            {param.name}
                          </span>
                          {param.glossary && (
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                              {param.glossary.category}
                            </span>
                          )}
                          {param.originalFlag && (
                            <span className="text-[10px] font-extrabold px-1.5 py-0.2 rounded bg-rose-50 text-rose-700 border border-rose-200">
                              Flag: {param.originalFlag}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-3.5 px-4 font-mono font-bold text-slate-900 text-sm">
                        {param.value} {param.unit}
                      </td>
                      <td className="py-3.5 px-4 text-slate-600 font-medium">
                        {param.referenceRange || <span className="text-purple-700 italic">Not found</span>}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border ${
                          isWithin
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                            : isAbove
                            ? 'bg-amber-50 text-amber-800 border-amber-200'
                            : isBelow
                            ? 'bg-blue-50 text-blue-800 border-blue-200'
                            : 'bg-purple-50 text-purple-800 border-purple-200'
                        }`}>
                          {isWithin && <CheckCircle2 className="w-3 h-3 text-emerald-600" />}
                          {isAbove && <ArrowUpRight className="w-3 h-3 text-amber-600" />}
                          {isBelow && <ArrowDownRight className="w-3 h-3 text-blue-600" />}
                          {isVerify && <AlertTriangle className="w-3 h-3 text-purple-600" />}
                          <span>{param.classification.label}</span>
                        </span>
                      </td>
                      <td className="py-3.5 px-5 text-right">
                        {onSelectDetail && (
                          <button
                            onClick={() => onSelectDetail(param)}
                            className="px-2.5 py-1 rounded-lg bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200 text-xs font-bold inline-flex items-center gap-1 cursor-pointer transition-colors"
                            title="Scientific deep-dive"
                          >
                            <Sparkles className="w-3 h-3 text-cyan-600" />
                            <span>Deep-Dive</span>
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredParameters.map((param) => (
            <ExplanationCard
              key={param.id}
              parameter={param}
              onEditRequest={onEditParameters}
              onSelectDetail={onSelectDetail}
            />
          ))}
        </div>
      )}

      {/* Doctor-Prep Questions Section */}
      <DoctorQuestionsPanel
        questions={doctorQuestions}
        parameters={parameters}
      />

    </div>
  );
};
