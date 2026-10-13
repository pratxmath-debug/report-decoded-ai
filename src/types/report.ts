export type RangeClassification =
  | 'WITHIN_RANGE'
  | 'ABOVE_RANGE'
  | 'BELOW_RANGE'
  | 'NEEDS_VERIFICATION'
  | 'QUALITATIVE';

export type RangeType =
  | 'two_sided'
  | 'less_than'
  | 'greater_than'
  | 'qualitative'
  | 'missing'
  | 'invalid';

export interface ClassificationResult {
  status: RangeClassification;
  label: string;
  reason: string;
  numericValue?: number;
  rangeMin?: number;
  rangeMax?: number;
  rangeType: RangeType;
  isBoundary?: boolean;
}

export interface ExtractedParameter {
  id: string;
  name: string;
  value: string;
  unit: string;
  referenceRange: string;
  originalFlag?: 'H' | 'L' | 'HIGH' | 'LOW' | 'NORMAL' | 'ABNORMAL' | '*' | null;
  pageNumber?: number;
  sourceSnippet?: string;
  confidence?: number; // 0 to 1
  needsVerification: boolean;
  verificationReasons: string[];
}

export interface GlossaryEntry {
  id: string;
  canonicalName: string;
  synonyms: string[];
  whatItMeasures: string;
  clinicalContext: string;
  category:
    | 'Metabolic & Diabetes'
    | 'Thyroid Function'
    | 'Liver Function'
    | 'Kidney Function'
    | 'Lipid Panel'
    | 'Hematology / Blood Counts'
    | 'Inflammation & Immunology'
    | 'Electrolytes & Minerals'
    | 'Vitamins & Hormones'
    | 'General Chemistry';
  commonQuestions: string[];
}

export interface ProcessedParameter extends ExtractedParameter {
  classification: ClassificationResult;
  glossary?: GlossaryEntry;
}

export interface ReportSummaryStats {
  totalCount: number;
  withinRangeCount: number;
  aboveRangeCount: number;
  belowRangeCount: number;
  needsVerificationCount: number;
  qualitativeCount: number;
}

export interface UploadedDocument {
  file: File | null;
  fileName: string;
  fileType: 'image' | 'pdf' | 'sample';
  fileSize: number;
  previewUrl?: string;
  extractedText: string;
  pageCount: number;
}

export type AppStep =
  | 'LANDING'
  | 'UPLOAD'
  | 'EXTRACTING'
  | 'VERIFICATION'
  | 'RESULTS';
