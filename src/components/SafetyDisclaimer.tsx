import React, { useState } from 'react';
import { AlertTriangle, ChevronDown, ChevronUp, ShieldCheck } from 'lucide-react';

export const SafetyDisclaimer: React.FC = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-amber-50/70 border-b border-amber-200/70 text-amber-950 text-xs py-2 px-4 backdrop-blur-xs">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
          <p className="font-medium text-slate-800">
            <span className="font-bold text-amber-900">Healthcare Safety Notice:</span>{' '}
            <strong className="text-slate-900">Spark Decoded</strong> is an educational tool, not a diagnostic service. It does not diagnose diseases, prescribe medication, or replace professional medical advice.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-amber-900 hover:text-amber-950 font-semibold underline inline-flex items-center gap-0.5 cursor-pointer text-[11px]"
          >
            <span>{expanded ? 'Hide clinical notice' : 'Clinical safety details'}</span>
            {expanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>
        </div>
      </div>

      {expanded && (
        <div className="max-w-7xl mx-auto mt-2.5 pt-2.5 border-t border-amber-200/80 text-slate-700 leading-relaxed space-y-1.5 pl-6 animate-in fade-in duration-200">
          <p>
            • <strong>No Medical Diagnosis or Treatment:</strong> This application explains general physiological parameters and compares results with the laboratory's printed reference range. A value outside reference boundaries is not a confirmed disease, nor does an in-range value guarantee absolute health.
          </p>
          <p>
            • <strong>Laboratory Reference Boundaries:</strong> Reference ranges are defined by individual testing laboratories based on instruments, reagents, and regional demographics. Always verify against your physical printed report.
          </p>
          <p>
            • <strong>Consult Your Physician:</strong> All laboratory numbers must be evaluated in clinical context by a licensed physician alongside your full medical history and physical examination.
          </p>
          <p>
            • <strong>Urgent Care:</strong> If you are experiencing acute chest pain, shortness of breath, sudden weakness, or emergency symptoms, seek immediate clinical care. Never delay urgent medical attention based on educational software.
          </p>
        </div>
      )}
    </div>
  );
};
