import stableSort from './stable-sort';

describe('stableSort', () => {
  it('returns a new sorted array without changing the original', () => {
    const original = ['March', 'Jan', 'Feb', 'Dec'];

    const sorted = stableSort(original);

    expect(original).toEqual(['March', 'Jan', 'Feb', 'Dec']);
    expect(sorted).toEqual(['Dec', 'Feb', 'Jan', 'March']);
  });
});
