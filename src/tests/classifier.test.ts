import { describe, it, expect } from 'vitest';
import { classifyParameter, parseNumericValue } from '../utils/classifier';

describe('Deterministic Reference-Range Classifier Engine', () => {
  describe('Two-Sided Reference Intervals', () => {
    const range = '70 - 99';

    it('classifies value below the range', () => {
      const res = classifyParameter({ value: '65', referenceRange: range, unit: 'mg/dL' });
      expect(res.status).toBe('BELOW_RANGE');
      expect(res.label).toBe('Below lab reference range');
      expect(res.rangeType).toBe('two_sided');
      expect(res.rangeMin).toBe(70);
      expect(res.rangeMax).toBe(99);
    });

    it('classifies value equal to lower boundary', () => {
      const res = classifyParameter({ value: '70', referenceRange: range, unit: 'mg/dL' });
      expect(res.status).toBe('WITHIN_RANGE');
      expect(res.label).toBe('Within lab reference range');
      expect(res.isBoundary).toBe(true);
    });

    it('classifies value inside the range', () => {
      const res = classifyParameter({ value: '85.4', referenceRange: range, unit: 'mg/dL' });
      expect(res.status).toBe('WITHIN_RANGE');
      expect(res.label).toBe('Within lab reference range');
      expect(res.isBoundary).toBe(false);
    });

    it('classifies value equal to upper boundary', () => {
      const res = classifyParameter({ value: '99', referenceRange: range, unit: 'mg/dL' });
      expect(res.status).toBe('WITHIN_RANGE');
      expect(res.label).toBe('Within lab reference range');
      expect(res.isBoundary).toBe(true);
    });

    it('classifies value above the range', () => {
      const res = classifyParameter({ value: '115', referenceRange: range, unit: 'mg/dL' });
      expect(res.status).toBe('ABOVE_RANGE');
      expect(res.label).toBe('Above lab reference range');
      expect(res.rangeType).toBe('two_sided');
    });

    it('handles decimal intervals e.g. TSH 0.40 - 4.20', () => {
      const tshRange = '0.40 - 4.20';
      expect(classifyParameter({ value: '0.25', referenceRange: tshRange }).status).toBe('BELOW_RANGE');
      expect(classifyParameter({ value: '2.10', referenceRange: tshRange }).status).toBe('WITHIN_RANGE');
      expect(classifyParameter({ value: '5.60', referenceRange: tshRange }).status).toBe('ABOVE_RANGE');
    });
  });

  describe('One-Sided Reference Limits', () => {
    it('handles "< X" upper threshold (e.g. HbA1c < 5.7)', () => {
      const range = '< 5.7';
      const within = classifyParameter({ value: '5.4', referenceRange: range, unit: '%' });
      expect(within.status).toBe('WITHIN_RANGE');
      expect(within.rangeType).toBe('less_than');

      const boundary = classifyParameter({ value: '5.7', referenceRange: range, unit: '%' });
      expect(boundary.status).toBe('WITHIN_RANGE');
      expect(boundary.isBoundary).toBe(true);

      const above = classifyParameter({ value: '6.5', referenceRange: range, unit: '%' });
      expect(above.status).toBe('ABOVE_RANGE');
    });

    it('handles "> X" lower threshold (e.g. HDL > 40)', () => {
      const range = '> 40';
      const below = classifyParameter({ value: '34', referenceRange: range, unit: 'mg/dL' });
      expect(below.status).toBe('BELOW_RANGE');
      expect(below.rangeType).toBe('greater_than');

      const boundary = classifyParameter({ value: '40', referenceRange: range, unit: 'mg/dL' });
      expect(boundary.status).toBe('WITHIN_RANGE');

      const above = classifyParameter({ value: '52', referenceRange: range, unit: 'mg/dL' });
      expect(above.status).toBe('WITHIN_RANGE');
    });

    it('handles "Up to X" phrase', () => {
      const range = 'Up to 35';
      expect(classifyParameter({ value: '20', referenceRange: range }).status).toBe('WITHIN_RANGE');
      expect(classifyParameter({ value: '55', referenceRange: range }).status).toBe('ABOVE_RANGE');
    });
  });

  describe('Qualitative and Non-Numeric Results', () => {
    it('classifies matching qualitative negative/non-reactive', () => {
      const res = classifyParameter({ value: 'Negative', referenceRange: 'Negative' });
      expect(res.status).toBe('WITHIN_RANGE');
      expect(res.rangeType).toBe('qualitative');
    });

    it('classifies divergent qualitative result without crashing', () => {
      const res = classifyParameter({ value: 'Positive', referenceRange: 'Negative' });
      expect(res.status).toBe('ABOVE_RANGE');
      expect(res.rangeType).toBe('qualitative');
    });

    it('handles non-reactive reference safely', () => {
      const res = classifyParameter({ value: 'Non-reactive', referenceRange: 'Non-Reactive' });
      expect(res.status).toBe('WITHIN_RANGE');
    });
  });

  describe('Missing Information and Safety Guards', () => {
    it('flags missing value as NEEDS_VERIFICATION (never normal)', () => {
      const res = classifyParameter({ value: '', referenceRange: '70 - 100' });
      expect(res.status).toBe('NEEDS_VERIFICATION');
      expect(res.label).toBe('Needs verification');
    });

    it('flags null/undefined value as NEEDS_VERIFICATION', () => {
      const res = classifyParameter({ value: null, referenceRange: '70 - 100' });
      expect(res.status).toBe('NEEDS_VERIFICATION');
    });

    it('flags missing reference range as NEEDS_VERIFICATION', () => {
      const res = classifyParameter({ value: '14.2', referenceRange: '' });
      expect(res.status).toBe('NEEDS_VERIFICATION');
    });

    it('flags undefined reference range as NEEDS_VERIFICATION', () => {
      const res = classifyParameter({ value: '14.2', referenceRange: undefined });
      expect(res.status).toBe('NEEDS_VERIFICATION');
    });

    it('flags invalid reversed interval where min > max', () => {
      const res = classifyParameter({ value: '50', referenceRange: '100 - 50' });
      expect(res.status).toBe('NEEDS_VERIFICATION');
      expect(res.reason).toContain('lower bound (100) is greater than upper bound (50)');
    });

    it('flags unparseable gibberish range', () => {
      const res = classifyParameter({ value: '10', referenceRange: 'not-a-range-xyz' });
      expect(res.status).toBe('NEEDS_VERIFICATION');
    });
  });

  describe('Number Parsing', () => {
    it('parses formatted numbers with commas and decimals', () => {
      expect(parseNumericValue('1,250.5')).toBe(1250.5);
      expect(parseNumericValue('< 0.05')).toBe(0.05);
      expect(parseNumericValue('14.2 g/dL')).toBe(14.2);
    });
  });
});
