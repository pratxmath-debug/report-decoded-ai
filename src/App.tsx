import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { 
  AppStep, 
  ExtractedParameter, 
  ProcessedParameter, 
  UploadedDocument 
} from './types/report';
import { Navbar } from './components/Navbar';
import { SafetyDisclaimer } from './components/SafetyDisclaimer';
import { LandingHero } from './components/LandingHero';
import { ReportUpload } from './components/ReportUpload';
import { VerificationScreen } from './components/VerificationScreen';
import { ResultsDashboard } from './components/ResultsDashboard';
import { SettingsModal } from './components/SettingsModal';
import { ReportComparisonModal } from './components/ReportComparisonModal';
import { ParameterDetailModal } from './components/ParameterDetailModal';
import { Footer } from './components/Footer';
import { FeaturesPage } from './pages/FeaturesPage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { TestsExplorerPage } from './pages/TestsExplorerPage';
import { classifyParameter } from './utils/classifier';
import { findGlossaryEntry } from './data/glossary';
import { SAMPLE_REPORTS, SampleReportOption } from './data/sampleReports';
import { extractDocumentData, ExtractionProgress } from './utils/extractor';
import { getAiConfig } from './utils/geminiAi';

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const [currentStep, setCurrentStep] = useState<AppStep>('LANDING');
  const [extractedParameters, setExtractedParameters] = useState<ExtractedParameter[]>([]);
  const [processedParameters, setProcessedParameters] = useState<ProcessedParameter[]>([]);
  
  // Document state
  const [documentName, setDocumentName] = useState<string>('');
  const [isSampleMode, setIsSampleMode] = useState<boolean>(false);
  
  // Extraction state
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [extractionProgress, setExtractionProgress] = useState<ExtractionProgress | null>(null);
  const [extractionError, setExtractionError] = useState<string | null>(null);

  // Settings & AI state
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [aiEnabled, setAiEnabled] = useState<boolean>(false);

  // Spark Decoded Feature Modals state
  const [isComparisonOpen, setIsComparisonOpen] = useState<boolean>(false);
  const [selectedDetailParam, setSelectedDetailParam] = useState<ProcessedParameter | null>(null);

  useEffect(() => {
    const cfg = getAiConfig();
    setAiEnabled(cfg.enabled);
  }, []);

  const handleSettingsChanged = () => {
    const cfg = getAiConfig();
    setAiEnabled(cfg.enabled);
  };

  // Reset all state (guaranteeing privacy)
  const handleResetSession = () => {
    setCurrentStep('LANDING');
    setExtractedParameters([]);
    setProcessedParameters([]);
    setDocumentName('');
    setIsSampleMode(false);
    setIsProcessing(false);
    setExtractionProgress(null);
    setExtractionError(null);
    if (location.pathname !== '/') {
      navigate('/');
    }
  };

  // Start with empty upload screen
  const handleStartUpload = () => {
    setCurrentStep('UPLOAD');
    setExtractionError(null);
    if (location.pathname !== '/') {
      navigate('/');
    }
  };

  // Handle file chosen from file input or drag-drop
  const handleFileSelect = async (file: File) => {
    setIsProcessing(true);
    setExtractionError(null);
    setDocumentName(file.name);
    setIsSampleMode(false);

    try {
      const result = await extractDocumentData(file, (progress) => {
        setExtractionProgress(progress);
      });

      if (!result.parameters || result.parameters.length === 0) {
        // Fallback: If no structured parameters could be automatically parsed
        setExtractedParameters([
          {
            id: `manual-${Date.now()}`,
            name: '',
            value: '',
            unit: '',
            referenceRange: '',
            originalFlag: null,
            pageNumber: 1,
            sourceSnippet: result.rawText ? result.rawText.substring(0, 100) : 'Text unreadable',
            confidence: 0.5,
            needsVerification: true,
            verificationReasons: [
              'No standard laboratory tables were detected automatically. Please type your test parameters manually.'
            ]
          }
        ]);
        setExtractionError(
          'Automated table recognition could not confidently identify standard parameters. You can review and enter your parameters in the verification screen.'
        );
      } else {
        setExtractedParameters(result.parameters);
      }

      setCurrentStep('VERIFICATION');
    } catch (err: any) {
      console.error('Extraction error:', err);
      setExtractionError(
        err.message || 'An error occurred while running OCR on this document.'
      );
    } finally {
      setIsProcessing(false);
    }
  };

  // Handle loading sample report
  const handleSelectSample = (sample: SampleReportOption) => {
    setDocumentName(sample.title);
    setIsSampleMode(true);
    setExtractedParameters(sample.parameters);
    setExtractionError(null);
    setCurrentStep('VERIFICATION');
    if (location.pathname !== '/') {
      navigate('/');
    }
  };

  // Handle direct manual entry fallback
  const handleManualEntryFallback = () => {
    setDocumentName('Manual Patient Entry');
    setIsSampleMode(false);
    setExtractedParameters([
      {
        id: `param-manual-1`,
        name: 'HbA1c (Glycated Hemoglobin)',
        value: '',
        unit: '%',
        referenceRange: '< 5.7',
        originalFlag: null,
        pageNumber: 1,
        sourceSnippet: 'Manual Entry',
        confidence: 1.0,
        needsVerification: true,
        verificationReasons: ['Awaiting patient entry of value and reference range.']
      }
    ]);
    setExtractionError(null);
    setCurrentStep('VERIFICATION');
    if (location.pathname !== '/') {
      navigate('/');
    }
  };

  // Step 3 Confirmation -> Step 4 Classification & Dashboard
  const handleConfirmVerification = (verifiedParams: ExtractedParameter[]) => {
    // Run deterministic classifier on every parameter
    const processed: ProcessedParameter[] = verifiedParams.map((param) => {
      const classification = classifyParameter({
        value: param.value,
        referenceRange: param.referenceRange,
        unit: param.unit,
        testName: param.name
      });

      // Match against medical glossary
      const glossary = findGlossaryEntry(param.name) || undefined;

      // If classified as NEEDS_VERIFICATION, mark the parameter
      const needsVerification =
        param.needsVerification || classification.status === 'NEEDS_VERIFICATION';

      return {
        ...param,
        classification,
        glossary,
        needsVerification
      };
    });

    setProcessedParameters(processed);
    setCurrentStep('RESULTS');
    if (location.pathname !== '/') {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      {/* Top Navigation */}
      <Navbar
        onReset={handleResetSession}
        onOpenSettings={() => setIsSettingsOpen(true)}
        hasActiveReport={currentStep !== 'LANDING'}
        isAiEnabled={aiEnabled}
        onStartUpload={handleStartUpload}
        onOpenComparison={() => setIsComparisonOpen(true)}
      />

      {/* Safety Notice Banner */}
      <SafetyDisclaimer />

      {/* Main Content Area */}
      <main className="flex-1">
        <Routes>
          <Route 
            path="/" 
            element={
              <>
                {currentStep === 'LANDING' && (
                  <LandingHero
                    onStartUpload={handleStartUpload}
                    onTrySample={() => handleSelectSample(SAMPLE_REPORTS[0])}
                  />
                )}

                {currentStep === 'UPLOAD' && (
                  <ReportUpload
                    onFileSelect={handleFileSelect}
                    onSelectSample={handleSelectSample}
                    onManualEntry={handleManualEntryFallback}
                    isProcessing={isProcessing}
                    progress={extractionProgress}
                    error={extractionError}
                    onClearError={() => setExtractionError(null)}
                  />
                )}

                {currentStep === 'VERIFICATION' && (
                  <VerificationScreen
                    parameters={extractedParameters}
                    sourceDocumentName={documentName}
                    isSampleMode={isSampleMode}
                    onConfirm={handleConfirmVerification}
                    onBack={() => setCurrentStep('UPLOAD')}
                  />
                )}

                {currentStep === 'RESULTS' && (
                  <ResultsDashboard
                    parameters={processedParameters}
                    documentName={documentName}
                    isSampleMode={isSampleMode}
                    onEditParameters={() => setCurrentStep('VERIFICATION')}
                    onReset={handleResetSession}
                    onOpenComparison={() => setIsComparisonOpen(true)}
                    onSelectDetail={(param) => setSelectedDetailParam(param)}
                  />
                )}
              </>
            } 
          />

          <Route 
            path="/how-it-works" 
            element={
              <HowItWorksPage 
                onStartUpload={handleStartUpload} 
                onExploreDemo={() => handleSelectSample(SAMPLE_REPORTS[0])} 
              />
            } 
          />

          <Route 
            path="/features" 
            element={
              <FeaturesPage 
                onStartUpload={handleStartUpload} 
                onExploreDemo={() => handleSelectSample(SAMPLE_REPORTS[0])} 
              />
            } 
          />

          <Route 
            path="/tests" 
            element={
              <TestsExplorerPage 
                onDecodeReport={handleStartUpload} 
              />
            } 
          />

          <Route 
            path="*" 
            element={
              <LandingHero
                onStartUpload={handleStartUpload}
                onTrySample={() => handleSelectSample(SAMPLE_REPORTS[0])}
              />
            } 
          />
        </Routes>
      </main>

      {/* Settings & Privacy Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onSettingsChanged={handleSettingsChanged}
      />

      {/* Longitudinal Report Comparison Modal */}
      <ReportComparisonModal
        isOpen={isComparisonOpen}
        onClose={() => setIsComparisonOpen(false)}
        currentParameters={processedParameters}
        currentDocumentName={documentName}
      />

      {/* Educational Parameter Deep-Dive Drawer / Modal */}
      <ParameterDetailModal
        parameter={selectedDetailParam}
        isOpen={!!selectedDetailParam}
        onClose={() => setSelectedDetailParam(null)}
      />

      {/* Comprehensive Medical Platform Footer */}
      <Footer />
    </div>
  );
}
