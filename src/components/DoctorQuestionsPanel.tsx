import React, { useState } from 'react';
import { 
  MessageSquareHeart, 
  Copy, 
  Check, 
  Printer, 
  Sparkles, 
  CheckSquare, 
  Square,
  Send,
  Loader2,
  ShieldCheck,
  Zap,
  HelpCircle,
  PenLine,
  RotateCcw
} from 'lucide-react';
import { DoctorQuestion } from '../utils/doctorQuestions';
import { askAiEducationalQuestion, getAiConfig } from '../utils/geminiAi';
import { ProcessedParameter } from '../types/report';

interface DoctorQuestionsPanelProps {
  questions: DoctorQuestion[];
  parameters: ProcessedParameter[];
}

export const DoctorQuestionsPanel: React.FC<DoctorQuestionsPanelProps> = ({
  questions,
  parameters
}) => {
  const [copied, setCopied] = useState(false);
  const [checkedIds, setCheckedIds] = useState<Set<string>>(new Set());
  const [patientNotes, setPatientNotes] = useState<string>(() => {
    try {
      return sessionStorage.getItem('spark_patient_notes') || '';
    } catch {
      return '';
    }
  });

  // Optional AI interaction state
  const aiConfig = getAiConfig();
  const [selectedParam, setSelectedParam] = useState<string>(parameters[0]?.name || '');
  const [customPrompt, setCustomPrompt] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [aiError, setAiError] = useState<string | null>(null);

  const toggleCheck = (id: string) => {
    setCheckedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleNotesChange = (val: string) => {
    setPatientNotes(val);
    try {
      sessionStorage.setItem('spark_patient_notes', val);
    } catch {}
  };

  const handleCopy = () => {
    const textToCopy = questions
      .map((q, idx) => `${idx + 1}. [${q.category}] ${q.question}\n   Context: ${q.rationale}`)
      .join('\n\n');

    const notesBlock = patientNotes.trim()
      ? `\n\n--- My Private Consultation Notes ---\n${patientNotes.trim()}\n`
      : '';

    navigator.clipboard.writeText(
      `Questions to Discuss With My Doctor — Prepared via Spark Decoded\n\n${textToCopy}${notesBlock}\n*Note: Educational communication aid only. Does not provide medical diagnoses or treatment recommendations.`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleAskAi = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiConfig.apiKey || !customPrompt.trim()) return;

    setAiLoading(true);
    setAiError(null);
    setAiResponse(null);

    try {
      const result = await askAiEducationalQuestion(
        selectedParam || 'General Laboratory Panel',
        customPrompt.trim(),
        aiConfig.apiKey
      );
      setAiResponse(result);
    } catch (err: any) {
      setAiError(err.message || 'Could not reach AI educational service.');
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="bg-white/90 backdrop-blur-md rounded-3xl border border-slate-200/90 shadow-glass p-6 sm:p-9 mt-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-teal-50 to-cyan-50 border border-teal-200/80 text-teal-700 flex items-center justify-center">
              <MessageSquareHeart className="w-4 h-4" />
            </div>
            <h3 className="font-black text-[#0B192C] text-xl sm:text-2xl tracking-tight">
              Questions to discuss with your doctor
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Structured questions to support a productive, personalized conversation during your clinic visit.
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={handleCopy}
            className="px-4 py-2 rounded-xl border border-slate-200/90 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition-all shadow-2xs hover:border-slate-300 cursor-pointer"
            title="Copy checklist to clipboard"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-teal-600" />
                <span className="text-teal-700">Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-500" />
                <span>Copy Checklist</span>
              </>
            )}
          </button>

          <button
            onClick={handlePrint}
            className="px-4 py-2 rounded-xl border border-slate-200/90 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition-all shadow-2xs hover:border-slate-300 cursor-pointer"
            title="Print doctor discussion guide"
          >
            <Printer className="w-3.5 h-3.5 text-slate-500" />
            <span>Print Guide</span>
          </button>
        </div>
      </div>

      {/* Safety Guardrail reminder */}
      <div className="my-5 p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 text-amber-950 text-xs flex items-center gap-2.5">
        <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0" />
        <p className="leading-relaxed">
          <strong>Doctor Discussion Note:</strong> These questions are intended to support a conversation with your healthcare professional. They do not provide a diagnosis or treatment recommendation.
        </p>
      </div>

      {/* Questions Checklist Cards */}
      <div className="space-y-3.5 my-6">
        {questions.map((q) => {
          const isChecked = checkedIds.has(q.id);
          return (
            <div
              key={q.id}
              onClick={() => toggleCheck(q.id)}
              className={`p-4.5 rounded-2xl border transition-all cursor-pointer select-none flex items-start gap-4 ${
                isChecked
                  ? 'bg-slate-50/70 border-slate-200 opacity-60'
                  : 'bg-white border-slate-200/80 hover:border-cyan-300 hover:shadow-2xs'
              }`}
            >
              <div className="pt-0.5 text-teal-600 shrink-0">
                {isChecked ? (
                  <CheckSquare className="w-5 h-5 text-teal-600" />
                ) : (
                  <Square className="w-5 h-5 text-slate-300 hover:text-teal-600 transition-colors" />
                )}
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200">
                    {q.category}
                  </span>
                  {q.relevantParameters && q.relevantParameters.length > 0 && (
                    <span className="text-[10px] text-teal-800 font-semibold bg-teal-50 px-2 py-0.5 rounded-md border border-teal-200/60">
                      Related: {q.relevantParameters.slice(0, 2).join(', ')}
                    </span>
                  )}
                </div>

                <p
                  className={`text-sm font-bold ${
                    isChecked ? 'text-slate-500 line-through' : 'text-[#0B192C]'
                  }`}
                >
                  {q.question}
                </p>

                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  {q.rationale}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Patient Personal Consultation Notes & Symptoms Scratchpad */}
      <div className="my-6 p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-slate-50 to-teal-50/30 border border-slate-200/90 shadow-2xs">
        <div className="flex items-center justify-between gap-3 mb-2.5 flex-wrap">
          <div className="flex items-center gap-2">
            <PenLine className="w-4 h-4 text-teal-700" />
            <h4 className="font-extrabold text-[#0B192C] text-sm sm:text-base">
              My Personal Consultation Notes & Symptoms
            </h4>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-slate-500 font-medium">
              Private • Auto-saved to session • Included in print/copy
            </span>
            {patientNotes && (
              <button
                type="button"
                onClick={() => handleNotesChange('')}
                className="text-[11px] text-slate-400 hover:text-rose-600 font-bold flex items-center gap-1 cursor-pointer no-print ml-2"
                title="Clear notes"
              >
                <RotateCcw className="w-3 h-3" /> Clear
              </button>
            )}
          </div>
        </div>

        <p className="text-xs text-slate-600 mb-3 leading-relaxed">
          Jot down any personal symptoms, daily habits, over-the-counter supplements, or questions you wish to mention when speaking with your physician.
        </p>

        <textarea
          rows={3}
          value={patientNotes}
          onChange={(e) => handleNotesChange(e.target.value)}
          placeholder="e.g. Felt dizzy during morning workouts. Taking multivitamin daily. Ask doctor if I need to fast before repeating this lipid panel..."
          className="w-full p-3.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white text-slate-800 leading-relaxed font-normal shadow-inner placeholder:text-slate-400"
        />
      </div>

      {/* Optional AI Assistant Exploration Section */}
      <div className="mt-8 pt-6 border-t border-slate-100 no-print">
        <div className="flex items-center justify-between gap-3 mb-3.5 flex-wrap">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-cyan-500 fill-cyan-400" />
            <h4 className="font-extrabold text-[#0B192C] text-sm sm:text-base">
              Explore Test Concepts With Educational AI
            </h4>
          </div>
          <span className="text-[11px] text-slate-500 font-medium">
            {aiConfig.enabled ? 'Gemini 1.5 Flash Connected' : 'Curated Medical Glossary Active (No API Key Required)'}
          </span>
        </div>

        {aiConfig.enabled ? (
          <form onSubmit={handleAskAi} className="space-y-3">
            <div className="flex flex-col sm:flex-row gap-2.5">
              <select
                value={selectedParam}
                onChange={(e) => setSelectedParam(e.target.value)}
                className="px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 bg-white font-bold text-slate-800 cursor-pointer"
              >
                {parameters.map((p) => (
                  <option key={p.id} value={p.name}>
                    {p.name}
                  </option>
                ))}
              </select>

              <input
                type="text"
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                placeholder="Ask how this test is evaluated or what daily factors influence it..."
                className="flex-1 px-4 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
              />

              <button
                type="submit"
                disabled={aiLoading || !customPrompt.trim()}
                className="px-5 py-2.5 bg-gradient-to-r from-[#0D9488] to-[#06B6D4] hover:from-[#0F766E] hover:to-[#0891B2] disabled:bg-slate-300 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-2xs cursor-pointer"
              >
                {aiLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                <span>Ask AI</span>
              </button>
            </div>

            {aiError && (
              <p className="text-xs text-rose-700 bg-rose-50 p-3 rounded-xl border border-rose-200 font-medium">
                {aiError}
              </p>
            )}

            {aiResponse && (
              <div className="p-4.5 rounded-2xl bg-teal-50/80 border border-teal-200 text-xs text-slate-700 leading-relaxed space-y-2 shadow-2xs animate-in fade-in">
                <div className="flex items-center gap-1.5 font-bold text-teal-900">
                  <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                  <span>Educational Clarification for {selectedParam}:</span>
                </div>
                <div className="whitespace-pre-line text-slate-800 font-normal">{aiResponse}</div>
              </div>
            )}
          </form>
        ) : (
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-center justify-between gap-4">
            <span>
              Spark Decoded is currently operating in <strong>zero-dependency offline mode</strong> using its verified medical glossary. If you wish to enable dynamic inquiries, configure an optional Google Gemini API key in AI Settings.
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
