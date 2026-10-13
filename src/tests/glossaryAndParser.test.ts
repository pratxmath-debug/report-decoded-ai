import { describe, it, expect } from 'vitest';
import { findGlossaryEntry, UNKNOWN_TEST_EXPLANATION, MEDICAL_GLOSSARY } from '../data/glossary';
import { parseLabText } from '../utils/labParser';
import { generateDoctorQuestions } from '../utils/doctorQuestions';
import { ProcessedParameter } from '../types/report';

describe('Curated Medical Glossary', () => {
  it('correctly retrieves common required tests by name and aliases', () => {
    expect(findGlossaryEntry('HbA1c')?.id).toBe('hba1c');
    expect(findGlossaryEntry('Glycated Hemoglobin')?.id).toBe('hba1c');
    expect(findGlossaryEntry('Hemoglobin')?.id).toBe('hemoglobin');
    expect(findGlossaryEntry('TSH')?.id).toBe('tsh');
    expect(findGlossaryEntry('ALT')?.id).toBe('alt_sgpt');
    expect(findGlossaryEntry('SGPT')?.id).toBe('alt_sgpt');
    expect(findGlossaryEntry('AST')?.id).toBe('ast_sgot');
    expect(findGlossaryEntry('SGOT')?.id).toBe('ast_sgot');
    expect(findGlossaryEntry('Creatinine')?.id).toBe('creatinine');
    expect(findGlossaryEntry('Serum Creatinine')?.id).toBe('creatinine');
    expect(findGlossaryEntry('Total Cholesterol')?.id).toBe('total_cholesterol');
    expect(findGlossaryEntry('Triglycerides')?.id).toBe('triglycerides');
    expect(findGlossaryEntry('White Blood Cell Count')?.id).toBe('wbc_count');
    expect(findGlossaryEntry('WBC')?.id).toBe('wbc_count');
  });

  it('contains explanations that explain purpose without diagnosing diseases', () => {
    for (const entry of MEDICAL_GLOSSARY) {
      expect(entry.whatItMeasures).toBeTruthy();
      expect(entry.clinicalContext).toBeTruthy();
      // Ensure it does not diagnose
      expect(entry.whatItMeasures.toLowerCase()).not.toContain('you have');
      expect(entry.whatItMeasures.toLowerCase()).not.toContain('indicates cancer');
      expect(entry.clinicalContext.toLowerCase()).not.toContain('you have');
    }
  });

  it('returns null for unknown tests', () => {
    const unknown = findGlossaryEntry('SuperRareUncatalogedProteinX999');
    expect(unknown).toBeNull();
  });

  it('provides the exact required unknown test fallback message', () => {
    expect(UNKNOWN_TEST_EXPLANATION).toBe(
      'An explanation for this parameter is not available in the current glossary. Please ask your healthcare professional.'
    );
  });
});

describe('Laboratory Text Parser', () => {
  it('extracts structured parameters from simulated report text lines', () => {
    const text = `
METRO DIAGNOSTIC REPORT
Patient: Jane Doe  Age: 38
----------------------------------------
HbA1c (Glycated Hemoglobin) 6.2 % < 5.7 H
TSH 4.85 uIU/mL 0.40 - 4.20 High
ALT (SGPT) 28 U/L 7 - 56
Serum Creatinine 0.92 mg/dL 0.70 - 1.30
----------------------------------------
    `;

    const parsed = parseLabText(text, 1);
    expect(parsed.length).toBe(4);

    const hba1c = parsed.find((p) => p.name.includes('HbA1c'));
    expect(hba1c).toBeDefined();
    expect(hba1c?.value).toBe('6.2');
    expect(hba1c?.unit).toBe('%');
    expect(hba1c?.referenceRange).toBe('< 5.7');
    expect(hba1c?.originalFlag).toBe('H');

    const tsh = parsed.find((p) => p.name.includes('TSH'));
    expect(tsh).toBeDefined();
    expect(tsh?.value).toBe('4.85');
    expect(tsh?.unit).toBe('uIU/mL');
    expect(tsh?.referenceRange).toBe('0.40 - 4.20');

    const alt = parsed.find((p) => p.name.includes('ALT'));
    expect(alt).toBeDefined();
    expect(alt?.value).toBe('28');
    expect(alt?.unit).toBe('U/L');
    expect(alt?.referenceRange).toBe('7 - 56');
  });

  it('marks low-confidence lines with needsVerification: true', () => {
    const text = `UnclearMarker 14.5`; // missing unit and range
    const parsed = parseLabText(text, 1);
    if (parsed.length > 0) {
      expect(parsed[0].needsVerification).toBe(true);
      expect(parsed[0].verificationReasons.length).toBeGreaterThan(0);
    }
  });
});

describe('Doctor Preparation Questions Generator', () => {
  it('generates safe, non-diagnostic questions without prescribing treatments', () => {
    const dummyParams: ProcessedParameter[] = [
      {
        id: '1',
        name: 'HbA1c',
        value: '6.2',
        unit: '%',
        referenceRange: '< 5.7',
        needsVerification: false,
        verificationReasons: [],
        classification: {
          status: 'ABOVE_RANGE',
          label: 'Above lab reference range',
          reason: 'Above limit',
          rangeType: 'less_than'
        },
        glossary: findGlossaryEntry('HbA1c') || undefined
      }
    ];

    const questions = generateDoctorQuestions(dummyParams);
    expect(questions.length).toBeGreaterThan(0);

    for (const q of questions) {
      // Must be safe questions
      expect(q.question).toBeTruthy();
      expect(q.rationale).toBeTruthy();
      // Ensure no treatment orders or prescriptions
      expect(q.question.toLowerCase()).not.toContain('take 500mg');
      expect(q.question.toLowerCase()).not.toContain('prescribe');
      expect(q.question.toLowerCase()).not.toContain('you are diagnosed with');
    }
  });
});
