import { describe, it, expect } from 'vitest';
import {
  calculateDarkvisionRadius,
  getDarkvisionFromModes,
  darkvisionToMultiplier
} from '../scripts/core.js';

// Create token with detection modes (Foundry v12+ structure)
const createToken = (darkvision) => ({
  detectionModes: [
    { id: "lightPerception", enabled: true, range: null },
    { id: "basicSight", enabled: true, range: darkvision }
  ]
});

// Helper to get darkvision from mock token
const getDarkvision = (token) => getDarkvisionFromModes(token.detectionModes);

describe('getDarkvisionFromModes', () => {
  it('returns range from basicSight mode', () => {
    const modes = [
      { id: "lightPerception", enabled: true, range: null },
      { id: "basicSight", enabled: true, range: 60 }
    ];
    expect(getDarkvisionFromModes(modes)).toBe(60);
  });

  it('returns range from darkvision mode (v12+ id)', () => {
    const modes = [
      { id: "lightPerception", enabled: true, range: null },
      { id: "darkvision", enabled: true, range: 120 }
    ];
    expect(getDarkvisionFromModes(modes)).toBe(120);
  });

  it('returns 0 when darkvision is disabled', () => {
    const modes = [
      { id: "basicSight", enabled: false, range: 60 }
    ];
    expect(getDarkvisionFromModes(modes)).toBe(0);
  });

  it('returns 0 when no darkvision mode exists', () => {
    const modes = [
      { id: "lightPerception", enabled: true, range: null }
    ];
    expect(getDarkvisionFromModes(modes)).toBe(0);
  });

  it('returns 0 for empty modes array', () => {
    expect(getDarkvisionFromModes([])).toBe(0);
  });
});

describe('darkvisionToMultiplier', () => {
  it('returns 0 for 0 darkvision', () => {
    expect(darkvisionToMultiplier(0)).toBe(0);
  });

  it('returns 1 for 60ft darkvision', () => {
    expect(darkvisionToMultiplier(60)).toBe(1);
  });

  it('returns 2 for 120ft darkvision', () => {
    expect(darkvisionToMultiplier(120)).toBe(2);
  });

  it('returns 0.5 for 30ft darkvision', () => {
    expect(darkvisionToMultiplier(30)).toBe(0.5);
  });

  it('returns 0 for negative darkvision', () => {
    expect(darkvisionToMultiplier(-10)).toBe(0);
  });
});

describe('calculateDarkvisionRadius', () => {
  const defaultParams = {
    dim: 10,
    bright: 5,
    relevantTokens: [],
    useMinimum: false,
    nightVisionDistance: 20,
    distancePixels: 20,
    nightVisionBright: false,
    sceneDisabled: false,
    lightDisabled: false,
    getDarkvision
  };

  it('returns original values when no tokens', () => {
    const result = calculateDarkvisionRadius(defaultParams);
    expect(result).toEqual({ dim: 10, bright: 5 });
  });

  it('returns original values when light disabled', () => {
    const result = calculateDarkvisionRadius({
      ...defaultParams,
      lightDisabled: true,
      relevantTokens: [createToken(60)]
    });
    expect(result).toEqual({ dim: 10, bright: 5 });
  });

  it('returns original values when scene disabled', () => {
    const result = calculateDarkvisionRadius({
      ...defaultParams,
      sceneDisabled: true,
      relevantTokens: [createToken(60)]
    });
    expect(result).toEqual({ dim: 10, bright: 5 });
  });

  it('increases dim radius with 60ft darkvision', () => {
    const result = calculateDarkvisionRadius({
      ...defaultParams,
      relevantTokens: [createToken(60)]
    });
    // dim = 10 + (1 * 20 * 20) = 410
    expect(result.dim).toBe(410);
    expect(result.bright).toBe(5);
  });

  it('increases dim radius with 120ft darkvision', () => {
    const result = calculateDarkvisionRadius({
      ...defaultParams,
      relevantTokens: [createToken(120)]
    });
    // dim = 10 + (2 * 20 * 20) = 810
    expect(result.dim).toBe(810);
  });

  it('uses max multiplier with multiple tokens (non-GM mode)', () => {
    const result = calculateDarkvisionRadius({
      ...defaultParams,
      useMinimum: false,
      relevantTokens: [createToken(60), createToken(120)]
    });
    // Should use 120ft (multiplier 2)
    expect(result.dim).toBe(810);
  });

  it('uses min multiplier with multiple tokens (GM mode)', () => {
    const result = calculateDarkvisionRadius({
      ...defaultParams,
      useMinimum: true,
      relevantTokens: [createToken(60), createToken(120)]
    });
    // Should use 60ft (multiplier 1)
    expect(result.dim).toBe(410);
  });

  it('increases bright when nightVisionBright enabled', () => {
    const result = calculateDarkvisionRadius({
      ...defaultParams,
      nightVisionBright: true,
      relevantTokens: [createToken(60)]
    });
    // bright = 5 + (1 * 20 / 2 * 20) = 205
    expect(result.bright).toBe(205);
  });

  it('handles token with 0 darkvision', () => {
    const result = calculateDarkvisionRadius({
      ...defaultParams,
      relevantTokens: [createToken(0)]
    });
    expect(result).toEqual({ dim: 10, bright: 5 });
  });

  it('handles mixed tokens with and without darkvision', () => {
    const result = calculateDarkvisionRadius({
      ...defaultParams,
      useMinimum: false,
      relevantTokens: [createToken(0), createToken(60)]
    });
    // Max of 0 and 1 = 1
    expect(result.dim).toBe(410);
  });

  it('handles mixed tokens in GM mode', () => {
    const result = calculateDarkvisionRadius({
      ...defaultParams,
      useMinimum: true,
      relevantTokens: [createToken(0), createToken(60)]
    });
    // Min of 0 and 1 = 0
    expect(result).toEqual({ dim: 10, bright: 5 });
  });
});
