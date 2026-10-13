import React, { useState } from 'react';
import { X, ShieldCheck, Sparkles, Check, Trash2, KeyRound } from 'lucide-react';
import { getAiConfig, saveAiKey, clearAiKey } from '../utils/geminiAi';
import { SparkLogo } from './SparkLogo';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSettingsChanged: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  onSettingsChanged
}) => {
  const currentConfig = getAiConfig();
  const [apiKeyInput, setApiKeyInput] = useState(currentConfig.apiKey);
  const [saveSuccess, setSaveSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    saveAiKey(apiKeyInput);
    setSaveSuccess(true);
    onSettingsChanged();
    setTimeout(() => {
      setSaveSuccess(false);
      onClose();
    }, 800);
  };

  const handleRemove = () => {
    clearAiKey();
    setApiKeyInput('');
    onSettingsChanged();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200/90 relative animate-in zoom-in-95 duration-150">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3.5 mb-5">
          <SparkLogo size="sm" withGlow={false} />
          <div>
            <h3 className="font-black text-[#0B192C] text-lg sm:text-xl">
              Settings & Privacy
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Spark Decoded Client-Side Architecture
            </p>
          </div>
        </div>

        {/* Client-Side Privacy Note */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-1.5 mb-5">
          <div className="flex items-center gap-1.5 font-bold text-[#0B192C]">
            <ShieldCheck className="w-4 h-4 text-teal-600" />
            <span>Zero Remote Storage Architecture</span>
          </div>
          <p className="text-slate-600 leading-relaxed font-normal">
            All document OCR (Tesseract.js), PDF parsing (PDF.js), reference comparisons, and glossary lookups execute locally in your web browser. No files or health parameters are uploaded to any server.
          </p>
        </div>

        {/* Optional Gemini API Key Form */}
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Optional Google Gemini API Key</span>
              </label>
              {currentConfig.enabled && (
                <span className="text-[10px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md border border-teal-200">
                  Active
                </span>
              )}
            </div>

            <p className="text-xs text-slate-500 mb-2 leading-relaxed">
              If provided, enables interactive educational queries. The core app remains 100% functional without an API key using its built-in medical glossary and deterministic rules.
            </p>

            <input
              type="password"
              value={apiKeyInput}
              onChange={(e) => setApiKeyInput(e.target.value)}
              placeholder="AIzaSy..."
              className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 font-mono text-slate-900 bg-white"
            />
            <p className="text-[11px] text-slate-400 mt-1">
              Stored only in browser session memory (<code>sessionStorage</code>). Never sent to our servers.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200/80 text-amber-950 text-[11px] leading-relaxed">
            <strong>Safety Constraint:</strong> Even when an AI key is supplied, prompt instructions strictly prohibit diagnosing conditions or recommending medications.
          </div>

          <div className="flex items-center justify-between pt-2">
            {currentConfig.enabled ? (
              <button
                type="button"
                onClick={handleRemove}
                className="text-xs text-rose-600 hover:text-rose-800 font-bold inline-flex items-center gap-1 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Remove Key</span>
              </button>
            ) : <div />}

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-bold bg-gradient-to-r from-[#0D9488] to-[#06B6D4] text-white rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer hover:shadow-sm"
              >
                {saveSuccess ? <Check className="w-4 h-4" /> : null}
                <span>{saveSuccess ? 'Saved!' : 'Save Settings'}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
