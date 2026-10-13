import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  UploadCloud, 
  FileSearch, 
  CheckCircle2, 
  Calculator, 
  BookOpen, 
  MessageSquareHeart, 
  ArrowRight, 
  Sparkles, 
  Zap, 
  ShieldCheck, 
  Activity, 
  Info,
  Check,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  HelpCircle,
  FileSpreadsheet
} from 'lucide-react';
import { IllustratedPageBackground } from '../components/illustrations/IllustratedPageBackground';
import { DoctorReviewingReport } from '../components/illustrations/DoctorReviewingReport';
import { DoctorPatientDiscussion } from '../components/illustrations/DoctorPatientDiscussion';

interface HowItWorksPageProps {
  onStartUpload: () => void;
  onExploreDemo: () => void;
}

interface DemoItem {
  id: string;
  name: string;
  category: string;
  value: string;
  unit: string;
  referenceRange: string;
  status: 'WITHIN_RANGE' | 'ABOVE_RANGE' | 'BELOW_RANGE';
  statusLabel: string;
  ruleExplanation: string;
  whatItMeasures: string;
  whyOrdered: string;
  doctorQuestion: string;
}

const SAMPLE_DEMO_ITEMS: DemoItem[] = [
  {
    id: 'hba1c',
    name: 'HbA1c (Glycated Hemoglobin)',
    category: 'Metabolic & Diabetes',
    value: '6.2',
    unit: '%',
    referenceRange: '< 5.7 %',
    status: 'ABOVE_RANGE',
    statusLabel: 'Above Lab Range',
    ruleExplanation: 'Mathematical Rule: Reported 6.2% exceeds the upper one-sided bound (< 5.7%).',
    whatItMeasures: 'Percentage of hemoglobin molecules carrying glucose, reflecting your average blood sugar concentration over the past 2 to 3 months.',
    whyOrdered: 'Evaluates long-term glycemic regulation and metabolic stability over months rather than immediate daily spikes.',
    doctorQuestion: 'How does my 3-month average compare with daily fingerstick checks, and could recent red blood cell turnover have influenced it?'
  },
  {
    id: 'glucose',
    name: 'Fasting Blood Glucose',
    category: 'Metabolic & Diabetes',
    value: '92',
    unit: 'mg/dL',
    referenceRange: '70 - 99 mg/dL',
    status: 'WITHIN_RANGE',
    statusLabel: 'Within Lab Range',
    ruleExplanation: 'Mathematical Rule: 92 mg/dL is greater than 70 and less than 99, inside the laboratory interval.',
    whatItMeasures: 'Free circulating glucose in blood plasma after an 8–12 hour fast, reflecting basal insulin control.',
    whyOrdered: 'Standard metabolic checkup marker to monitor immediate glucose levels.',
    doctorQuestion: 'Was my 10-hour fasting window optimal for this test, and how does this align with my HbA1c?'
  },
  {
    id: 'alt',
    name: 'ALT / SGPT (Alanine Aminotransferase)',
    category: 'Liver Function',
    value: '28',
    unit: 'U/L',
    referenceRange: '7 - 56 U/L',
    status: 'WITHIN_RANGE',
    statusLabel: 'Within Lab Range',
    ruleExplanation: 'Mathematical Rule: 28 U/L is strictly between the laboratory lower bound (7) and upper bound (56).',
    whatItMeasures: 'An enzyme concentrated primarily inside liver cells that assists in cellular protein and energy processing.',
    whyOrdered: 'Assesses hepatic cellular integrity. When liver cells experience strain or stress, enzymes can leak into the blood.',
    doctorQuestion: 'Could recent exercise or over-the-counter pain medications influence this enzyme level?'
  },
  {
    id: 'creatinine',
    name: 'Serum Creatinine',
    category: 'Kidney Function',
    value: '1.4',
    unit: 'mg/dL',
    referenceRange: '0.7 - 1.3 mg/dL',
    status: 'ABOVE_RANGE',
    statusLabel: 'Above Lab Range',
    ruleExplanation: 'Mathematical Rule: 1.4 mg/dL exceeds the laboratory stated upper reference bound (1.3 mg/dL).',
    whatItMeasures: 'Natural muscle breakdown waste product filtered by kidney glomeruli and eliminated in urine.',
    whyOrdered: 'Used to calculate estimated Glomerular Filtration Rate (eGFR) and evaluate baseline kidney filtration.',
    doctorQuestion: 'Could dehydration or high-protein meals before the test have elevated my creatinine?'
  },
  {
    id: 'hemoglobin',
    name: 'Hemoglobin (Hb)',
    category: 'Complete Blood Count',
    value: '11.8',
    unit: 'g/dL',
    referenceRange: '13.8 - 17.2 g/dL',
    status: 'BELOW_RANGE',
    statusLabel: 'Below Lab Range',
    ruleExplanation: 'Mathematical Rule: 11.8 g/dL is lower than the laboratory lower reference boundary (13.8 g/dL).',
    whatItMeasures: 'The iron-rich protein in red blood cells that transports oxygen from your lungs to tissues across your body.',
    whyOrdered: 'Evaluates oxygen-carrying capacity, investigates fatigue, and screens for anemia.',
    doctorQuestion: 'Do you recommend checking my serum ferritin, iron saturation, or vitamin B12 levels?'
  }
];

export const HowItWorksPage: React.FC<HowItWorksPageProps> = ({
  onStartUpload,
  onExploreDemo
}) => {
  const [selectedDemoItem, setSelectedDemoItem] = useState<DemoItem>(SAMPLE_DEMO_ITEMS[0]);

  return (
    <IllustratedPageBackground className="min-h-screen pb-20">
      
      {/* Page Header */}
      <section className="pt-12 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E5F3ED] border border-[#A8C8BA] text-[#124E4A] text-xs font-bold mb-4 shadow-2xs">
          <Activity className="w-3.5 h-3.5 text-[#287F78]" />
          <span>SYSTEM ARCHITECTURE & METHODOLOGY</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-[#124E4A] tracking-tight leading-tight max-w-3xl mx-auto">
          How Spark Decoded Turns{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#124E4A] to-[#287F78]">
            Numbers into Knowledge
          </span>
        </h1>

        <p className="mt-4 text-base sm:text-lg text-[#667773] max-w-2xl mx-auto leading-relaxed">
          From the moment you select your laboratory printout to your doctor's appointment, each step is engineered for transparency, mathematical precision, and patient safety.
        </p>
      </section>

      {/* The 6-Step Workflow Deep-Dive */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Step 1 */}
          <div className="p-7 rounded-3xl bg-white border border-slate-200 shadow-glass flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-bold text-teal-800 bg-teal-50 px-2.5 py-1 rounded-md border border-teal-200">
                  Step 01
                </span>
                <UploadCloud className="w-5 h-5 text-teal-600" />
              </div>
              <h3 className="text-lg font-black text-[#071426] mb-2">1. Upload Report</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Select your laboratory report as an image (JPG, PNG) or digital PDF. Spark Decoded handles the file purely in your web browser. File bytes are never stored on any server.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-slate-100 text-[11px] font-bold text-teal-700">
              ✓ In-Memory Client FileReader
            </div>
          </div>

          {/* Step 2 */}
          <div className="p-7 rounded-3xl bg-white border border-slate-200 shadow-glass flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-bold text-cyan-800 bg-cyan-50 px-2.5 py-1 rounded-md border border-cyan-200">
                  Step 02
                </span>
                <FileSearch className="w-5 h-5 text-cyan-600" />
              </div>
              <h3 className="text-lg font-black text-[#071426] mb-2">2. Extract Parameters</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Using Tesseract.js OCR and Mozilla PDF.js, the system locates tabular rows to identify parameter names, values, units, and printed reference intervals.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-slate-100 text-[11px] font-bold text-cyan-700">
              ✓ On-Device Optical Recognition
            </div>
          </div>

          {/* Step 3 */}
          <div className="p-7 rounded-3xl bg-white border border-slate-200 shadow-glass flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
                  Step 03
                </span>
                <CheckCircle2 className="w-5 h-5 text-amber-600" />
              </div>
              <h3 className="text-lg font-black text-[#071426] mb-2">3. Verify Values</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Because smudges or faded print can obscure decimal places, the patient reviews extracted rows on a clear confirmation screen before analysis proceeds.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-slate-100 text-[11px] font-bold text-amber-700">
              ✓ Patient-in-the-Loop Safeguard
            </div>
          </div>

          {/* Step 4 */}
          <div className="p-7 rounded-3xl bg-white border border-slate-200 shadow-glass flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-bold text-blue-800 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200">
                  Step 04
                </span>
                <Calculator className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="text-lg font-black text-[#071426] mb-2">4. Mathematical Compare</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                The deterministic classification engine arithmetically compares verified values with the laboratory's supplied reference range. No generative AI guesses your range.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-slate-100 text-[11px] font-bold text-blue-700">
              ✓ Deterministic Non-Diagnostic Rules
            </div>
          </div>

          {/* Step 5 */}
          <div className="p-7 rounded-3xl bg-white border border-slate-200 shadow-glass flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                  Step 05
                </span>
                <BookOpen className="w-5 h-5 text-emerald-600" />
              </div>
              <h3 className="text-lg font-black text-[#071426] mb-2">5. Understand Context</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Explore what each test measures and why clinicians order it using our curated, source-backed medical knowledge catalog powered by our native SQLite database.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-slate-100 text-[11px] font-bold text-emerald-700">
              ✓ Accredited Medical References
            </div>
          </div>

          {/* Step 6 */}
          <div className="p-7 rounded-3xl bg-white border border-slate-200 shadow-glass flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-bold text-rose-800 bg-rose-50 px-2.5 py-1 rounded-md border border-rose-200">
                  Step 06
                </span>
                <MessageSquareHeart className="w-5 h-5 text-rose-600" />
              </div>
              <h3 className="text-lg font-black text-[#071426] mb-2">6. Prepare for Doctor</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Review tailored questions to ask your physician regarding fasting, re-testing, and lifestyle, along with your private notes scratchpad in an ink-friendly print sheet.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-slate-100 text-[11px] font-bold text-rose-700">
              ✓ Structured Doctor Guide
            </div>
          </div>

        </div>
      </section>

      {/* Interactive Demonstration Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="p-8 sm:p-12 rounded-3xl bg-white/95 border border-slate-200/90 shadow-glass backdrop-blur-md">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-slate-200 mb-8">
            <div>
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-teal-800 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
                Interactive Demonstration
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#071426] tracking-tight mt-2">
                Click a Parameter to Inspect the Logic Pipeline
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Clearly labeled illustrative sample data showing how numbers are verified, evaluated, and explained.
              </p>
            </div>

            <button
              onClick={onExploreDemo}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#0D9488] to-[#06B6D4] text-white font-bold text-xs shadow-md hover:shadow-cyan-600/30 transition-all flex items-center gap-2 cursor-pointer self-start lg:self-auto"
            >
              <span>Load Full Report in Workspace</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Interactive List of Sample Parameters */}
            <div className="lg:col-span-5 space-y-3">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                Sample Report Parameters:
              </span>

              {SAMPLE_DEMO_ITEMS.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedDemoItem(item)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                    selectedDemoItem.id === item.id
                      ? 'bg-gradient-to-r from-teal-50 to-cyan-50 border-teal-400 shadow-sm ring-2 ring-teal-500/20'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div>
                    <span className="text-xs font-bold text-[#071426] block">
                      {item.name}
                    </span>
                    <span className="text-[11px] text-slate-500 block mt-0.5">
                      Reported: <strong>{item.value} {item.unit}</strong> • Ref: {item.referenceRange}
                    </span>
                  </div>

                  <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full shrink-0 ${
                    item.status === 'WITHIN_RANGE'
                      ? 'bg-emerald-100 text-emerald-800'
                      : item.status === 'ABOVE_RANGE'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {item.statusLabel}
                  </span>
                </div>
              ))}
            </div>

            {/* Right: Inspection Drawer of Selected Parameter */}
            <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-slate-50/80 border border-slate-200/90 space-y-6">
              
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-200">
                <div>
                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-slate-200 text-slate-700">
                    {selectedDemoItem.category}
                  </span>
                  <h3 className="text-xl font-black text-[#071426] mt-1">
                    {selectedDemoItem.name}
                  </h3>
                </div>

                <div className="text-right">
                  <span className="text-2xl font-black text-[#071426] block">
                    {selectedDemoItem.value} <span className="text-sm font-normal text-slate-500">{selectedDemoItem.unit}</span>
                  </span>
                  <span className="text-[11px] text-slate-500 block">
                    Printed Ref: <strong>{selectedDemoItem.referenceRange}</strong>
                  </span>
                </div>
              </div>

              {/* Classification Rule */}
              <div className="p-3.5 rounded-2xl bg-white border border-slate-200 text-xs">
                <span className="font-bold text-teal-800 block mb-1">
                  Deterministic Rule Applied:
                </span>
                <p className="text-slate-700 leading-relaxed font-mono text-[11px]">
                  {selectedDemoItem.ruleExplanation}
                </p>
              </div>

              {/* What It Measures */}
              <div>
                <span className="text-xs font-bold text-[#071426] block mb-1">
                  What This Test Measures:
                </span>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {selectedDemoItem.whatItMeasures}
                </p>
              </div>

              {/* Why Healthcare Teams Order It */}
              <div>
                <span className="text-xs font-bold text-[#071426] block mb-1">
                  Why Healthcare Teams Order It:
                </span>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {selectedDemoItem.whyOrdered}
                </p>
              </div>

              {/* Prepared Question */}
              <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-xs">
                <span className="font-bold text-amber-950 block mb-1">
                  Suggested Doctor Discussion Question:
                </span>
                <p className="text-slate-800 italic leading-relaxed">
                  "{selectedDemoItem.doctorQuestion}"
                </p>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Deep-Dive: Why Reference Ranges Differ Across Laboratories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="p-8 sm:p-12 rounded-3xl bg-[#071426] text-white shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider bg-cyan-950 px-3 py-1 rounded-full border border-cyan-800">
              Laboratory Science
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Why Reference Ranges Vary Between Different Diagnostic Labs
            </h2>
            <div className="space-y-3 text-sm text-slate-300 leading-relaxed">
              <p>
                Patients often wonder why a normal glucose upper bound is 99 mg/dL at one clinic, while an ALT enzyme threshold is 45 U/L at one hospital and 56 U/L at another. Reference intervals are not universal biological constants; they depend on:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-300">
                <li><strong>Assay Equipment & Reagents:</strong> Automated analyzers from Roche, Abbott, or Siemens use slightly different enzymatic wavelengths.</li>
                <li><strong>Reference Cohort Demographics:</strong> Laboratories validate intervals across their regional healthy population (central 95%).</li>
                <li><strong>Units of Measurement:</strong> US and Indian labs predominantly use mg/dL, while European and Australian labs often report in mmol/L.</li>
              </ul>
              <p className="pt-2 text-xs text-cyan-200">
                That is why Spark Decoded matches values strictly against the reference interval printed on your individual physical report, rather than forcing a generic internet number.
              </p>
            </div>
          </div>

          <div className="lg:col-span-4 flex justify-center">
            <DoctorPatientDiscussion size="sm" />
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="max-w-3xl mx-auto px-4 text-center">
        <h3 className="text-xl sm:text-2xl font-black text-[#071426]">
          Ready to experience your report decoded?
        </h3>
        <p className="text-xs text-slate-600 mt-1 mb-6">
          Upload your scan or PDF in seconds. Everything runs client-side.
        </p>
        <button
          onClick={onStartUpload}
          className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-[#0D9488] to-[#06B6D4] text-white text-xs font-extrabold shadow-lg shadow-teal-900/20 hover:shadow-cyan-600/30 transition-all cursor-pointer"
        >
          Decode My Report Now
        </button>
      </section>

    </IllustratedPageBackground>
  );
};
