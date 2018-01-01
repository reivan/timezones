import { addHours } from './utils';

describe('hours adder', () => {
  it('adds normally', () => {
    expect(addHours(1, 2)).toBe(3);
  });
  
  it('loops numbers', () => {
    expect(addHours(23, 1)).toBe(0);
  });
  
  it('works with negative numbers', () => {
    expect(addHours(0, -1)).toBe(23);
  });
});
