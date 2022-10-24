import { renderHook } from '@testing-library/react';
import { useSortableTableContext } from './useSortableTableContext';

describe('useSortableTableContext', () => {
  it('test', () => {
    renderHook(() => {
      expect(() => useSortableTableContext()).toThrow(new Error('useTableContext must be used within a TableProvider'));
    });
  });
});
