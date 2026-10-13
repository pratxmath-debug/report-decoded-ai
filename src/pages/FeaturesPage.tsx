import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  UploadCloud, 
  FileSearch, 
  CheckCircle2, 
  Calculator, 
  BookOpen, 
  BarChart3, 
  Database, 
  TrendingUp, 
  MessageSquareHeart, 
  Printer, 
  Lock, 
  ArrowRight, 
  ExternalLink,
  ShieldAlert,
  Zap,
  Sparkles,
  Eye,
  Check,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  Layers,
  FileSpreadsheet
} from 'lucide-react';
import { IllustratedPageBackground } from '../components/illustrations/IllustratedPageBackground';
import { ReportTransformationGraphic } from '../components/illustrations/ReportTransformationGraphic';
import { MedicalEquipmentKit } from '../components/illustrations/MedicalEquipmentKit';

interface FeaturesPageProps {
  onStartUpload: () => void;
  onExploreDemo: () => void;
}

export const FeaturesPage: React.FC<FeaturesPageProps> = ({
  onStartUpload,
  onExploreDemo
}) => {
  const navigate = useNavigate();

  // Mini interactive demo states
  const [demoRangeVal, setDemoRangeVal] = useState<number>(104);
  const [demoTab, setDemoTab] = useState<'upload' | 'verify' | 'compare' | 'questions'>('upload');

  return (
    <IllustratedPageBackground className="min-h-screen pb-20">
      
      {/* Hero Header */}
      <section className="pt-12 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E5F3ED] border border-[#A8C8BA] text-[#124E4A] text-xs font-bold mb-4 shadow-2xs">
          <Layers className="w-3.5 h-3.5 text-[#287F78]" />
          <span>SPARK DECODED FEATURES</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-[#124E4A] tracking-tight leading-tight max-w-3xl mx-auto">
          Every Feature Engineered for{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#124E4A] to-[#287F78]">
            Patient Autonomy & Clinical Clarity
          </span>
        </h1>

        <p className="mt-4 text-base sm:text-lg text-[#667773] max-w-2xl mx-auto leading-relaxed">
          Explore the eleven core capabilities powering Spark Decoded. Designed with strict healthcare safety principles: deterministic arithmetic, on-device privacy, and zero diagnostic assumptions.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={onStartUpload}
            className="px-7 py-3.5 rounded-2xl bg-gradient-to-r from-[#124E4A] to-[#287F78] hover:from-[#0B3330] hover:to-[#1B5B56] text-white font-extrabold text-sm shadow-lg shadow-teal-950/20 transition-all flex items-center gap-2 cursor-pointer active:scale-95"
          >
            <Sparkles className="w-4 h-4 fill-white" />
            <span>Decode My Report Now</span>
          </button>

          <Link
            to="/tests"
            className="px-6 py-3.5 rounded-2xl bg-white hover:bg-[#FAF9F5] text-[#253532] font-bold text-sm border border-[#DCE7E3] shadow-sm transition-all flex items-center gap-2 cursor-pointer"
          >
            <BookOpen className="w-4 h-4 text-teal-600" />
            <span>Browse Medical Test Database</span>
          </Link>
        </div>
      </section>

      {/* Visual Transformation Showcase Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="p-8 sm:p-10 rounded-3xl bg-white/95 border border-slate-200/90 shadow-glass backdrop-blur-md">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
              The Core Value
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#071426] tracking-tight mt-2">
              Transforming Raw Lab Paper into Clear Knowledge
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Physical laboratory sheets are filled with cryptic abbreviations, tight numerical intervals, and alarming high/low flags. Spark Decoded bridges the comprehension gap.
            </p>
          </div>

          <div className="flex justify-center">
            <ReportTransformationGraphic size="lg" />
          </div>
        </div>
      </section>

      {/* The 11 In-Depth Feature Sections */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Feature 1: Report Upload */}
        <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200/90 shadow-glass grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700">
              <UploadCloud className="w-6 h-6" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded">01</span>
              <h3 className="text-xl sm:text-2xl font-black text-[#071426]">
                Multi-Format Laboratory Report Upload
              </h3>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              Upload patient reports in formats commonly issued by diagnostic clinics: JPG, JPEG, PNG smartphone camera captures, or native digital PDF documents. Files are dragged and dropped directly onto the interface.
            </p>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-xs text-slate-700 space-y-2">
              <div className="flex items-center gap-2 font-bold text-[#071426]">
                <Check className="w-4 h-4 text-teal-600" />
                <span>Zero File Upload to Servers</span>
              </div>
              <p className="text-slate-500">
                Documents are read entirely in browser memory (`FileReader` API). The physical bytes of your report are never transmitted to external cloud storage.
              </p>
            </div>
            <button
              onClick={onStartUpload}
              className="mt-2 px-5 py-2.5 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <span>Launch Upload Flow →</span>
            </button>
          </div>

          <div className="lg:col-span-5 bg-gradient-to-br from-slate-50 to-[#EAF7FF]/50 p-6 rounded-2xl border border-slate-200">
            <div className="text-xs font-bold text-slate-500 mb-3 uppercase tracking-wider">Accepted File Formats</div>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-200 text-xs">
                <span className="font-bold text-[#071426]">PDF Documents</span>
                <span className="text-teal-700 font-semibold bg-teal-50 px-2 py-0.5 rounded">PDF.js Text + Render</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-200 text-xs">
                <span className="font-bold text-[#071426]">Smartphone Scans (JPG / PNG)</span>
                <span className="text-cyan-700 font-semibold bg-cyan-50 px-2 py-0.5 rounded">Tesseract.js OCR</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-200 text-xs">
                <span className="font-bold text-[#071426]">Illustrative Sample Data</span>
                <button onClick={onExploreDemo} className="text-teal-700 font-bold underline cursor-pointer">
                  1-Click Instant Demo
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Feature 2: OCR & Data Extraction */}
        <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200/90 shadow-glass grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-cyan-50 border border-cyan-200 flex items-center justify-center text-cyan-700">
              <FileSearch className="w-6 h-6" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-cyan-800 bg-cyan-50 px-2 py-0.5 rounded">02</span>
              <h3 className="text-xl sm:text-2xl font-black text-[#071426]">
                On-Device OCR & Table Parameter Extraction
              </h3>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              Laboratory reports use tabular columns: Test Name, Result Value, Unit, Reference Interval, and optional High/Low flags. Spark Decoded executes Tesseract.js optical character recognition and Mozilla PDF.js on-device to isolate structured lines without sending scans to third-party vision APIs.
            </p>
            <div className="p-4 rounded-2xl bg-cyan-50/60 border border-cyan-100 text-xs text-slate-700 space-y-1">
              <p className="font-bold text-[#071426]">Regex Boundary Matching:</p>
              <p className="font-mono text-slate-600 text-[11px]">
                Identifies numbers, decimals, multi-unit formats (mg/dL, %, U/L), and one-sided operators (&lt;, &gt;, &lt;=).
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 bg-slate-900 text-white p-6 rounded-2xl font-mono text-xs">
            <div className="text-cyan-300 font-bold mb-2">// OCR Pipeline Output</div>
            <div className="space-y-1.5 text-slate-300 text-[11px]">
              <p><span className="text-teal-400">test:</span> "HbA1c Glycated Hemoglobin"</p>
              <p><span className="text-teal-400">value:</span> "6.2"</p>
              <p><span className="text-teal-400">unit:</span> "%"</p>
              <p><span className="text-teal-400">printed_ref:</span> "&lt; 5.7"</p>
              <p><span className="text-teal-400">original_flag:</span> "H" (High)</p>
              <p><span className="text-teal-400">confidence:</span> 0.94</p>
            </div>
          </div>
        </div>

        {/* Feature 3: Patient Value Verification */}
        <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200/90 shadow-glass grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded">03</span>
              <h3 className="text-xl sm:text-2xl font-black text-[#071426]">
                Patient-in-the-Loop Value Verification
              </h3>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              Paper printouts often suffer from fold marks, ink smudges, or faded dot-matrix printing. Rather than silently passing uncertain numbers into analysis, Spark Decoded presents an explicit interactive verification screen where users confirm or edit values before classification occurs.
            </p>
            <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-950 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Uncertain values and missing ranges are flagged with "Needs verification".</span>
            </div>
          </div>

          <div className="lg:col-span-5 p-5 rounded-2xl bg-white border border-purple-200 shadow-sm text-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-purple-900">Needs Patient Review</span>
              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-purple-100 text-purple-800">Flagged</span>
            </div>
            <p className="text-slate-600 text-xs mb-3">
              Serum Creatinine extracted as "1.3 mg/dL". Reference range was printed close to page boundary.
            </p>
            <div className="p-2 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between">
              <span>Confirm range: <strong>0.7 - 1.3 mg/dL</strong></span>
              <span className="text-teal-700 font-bold">✓ Verified</span>
            </div>
          </div>
        </div>

        {/* Feature 4: Deterministic Range Classification */}
        <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200/90 shadow-glass grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700">
              <Calculator className="w-6 h-6" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-blue-800 bg-blue-50 px-2 py-0.5 rounded">04</span>
              <h3 className="text-xl sm:text-2xl font-black text-[#071426]">
                Deterministic Arithmetic Reference Classification
              </h3>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              We never use probabilistic generative AI to decide whether a result is in or out of range. All classifications derive from pure mathematical comparison against the laboratory's printed interval.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-center text-xs">
              <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-900 border border-emerald-200 font-bold">
                Within Range
              </div>
              <div className="p-2.5 rounded-xl bg-amber-50 text-amber-900 border border-amber-200 font-bold">
                Above Range
              </div>
              <div className="p-2.5 rounded-xl bg-blue-50 text-blue-900 border border-blue-200 font-bold">
                Below Range
              </div>
              <div className="p-2.5 rounded-xl bg-purple-50 text-purple-900 border border-purple-200 font-bold">
                Needs Verify
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 p-6 rounded-2xl bg-gradient-to-br from-slate-50 to-blue-50/40 border border-slate-200 text-xs">
            <div className="font-bold text-[#071426] mb-3">Interactive Logic Sandbox</div>
            <p className="text-slate-600 mb-2">Adjust Fasting Glucose value (Ref: 70–99 mg/dL):</p>
            <div className="flex items-center gap-3 mb-3">
              <input 
                type="range" 
                min="50" 
                max="150" 
                value={demoRangeVal} 
                onChange={(e) => setDemoRangeVal(Number(e.target.value))}
                className="flex-1 accent-teal-600 cursor-pointer"
              />
              <span className="font-mono font-bold text-sm text-[#071426] w-16 text-right">
                {demoRangeVal} mg/dL
              </span>
            </div>
            <div className="p-3 rounded-xl bg-white border border-slate-200 flex items-center justify-between">
              <span className="text-slate-500">Evaluated Status:</span>
              <span className={`font-bold px-2 py-0.5 rounded-full ${
                demoRangeVal < 70 
                  ? 'bg-blue-100 text-blue-800' 
                  : demoRangeVal > 99 
                  ? 'bg-amber-100 text-amber-800' 
                  : 'bg-emerald-100 text-emerald-800'
              }`}>
                {demoRangeVal < 70 ? 'Below Range (< 70)' : demoRangeVal > 99 ? 'Above Range (> 99)' : 'Within Range (70-99)'}
              </span>
            </div>
          </div>
        </div>

        {/* Feature 5: Medical Knowledge Library */}
        <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200/90 shadow-glass grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
              <Database className="w-6 h-6" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">05</span>
              <h3 className="text-xl sm:text-2xl font-black text-[#071426]">
                Database-Backed Educational Medical Catalog
              </h3>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              Spark Decoded is backed by a native SQLite relational database containing dozens of verified clinical tests across 8 categories: CBC, Diabetes, Liver, Kidney, Lipids, Thyroid, Vitamins, and Inflammation. Every entry details what the test measures, why doctors order it, and interpretation limitations.
            </p>
            <Link
              to="/tests"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-800 hover:text-teal-950 underline cursor-pointer"
            >
              <span>Explore the complete database catalog →</span>
            </Link>
          </div>

          <div className="lg:col-span-5 bg-gradient-to-br from-teal-500/10 to-cyan-500/10 p-6 rounded-2xl border border-teal-200 text-xs">
            <div className="font-bold text-[#071426] mb-2 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-teal-600" />
              <span>Accredited Knowledge Sources</span>
            </div>
            <p className="text-slate-600 mb-3 leading-relaxed">
              Curated definitions link to Mayo Clinic Laboratories, ADLM (Lab Tests Online), and American Diabetes Association standards.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-teal-900 font-bold">
              <span className="px-2 py-0.5 rounded bg-white border border-teal-200">ADA</span>
              <span className="px-2 py-0.5 rounded bg-white border border-teal-200">Mayo Clinic</span>
              <span className="px-2 py-0.5 rounded bg-white border border-teal-200">ADLM / AACC</span>
              <span className="px-2 py-0.5 rounded bg-white border border-teal-200">NIH Medline</span>
            </div>
          </div>
        </div>

        {/* Feature 6: Longitudinal Report Comparison */}
        <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200/90 shadow-glass grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-cyan-50 border border-cyan-200 flex items-center justify-center text-cyan-700">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-cyan-800 bg-cyan-50 px-2 py-0.5 rounded">06</span>
              <h3 className="text-xl sm:text-2xl font-black text-[#071426]">
                Multi-Report Comparison Engine
              </h3>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              Track how tests have changed between your baseline visit and follow-up lab work. The comparator matches identical tests, calculates numerical deltas and percentage changes, and highlights status transitions.
            </p>
            <div className="p-3.5 rounded-2xl bg-cyan-50 border border-cyan-200 text-xs text-cyan-950 font-medium">
              <strong>Unit Safety Enforcement:</strong> The engine strictly rejects calculating deltas if units differ (e.g. mg/dL vs mmol/L) to prevent misleading interpretations.
            </div>
          </div>

          <div className="lg:col-span-5 p-5 rounded-2xl bg-white border border-slate-200 shadow-sm text-xs space-y-2.5">
            <div className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">Sample Delta Calculation</div>
            <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50">
              <span>HbA1c Baseline: <strong>6.2 %</strong></span>
              <span>Follow-up: <strong>5.8 %</strong></span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg bg-teal-50 text-teal-900 font-bold">
              <span>Delta: <strong>-0.4 %</strong> (-6.5%)</span>
              <span className="text-[10px] bg-teal-200/70 px-2 py-0.5 rounded">Shift: Towards Interval</span>
            </div>
          </div>
        </div>

        {/* Feature 7: Doctor Visit Preparation & Notes Scratchpad */}
        <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200/90 shadow-glass grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-700">
              <MessageSquareHeart className="w-6 h-6" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-rose-800 bg-rose-50 px-2 py-0.5 rounded">07</span>
              <h3 className="text-xl sm:text-2xl font-black text-[#071426]">
                Doctor Visit Preparation & Personal Notes
              </h3>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              Turn confusing numbers into constructive questions. Generates questions organized by rationale (re-testing intervals, medication factors, fasting duration) and includes a private scratchpad to write down personal symptoms.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span>✓ Printable guide</span>
              <span>•</span>
              <span>✓ Copyable checklist</span>
              <span>•</span>
              <span>✓ Session-persisted notes</span>
            </div>
          </div>

          <div className="lg:col-span-5 p-5 rounded-2xl bg-amber-50/50 border border-amber-200 text-xs space-y-2">
            <div className="font-bold text-amber-900">Generated Doctor Question Example:</div>
            <p className="text-slate-700 italic">
              "Could recent intense exercise or over-the-counter pain relievers have influenced my ALT enzyme result?"
            </p>
            <div className="pt-2 text-[11px] text-slate-500">
              Rationale: Hepatic cellular integrity and skeletal muscle enzyme release.
            </div>
          </div>
        </div>

        {/* Feature 8: Clean Print & PDF Export */}
        <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200/90 shadow-glass grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700">
              <Printer className="w-6 h-6" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded">08</span>
              <h3 className="text-xl sm:text-2xl font-black text-[#071426]">
                Clean Physical Print & Export Layout
              </h3>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              Designed with bespoke CSS print stylesheets (`@media print`). Unnecessary navigation bars, buttons, and animations are hidden, leaving an immaculate, easy-to-read summary page ready to bring directly to your physician's appointment.
            </p>
          </div>

          <div className="lg:col-span-5 p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center">
            <Printer className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <span className="font-bold text-slate-700 text-xs block">Print-Ready Doctor Consultation Sheet</span>
            <span className="text-[11px] text-slate-400 block mt-1">High contrast • Ink efficient • Clean margins</span>
          </div>
        </div>

        {/* Feature 9: Privacy & Zero Health Storage */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#071426] text-white shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-teal-950 border border-teal-500/40 flex items-center justify-center text-cyan-400">
              <Lock className="w-6 h-6" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-cyan-300 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">09</span>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                Guaranteed Client-Side Privacy
              </h3>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              Your medical reports contain deeply personal health indicators. Spark Decoded executes optical recognition, PDF text extraction, and deterministic classifications locally in your browser. No medical files or extracted parameters are stored on our servers.
            </p>
            <div className="flex items-center gap-2 text-xs text-teal-300 font-bold">
              <span>✓ Zero Server-Side Patient Health Storage</span>
              <span>•</span>
              <span>✓ Pure In-Memory Session</span>
            </div>
          </div>

          <div className="lg:col-span-5 p-6 rounded-2xl bg-slate-900 border border-cyan-500/30 text-xs text-slate-300 space-y-2">
            <div className="font-bold text-cyan-300">Privacy Architecture:</div>
            <p>1. Document bytes stay in browser memory.</p>
            <p>2. OCR and PDF parsing run via WebAssembly & Web Workers.</p>
            <p>3. Closing the tab immediately destroys in-memory state.</p>
          </div>
        </div>

      </section>

      {/* Bottom CTA */}
      <section className="max-w-4xl mx-auto px-4 mt-20 text-center">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-teal-50 to-[#EAF7FF] border border-teal-200/90 shadow-glass">
          <h2 className="text-2xl sm:text-3xl font-black text-[#071426] tracking-tight">
            Ready to decode your laboratory report?
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 max-w-lg mx-auto">
            Try with your own scanned document or explore our illustrative sample report with one click.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={onStartUpload}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#0D9488] to-[#06B6D4] text-white text-xs font-extrabold shadow-md hover:shadow-cyan-600/30 transition-all cursor-pointer"
            >
              Decode My Report
            </button>
            <button
              onClick={onExploreDemo}
              className="px-6 py-3 rounded-xl bg-white hover:bg-slate-50 text-slate-800 text-xs font-bold border border-slate-300 shadow-2xs transition-all cursor-pointer"
            >
              Try Sample Report
            </button>
          </div>
        </div>
      </section>

    </IllustratedPageBackground>
  );
};
