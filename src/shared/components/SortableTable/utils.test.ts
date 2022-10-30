import { getComparator, SortableColumn } from './utils';

describe('getComparator', () => {
  const columns: SortableColumn<number>[] = [
    {
      id: 'id',
      numeric: true,
      label: 'label',
      comparator: (a, b) => a - b,
    },
  ];

  context('when order is asc', () => {
    const comparator = getComparator(columns, 'asc', 'id');

    it('returns negative comparator', () => {
      expect(comparator(200, 100)).toBeGreaterThan(0);
    });
  });

  context('when order is desc', () => {
    const comparator = getComparator(columns, 'desc', 'id');

    it('returns positive comparator', () => {
      expect(comparator(200, 100)).toBeLessThan(0);
    });
  });

  context('without comparator', () => {
    const comparator = getComparator(columns, 'asc', 'default');

    it('returns default comparator', () => {
      expect(comparator(200, 100)).toBe(0);
    });
  });
});
