import { ProcessedParameter, RangeClassification } from '../types/report';
import { parseNumericValue } from './classifier';

export interface ParameterDelta {
  parameterName: string;
  baselineValue: string;
  currentValue: string;
  unit: string;
  baselineReferenceRange: string;
  currentReferenceRange: string;
  baselineStatus: RangeClassification;
  currentStatus: RangeClassification;
  numericDifference: number | null;
  percentChange: number | null;
  statusShift: 'IMPROVED' | 'CHANGED' | 'UNCHANGED' | 'UNCOMPARABLE';
  clinicalSummary: string;
}

export interface ReportComparisonResult {
  baselineTitle: string;
  currentTitle: string;
  matchedCount: number;
  unmatchedBaselineCount: number;
  unmatchedCurrentCount: number;
  deltas: ParameterDelta[];
}

/**
 * Normalizes test parameter name for loose matching across lab printouts.
 */
function normalizeName(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]/g, '');
}

/**
 * Compares two sets of processed parameters from different dates or reports.
 * Strictly adheres to healthcare safety:
 * - Compares numerical deltas ONLY when units match.
 * - Does not declare clinical diagnosis or treatment outcome.
 */
export function compareReports(
  baselineParams: ProcessedParameter[],
  currentParams: ProcessedParameter[],
  baselineTitle: string = 'Previous Report',
  currentTitle: string = 'Current Report'
): ReportComparisonResult {
  const deltas: ParameterDelta[] = [];
  const matchedCurrentIds = new Set<string>();

  for (const base of baselineParams) {
    const baseNorm = normalizeName(base.name);

    // Find best match in current report
    const match = currentParams.find((cur) => {
      const curNorm = normalizeName(cur.name);
      return curNorm === baseNorm || (base.glossary && cur.glossary && base.glossary.id === cur.glossary.id);
    });

    if (match) {
      matchedCurrentIds.add(match.id);

      const baseValNum = parseNumericValue(base.value);
      const curValNum = parseNumericValue(match.value);

      // Check unit compatibility
      const unitsMatch = base.unit.trim().toLowerCase() === match.unit.trim().toLowerCase();

      let numericDifference: number | null = null;
      let percentChange: number | null = null;

      if (unitsMatch && baseValNum !== null && curValNum !== null) {
        numericDifference = Math.round((curValNum - baseValNum) * 100) / 100;
        if (baseValNum !== 0) {
          percentChange = Math.round(((curValNum - baseValNum) / Math.abs(baseValNum)) * 1000) / 10;
        }
      }

      // Status shift evaluation
      let statusShift: 'IMPROVED' | 'CHANGED' | 'UNCHANGED' | 'UNCOMPARABLE' = 'UNCHANGED';
      let clinicalSummary = 'Value remained unchanged relative to reference intervals.';

      if (base.classification.status === match.classification.status) {
        statusShift = 'UNCHANGED';
        clinicalSummary = `Both reports classify this parameter as ${match.classification.label}.`;
      } else if (
        (base.classification.status === 'ABOVE_RANGE' || base.classification.status === 'BELOW_RANGE') &&
        match.classification.status === 'WITHIN_RANGE'
      ) {
        statusShift = 'IMPROVED';
        clinicalSummary = `Shifted from ${base.classification.label} to Within lab reference range. Discuss progression with your physician.`;
      } else {
        statusShift = 'CHANGED';
        clinicalSummary = `Status shifted from ${base.classification.label} to ${match.classification.label}.`;
      }

      deltas.push({
        parameterName: match.name || base.name,
        baselineValue: base.value,
        currentValue: match.value,
        unit: match.unit || base.unit,
        baselineReferenceRange: base.referenceRange,
        currentReferenceRange: match.referenceRange,
        baselineStatus: base.classification.status,
        currentStatus: match.classification.status,
        numericDifference,
        percentChange,
        statusShift,
        clinicalSummary
      });
    }
  }

  const unmatchedBaseline = baselineParams.length - deltas.length;
  const unmatchedCurrent = currentParams.length - matchedCurrentIds.size;

  return {
    baselineTitle,
    currentTitle,
    matchedCount: deltas.length,
    unmatchedBaselineCount: unmatchedBaseline,
    unmatchedCurrentCount: unmatchedCurrent,
    deltas
  };
}
