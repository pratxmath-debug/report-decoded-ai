import { ProcessedParameter } from '../types/report';

export interface DoctorQuestion {
  id: string;
  category: 'General Context' | 'Testing Validity' | 'Follow-up & Monitoring' | 'Lifestyle & Medications';
  question: string;
  relevantParameters?: string[];
  rationale: string;
}

/**
 * Sanitizes test parameter names for doctor questions to ensure raw text dumps,
 * multiline snippets, and report boilerplate are never injected into questions.
 */
export function sanitizeParameterName(name: string | null | undefined): string | null {
  if (!name) return null;
  const clean = name.replace(/[\r\n\t]+/g, ' ').replace(/\s+/g, ' ').trim();
  
  // Filter out raw text dumps, overly long strings, or boilerplates
  if (clean.length < 2 || clean.length > 50) return null;
  if (/^(?:page\s*\d+|report|patient|doctor|sample|reference|normal|clinical|strictly\s*confidential)/i.test(clean)) {
    return null;
  }
  if (clean.includes('--- Page') || clean.includes('http') || clean.includes('...')) {
    return null;
  }

  // Clean trailing punctuation
  return clean.replace(/[\:\-\|\.\,\*\(\)\s]+$/, '').trim();
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

  // 2. Targeted Inquiries for Out-of-Range Parameters
  const outOfRange = parameters.filter(
    (p) => p.classification.status === 'ABOVE_RANGE' || p.classification.status === 'BELOW_RANGE'
  );

  const cleanOutOfRangeNames = Array.from(
    new Set(
      outOfRange
        .map((p) => sanitizeParameterName(p.name))
        .filter((n): n is string => Boolean(n))
    )
  );

  if (cleanOutOfRangeNames.length > 0) {
    const formattedNames = cleanOutOfRangeNames.slice(0, 5).join(', ');
    questions.push({
      id: `q-${qId++}`,
      category: 'General Context',
      question: `For parameters outside this laboratory's printed reference range (${formattedNames}), are there specific follow-up evaluations or lifestyle factors we should consider first?`,
      relevantParameters: cleanOutOfRangeNames,
      rationale: 'Focuses discussion on whether specific variations are clinically meaningful or represent standard physiological variance for you.'
    });
  }

  // 3. Glossary-specific inquiries if available
  const uniqueParamQuestions = new Set<string>();
  for (const p of parameters) {
    const cleanName = sanitizeParameterName(p.name);
    if (!cleanName) continue;

    if (p.glossary && p.glossary.commonQuestions && p.glossary.commonQuestions.length > 0) {
      for (const customQ of p.glossary.commonQuestions) {
        if (!uniqueParamQuestions.has(customQ) && questions.length < 8) {
          uniqueParamQuestions.add(customQ);
          questions.push({
            id: `q-${qId++}`,
            category: 'Testing Validity',
            question: `${cleanName}: ${customQ}`,
            relevantParameters: [cleanName],
            rationale: `Derived from general educational properties of ${cleanName}.`
          });
        }
      }
    }
  }

  // 4. Targeted Inquiries for Parameters Needing Verification
  const needsVerification = parameters.filter(
    (p) => p.classification.status === 'NEEDS_VERIFICATION'
  );

  const cleanUnverifiedNames = Array.from(
    new Set(
      needsVerification
        .map((p) => sanitizeParameterName(p.name))
        .filter((n): n is string => Boolean(n))
    )
  );

  if (cleanUnverifiedNames.length > 0) {
    const formattedNames = cleanUnverifiedNames.slice(0, 5).join(', ');
    questions.push({
      id: `q-${qId++}`,
      category: 'Testing Validity',
      question: `Some parameters (${formattedNames}) had unprinted or unreadable reference ranges on this report copy. Can you help clarify your clinic's expected baseline range for these?`,
      relevantParameters: cleanUnverifiedNames,
      rationale: 'Ensures missing reference intervals on partial lab printouts are clarified with your doctor’s electronic health records.'
    });
  }

  return questions;
}
