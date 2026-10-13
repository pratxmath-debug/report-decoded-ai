import { ClassificationResult, RangeClassification, RangeType } from '../types/report';

export interface ClassifyInput {
  value: string | number | null | undefined;
  referenceRange: string | null | undefined;
  unit?: string | null | undefined;
  testName?: string | null | undefined;
}

/**
 * Normalizes text for comparison by removing punctuation and extra whitespace.
 */
function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, ' ');
}

/**
 * Checks if a string represents a qualitative/textual status.
 */
const QUALITATIVE_TERMS = new Set([
  'negative',
  'positive',
  'non-reactive',
  'non reactive',
  'reactive',
  'normal',
  'abnormal',
  'absent',
  'present',
  'detected',
  'not detected',
  'undetected',
  'nil',
  'trace',
  'adequate',
  'clear',
  'yellow',
  'straw'
]);

/**
 * Attempts to parse a numeric value, supporting decimals, commas, and scientific notations.
 */
export function parseNumericValue(valueStr: string): number | null {
  if (!valueStr) return null;
  const clean = valueStr.trim().replace(/,/g, '');
  
  // If it starts with '<' or '>', e.g. '< 0.01', this is a boundary reading
  const match = clean.match(/^([<>]=?|\b)?\s*(-?\d+(?:\.\d+)?)/);
  if (match && match[2]) {
    const val = parseFloat(match[2]);
    return isNaN(val) ? null : val;
  }
  return null;
}

/**
 * Deterministic laboratory reference range parser and classifier.
 * Strictly adheres to healthcare safety:
 * - Compares verified result against verified reference interval from that report.
 * - Boundary values (val === min or val === max) are strictly Within Range.
 * - Missing/ambiguous/invalid values or ranges result in "Needs verification".
 * - Never diagnoses or makes clinical assumptions.
 */
export function classifyParameter(input: ClassifyInput): ClassificationResult {
  const rawValue = input.value !== null && input.value !== undefined ? String(input.value).trim() : '';
  const rawRange = input.referenceRange !== null && input.referenceRange !== undefined ? String(input.referenceRange).trim() : '';
  const rawUnit = input.unit !== null && input.unit !== undefined ? String(input.unit).trim() : '';

  // 1. Missing Value Check
  if (!rawValue) {
    return {
      status: 'NEEDS_VERIFICATION',
      label: 'Needs verification',
      reason: 'Report parameter result value is missing or unreadable.',
      rangeType: 'missing'
    };
  }

  // 2. Missing Reference Range Check
  if (!rawRange) {
    return {
      status: 'NEEDS_VERIFICATION',
      label: 'Needs verification',
      reason: 'Laboratory reference interval was not found on this report.',
      rangeType: 'missing'
    };
  }

  // 3. Check for qualitative test result (e.g., "Negative", "Non-reactive")
  const normVal = normalizeText(rawValue);
  const normRange = normalizeText(rawRange);

  const isQualitativeVal = QUALITATIVE_TERMS.has(normVal);
  const isQualitativeRange = QUALITATIVE_TERMS.has(normRange) || 
    normRange.includes('negative') || 
    normRange.includes('non-reactive') || 
    normRange.includes('absent') ||
    normRange.includes('not detected');

  if (isQualitativeVal || isQualitativeRange) {
    // Both are qualitative
    if (isQualitativeVal && isQualitativeRange) {
      const isExpectedNormal =
        (normRange.includes('negative') && normVal.includes('negative')) ||
        (normRange.includes('non-reactive') && (normVal.includes('non-reactive') || normVal.includes('non reactive'))) ||
        (normRange.includes('not detected') && normVal.includes('not detected')) ||
        (normRange.includes('absent') && (normVal.includes('absent') || normVal.includes('nil'))) ||
        (normRange.includes('normal') && normVal.includes('normal'));

      if (isExpectedNormal) {
        return {
          status: 'WITHIN_RANGE',
          label: 'Within lab reference range',
          reason: `Qualitative result "${rawValue}" matches report expected reference "${rawRange}".`,
          rangeType: 'qualitative'
        };
      }

      // Check for clearly divergent qualitative result (e.g. Positive when range is Negative)
      if (
        (normRange.includes('negative') && (normVal.includes('positive') || normVal.includes('reactive'))) ||
        (normRange.includes('non-reactive') && normVal.includes('reactive')) ||
        (normRange.includes('absent') && normVal.includes('present'))
      ) {
        return {
          status: 'ABOVE_RANGE',
          label: 'Above lab reference range',
          reason: `Qualitative finding "${rawValue}" differs from reference standard "${rawRange}". Discuss with clinician.`,
          rangeType: 'qualitative'
        };
      }

      return {
        status: 'QUALITATIVE',
        label: 'Qualitative result',
        reason: `Qualitative observation recorded as "${rawValue}" against reference "${rawRange}".`,
        rangeType: 'qualitative'
      };
    }

    // One is qualitative and one might be numeric or unparseable
    return {
      status: 'NEEDS_VERIFICATION',
      label: 'Needs verification',
      reason: 'Qualitative and numeric formats could not be unambiguously compared.',
      rangeType: 'qualitative'
    };
  }

  // 4. Parse Numeric Value
  const numValue = parseNumericValue(rawValue);
  if (numValue === null) {
    return {
      status: 'NEEDS_VERIFICATION',
      label: 'Needs verification',
      reason: `Could not parse numerical value from "${rawValue}".`,
      rangeType: 'invalid'
    };
  }

  // 5. Parse Reference Range
  // 5a. One-sided less than (e.g. "< 5.7", "<= 200", "<100", "Up to 40", "Less than 5.7")
  const lessThanMatch = rawRange.match(/^(?:<=?|<|less than|up to|below)\s*(-?\d+(?:\.\d+)?)/i);
  if (lessThanMatch) {
    const limit = parseFloat(lessThanMatch[1]);
    if (isNaN(limit)) {
      return {
        status: 'NEEDS_VERIFICATION',
        label: 'Needs verification',
        reason: `Unparseable limit in reference range "${rawRange}".`,
        rangeType: 'invalid'
      };
    }

    const isBoundary = numValue === limit;
    if (numValue > limit) {
      return {
        status: 'ABOVE_RANGE',
        label: 'Above lab reference range',
        reason: `Value (${numValue}) is above the upper limit of ${rawRange}.`,
        numericValue: numValue,
        rangeMax: limit,
        rangeType: 'less_than'
      };
    } else {
      return {
        status: 'WITHIN_RANGE',
        label: 'Within lab reference range',
        reason: `Value (${numValue}) is within the specified limit of ${rawRange}.`,
        numericValue: numValue,
        rangeMax: limit,
        rangeType: 'less_than',
        isBoundary
      };
    }
  }

  // 5b. One-sided greater than (e.g. "> 40", ">= 60", ">45", "Greater than 40")
  const greaterThanMatch = rawRange.match(/^(?:>=?|>|greater than|more than|above)\s*(-?\d+(?:\.\d+)?)/i);
  if (greaterThanMatch) {
    const limit = parseFloat(greaterThanMatch[1]);
    if (isNaN(limit)) {
      return {
        status: 'NEEDS_VERIFICATION',
        label: 'Needs verification',
        reason: `Unparseable limit in reference range "${rawRange}".`,
        rangeType: 'invalid'
      };
    }

    const isBoundary = numValue === limit;
    if (numValue < limit) {
      return {
        status: 'BELOW_RANGE',
        label: 'Below lab reference range',
        reason: `Value (${numValue}) is below the lower limit of ${rawRange}.`,
        numericValue: numValue,
        rangeMin: limit,
        rangeType: 'greater_than'
      };
    } else {
      return {
        status: 'WITHIN_RANGE',
        label: 'Within lab reference range',
        reason: `Value (${numValue}) meets or exceeds the target threshold of ${rawRange}.`,
        numericValue: numValue,
        rangeMin: limit,
        rangeType: 'greater_than',
        isBoundary
      };
    }
  }

  // 5c. Two-sided intervals (e.g. "70 - 99", "0.4 to 4.2", "13.5-17.5", "4.0 - 10.0")
  const twoSidedMatch = rawRange.match(/^(-?\d+(?:\.\d+)?)\s*(?:-|–|—|to)\s*(-?\d+(?:\.\d+)?)/i);
  if (twoSidedMatch) {
    const min = parseFloat(twoSidedMatch[1]);
    const max = parseFloat(twoSidedMatch[2]);

    if (isNaN(min) || isNaN(max)) {
      return {
        status: 'NEEDS_VERIFICATION',
        label: 'Needs verification',
        reason: `Reference interval "${rawRange}" numbers could not be parsed.`,
        rangeType: 'invalid'
      };
    }

    // Invalid interval check (e.g. min > max)
    if (min > max) {
      return {
        status: 'NEEDS_VERIFICATION',
        label: 'Needs verification',
        reason: `Invalid reference interval format: lower bound (${min}) is greater than upper bound (${max}).`,
        numericValue: numValue,
        rangeMin: min,
        rangeMax: max,
        rangeType: 'invalid'
      };
    }

    // Boundary check
    const isBoundary = numValue === min || numValue === max;

    if (numValue < min) {
      return {
        status: 'BELOW_RANGE',
        label: 'Below lab reference range',
        reason: `Value (${numValue}) is below the laboratory reference lower bound of ${min}.`,
        numericValue: numValue,
        rangeMin: min,
        rangeMax: max,
        rangeType: 'two_sided'
      };
    } else if (numValue > max) {
      return {
        status: 'ABOVE_RANGE',
        label: 'Above lab reference range',
        reason: `Value (${numValue}) is above the laboratory reference upper bound of ${max}.`,
        numericValue: numValue,
        rangeMin: min,
        rangeMax: max,
        rangeType: 'two_sided'
      };
    } else {
      return {
        status: 'WITHIN_RANGE',
        label: 'Within lab reference range',
        reason: isBoundary
          ? `Value (${numValue}) is exactly on the reference boundary [${min} – ${max}].`
          : `Value (${numValue}) falls within the laboratory reference interval [${min} – ${max}].`,
        numericValue: numValue,
        rangeMin: min,
        rangeMax: max,
        rangeType: 'two_sided',
        isBoundary
      };
    }
  }

  // 6. Fallback if interval string doesn't match known patterns
  return {
    status: 'NEEDS_VERIFICATION',
    label: 'Needs verification',
    reason: `Reference range format "${rawRange}" is complex or unfamiliar. Please verify manually.`,
    numericValue: numValue,
    rangeType: 'invalid'
  };
}
