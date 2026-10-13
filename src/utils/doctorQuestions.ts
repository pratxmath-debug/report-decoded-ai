import { ProcessedParameter } from '../types/report';

export interface DoctorQuestion {
  id: string;
  category: 'General Context' | 'Testing Validity' | 'Follow-up & Monitoring' | 'Lifestyle & Medications';
  question: string;
  relevantParameters?: string[];
  rationale: string;
}

export function generateDoctorQuestions(parameters: ProcessedParameter[]): DoctorQuestion[] {
  const questions: DoctorQuestion[] = [];
  let qId = 1;

  // 1. Core Foundational Questions (Universal & Safe)
  questions.push({
    id: `q-${qId++}`,
    category: 'General Context',
    question: 'What do these results mean when viewed in the context of my personal medical history and current symptoms?',
    rationale: 'Laboratories produce isolated reference numbers, but only a physician can interpret them relative to your overall physiological baseline.'
  });

  questions.push({
    id: `q-${qId++}`,
    category: 'Testing Validity',
    question: 'Could recent illnesses, hydration levels, vigorous exercise, or test timing have influenced any of these values?',
    rationale: 'Many blood parameters fluctuate with short-term biological variables such as hydration, minor viral infections, or recent physical stress.'
  });

  questions.push({
    id: `q-${qId++}`,
    category: 'Follow-up & Monitoring',
    question: 'Do any of these findings warrant repeat confirmatory testing, or should we monitor them over a regular interval?',
    rationale: 'A single out-of-range measurement is rarely definitive on its own and often requires scheduled re-testing to establish a true trend.'
  });

  questions.push({
    id: `q-${qId++}`,
    category: 'Lifestyle & Medications',
    question: 'Could any of my current prescription medications, over-the-counter pain relievers, or dietary supplements be affecting these numbers?',
    rationale: 'Common supplements (like biotin or vitamin C) and daily medications frequently interact with laboratory assays and organ clearance rates.'
  });

  // 2. Targeted Inquiries for Out-of-Range or Needing-Verification Parameters
  const outOfRange = parameters.filter(
    (p) => p.classification.status === 'ABOVE_RANGE' || p.classification.status === 'BELOW_RANGE'
  );

  const needsVerification = parameters.filter(
    (p) => p.classification.status === 'NEEDS_VERIFICATION'
  );

  if (outOfRange.length > 0) {
    const names = outOfRange.map((p) => p.name).join(', ');
    questions.push({
      id: `q-${qId++}`,
      category: 'General Context',
      question: `For parameters outside this laboratory's printed reference range (${names}), are there specific follow-up evaluations or lifestyle factors we should consider first?`,
      relevantParameters: outOfRange.map((p) => p.name),
      rationale: 'Focuses discussion on whether specific variations are clinically meaningful or represent standard physiological variance for you.'
    });
  }

  // 3. Glossary-specific inquiries if available
  const uniqueParamQuestions = new Set<string>();
  for (const p of parameters) {
    if (p.glossary && p.glossary.commonQuestions.length > 0) {
      for (const customQ of p.glossary.commonQuestions) {
        if (!uniqueParamQuestions.has(customQ) && questions.length < 8) {
          uniqueParamQuestions.add(customQ);
          questions.push({
            id: `q-${qId++}`,
            category: 'Testing Validity',
            question: `${p.name}: ${customQ}`,
            relevantParameters: [p.name],
            rationale: `Derived from general educational properties of ${p.name}.`
          });
        }
      }
    }
  }

  if (needsVerification.length > 0) {
    const unverifiedNames = needsVerification.map((p) => p.name || 'unnamed parameter').join(', ');
    questions.push({
      id: `q-${qId++}`,
      category: 'Testing Validity',
      question: `Some parameters (${unverifiedNames}) had unprinted or unreadable reference ranges on this report copy. Can you help clarify your clinic's expected baseline range for these?`,
      relevantParameters: needsVerification.map((p) => p.name),
      rationale: 'Ensures missing reference intervals on partial lab printouts are clarified with your doctor’s electronic health records.'
    });
  }

  return questions;
}
