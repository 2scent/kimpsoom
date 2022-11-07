import { renderHook } from '@testing-library/react';

import {
  SortableTableContext,
  SortableTableProvider,
  useSortableTableContext,
} from './use-sortable-table-context';

describe('useSortableTableContext', () => {
  context('with SortableTableProvider', () => {
    const sortableTableContext = {
      columns: [],
      order: 'asc',
      setOrder: () => {},
      orderBy: 'orderBy',
      setOrderBy: () => {},
    } as SortableTableContext<unknown>;

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <SortableTableProvider value={sortableTableContext}>
        {children}
      </SortableTableProvider>
    );

    it('returns SortableTableContext', () => {
      const { result: { current } } = renderHook(() => useSortableTableContext(), { wrapper });

      expect(current).toBe(sortableTableContext);
    });
  });

  context('without SortableTableProvider', () => {
    it('throws error', () => {
      renderHook(() => {
        expect(() => useSortableTableContext()).toThrow(new Error('useTableContext must be used within a TableProvider'));
      });
    });
  });
});
