import { ExtractedParameter } from '../types/report';
import { findGlossaryEntry } from '../data/glossary';

// Comprehensive laboratory units across hematology, biochemistry, immunology, and endocrinology
export const COMMON_UNITS = [
  // Mass concentration
  'mg/dL', 'mg/dl', 'mg%', 'mg / dL', 'mg / dl',
  'g/dL', 'g/dl', 'gm/dl', 'gm/dL', 'g%', 'gm%', 'g / dL', 'g / dl',
  'g/L', 'g / L', 'mg/L', 'mg / L', 'ug/dL', 'µg/dL', 'ug/dl', 'µg/dl',
  'ug/L', 'µg/L',
  
  // Hormones / Thyroid / Enzymes
  'uIU/mL', 'uIU/ml', 'µIU/mL', 'µIU/ml', 'uIU / mL', 'µIU / mL',
  'mIU/L', 'mIU/mL', 'mIU/ml', 'mIU / L', 'mIU / mL',
  'IU/mL', 'IU/ml', 'IU/L', 'IU / mL', 'IU / L',
  'U/L', 'u/l', 'U / L',
  'ng/mL', 'ng/ml', 'ng/dL', 'ng/dl', 'ng / mL', 'ng / dL',
  'pg/mL', 'pg/ml', 'pg / mL',
  'pmol/L', 'pmol / L', 'nmol/L', 'nmol / L',
  
  // Electrolytes / Chemistry
  'mmol/L', 'mmol / L', 'umol/L', 'µmol/L', 'umol / L', 'µmol / L',
  'mEq/L', 'meq/l', 'meq/L', 'mEq / L',
  
  // Ratios / Percentages / Time / Sedimentation
  '%', 'vol%', 'g/g', 'ratio', 'index',
  'sec', 'seconds', 'secs', 'min', 'minutes', 'mm/hr', 'mm/1st hr', 'mm/h',
  
  // Complete Blood Count (CBC) units & cell volumes
  'fL', 'fl', 'fL.', 'fl.', 'femtoliter', 'femtoliters',
  'pg', 'picogram', 'picograms',
  
  // Multipliers with cell counts (Hematology counts)
  '×10³/µL', '×10³/uL', '×10³/mcL', '×10³ / µL', '×10³ / uL', '×10³',
  'x10^3/uL', 'x10^3/µL', 'x10^3/mcL', 'x10^3 / uL', 'x10^3',
  '10^3/uL', '10^3/µL', '10^3/mcL', '10^3/ul', '10^3 / uL', '10^3',
  '10*3/uL', '10*3/µL', '10*3/mcL', '10*3',
  '10³/µL', '10³/uL', '10³/mcL', '10³',
  
  '×10⁶/µL', '×10⁶/uL', '×10⁶/mcL', '×10⁶ / µL', '×10⁶ / uL', '×10⁶',
  'x10^6/uL', 'x10^6/µL', 'x10^6/mcL', 'x10^6 / uL', 'x10^6',
  '10^6/uL', '10^6/µL', '10^6/mcL', '10^6/ul', '10^6 / uL', '10^6',
  '10*6/uL', '10*6/µL', '10*6/mcL', '10*6',
  '10⁶/µL', '10⁶/uL', '10⁶/mcL', '10⁶',
  
  '×10⁹/L', 'x10^9/L', '10^9/L', '10*9/L', '10⁹/L', '10^9 / L',
  '×10¹²/L', 'x10^12/L', '10^12/L', '10*12/L', '10¹²/L', '10^12 / L',
  
  'cells/mcL', 'cells/uL', 'cells/µL', 'cells/cumm', 'cells / uL',
  'mill/cumm', 'mil/uL', 'mil/µL', 'million/uL', 'million/µL', 'million/mcL', 'lakhs/cumm',
  '/cumm', '/cu.mm', '/mm3', '/mm^3', '/uL', '/µL', '/mcL', '/L'
];

// Sort units by length descending so longer tokens match before substrings
export const SORTED_UNITS = [...COMMON_UNITS].sort((a, b) => b.length - a.length);

export const UNIT_REGEX = new RegExp(
  `(?:^|\\s|(?<=\\d))(${SORTED_UNITS.map((u) => u.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})(?=\\s|$|\\[|\\(|\\)|,|;|:)`,
  'i'
);

export const RANGE_TWO_SIDED = /(?:(?:ref(?:erence)?|normal|biological)?\s*(?:range|interval)?\s*[:\s])?(?:\[|\()?\s*(-?\d+(?:\.\d+)?)\s*(?:-|–|—|\bto\b)\s*(-?\d+(?:\.\d+)?)\s*(?:\]|\))?/i;
export const RANGE_ONE_SIDED = /(?:(?:ref(?:erence)?|normal|biological)?\s*(?:range|interval)?\s*[:\s])?(?:\[|\()?\s*(<=?|<|>=?|>|less than|greater than|up to|below|above)\s*(-?\d+(?:\.\d+)?)\s*(?:\]|\))?/i;
export const RANGE_QUALITATIVE = /(?:(?:ref(?:erence)?|normal|biological)?\s*(?:range|interval)?\s*[:\s])?(?:\[|\()?\s*(negative|non-reactive|non reactive|absent|normal|nil|not detected)\s*(?:\]|\))?/i;

export const FLAG_REGEX = /\b(H|L|HIGH|LOW|CRITICAL|\*|ABNORMAL|NORMAL)\b/i;

/**
 * Checks if a line is a general document header, patient demography line, or table column header.
 */
export function isMetadataOrHeaderLine(line: string): boolean {
  const trimmed = line.trim();
  if (trimmed.length < 3) return true;

  // Patient / Report demography metadata
  if (/^(?:patient(?:\s*name)?|doctor|physician|consultant|sample\s*id|specimen|collection\s*date|reporting\s*date|registered\s*on|age\s*\/\s*gender|age\s*\/\s*sex|gender|sex|hospital|laboratory|clinic|bill\s*no|bar\s*code|phone|address|referred\s*by|uhid|mrn)\s*[:\-]/i.test(trimmed)) {
    return true;
  }

  // Pure page numbers, footer markers, confidentiality notes
  if (/^(?:page\s*\d+\s*(?:of|\/)\s*\d+|\*+\s*end\s*of\s*report\s*\*+|strictly\s*confidential|scanned\s*copy)/i.test(trimmed)) {
    return true;
  }

  // Clinical disclaimers without numbers
  if (/^(?:please\s*correlate\s*clinically|methodology\s*:|instrument\s*:|sample\s*type\s*:|test\s*performed\s*by)/i.test(trimmed)) {
    return true;
  }

  // Table header rows (e.g. "Test Name Result Unit Reference Range Flag")
  if (/^(?:test\s*name|investigation|parameter|analyte)\s+(?:result|value|observed|unit|ref)/i.test(trimmed)) {
    return true;
  }
  if (/^(?:investigation|parameter|test\s*name)\s+(?:technique|method|specimen)/i.test(trimmed)) {
    return true;
  }

  return false;
}

export interface ParsedSegmentResult {
  parameter: ExtractedParameter;
  consumedLength: number;
}

/**
 * Parses the next parameter candidate from a line or line segment.
 * Returns the parsed parameter and the length of the string segment consumed.
 */
export function extractNextParameterFromSegment(
  segment: string,
  pageNumber: number,
  id: string
): ParsedSegmentResult | null {
  if (!segment || segment.trim().length < 3) return null;

  // 1. Detect Reference Range
  let referenceRange = '';
  let rangeMatch: RegExpMatchArray | null = null;
  let rangeType: 'two_sided' | 'one_sided' | 'qualitative' | 'none' = 'none';

  rangeMatch = segment.match(RANGE_TWO_SIDED);
  if (rangeMatch && rangeMatch[1] && rangeMatch[2]) {
    referenceRange = `${rangeMatch[1]} - ${rangeMatch[2]}`;
    rangeType = 'two_sided';
  } else {
    rangeMatch = segment.match(RANGE_ONE_SIDED);
    if (rangeMatch && rangeMatch[1] && rangeMatch[2]) {
      referenceRange = `${rangeMatch[1]} ${rangeMatch[2]}`;
      rangeType = 'one_sided';
    }
  }

  // 2. Identify candidate text portion before reference range
  let searchPortion = segment;
  let rangeEndIndex = segment.length;

  if (rangeMatch && rangeMatch.index !== undefined) {
    searchPortion = segment.substring(0, rangeMatch.index);
    rangeEndIndex = rangeMatch.index + rangeMatch[0].length;
  }

  // Qualitative analysis when no numeric interval is detected
  let detectedQualitativeValue = '';
  if (rangeType === 'none') {
    const qualRegex = /\b(negative|positive|non-reactive|non reactive|reactive|absent|present|normal|abnormal|nil|trace|not detected|detected)\b/gi;
    const qualMatches: Array<{ match: string; index: number; length: number }> = [];
    let qm: RegExpExecArray | null;
    while ((qm = qualRegex.exec(segment)) !== null) {
      qualMatches.push({ match: qm[1], index: qm.index, length: qm[0].length });
    }

    if (qualMatches.length >= 2) {
      // First qualitative token is observed result; second is reference range
      detectedQualitativeValue = qualMatches[0].match.charAt(0).toUpperCase() + qualMatches[0].match.slice(1).toLowerCase();
      referenceRange = qualMatches[1].match.charAt(0).toUpperCase() + qualMatches[1].match.slice(1).toLowerCase();
      rangeType = 'qualitative';
      rangeEndIndex = qualMatches[1].index + qualMatches[1].length;
      searchPortion = segment.substring(0, qualMatches[0].index);
    } else if (qualMatches.length === 1) {
      const qToken = qualMatches[0];
      const beforeToken = segment.substring(0, qToken.index);
      if (/(?:ref(?:erence)?|normal|range)[:\s]+$/i.test(beforeToken)) {
        referenceRange = qToken.match.charAt(0).toUpperCase() + qToken.match.slice(1).toLowerCase();
        rangeType = 'qualitative';
        rangeEndIndex = qToken.index + qToken.length;
        searchPortion = beforeToken.replace(/(?:ref(?:erence)?|normal|range)[:\s]+$/i, '');
      } else {
        detectedQualitativeValue = qToken.match.charAt(0).toUpperCase() + qToken.match.slice(1).toLowerCase();
        searchPortion = beforeToken;
        rangeEndIndex = qToken.index + qToken.length;
      }
    }
  }

  // Clean trailing punctuation from search portion
  searchPortion = searchPortion.replace(/[\s:(\[]+$/, ' ');

  // 3. Detect Unit
  let unit = '';
  const unitMatch = segment.match(UNIT_REGEX);
  if (unitMatch) {
    unit = unitMatch[1];
  }

  // 4. Detect Flag
  let flag: 'H' | 'L' | 'HIGH' | 'LOW' | 'NORMAL' | 'ABNORMAL' | '*' | null = null;
  const flagMatch = segment.match(FLAG_REGEX);
  if (flagMatch) {
    const rawFlag = flagMatch[1].toUpperCase();
    if (['H', 'HIGH'].includes(rawFlag)) flag = 'H';
    else if (['L', 'LOW'].includes(rawFlag)) flag = 'L';
    else if (['*', 'ABNORMAL', 'CRITICAL'].includes(rawFlag)) flag = 'ABNORMAL';
    else if (['NORMAL', 'NORM'].includes(rawFlag)) flag = 'NORMAL';
  }

  // 5. Extract Result Value
  let value = detectedQualitativeValue;
  if (!value) {
    // To avoid multiplier exponents (like 10^3 or 10^6) being selected as the value,
    // sanitize the search portion by replacing units and multiplier patterns with whitespace.
    let valueSearch = searchPortion;
    if (unit) {
      valueSearch = valueSearch.replace(unit, ' ');
    }
    // Strip multiplier tokens: e.g. ×10³, 10^3, x10^3, 10*3, 10^6, etc.
    valueSearch = valueSearch.replace(/[×x*]?\s*10\s*[\^]?\s*[369]|\b10[³⁶⁹]\b|×10[³⁶⁹]/gi, ' ');
    // Strip standalone flags
    valueSearch = valueSearch.replace(/\b(H|L|HIGH|LOW|NORMAL|ABNORMAL|CRITICAL)\b/gi, ' ');
    valueSearch = valueSearch.replace(/[*#]+/g, ' ');

    const numbers = valueSearch.match(/\b\d+(?:\.\d+)?\b/g);
    if (numbers && numbers.length > 0) {
      // The last number in the pre-range segment is the reported result value
      value = numbers[numbers.length - 1];
    } else {
      // Check for qualitative test values (e.g. Negative, Non-reactive, Absent)
      const qualMatch = searchPortion.match(/\b(negative|positive|non-reactive|non reactive|reactive|absent|normal|nil|trace|present)\b/i);
      if (qualMatch) {
        value = qualMatch[1].charAt(0).toUpperCase() + qualMatch[1].slice(1).toLowerCase();
      }
    }
  }

  // 6. Extract Test Name
  let testName = '';
  if (detectedQualitativeValue) {
    testName = searchPortion.trim();
  } else if (value) {
    const valIdx = searchPortion.lastIndexOf(value);
    if (valIdx > 0) {
      testName = searchPortion.substring(0, valIdx).trim();
    }
  }

  // Clean test name of leading numbers, bullets, table borders, and trailing punctuation
  testName = testName
    .replace(/^[\d\.\-\:\*\|\(\)\s]+/, '')
    .replace(/[\:\-\|\.\,\*\(\)\s]+$/, '')
    .trim();

  // If testName is missing or short, check if a known glossary name appears in the segment
  if (!testName || testName.length < 2) {
    const matchedGlossary = findGlossaryEntry(searchPortion.length > 2 ? searchPortion : segment);
    if (matchedGlossary) {
      testName = matchedGlossary.canonicalName;
    }
  }

  // Validation: Must have at least a plausible test name and either a value or range
  if (!testName || testName.length < 2) {
    return null;
  }

  // Ignore lines that are common general headers or summary words
  if (/^(?:total|average|subtotal|test|result|status|remarks|parameter|normal|reference)$/i.test(testName)) {
    return null;
  }

  // 7. Calculate Confidence & Verification Status
  const verificationReasons: string[] = [];
  let confidence = 0.98;

  if (!value) {
    verificationReasons.push('Result value was not clearly detected.');
    confidence -= 0.3;
  }

  if (!referenceRange) {
    verificationReasons.push('Reference interval was not detected on this line.');
    confidence -= 0.3;
  }

  if (!unit && rangeType !== 'qualitative') {
    verificationReasons.push('Unit of measurement was not detected.');
    confidence -= 0.15;
  }

  if (testName.length < 3) {
    verificationReasons.push('Parameter name is unusually short.');
    confidence -= 0.2;
  }

  const needsVerification = verificationReasons.length > 0 || confidence < 0.8;

  // 8. Determine Consumed Length in this Segment
  let consumedLength = rangeEndIndex;
  if (rangeMatch) {
    // Check for trailing flag or unit immediately following the reference range
    const trailingSnippet = segment.substring(rangeEndIndex, rangeEndIndex + 20);
    const trailingFlagMatch = trailingSnippet.match(/^\s*(?:H|L|HIGH|LOW|NORMAL|ABNORMAL|\*)\b/i);
    if (trailingFlagMatch) {
      consumedLength = rangeEndIndex + trailingFlagMatch[0].length;
    }
  } else {
    // If no reference range, consumed length is the end of the unit or value
    if (unit) {
      const uIdx = segment.indexOf(unit);
      if (uIdx > 0) {
        consumedLength = uIdx + unit.length;
      }
    } else if (value) {
      const vIdx = segment.lastIndexOf(value);
      if (vIdx > 0) {
        consumedLength = vIdx + value.length;
      }
    }
  }

  // Consume any trailing punctuation or whitespace before next parameter
  const afterConsumed = segment.substring(consumedLength);
  const trailingSeparatorsMatch = afterConsumed.match(/^[\s,;|\-]+/);
  if (trailingSeparatorsMatch) {
    consumedLength += trailingSeparatorsMatch[0].length;
  }

  const snippet = segment.substring(0, Math.min(consumedLength, 120)).trim();

  const parameter: ExtractedParameter = {
    id,
    name: testName,
    value: value || '',
    unit: unit || '',
    referenceRange: referenceRange || '',
    originalFlag: flag,
    pageNumber,
    sourceSnippet: snippet.length > 117 ? snippet.substring(0, 114) + '...' : snippet,
    confidence: Math.max(0.2, Math.min(1, confidence)),
    needsVerification,
    verificationReasons
  };

  return {
    parameter,
    consumedLength: Math.max(consumedLength, 1)
  };
}

/**
 * Parses raw text extracted from an image or PDF into candidate laboratory parameters.
 * Supports multiple lines, multiple parameters per line, and keeps all distinct rows.
 */
export function parseLabText(rawText: string, pageNumber: number = 1): ExtractedParameter[] {
  if (!rawText || !rawText.trim()) return [];

  const rawLines = rawText.split(/\r?\n/);
  const parameters: ExtractedParameter[] = [];
  let paramCounter = 1;

  for (const rawLine of rawLines) {
    const trimmed = rawLine.trim();
    if (trimmed.length < 4) continue;

    // Skip general lab metadata headers and footers
    if (isMetadataOrHeaderLine(trimmed)) {
      continue;
    }

    // Process line: extract one or more parameters from this line
    let remainingLine = trimmed;
    let safetyCounter = 0;

    while (remainingLine.length > 5 && safetyCounter < 12) {
      safetyCounter++;
      const id = `param-p${pageNumber}-${paramCounter++}`;
      const parseResult = extractNextParameterFromSegment(remainingLine, pageNumber, id);

      if (!parseResult) {
        break;
      }

      parameters.push(parseResult.parameter);

      // Advance remainingLine past the consumed portion
      if (parseResult.consumedLength > 0 && parseResult.consumedLength < remainingLine.length) {
        remainingLine = remainingLine.substring(parseResult.consumedLength).trim();
        // If remaining portion is too short or is pure metadata, stop line processing
        if (remainingLine.length < 5 || isMetadataOrHeaderLine(remainingLine)) {
          break;
        }
      } else {
        // Entire line was consumed
        break;
      }
    }
  }

  return parameters;
}

/**
 * Backward compatibility helper for single-line parsing
 */
export function parseLineForParameter(
  line: string,
  pageNumber: number,
  id: string
): ExtractedParameter | null {
  const result = extractNextParameterFromSegment(line, pageNumber, id);
  return result ? result.parameter : null;
}
