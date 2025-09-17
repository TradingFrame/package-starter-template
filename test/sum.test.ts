import { describe, it, expect } from 'vitest';
import { sum } from '../src/index';

describe('sum', () => {
  it('adds two positive numbers', () => {
    expect(sum(2, 3)).toBe(5);
  });

  it('handles negatives', () => {
    expect(sum(-2, 3)).toBe(1);
  });

  it('handles zeros', () => {
    expect(sum(0, 0)).toBe(0);
  });
});
