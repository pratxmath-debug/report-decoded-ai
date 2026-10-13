import { describe, it, expect } from 'vitest';
import { parseLabText, extractNextParameterFromSegment, isMetadataOrHeaderLine } from '../utils/labParser';
import { reconstructTextWithLines } from '../utils/pdfParser';
import { classifyParameter } from '../utils/classifier';
import { generateDoctorQuestions, sanitizeParameterName } from '../utils/doctorQuestions';
import { findGlossaryEntry } from '../data/glossary';
import { ProcessedParameter } from '../types/report';

describe('Test A: 8-Row Sample CBC Report Extraction & Classification', () => {
  const sampleCbcReport = `
METRO PATHOLOGY CLINICAL LABORATORY
Patient: Jane Doe    Age/Gender: 34 / F    Date: 2026-03-12
------------------------------------------------------------
Investigation              Result   Unit       Ref. Range      Flag
------------------------------------------------------------
Hemoglobin                 10.0     g/dL       12.0 - 16.0     L
Total WBC Count            7.5      ×10³/µL    4.0 - 11.0
Platelet Count             450      10^3/uL    150 - 400       H
RBC Count                  4.8      10^6/uL    4.5 - 5.9
Hematocrit                 42.0     %          37.0 - 48.0
MCV                        88.0     fL         80.0 - 96.0
Hemoglobin                 13.5     g/dL       12.0 - 16.0
Platelet Count             250      10^3/uL    150 - 400
------------------------------------------------------------
Comments: Please correlate clinically.
Verified by Senior Pathologist
  `.trim();

  it('extracts all 8 distinct laboratory parameters from the report', () => {
    const extracted = parseLabText(sampleCbcReport, 1);
    expect(extracted.length).toBe(8);

    // Verify all 8 test names and values
    expect(extracted[0].name).toContain('Hemoglobin');
    expect(extracted[0].value).toBe('10.0');
    expect(extracted[0].unit).toBe('g/dL');
    expect(extracted[0].referenceRange).toBe('12.0 - 16.0');
    expect(extracted[0].originalFlag).toBe('L');

    expect(extracted[1].name).toContain('Total WBC Count');
    expect(extracted[1].value).toBe('7.5');
    expect(extracted[1].unit).toBe('×10³/µL');
    expect(extracted[1].referenceRange).toBe('4.0 - 11.0');

    expect(extracted[2].name).toContain('Platelet Count');
    expect(extracted[2].value).toBe('450');
    expect(extracted[2].unit).toBe('10^3/uL');
    expect(extracted[2].referenceRange).toBe('150 - 400');
    expect(extracted[2].originalFlag).toBe('H');

    expect(extracted[3].name).toContain('RBC Count');
    expect(extracted[3].value).toBe('4.8');
    expect(extracted[3].unit).toBe('10^6/uL');
    expect(extracted[3].referenceRange).toBe('4.5 - 5.9');

    expect(extracted[4].name).toContain('Hematocrit');
    expect(extracted[4].value).toBe('42.0');
    expect(extracted[4].unit).toBe('%');
    expect(extracted[4].referenceRange).toBe('37.0 - 48.0');

    expect(extracted[5].name).toContain('MCV');
    expect(extracted[5].value).toBe('88.0');
    expect(extracted[5].unit).toBe('fL');
    expect(extracted[5].referenceRange).toBe('80.0 - 96.0');

    // Repeated test rows must be preserved as distinct records
    expect(extracted[6].name).toContain('Hemoglobin');
    expect(extracted[6].value).toBe('13.5');
    expect(extracted[6].unit).toBe('g/dL');
    expect(extracted[6].referenceRange).toBe('12.0 - 16.0');

    expect(extracted[7].name).toContain('Platelet Count');
    expect(extracted[7].value).toBe('250');
    expect(extracted[7].unit).toBe('10^3/uL');
    expect(extracted[7].referenceRange).toBe('150 - 400');
  });

  it('guarantees unique and stable IDs across all extracted records', () => {
    const extracted = parseLabText(sampleCbcReport, 1);
    const ids = extracted.map((p) => p.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(8);
  });

  it('classifies the 8 parameters: 6 within-range, 1 below-range, 1 above-range, 0 needs-verification', () => {
    const extracted = parseLabText(sampleCbcReport, 1);
    const classified = extracted.map((p) =>
      classifyParameter({
        value: p.value,
        referenceRange: p.referenceRange,
        unit: p.unit,
        testName: p.name
      })
    );

    const withinRange = classified.filter((c) => c.status === 'WITHIN_RANGE');
    const belowRange = classified.filter((c) => c.status === 'BELOW_RANGE');
    const aboveRange = classified.filter((c) => c.status === 'ABOVE_RANGE');
    const needsVerification = classified.filter((c) => c.status === 'NEEDS_VERIFICATION');

    expect(withinRange.length).toBe(6);
    expect(belowRange.length).toBe(1);
    expect(aboveRange.length).toBe(1);
    expect(needsVerification.length).toBe(0);

    // Specific results check
    expect(belowRange[0].reason).toContain('10');
    expect(aboveRange[0].reason).toContain('450');
  });
});

describe('Test B: PDF Text Reconstruction & Parsing Robustness', () => {
  it('reconstructs multiline rows from scattered PDF.js coordinate items', () => {
    // Simulated PDF.js text items with coordinate transforms:
    // Row 1 (y = 700): Hemoglobin 14.0 g/dL 12.0 - 16.0
    // Row 2 (y = 670): Total WBC 7.2 10^3/uL 4.0 - 11.0
    const mockItems = [
      { str: 'g/dL', transform: [1, 0, 0, 1, 260, 700] },
      { str: 'Hemoglobin', transform: [1, 0, 0, 1, 50, 700] },
      { str: '12.0 - 16.0', transform: [1, 0, 0, 1, 340, 700] },
      { str: '14.0', transform: [1, 0, 0, 1, 200, 700] },
      { str: 'Total WBC', transform: [1, 0, 0, 1, 50, 670] },
      { str: '7.2', transform: [1, 0, 0, 1, 200, 670] },
      { str: '10^3/uL', transform: [1, 0, 0, 1, 260, 670] },
      { str: '4.0 - 11.0', transform: [1, 0, 0, 1, 340, 670] }
    ];

    const reconstructed = reconstructTextWithLines(mockItems);
    const lines = reconstructed.split('\n');

    expect(lines.length).toBe(2);
    expect(lines[0]).toBe('Hemoglobin 14.0 g/dL 12.0 - 16.0');
    expect(lines[1]).toBe('Total WBC 7.2 10^3/uL 4.0 - 11.0');
  });

  it('correctly extracts multiple parameters when text is flattened onto a single line', () => {
    const singleLineText =
      'Hemoglobin 10.0 g/dL 12.0 - 16.0 L Total WBC Count 7.5 ×10³/µL 4.0 - 11.0 Platelet Count 450 10^3/uL 150 - 400 H';

    const parsed = parseLabText(singleLineText, 1);
    expect(parsed.length).toBe(3);

    expect(parsed[0].name).toBe('Hemoglobin');
    expect(parsed[0].value).toBe('10.0');
    expect(parsed[0].originalFlag).toBe('L');

    expect(parsed[1].name).toBe('Total WBC Count');
    expect(parsed[1].value).toBe('7.5');

    expect(parsed[2].name).toBe('Platelet Count');
    expect(parsed[2].value).toBe('450');
    expect(parsed[2].originalFlag).toBe('H');
  });

  it('isolates scientific multiplier notation from the numeric value and test name', () => {
    const sample = 'Total WBC Count 7.5 ×10³/µL 4.0 - 11.0';
    const result = extractNextParameterFromSegment(sample, 1, 'test-1');

    expect(result).not.toBeNull();
    if (result) {
      expect(result.parameter.name).toBe('Total WBC Count');
      expect(result.parameter.value).toBe('7.5');
      expect(result.parameter.unit).toBe('×10³/µL');
      expect(result.parameter.referenceRange).toBe('4.0 - 11.0');
    }
  });

  it('supports diverse reference range formats: en-dash, em-dash, "to", and qualitative', () => {
    const enDash = 'Blood Sugar Fasting 95 mg/dL 70 – 100';
    const emDash = 'Serum Calcium 9.4 mg/dL 8.5 — 10.5';
    const toWord = 'Uric Acid 5.2 mg/dL 3.5 to 7.2';
    const qualitative = 'Hepatitis B Surface Antigen Negative Non-reactive';

    const p1 = parseLabText(enDash, 1)[0];
    expect(p1.referenceRange).toBe('70 - 100');
    expect(p1.value).toBe('95');

    const p2 = parseLabText(emDash, 1)[0];
    expect(p2.referenceRange).toBe('8.5 - 10.5');
    expect(p2.value).toBe('9.4');

    const p3 = parseLabText(toWord, 1)[0];
    expect(p3.referenceRange).toBe('3.5 - 7.2');
    expect(p3.value).toBe('5.2');

    const p4 = parseLabText(qualitative, 1)[0];
    expect(p4.value).toBe('Negative');
    expect(p4.referenceRange).toBe('Non-reactive');
  });

  it('correctly filters document headers and footers without dropping tests', () => {
    expect(isMetadataOrHeaderLine('Patient Name: John Doe')).toBe(true);
    expect(isMetadataOrHeaderLine('Doctor: Dr. Smith')).toBe(true);
    expect(isMetadataOrHeaderLine('Page 1 of 2')).toBe(true);
    expect(isMetadataOrHeaderLine('Investigation Result Unit Reference Range Flag')).toBe(true);
    expect(isMetadataOrHeaderLine('*** End of Report ***')).toBe(true);

    // Genuine test lines must NOT be filtered
    expect(isMetadataOrHeaderLine('Hemoglobin 14.2 g/dL 12.0 - 16.0')).toBe(false);
    expect(isMetadataOrHeaderLine('Total WBC Count 7.5 ×10³/µL 4.0 - 11.0')).toBe(false);
    expect(isMetadataOrHeaderLine('Platelet Count 250 10^3/uL 150 - 400')).toBe(false);
    expect(isMetadataOrHeaderLine('Testosterone 540 ng/dL 300 - 1000')).toBe(false);
  });
});

describe('Test C: Duplicate Handling & Sequential Stability', () => {
  it('preserves repeated test rows with different or identical values as separate records', () => {
    const reportWithRepeats = `
Hemoglobin 10.0 g/dL 12.0 - 16.0 L
Platelet Count 450 10^3/uL 150 - 400 H
Hemoglobin 13.5 g/dL 12.0 - 16.0
Platelet Count 250 10^3/uL 150 - 400
    `.trim();

    const parsed = parseLabText(reportWithRepeats, 1);
    expect(parsed.length).toBe(4);

    const hemoglobinRows = parsed.filter((p) => p.name.includes('Hemoglobin'));
    expect(hemoglobinRows.length).toBe(2);
    expect(hemoglobinRows[0].value).toBe('10.0');
    expect(hemoglobinRows[1].value).toBe('13.5');
    expect(hemoglobinRows[0].id).not.toBe(hemoglobinRows[1].id);

    const plateletRows = parsed.filter((p) => p.name.includes('Platelet'));
    expect(plateletRows.length).toBe(2);
    expect(plateletRows[0].value).toBe('450');
    expect(plateletRows[1].value).toBe('250');
    expect(plateletRows[0].id).not.toBe(plateletRows[1].id);
  });
});

describe('Test D: Doctor Discussion Questions Hygiene', () => {
  it('sanitizes parameter names and prevents raw text dumps from entering questions', () => {
    expect(sanitizeParameterName('Hemoglobin')).toBe('Hemoglobin');
    expect(sanitizeParameterName('Total WBC Count')).toBe('Total WBC Count');
    expect(sanitizeParameterName('Platelet Count:')).toBe('Platelet Count');

    // Must reject raw text dumps, boilerplate, and page dividers
    expect(sanitizeParameterName('--- Page 1 ---\nMETRO DIAGNOSTIC REPORT')).toBeNull();
    expect(sanitizeParameterName('This is an extremely long raw text dump that contains too many characters to be a test parameter name in a clinical report')).toBeNull();
    expect(sanitizeParameterName('http://laboratory.example.com/report/12345')).toBeNull();
    expect(sanitizeParameterName('')).toBeNull();
  });

  it('generates clean, non-diagnostic questions without raw PDF dumps', () => {
    const dummyProcessed: ProcessedParameter[] = [
      {
        id: '1',
        name: 'Hemoglobin',
        value: '10.0',
        unit: 'g/dL',
        referenceRange: '12.0 - 16.0',
        originalFlag: 'L',
        pageNumber: 1,
        sourceSnippet: 'Hemoglobin 10.0 g/dL 12.0 - 16.0 L',
        confidence: 0.98,
        needsVerification: false,
        verificationReasons: [],
        classification: {
          status: 'BELOW_RANGE',
          label: 'Below lab reference range',
          reason: 'Value (10) is below lower limit of 12.0 - 16.0.',
          rangeType: 'two_sided'
        },
        glossary: findGlossaryEntry('Hemoglobin') || undefined
      },
      {
        id: '2',
        name: 'Platelet Count',
        value: '450',
        unit: '10^3/uL',
        referenceRange: '150 - 400',
        originalFlag: 'H',
        pageNumber: 1,
        sourceSnippet: 'Platelet Count 450 10^3/uL 150 - 400 H',
        confidence: 0.98,
        needsVerification: false,
        verificationReasons: [],
        classification: {
          status: 'ABOVE_RANGE',
          label: 'Above lab reference range',
          reason: 'Value (450) is above upper limit of 150 - 400.',
          rangeType: 'two_sided'
        },
        glossary: findGlossaryEntry('Platelet Count') || undefined
      },
      {
        id: '3',
        name: 'UnknownMarker',
        value: '22',
        unit: 'U/L',
        referenceRange: '',
        originalFlag: null,
        pageNumber: 1,
        sourceSnippet: '--- Page 1 --- Raw snippet with disclaimer: please correlate clinically',
        confidence: 0.6,
        needsVerification: true,
        verificationReasons: ['Reference interval was not detected.'],
        classification: {
          status: 'NEEDS_VERIFICATION',
          label: 'Needs verification',
          reason: 'Laboratory reference interval was not found.',
          rangeType: 'missing'
        },
        glossary: undefined
      }
    ];

    const questions = generateDoctorQuestions(dummyProcessed);
    expect(questions.length).toBeGreaterThan(4);

    for (const q of questions) {
      expect(q.question).not.toContain('--- Page');
      expect(q.question).not.toContain('Raw snippet');
      expect(q.question).not.toContain('disclaimer');
      expect(q.question.length).toBeLessThan(300);
    }

    // Verify out-of-range question specifically mentions Hemoglobin and Platelet Count
    const outOfRangeQ = questions.find((q) => q.question.includes('Hemoglobin, Platelet Count'));
    expect(outOfRangeQ).toBeDefined();
  });
});
