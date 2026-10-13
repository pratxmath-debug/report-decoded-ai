import { ExtractedParameter } from '../types/report';
import { findGlossaryEntry } from '../data/glossary';

// Common medical units used in laboratory medicine
const COMMON_UNITS = [
  'mg/dL', 'mg/dl',
  'g/dL', 'g/dl',
  'g/L', 'mg/L',
  'uIU/mL', 'uIU/ml', 'µIU/mL', 'µIU/ml', 'mIU/L', 'mIU/mL',
  'U/L', 'u/l', 'IU/L',
  'mmol/L', 'umol/L', 'µmol/L',
  'ng/mL', 'ng/ml', 'ng/dL',
  'pg/mL', 'pg/ml',
  '%',
  '10^3/uL', '10^6/uL', '10*3/uL', '10^3/µL',
  '/cumm', 'cells/mcL', '/uL', '/µL',
  'mEq/L', 'meq/l',
  'mm/hr', 'mm/1st hr',
  'sec', 'seconds',
  'ratio'
];

// Sort units by length descending so longer tokens match before substrings
const SORTED_UNITS = [...COMMON_UNITS].sort((a, b) => b.length - a.length);
const UNIT_REGEX = new RegExp(
  `(?:^|\\s)(${SORTED_UNITS.map(u => u.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})(?=\\s|$|\\[|\\(|\\)|,|;)`,
  'i'
);

const RANGE_TWO_SIDED = /(?:\[|\()?\s*(-?\d+(?:\.\d+)?)\s*(?:-|–|—|to)\s*(-?\d+(?:\.\d+)?)\s*(?:\]|\))?/i;
const RANGE_ONE_SIDED = /(?:\[|\()?\s*(<=?|<|>=?|>|less than|greater than|up to)\s*(-?\d+(?:\.\d+)?)\s*(?:\]|\))?/i;
const RANGE_QUALITATIVE = /(?:\[|\()?\s*(negative|non-reactive|absent|normal|nil)\s*(?:\]|\))?/i;

const FLAG_REGEX = /\b(H|L|HIGH|LOW|CRITICAL|\*|ABNORMAL)\b/i;

/**
 * Parses raw text extracted from an image or PDF into candidate laboratory parameters.
 */
export function parseLabText(rawText: string, pageNumber: number = 1): ExtractedParameter[] {
  if (!rawText || !rawText.trim()) return [];

  const lines = rawText
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l.length > 3);

  const parameters: ExtractedParameter[] = [];
  let paramCounter = 1;

  for (const line of lines) {
    // Skip general lab metadata headers and footers
    if (/^(patient|doctor|physician|sample id|specimen|date|time|page|hospital|laboratory|report|bill|phone|address|age|gender|sex|referred by)/i.test(line)) {
      continue;
    }
    if (/^(test name|parameter|investigation|result|unit|reference range|biological reference)/i.test(line) && line.split(/\s+/).length < 8) {
      continue;
    }

    // Try to parse the line
    const parsed = parseLineForParameter(line, pageNumber, `p-${Date.now()}-${paramCounter++}`);
    if (parsed) {
      // Prevent duplicates with same name and value
      const exists = parameters.some(
        (p) => p.name.toLowerCase() === parsed.name.toLowerCase() && p.value === parsed.value
      );
      if (!exists) {
        parameters.push(parsed);
      }
    }
  }

  return parameters;
}

function parseLineForParameter(
  line: string,
  pageNumber: number,
  id: string
): ExtractedParameter | null {
  // 1. Check for Reference Range first
  let referenceRange = '';
  let rangeMatch = line.match(RANGE_TWO_SIDED);
  if (rangeMatch) {
    referenceRange = `${rangeMatch[1]} - ${rangeMatch[2]}`;
  } else {
    rangeMatch = line.match(RANGE_ONE_SIDED);
    if (rangeMatch) {
      referenceRange = `${rangeMatch[1]} ${rangeMatch[2]}`;
    } else {
      rangeMatch = line.match(RANGE_QUALITATIVE);
      if (rangeMatch) {
        referenceRange = rangeMatch[1];
      }
    }
  }

  // 2. Check for Unit
  let unit = '';
  const unitMatch = line.match(UNIT_REGEX);
  if (unitMatch) {
    unit = unitMatch[1];
  }

  // 3. Check for Lab Flag
  let flag: 'H' | 'L' | 'HIGH' | 'LOW' | 'NORMAL' | 'ABNORMAL' | '*' | null = null;
  const flagMatch = line.match(FLAG_REGEX);
  if (flagMatch) {
    const rawFlag = flagMatch[1].toUpperCase();
    if (['H', 'HIGH'].includes(rawFlag)) flag = 'H';
    else if (['L', 'LOW'].includes(rawFlag)) flag = 'L';
    else if (rawFlag === '*') flag = '*';
    else if (rawFlag === 'ABNORMAL') flag = 'ABNORMAL';
  }

  // 4. Extract numerical value or qualitative result
  // If range was found, we want the number appearing BEFORE the range
  let searchPortion = line;
  if (rangeMatch && rangeMatch.index !== undefined) {
    searchPortion = line.substring(0, rangeMatch.index);
  }

  // Search for numeric value in searchPortion
  let value = '';
  // Pattern: number (e.g. 14.2, 5.7, 135, 0.92)
  const numbers = searchPortion.match(/\b\d+(?:\.\d+)?\b/g);
  if (numbers && numbers.length > 0) {
    // Usually the last number before the unit/range is the result value
    value = numbers[numbers.length - 1];
  } else {
    // Check for qualitative values
    const qualMatch = searchPortion.match(/\b(negative|positive|non-reactive|reactive|absent|normal|nil|trace)\b/i);
    if (qualMatch) {
      value = qualMatch[1].charAt(0).toUpperCase() + qualMatch[1].slice(1).toLowerCase();
    }
  }

  // 5. Extract Candidate Test Name
  // Everything before the value
  let testName = '';
  if (value) {
    const valIdx = line.indexOf(value);
    if (valIdx > 0) {
      testName = line.substring(0, valIdx).trim();
    }
  }

  // Clean test name of leading numbers, punctuation, or table borders
  testName = testName.replace(/^[\d\.\-\:\*\|\s]+/, '').replace(/[\:\-\|\.\,\*]+$/, '').trim();

  // If testName is too short or empty, check if known glossary name is present anywhere in line
  if (!testName || testName.length < 2) {
    const matchedGlossary = findGlossaryEntry(line);
    if (matchedGlossary) {
      testName = matchedGlossary.canonicalName;
    }
  }

  // Validation: We must have at least a plausible test name AND a value or range
  if (!testName || testName.length < 2) {
    return null;
  }

  // Ignore spurious lines that are pure numbers or common headers
  if (/^(total|average|subtotal|test|result|status|remarks)$/i.test(testName)) {
    return null;
  }

  // Calculate confidence and verification reasons
  const verificationReasons: string[] = [];
  let confidence = 0.95;

  if (!value) {
    verificationReasons.push('Result value was not clearly detected.');
    confidence -= 0.3;
  }

  if (!referenceRange) {
    verificationReasons.push('Reference interval was not detected on this line.');
    confidence -= 0.3;
  }

  if (!unit && !RANGE_QUALITATIVE.test(referenceRange)) {
    verificationReasons.push('Unit of measurement was not detected.');
    confidence -= 0.15;
  }

  if (testName.length < 3) {
    verificationReasons.push('Parameter name is unusually short.');
    confidence -= 0.2;
  }

  const needsVerification = verificationReasons.length > 0 || confidence < 0.8;

  return {
    id,
    name: testName,
    value: value || '',
    unit: unit || '',
    referenceRange: referenceRange || '',
    originalFlag: flag,
    pageNumber,
    sourceSnippet: line.length > 120 ? line.substring(0, 117) + '...' : line,
    confidence: Math.max(0.2, Math.min(1, confidence)),
    needsVerification,
    verificationReasons
  };
}
