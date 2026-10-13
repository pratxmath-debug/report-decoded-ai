import React, { useState, useRef } from 'react';
import { 
  FileText, 
  X, 
  AlertCircle, 
  Sparkles, 
  Loader2, 
  FileSpreadsheet,
  ArrowRight,
  Zap,
  FolderOpen
} from 'lucide-react';
import { SAMPLE_REPORTS, SampleReportOption } from '../data/sampleReports';
import { ExtractionProgress } from '../utils/extractor';
import { SparkLogo } from './SparkLogo';

interface ReportUploadProps {
  onFileSelect: (file: File) => void;
  onSelectSample: (sample: SampleReportOption) => void;
  onManualEntry: () => void;
  isProcessing: boolean;
  progress: ExtractionProgress | null;
  error: string | null;
  onClearError: () => void;
}

const MAX_FILE_SIZE_MB = 20;
const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];

export const ReportUpload: React.FC<ReportUploadProps> = ({
  onFileSelect,
  onSelectSample,
  onManualEntry,
  isProcessing,
  progress,
  error,
  onClearError
}) => {
  const [dragOver, setDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateAndHandleFile = (file: File) => {
    onClearError();

    // Check size
    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      alert(`File size exceeds ${MAX_FILE_SIZE_MB}MB limit. Please upload a smaller file.`);
      return;
    }

    if (file.size === 0) {
      alert('Selected file is empty (0 bytes). Please select a valid document.');
      return;
    }

    // Check type
    const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
    const isImage = file.type.startsWith('image/') || /\.(jpe?g|png)$/i.test(file.name);

    if (!isPdf && !isImage) {
      alert('Unsupported file type. Please upload a JPG, JPEG, PNG, or PDF file.');
      return;
    }

    setSelectedFile(file);

    // Create thumbnail if image
    if (isImage) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    } else {
      setPreviewUrl(null);
    }

    // Trigger extraction
    onFileSelect(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (isProcessing) return;

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      validateAndHandleFile(e.dataTransfer.files[0]);
    }
  };

  const handleCancelFile = () => {
    setSelectedFile(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onClearError();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200/90 text-teal-800 text-xs font-bold mb-3 shadow-2xs">
          <Zap className="w-3.5 h-3.5 text-cyan-500 fill-cyan-400" />
          <span>Intelligent Document Extraction</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-[#0B192C] tracking-tight mb-2">
          Upload Your Laboratory Report
        </h2>
        <p className="text-sm text-slate-600 max-w-xl mx-auto">
          Drag and drop your scan or PDF document. Optical character recognition and structure parsing run
          directly on your machine to extract test names, values, and reference ranges.
        </p>
      </div>

      {/* Error alert banner */}
      {error && (
        <div className="mb-6 p-4.5 rounded-2xl bg-rose-50/90 border border-rose-200 text-rose-900 flex items-start justify-between gap-3 text-sm shadow-sm animate-in fade-in">
          <div className="flex items-start gap-2.5">
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-rose-800">Extraction Issue</p>
              <p className="text-rose-700 mt-0.5 text-xs sm:text-sm">{error}</p>
              <div className="mt-2.5 flex gap-3">
                <button
                  onClick={onManualEntry}
                  className="font-bold text-rose-900 underline hover:text-rose-950 text-xs inline-flex items-center gap-1 cursor-pointer"
                >
                  Enter parameters manually instead →
                </button>
              </div>
            </div>
          </div>
          <button onClick={onClearError} className="text-rose-500 hover:text-rose-700 cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Main Upload Dropzone Panel */}
      <div className="bg-white/90 backdrop-blur-md rounded-3xl border border-slate-200/90 shadow-glass p-6 sm:p-9 mb-8 transition-all">
        {!selectedFile ? (
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`relative rounded-2xl p-8 sm:p-14 text-center cursor-pointer transition-all border-2 border-dashed ${
              dragOver
                ? 'border-cyan-500 bg-cyan-50/50 scale-[0.99] shadow-spark-glow'
                : 'border-slate-300 hover:border-teal-500 hover:bg-slate-50/50'
            }`}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  validateAndHandleFile(e.target.files[0]);
                }
              }}
              accept=".jpg,.jpeg,.png,.pdf"
              className="hidden"
            />

            {/* Custom 3D-Style Document and Spark Icon */}
            <div className="relative w-20 h-20 mx-auto mb-5 flex items-center justify-center">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-teal-500/20 to-cyan-400/30 blur-lg animate-pulse-subtle" />
              <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-50 via-white to-cyan-50 border border-teal-200/80 shadow-md flex items-center justify-center text-teal-700">
                <FileText className="w-8 h-8 text-teal-600 stroke-[1.75]" />
                <div className="absolute -top-2 -right-2 p-1.5 rounded-xl bg-gradient-to-tr from-teal-600 to-cyan-500 text-white shadow-sm">
                  <Zap className="w-3.5 h-3.5 fill-white" />
                </div>
              </div>
            </div>

            <h3 className="font-extrabold text-[#0B192C] text-xl mb-1.5">
              Drop your lab report here
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mb-5">
              Upload a PDF or image to get started
            </p>

            <button
              type="button"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#0D9488] to-[#06B6D4] text-white text-xs font-bold shadow-md shadow-teal-700/20 hover:shadow-cyan-600/25 transition-all inline-flex items-center gap-2 cursor-pointer mb-5"
            >
              <FolderOpen className="w-4 h-4" />
              <span>Choose File</span>
            </button>

            <div className="text-[11px] text-slate-400 font-medium space-y-1">
              <p>Supported formats: JPG, JPEG, PNG, or PDF • Max size: 20MB</p>
            </div>

            <div className="mt-5 inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100/90 text-slate-600 text-xs font-medium border border-slate-200/60">
              <FileSpreadsheet className="w-3.5 h-3.5 text-teal-600" />
              <span>Metabolic panels, complete blood counts, thyroid profiles, lipid panels</span>
            </div>
          </div>
        ) : (
          /* File Selected / Processing state */
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4.5 rounded-2xl bg-slate-50 border border-slate-200/90">
              <div className="flex items-center gap-3.5">
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="Uploaded preview"
                    className="w-16 h-16 object-cover rounded-xl border border-slate-300 shadow-2xs"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-red-50 to-orange-50 text-red-600 border border-red-200 flex items-center justify-center">
                    <FileText className="w-8 h-8" />
                  </div>
                )}
                <div>
                  <h4 className="font-bold text-[#0B192C] text-sm sm:text-base truncate max-w-xs sm:max-w-md">
                    {selectedFile.name}
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB • {selectedFile.type || 'Document'}
                  </p>
                </div>
              </div>

              {!isProcessing && (
                <button
                  onClick={handleCancelFile}
                  className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200/70 rounded-xl transition-colors cursor-pointer"
                  title="Remove file"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Spark-Themed Real Processing Indicator */}
            {isProcessing && (
              <div className="p-6 rounded-2xl bg-gradient-to-br from-teal-50/90 via-white to-cyan-50/90 border border-teal-200/90 space-y-3.5 shadow-2xs">
                <div className="flex items-center justify-between text-xs font-bold text-teal-950">
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded-lg bg-teal-600 text-white animate-spin">
                      <Zap className="w-3.5 h-3.5 fill-white" />
                    </div>
                    <span className="text-sm font-extrabold text-slate-900">
                      {progress?.message || 'Processing document characters...'}
                    </span>
                  </div>
                  <span className="text-sm font-black text-teal-800">{progress?.percent || 15}%</span>
                </div>

                {/* Progress bar */}
                <div className="w-full h-2.5 bg-teal-200/60 rounded-full overflow-hidden p-0.5">
                  <div
                    className="h-full bg-gradient-to-r from-[#0D9488] via-[#0891B2] to-[#22D3EE] rounded-full transition-all duration-300"
                    style={{ width: `${progress?.percent || 15}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-500">
                  <span>Executing client-side OCR and table parsing</span>
                  <span className="font-semibold text-teal-700">Please keep this tab open</span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Manual fallback link */}
        <div className="mt-5 pt-4.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>Scan difficult to read or smudged paper copy?</span>
          <button
            onClick={onManualEntry}
            className="text-teal-700 hover:text-teal-900 font-bold hover:underline inline-flex items-center gap-1 cursor-pointer"
          >
            <span>Type parameters directly</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Built-in Sample Reports Demo Option */}
      <div className="bg-white/80 backdrop-blur-md rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-glass">
        <div className="flex items-center gap-2.5 mb-2">
          <Sparkles className="w-5 h-5 text-amber-500" />
          <h3 className="font-extrabold text-[#0B192C] text-lg">
            Don't have a report handy? Explore Sample Report
          </h3>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 mb-6">
          Pre-loaded with illustrative test data demonstrating out-of-range, within-range, and incomplete reference ranges.
          <strong className="text-slate-800"> Clearly marked as fictional illustrative data.</strong>
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SAMPLE_REPORTS.map((sample) => (
            <div
              key={sample.id}
              onClick={() => onSelectSample(sample)}
              className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 hover:border-cyan-400 hover:shadow-glass-hover transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <h4 className="font-bold text-[#0B192C] text-sm group-hover:text-teal-700 transition-colors">
                    {sample.title}
                  </h4>
                  <span className="text-[10px] font-extrabold px-2 py-0.5 bg-amber-50 text-amber-800 border border-amber-200 rounded-md">
                    Demo
                  </span>
                </div>
                <p className="text-xs text-slate-600 mb-3.5 leading-relaxed">
                  {sample.description}
                </p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {sample.parameters.slice(0, 4).map((p) => (
                    <span
                      key={p.id}
                      className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-semibold"
                    >
                      {p.name.split('(')[0].trim()}
                    </span>
                  ))}
                  {sample.parameters.length > 4 && (
                    <span className="text-[10px] text-slate-500 py-0.5">
                      +{sample.parameters.length - 4} more
                    </span>
                  )}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-teal-700 group-hover:text-cyan-700">
                <span>Load Sample Report</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
