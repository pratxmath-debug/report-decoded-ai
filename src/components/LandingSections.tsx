import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  UploadCloud, 
  CheckCircle2, 
  FileText, 
  MessageSquareHeart, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Lock, 
  Zap, 
  TrendingUp, 
  Activity, 
  Layers, 
  Eye, 
  Printer, 
  HelpCircle,
  FileSearch,
  SlidersHorizontal,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  BookOpen
} from 'lucide-react';
import { SparkLogo } from './SparkLogo';
import { DoctorPatientDiscussion } from './illustrations/DoctorPatientDiscussion';

interface LandingSectionsProps {
  onStartUpload: () => void;
  onExploreDemo: () => void;
}

export const LandingSections: React.FC<LandingSectionsProps> = ({
  onStartUpload,
  onExploreDemo
}) => {
  const [activeStage, setActiveStage] = useState<number>(1);
  const [demoFilter, setDemoFilter] = useState<'all' | 'above' | 'within'>('all');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  return (
    <div className="space-y-24 py-12">
      
      {/* 1. PRODUCT PREVIEW STRIP (Directly beneath Hero) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-8 rounded-3xl bg-white/90 border border-slate-200/90 shadow-glass backdrop-blur-md">
          <div className="text-center mb-6">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200/80">
              End-to-End Workflow
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-[#0B192C] tracking-tight mt-2">
              From Raw Lab Paper to Prepared Doctor Visit
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Stage 1 */}
            <div 
              onClick={() => setActiveStage(1)}
              className={`p-4.5 rounded-2xl border transition-all cursor-pointer ${
                activeStage === 1
                  ? 'bg-gradient-to-br from-teal-500/10 to-cyan-500/10 border-cyan-400 shadow-2xs'
                  : 'bg-slate-50/70 border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-bold text-teal-800 bg-white px-2 py-0.5 rounded-md border border-slate-200">
                  Step 01
                </span>
                <UploadCloud className="w-4 h-4 text-teal-600" />
              </div>
              <h4 className="font-extrabold text-[#0B192C] text-sm mb-1">Upload Report</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Tesseract.js OCR and PDF.js extract parameters directly in your browser.
              </p>
            </div>

            {/* Stage 2 */}
            <div 
              onClick={() => setActiveStage(2)}
              className={`p-4.5 rounded-2xl border transition-all cursor-pointer ${
                activeStage === 2
                  ? 'bg-gradient-to-br from-teal-500/10 to-cyan-500/10 border-cyan-400 shadow-2xs'
                  : 'bg-slate-50/70 border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-bold text-teal-800 bg-white px-2 py-0.5 rounded-md border border-slate-200">
                  Step 02
                </span>
                <CheckCircle2 className="w-4 h-4 text-cyan-600" />
              </div>
              <h4 className="font-extrabold text-[#0B192C] text-sm mb-1">Verify Values</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Review names, values, units, and printed reference intervals before analysis.
              </p>
            </div>

            {/* Stage 3 */}
            <div 
              onClick={() => setActiveStage(3)}
              className={`p-4.5 rounded-2xl border transition-all cursor-pointer ${
                activeStage === 3
                  ? 'bg-gradient-to-br from-teal-500/10 to-cyan-500/10 border-cyan-400 shadow-2xs'
                  : 'bg-slate-50/70 border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-bold text-teal-800 bg-white px-2 py-0.5 rounded-md border border-slate-200">
                  Step 03
                </span>
                <Activity className="w-4 h-4 text-teal-600" />
              </div>
              <h4 className="font-extrabold text-[#0B192C] text-sm mb-1">Understand Measures</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Learn what tests measure via a curated, non-diagnostic scientific glossary.
              </p>
            </div>

            {/* Stage 4 */}
            <div 
              onClick={() => setActiveStage(4)}
              className={`p-4.5 rounded-2xl border transition-all cursor-pointer ${
                activeStage === 4
                  ? 'bg-gradient-to-br from-teal-500/10 to-cyan-500/10 border-cyan-400 shadow-2xs'
                  : 'bg-slate-50/70 border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-bold text-teal-800 bg-white px-2 py-0.5 rounded-md border border-slate-200">
                  Step 04
                </span>
                <MessageSquareHeart className="w-4 h-4 text-cyan-600" />
              </div>
              <h4 className="font-extrabold text-[#0B192C] text-sm mb-1">Prepare Consultation</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Generate safe questions to discuss with your doctor at your next appointment.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 2. SECTION A: HOW IT WORKS (DEEP-DIVE) */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-black uppercase tracking-wider text-teal-700 bg-teal-50 px-3.5 py-1.5 rounded-full border border-teal-200">
            System Architecture
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0B192C] tracking-tight mt-3">
            Designed for Accuracy, Safety, and Patient Autonomy
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            Every step is engineered to give patients complete oversight over their laboratory data without making unsupported medical diagnoses.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div className="p-8 rounded-3xl bg-white border border-slate-200/90 shadow-glass flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700 mb-6">
                <FileSearch className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-teal-700 uppercase tracking-wider">01. On-Device Extraction</span>
              <h3 className="text-xl font-extrabold text-[#0B192C] mt-1 mb-3">
                Optical Character Recognition & Native PDF Parsing
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Standard scanned lab PDFs or mobile camera captures contain tabular columns: test names, result values, units, and laboratory reference ranges. Spark Decoded executes Tesseract.js and Mozilla PDF.js directly on your device, ensuring zero bytes ever leave your browser.
              </p>
            </div>
            <div className="mt-6 p-4 rounded-2xl bg-slate-50 border border-slate-100 text-xs font-mono text-slate-700">
              <code>HbA1c ... 6.2 % [Ref: &lt; 5.7] Flag: H</code>
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-slate-200/90 shadow-glass flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-cyan-50 border border-cyan-200 flex items-center justify-center text-cyan-700 mb-6">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-cyan-700 uppercase tracking-wider">02. Patient-in-the-Loop</span>
              <h3 className="text-xl font-extrabold text-[#0B192C] mt-1 mb-3">
                Explicit Verification Screen
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Optical recognition can misinterpret decimal points on smudged paper printouts. Spark Decoded marks uncertain extractions as "Needs verification" and invites the patient to confirm extracted numbers before classifications are rendered.
              </p>
            </div>
            <div className="mt-6 p-4 rounded-2xl bg-cyan-50/60 border border-cyan-100 text-xs text-cyan-950 font-medium">
              ✓ Low-confidence fields marked • Editable rows • Missing intervals flagged
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-slate-200/90 shadow-glass flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700 mb-6">
                <Activity className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">03. Deterministic Rules</span>
              <h3 className="text-xl font-extrabold text-[#0B192C] mt-1 mb-3">
                Mathematical Reference Comparisons
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                We never rely on probabilistic AI models to guess whether a value is in or out of range. Results are strictly compared using deterministic arithmetic against the reference intervals established and printed by that specific laboratory.
              </p>
            </div>
            <div className="mt-6 p-4 rounded-2xl bg-slate-50 border border-slate-100 text-xs text-slate-700 font-medium">
              ✓ Two-sided ranges • One-sided limits (&lt; 5.7, &gt; 40) • Qualitative outputs
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-slate-200/90 shadow-glass flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 mb-6">
                <MessageSquareHeart className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">04. Doctor Consultation Prep</span>
              <h3 className="text-xl font-extrabold text-[#0B192C] mt-1 mb-3">
                Structured Questions for Your Doctor
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Rather than causing anxiety by inferring serious medical conditions, Spark Decoded prepares the patient with productive questions regarding testing validity, repeat intervals, medication interactions, and hydration factors.
              </p>
            </div>
            <div className="mt-6 p-4 rounded-2xl bg-amber-50/60 border border-amber-100 text-xs text-amber-950 font-medium">
              ✓ Printable consultation guide • Checklist checkboxes • Clinical scratchpad
            </div>
          </div>

        </div>
      </section>

      {/* 3. SECTION B: FEATURE SHOWCASE (BENTO GRID) */}
      <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-black uppercase tracking-wider text-cyan-700 bg-cyan-50 px-3.5 py-1.5 rounded-full border border-cyan-200">
            Platform Capabilities
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0B192C] tracking-tight mt-3">
            Engineered for Comprehensive Laboratory Clarity
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Bento Item 1: Large Panel */}
          <div className="md:col-span-2 p-8 rounded-3xl bg-gradient-to-br from-[#0B192C] to-[#1E293B] text-white shadow-xl relative overflow-hidden flex flex-col justify-between">
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-teal-500 to-cyan-400 flex items-center justify-center text-white mb-6">
                <Zap className="w-6 h-6 fill-white" />
              </div>
              <span className="text-xs font-bold text-cyan-300 uppercase tracking-wider">Longitudinal Intelligence</span>
              <h3 className="text-2xl font-black mt-1 mb-3 text-white">
                Multi-Report Trend Comparison
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed max-w-xl">
                Track how parameters evolve between blood draws. Compare your current report directly against earlier laboratory records to view numerical deltas, percentage changes, and status shifts (e.g. from Above Range back into Range).
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 relative z-10 text-xs text-cyan-200">
              <span>Unit validation checks • Explicit date preservation • Objective metrics</span>
              <button
                onClick={onExploreDemo}
                className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-900 font-extrabold hover:bg-cyan-400 transition-colors cursor-pointer"
              >
                Try Comparison Demo →
              </button>
            </div>
          </div>

          {/* Bento Item 2 */}
          <div className="p-8 rounded-3xl bg-white border border-slate-200/90 shadow-glass flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700 mb-6">
                <Lock className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-teal-700 uppercase tracking-wider">Security & Privacy</span>
              <h3 className="text-xl font-extrabold text-[#0B192C] mt-1 mb-2">
                100% In-Browser Execution
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Zero document uploads, zero remote logging, and zero server-side storage. Your sensitive health records never touch any remote database.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 text-[11px] font-bold text-teal-800">
              Session Wiped On Reset
            </div>
          </div>

          {/* Bento Item 3 */}
          <div className="p-8 rounded-3xl bg-white border border-slate-200/90 shadow-glass flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 mb-6">
                <Printer className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">Clinical Utility</span>
              <h3 className="text-xl font-extrabold text-[#0B192C] mt-1 mb-2">
                Printable Consultation Guides
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Optimized print layout with readable typography, parameter summaries, and your custom notes ready for your clinic visit.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 text-[11px] font-bold text-slate-600">
              Clean @media print CSS
            </div>
          </div>

          {/* Bento Item 4 */}
          <div className="p-8 rounded-3xl bg-white border border-slate-200/90 shadow-glass flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-cyan-50 border border-cyan-200 flex items-center justify-center text-cyan-700 mb-6">
                <SlidersHorizontal className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-cyan-700 uppercase tracking-wider">Dynamic Explorer</span>
              <h3 className="text-xl font-extrabold text-[#0B192C] mt-1 mb-2">
                Synonym & Parameter Search
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Instant search across canonical names and colloquial medical aliases (e.g. searching "sugar" matches HbA1c & Fasting Glucose).
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 text-[11px] font-bold text-cyan-800">
              Real-time Token Matching
            </div>
          </div>

          {/* Bento Item 5 */}
          <div className="p-8 rounded-3xl bg-white border border-slate-200/90 shadow-glass flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-700 mb-6">
                <Eye className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-purple-700 uppercase tracking-wider">Educational Depth</span>
              <h3 className="text-xl font-extrabold text-[#0B192C] mt-1 mb-2">
                Scientific Deep-Dives
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Deep-dive drawers detailing physiological mechanisms, dietary influences, and assay variability without alarmism.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 text-[11px] font-bold text-purple-800">
              Curated Medical Glossary
            </div>
          </div>

        </div>
      </section>

      {/* 4. SECTION C: MINIATURE ANALYSIS DASHBOARD PREVIEW */}
      <section id="preview" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="p-8 sm:p-10 rounded-3xl bg-white/95 border border-slate-200/90 shadow-glass backdrop-blur-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 mb-6">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-teal-800 bg-teal-50 px-2.5 py-1 rounded-md border border-teal-200">
                Interactive Dashboard Preview
              </span>
              <h3 className="text-2xl font-black text-[#0B192C] tracking-tight mt-1.5">
                Explore an Illustrative Laboratory Result
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Clearly labeled fictional sample data demonstrating real deterministic rules.
              </p>
            </div>

            <button
              onClick={onExploreDemo}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#0D9488] to-[#06B6D4] text-white font-bold text-xs shadow-md shadow-teal-700/20 hover:shadow-cyan-600/30 transition-all flex items-center gap-2 cursor-pointer self-start sm:self-auto"
            >
              <span>Load Full Sample in App</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mini Counter Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            <div className="p-3.5 rounded-xl bg-slate-900 text-white">
              <span className="text-[10px] font-bold text-cyan-200 block">Total Parameters</span>
              <span className="text-xl font-black mt-0.5 block">8 Tests</span>
            </div>
            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950">
              <span className="text-[10px] font-bold text-emerald-800 block">Within Lab Range</span>
              <span className="text-xl font-black mt-0.5 block">5 Tests</span>
            </div>
            <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-950">
              <span className="text-[10px] font-bold text-amber-800 block">Above Lab Range</span>
              <span className="text-xl font-black mt-0.5 block">2 Tests</span>
            </div>
            <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-950">
              <span className="text-[10px] font-bold text-blue-800 block">Below Lab Range</span>
              <span className="text-xl font-black mt-0.5 block">1 Test</span>
            </div>
          </div>

          {/* Mini Interactive Parameter Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Card 1: HbA1c */}
            <div className="p-5 rounded-2xl border border-amber-200/90 bg-amber-50/20">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-bold text-[#0B192C] text-sm">HbA1c (Glycated Hemoglobin)</h4>
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300">
                  Above Range
                </span>
              </div>
              <div className="flex items-baseline justify-between text-xs bg-white p-3 rounded-xl border border-slate-200 mb-3">
                <span>Result: <strong className="text-[#0B192C] font-black text-base">6.2 %</strong></span>
                <span>Printed Ref: <strong className="text-slate-700">&lt; 5.7 %</strong></span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Measures 2–3 month glucose binding on red blood cell proteins to assess metabolic regulation.
              </p>
            </div>

            {/* Card 2: ALT */}
            <div className="p-5 rounded-2xl border border-emerald-200/90 bg-emerald-50/20">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-bold text-[#0B192C] text-sm">ALT / SGPT (Alanine Aminotransferase)</h4>
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                  Within Range
                </span>
              </div>
              <div className="flex items-baseline justify-between text-xs bg-white p-3 rounded-xl border border-slate-200 mb-3">
                <span>Result: <strong className="text-[#0B192C] font-black text-base">28 U/L</strong></span>
                <span>Printed Ref: <strong className="text-slate-700">7 - 56 U/L</strong></span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Enzyme concentrated inside liver cells; evaluated to check cellular integrity and metabolic health.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 5. SECTION D: MEDICAL TEST LIBRARY PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#EAF7FF] via-[#F0F9FF] to-[#E0F2FE] border border-cyan-200/80 shadow-sm relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-bold text-teal-800 uppercase tracking-wider bg-teal-100/80 px-3 py-1 rounded-full border border-teal-300/60 inline-flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5" />
                Evidence-Based Test Catalog
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#0B192C] tracking-tight mt-3">
                Curated Medical Knowledge at Your Fingertips
              </h2>
              <p className="text-sm text-slate-600 mt-2 max-w-2xl">
                Explore our accredited directory of clinical laboratory tests. Understand what each biomarker measures, typical units, physiological significance, and why reference intervals vary.
              </p>
            </div>
            <Link
              to="/tests"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-sm shadow-md transition-all self-start md:self-auto cursor-pointer"
            >
              <span>Explore All Tests in Catalog</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: 'HbA1c (Glycated Hemoglobin)', code: 'HBA1C', cat: 'Metabolic & Diabetes', desc: 'Average blood sugar levels over the past 2 to 3 months.', slug: 'hba1c' },
              { name: 'Fasting Blood Glucose', code: 'GLU', cat: 'Metabolic & Diabetes', desc: 'Blood sugar measured after an overnight fast (minimum 8h).', slug: 'fasting-blood-glucose' },
              { name: 'Serum Creatinine', code: 'CREAT', cat: 'Renal / Kidney Panel', desc: 'Byproduct of muscle metabolism filtered out by kidneys.', slug: 'serum-creatinine' },
              { name: 'Lipid Panel: Total Cholesterol', code: 'CHOL', cat: 'Cardiovascular & Lipid', desc: 'Overall amount of cholesterol circulating in bloodstream.', slug: 'total-cholesterol' },
              { name: 'Thyroid Stimulating Hormone', code: 'TSH', cat: 'Endocrine & Thyroid', desc: 'Pituitary signal regulating thyroid hormone production.', slug: 'thyroid-stimulating-hormone' },
              { name: 'Alanine Aminotransferase', code: 'ALT', cat: 'Hepatic / Liver Panel', desc: 'Key enzyme concentrated inside liver cells.', slug: 'alanine-aminotransferase' },
              { name: 'Complete Blood Count: Hemoglobin', code: 'HGB', cat: 'Hematology (CBC)', desc: 'Oxygen-carrying protein in red blood cells.', slug: 'hemoglobin' },
              { name: '25-Hydroxy Vitamin D', code: 'VITD', cat: 'Vitamins & Minerals', desc: 'Circulating form of vitamin D essential for bone health.', slug: 'vitamin-d' }
            ].map(test => (
              <Link
                key={test.slug}
                to={`/tests?test=${test.slug}`}
                className="group p-5 rounded-2xl bg-white/90 hover:bg-white border border-slate-200/90 hover:border-teal-400 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-semibold text-teal-700 mb-1">
                    <span>{test.cat}</span>
                    <span className="font-mono text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">{test.code}</span>
                  </div>
                  <h4 className="font-bold text-[#0B192C] group-hover:text-teal-700 transition-colors text-sm">
                    {test.name}
                  </h4>
                  <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                    {test.desc}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-teal-700 group-hover:text-teal-800">
                  <span>View clinical guide</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 6. SECTION E: ILLUSTRATED CLINICAL CONTEXT & SCIENCE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-8 sm:p-12 rounded-3xl bg-white/80 border border-slate-200/90 shadow-glass">
          <div className="lg:col-span-6 space-y-5">
            <span className="text-xs font-bold text-cyan-800 uppercase tracking-wider bg-cyan-50 px-3 py-1 rounded-full border border-cyan-200">
              The Science of Reference Ranges
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0B192C] tracking-tight">
              Why Laboratory Ranges Differ Between Clinics
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Patients often wonder why a normal glucose level or TSH range is slightly different at Hospital A versus Diagnostics Lab B. 
              Laboratory reference intervals are determined statistically from healthy control populations using specific assay reagent lots and testing equipment.
            </p>
            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                <p className="text-xs text-slate-700 leading-relaxed">
                  <strong>Statistical 95% Central Interval:</strong> Most ranges represent the middle 95% of a healthy reference population. By definition, 2.5% of completely healthy individuals will fall slightly above or below.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                <p className="text-xs text-slate-700 leading-relaxed">
                  <strong>Assay Methodology:</strong> Enzymatic methods, immunoassays, and mass spectrometry each have distinct calibration baselines.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                <p className="text-xs text-slate-700 leading-relaxed">
                  <strong>Doctor Clinical Correlation:</strong> An out-of-range flag is a prompt for professional conversation, never an automated disease diagnosis.
                </p>
              </div>
            </div>
            <div className="pt-2">
              <Link
                to="/how-it-works"
                className="inline-flex items-center gap-2 text-sm font-bold text-teal-700 hover:text-teal-800 group"
              >
                <span>Read our complete laboratory interval methodology</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
          <div className="lg:col-span-6 flex justify-center">
            <div className="w-full max-w-md p-4 rounded-3xl bg-gradient-to-br from-cyan-50/70 to-teal-50/70 border border-teal-100 shadow-inner">
              <DoctorPatientDiscussion className="w-full h-auto drop-shadow-sm" />
            </div>
          </div>
        </div>
      </section>

      {/* 7. SECTION F: TRUST & RESPONSIBLE AI */}
      <section id="privacy" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="p-8 sm:p-12 rounded-3xl bg-[#07111F] text-white border border-cyan-500/30 shadow-2xl relative overflow-hidden">
          <div className="max-w-3xl">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider bg-cyan-950 px-3 py-1 rounded-full border border-cyan-800">
              Responsible AI & Clinical Integrity
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight mt-3 mb-4">
              Our Safety Commitments to Patients
            </h2>
            <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
              <p>
                • <strong>Deterministic, Rule-Based Range Classification:</strong> We never employ probabilistic language models to classify whether your test is in or out of range. Results are compared strictly against the printed laboratory reference interval.
              </p>
              <p>
                • <strong>Educational Language, Zero Medical Diagnosis:</strong> Spark Decoded does not infer specific diseases, suggest medications, or recommend treatments. We explain what tests measure so you are prepared to discuss your results with your physician.
              </p>
              <p>
                • <strong>Missing Data Transparency:</strong> If a reference range or value cannot be extracted with high confidence, we tag it as "Needs verification" rather than falsely assuming normal health.
              </p>
              <p>
                • <strong>Complete Local Privacy:</strong> Optical character recognition and parsing run entirely within your browser runtime. No patient documents or personal numbers are stored on any remote cloud server.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. SECTION G: FREQUENTLY ASKED QUESTIONS */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-xs font-bold text-teal-800 uppercase tracking-wider bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
            Common Patient Questions
          </span>
          <h2 className="text-3xl font-black text-[#0B192C] tracking-tight mt-3">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Clear answers on how Spark Decoded protects your privacy and supports your healthcare consultations.
          </p>
        </div>

        <div className="space-y-3">
          {[
            {
              q: "Does Spark Decoded diagnose medical diseases or recommend treatments?",
              a: "No, absolutely not. Spark Decoded is strictly an educational tool designed to help patients understand what different laboratory biomarkers measure and prepare relevant questions for their physician. We never diagnose illnesses, recommend drugs, or decide clinical treatment plans."
            },
            {
              q: "Why do reference ranges differ between different pathology laboratories?",
              a: "Every clinical laboratory validates its reference intervals based on specific testing instruments, reagent manufacturers, calibration controls, and demographic populations. This is why Spark Decoded prioritizes the reference range printed directly on your specific report rather than relying on a generic national default."
            },
            {
              q: "Are my medical documents or private health records uploaded to any server?",
              a: "Never. 100% of OCR and parsing runs locally in your browser memory via WebAssembly/Tesseract and PDF.js. No private patient names, report scans, or test results are ever uploaded or saved to our server or database."
            },
            {
              q: "What should I do if a value on my report is marked 'High' or 'Low'?",
              a: "Do not panic. Many temporary, benign factors (such as hydration, recent exercise, fasting duration, acute stress, or minor viral infections) can shift individual numbers. Review our generated discussion questions and consult your doctor to interpret the result in the context of your overall medical history."
            },
            {
              q: "Can I export or print the decoded questions and summaries for my appointment?",
              a: "Yes. You can export a clean, printer-friendly Doctor Consultation Brief that lists your flagged parameters, plain-language summaries, and questions to ask during your consultation."
            }
          ].map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div 
                key={idx}
                className="rounded-2xl border border-slate-200/90 bg-white/90 overflow-hidden shadow-xs transition-all"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-[#0B192C] hover:text-teal-700 transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-teal-600 shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-0 text-sm text-slate-600 leading-relaxed border-t border-slate-100 mt-2 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 9. SECTION H: FINAL CALL TO ACTION BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="p-10 sm:p-14 rounded-3xl bg-gradient-to-r from-[#0F766E] via-[#0D9488] to-[#06B6D4] text-white shadow-2xl text-center relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto space-y-5">
            <SparkLogo size="lg" className="mx-auto mb-2" />
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
              Ready to Understand Your Report?
            </h2>
            <p className="text-sm sm:text-base text-cyan-100 leading-relaxed font-medium">
              Upload your laboratory scan or explore our illustrative sample panel. Completely free, private, and runs directly on your device.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-3">
              <button
                onClick={onStartUpload}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white text-slate-900 font-extrabold text-sm shadow-xl hover:bg-slate-50 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Zap className="w-4 h-4 text-teal-600 fill-teal-600" />
                <span>Decode My Report Now</span>
              </button>
              <button
                onClick={onExploreDemo}
                className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-teal-900/40 hover:bg-teal-900/60 text-white font-bold text-sm border border-white/30 backdrop-blur-md transition-all cursor-pointer"
              >
                <span>Explore Interactive Demo</span>
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
