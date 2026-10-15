import { describe, expect, it } from 'vitest';
import { ageOn, formatCpf, formatPhone } from './people';

describe('people', () => {
  it('formats CPF and phone numbers', () => {
    expect(formatCpf('52998224725')).toBe('529.982.247-25');
    expect(formatPhone('11987654321')).toBe('(11) 98765-4321');
    expect(formatPhone('1133334444')).toBe('(11) 3333-4444');
  });

  it('counts a birthday only once it has happened', () => {
    const today = new Date(2026, 9, 15);
    expect(ageOn('2008-10-15', today)).toBe(18);
    expect(ageOn('2008-10-16', today)).toBe(17);
  });
});
