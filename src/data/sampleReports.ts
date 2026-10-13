import { ExtractedParameter } from '../types/report';

export interface SampleReportOption {
  id: string;
  title: string;
  description: string;
  labName: string;
  collectionDate: string;
  parameters: ExtractedParameter[];
}

export const SAMPLE_REPORTS: SampleReportOption[] = [
  {
    id: 'comprehensive-metabolic',
    title: 'Standard Health Screening (Baseline Demo)',
    description: 'Fictional routine metabolic panel featuring HbA1c, TSH, and ALT/SGPT alongside kidney & lipid markers.',
    labName: 'Metro Diagnostic Laboratories (Fictional Demo)',
    collectionDate: '2026-01-15',
    parameters: [
      {
        id: 'p-1',
        name: 'HbA1c (Glycated Hemoglobin)',
        value: '6.2',
        unit: '%',
        referenceRange: '< 5.7',
        originalFlag: 'H',
        pageNumber: 1,
        sourceSnippet: 'HbA1c (Glycated Hemoglobin) ... 6.2 % [Ref: < 5.7] H',
        confidence: 0.98,
        needsVerification: false,
        verificationReasons: []
      },
      {
        id: 'p-2',
        name: 'TSH (Thyroid Stimulating Hormone)',
        value: '4.85',
        unit: 'uIU/mL',
        referenceRange: '0.40 - 4.20',
        originalFlag: 'H',
        pageNumber: 1,
        sourceSnippet: 'TSH (3rd Gen) ... 4.85 uIU/mL [Ref: 0.40 - 4.20] High',
        confidence: 0.96,
        needsVerification: false,
        verificationReasons: []
      },
      {
        id: 'p-3',
        name: 'ALT / SGPT',
        value: '28',
        unit: 'U/L',
        referenceRange: '7 - 56',
        originalFlag: null,
        pageNumber: 1,
        sourceSnippet: 'ALT (SGPT) ... 28 U/L [Ref: 7 - 56]',
        confidence: 0.99,
        needsVerification: false,
        verificationReasons: []
      },
      {
        id: 'p-4',
        name: 'Hemoglobin (Hb)',
        value: '14.1',
        unit: 'g/dL',
        referenceRange: '13.2 - 16.6',
        originalFlag: null,
        pageNumber: 1,
        sourceSnippet: 'Hemoglobin (Photometry) ... 14.1 g/dL [Ref: 13.2 - 16.6]',
        confidence: 0.99,
        needsVerification: false,
        verificationReasons: []
      },
      {
        id: 'p-5',
        name: 'Serum Creatinine',
        value: '0.92',
        unit: 'mg/dL',
        referenceRange: '0.70 - 1.30',
        originalFlag: null,
        pageNumber: 2,
        sourceSnippet: 'Creatinine, Serum ... 0.92 mg/dL [Ref: 0.70 - 1.30]',
        confidence: 0.97,
        needsVerification: false,
        verificationReasons: []
      },
      {
        id: 'p-6',
        name: 'Total Cholesterol',
        value: '218',
        unit: 'mg/dL',
        referenceRange: '< 200',
        originalFlag: 'H',
        pageNumber: 2,
        sourceSnippet: 'Cholesterol, Total ... 218 mg/dL [Ref: < 200] *',
        confidence: 0.95,
        needsVerification: false,
        verificationReasons: []
      },
      {
        id: 'p-7',
        name: 'Platelet Count',
        value: '135',
        unit: '10^3/uL',
        referenceRange: '150 - 450',
        originalFlag: 'L',
        pageNumber: 2,
        sourceSnippet: 'Platelets ... 135 10^3/uL [Ref: 150 - 450] L',
        confidence: 0.94,
        needsVerification: false,
        verificationReasons: []
      },
      {
        id: 'p-8',
        name: 'Urine Routine Protein',
        value: 'Negative',
        unit: '',
        referenceRange: 'Negative',
        originalFlag: null,
        pageNumber: 2,
        sourceSnippet: 'Protein, Urine Dipstick ... Negative [Ref: Negative]',
        confidence: 0.98,
        needsVerification: false,
        verificationReasons: []
      }
    ]
  },
  {
    id: 'followup-screening',
    title: 'Follow-up Screening (3-Month Progress Demo)',
    description: 'Follow-up panel demonstrating longitudinal shifts: HbA1c now 5.6%, TSH stabilized at 2.45, Platelets now 195.',
    labName: 'Metro Diagnostic Laboratories (Fictional Demo)',
    collectionDate: '2026-04-18',
    parameters: [
      {
        id: 'f-1',
        name: 'HbA1c (Glycated Hemoglobin)',
        value: '5.6',
        unit: '%',
        referenceRange: '< 5.7',
        originalFlag: null,
        pageNumber: 1,
        sourceSnippet: 'HbA1c (Glycated Hemoglobin) ... 5.6 % [Ref: < 5.7]',
        confidence: 0.99,
        needsVerification: false,
        verificationReasons: []
      },
      {
        id: 'f-2',
        name: 'TSH (Thyroid Stimulating Hormone)',
        value: '2.45',
        unit: 'uIU/mL',
        referenceRange: '0.40 - 4.20',
        originalFlag: null,
        pageNumber: 1,
        sourceSnippet: 'TSH (3rd Gen) ... 2.45 uIU/mL [Ref: 0.40 - 4.20]',
        confidence: 0.98,
        needsVerification: false,
        verificationReasons: []
      },
      {
        id: 'f-3',
        name: 'ALT / SGPT',
        value: '24',
        unit: 'U/L',
        referenceRange: '7 - 56',
        originalFlag: null,
        pageNumber: 1,
        sourceSnippet: 'ALT (SGPT) ... 24 U/L [Ref: 7 - 56]',
        confidence: 0.99,
        needsVerification: false,
        verificationReasons: []
      },
      {
        id: 'f-4',
        name: 'Hemoglobin (Hb)',
        value: '14.4',
        unit: 'g/dL',
        referenceRange: '13.2 - 16.6',
        originalFlag: null,
        pageNumber: 1,
        sourceSnippet: 'Hemoglobin ... 14.4 g/dL [Ref: 13.2 - 16.6]',
        confidence: 0.99,
        needsVerification: false,
        verificationReasons: []
      },
      {
        id: 'f-5',
        name: 'Serum Creatinine',
        value: '0.88',
        unit: 'mg/dL',
        referenceRange: '0.70 - 1.30',
        originalFlag: null,
        pageNumber: 2,
        sourceSnippet: 'Creatinine, Serum ... 0.88 mg/dL [Ref: 0.70 - 1.30]',
        confidence: 0.98,
        needsVerification: false,
        verificationReasons: []
      },
      {
        id: 'f-6',
        name: 'Total Cholesterol',
        value: '194',
        unit: 'mg/dL',
        referenceRange: '< 200',
        originalFlag: null,
        pageNumber: 2,
        sourceSnippet: 'Cholesterol, Total ... 194 mg/dL [Ref: < 200]',
        confidence: 0.97,
        needsVerification: false,
        verificationReasons: []
      },
      {
        id: 'f-7',
        name: 'Platelet Count',
        value: '195',
        unit: '10^3/uL',
        referenceRange: '150 - 450',
        originalFlag: null,
        pageNumber: 2,
        sourceSnippet: 'Platelets ... 195 10^3/uL [Ref: 150 - 450]',
        confidence: 0.98,
        needsVerification: false,
        verificationReasons: []
      },
      {
        id: 'f-8',
        name: 'Urine Routine Protein',
        value: 'Negative',
        unit: '',
        referenceRange: 'Negative',
        originalFlag: null,
        pageNumber: 2,
        sourceSnippet: 'Protein, Urine Dipstick ... Negative [Ref: Negative]',
        confidence: 0.98,
        needsVerification: false,
        verificationReasons: []
      }
    ]
  },
  {
    id: 'sample-needing-verification',
    title: 'Report with Low-Confidence / Incomplete Items',
    description: 'Demonstrates handling of missing ranges and ambiguous OCR detections requiring patient review.',
    labName: 'Central Pathology (Fictional Demo)',
    collectionDate: '2026-03-20',
    parameters: [
      {
        id: 'demo-v1',
        name: 'Fasting Blood Sugar',
        value: '108',
        unit: 'mg/dL',
        referenceRange: '70 - 99',
        originalFlag: 'H',
        pageNumber: 1,
        sourceSnippet: 'Fasting Blood Sugar ... 108 mg/dL [Ref: 70 - 99]',
        confidence: 0.99,
        needsVerification: false,
        verificationReasons: []
      },
      {
        id: 'demo-v2',
        name: 'Serum Vitamin D (25-OH)',
        value: '18.4',
        unit: 'ng/mL',
        referenceRange: '', // Missing range!
        originalFlag: null,
        pageNumber: 1,
        sourceSnippet: '25-OH Vitamin D ... 18.4 ng/mL [Ref: not printed]',
        confidence: 0.65,
        needsVerification: true,
        verificationReasons: ['Laboratory reference interval was not detected on printed report.']
      },
      {
        id: 'demo-v3',
        name: 'Serum Potassium (K+)',
        value: '', // Missing value!
        unit: 'mEq/L',
        referenceRange: '3.5 - 5.1',
        originalFlag: null,
        pageNumber: 1,
        sourceSnippet: 'Potassium ... [Smudged / unreadable] mEq/L [Ref: 3.5 - 5.1]',
        confidence: 0.40,
        needsVerification: true,
        verificationReasons: ['Numerical result value is missing or unreadable from scan.']
      }
    ]
  }
];
