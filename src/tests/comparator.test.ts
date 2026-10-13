import { describe, it, expect } from 'vitest';
import { compareReports } from '../utils/comparator';
import { ProcessedParameter } from '../types/report';

describe('Report Comparison Engine', () => {
  const mockBase: ProcessedParameter[] = [
    {
      id: 'p1',
      name: 'HbA1c',
      value: '6.5',
      unit: '%',
      referenceRange: '< 5.7',
      needsVerification: false,
      verificationReasons: [],
      classification: {
        status: 'ABOVE_RANGE',
        label: 'Above lab reference range',
        reason: 'Above limit',
        rangeType: 'less_than'
      }
    },
    {
      id: 'p2',
      name: 'Platelet Count',
      value: '130',
      unit: '10^3/uL',
      referenceRange: '150 - 450',
      needsVerification: false,
      verificationReasons: [],
      classification: {
        status: 'BELOW_RANGE',
        label: 'Below lab reference range',
        reason: 'Below lower limit',
        rangeType: 'two_sided'
      }
    }
  ];

  const mockFollowup: ProcessedParameter[] = [
    {
      id: 'cur1',
      name: 'HbA1c',
      value: '5.6',
      unit: '%',
      referenceRange: '< 5.7',
      needsVerification: false,
      verificationReasons: [],
      classification: {
        status: 'WITHIN_RANGE',
        label: 'Within lab reference range',
        reason: 'Within limit',
        rangeType: 'less_than'
      }
    },
    {
      id: 'cur2',
      name: 'Platelet Count',
      value: '175',
      unit: '10^3/uL',
      referenceRange: '150 - 450',
      needsVerification: false,
      verificationReasons: [],
      classification: {
        status: 'WITHIN_RANGE',
        label: 'Within lab reference range',
        reason: 'Within interval',
        rangeType: 'two_sided'
      }
    }
  ];

  it('correctly calculates numeric deltas and percentage change when units match', () => {
    const res = compareReports(mockBase, mockFollowup, 'Jan 2026', 'April 2026');
    expect(res.matchedCount).toBe(2);

    const hba1cDelta = res.deltas.find((d) => d.parameterName === 'HbA1c');
    expect(hba1cDelta).toBeDefined();
    expect(hba1cDelta?.numericDifference).toBe(-0.9);
    expect(hba1cDelta?.percentChange).toBe(-13.8);
    expect(hba1cDelta?.statusShift).toBe('IMPROVED');

    const pltDelta = res.deltas.find((d) => d.parameterName === 'Platelet Count');
    expect(pltDelta).toBeDefined();
    expect(pltDelta?.numericDifference).toBe(45);
    expect(pltDelta?.percentChange).toBe(34.6);
    expect(pltDelta?.statusShift).toBe('IMPROVED');
  });

  it('refuses numerical delta computation if units are incompatible', () => {
    const incompatibleBase: ProcessedParameter[] = [
      {
        id: 'p1',
        name: 'Glucose',
        value: '100',
        unit: 'mg/dL',
        referenceRange: '70 - 99',
        needsVerification: false,
        verificationReasons: [],
        classification: {
          status: 'ABOVE_RANGE',
          label: 'Above lab reference range',
          reason: '',
          rangeType: 'two_sided'
        }
      }
    ];

    const incompatibleFollowup: ProcessedParameter[] = [
      {
        id: 'p2',
        name: 'Glucose',
        value: '5.5',
        unit: 'mmol/L', // Different unit!
        referenceRange: '3.9 - 5.6',
        needsVerification: false,
        verificationReasons: [],
        classification: {
          status: 'WITHIN_RANGE',
          label: 'Within lab reference range',
          reason: '',
          rangeType: 'two_sided'
        }
      }
    ];

    const res = compareReports(incompatibleBase, incompatibleFollowup);
    expect(res.matchedCount).toBe(1);
    expect(res.deltas[0].numericDifference).toBeNull();
    expect(res.deltas[0].percentChange).toBeNull();
  });
});
