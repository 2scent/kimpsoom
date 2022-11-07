import { createContext, useContext } from 'react';

import { SortableColumn, Order, OrderBy } from './utils';

export interface SortableTableContext<T> {
  columns: SortableColumn<T>[];
  order: Order;
  orderBy: OrderBy;
  setOrder: React.Dispatch<React.SetStateAction<Order>>;
  setOrderBy: React.Dispatch<React.SetStateAction<OrderBy>>
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TableContext = createContext<SortableTableContext<any> | undefined>(undefined);

interface ProviderProps<T> {
  children: React.ReactNode;
  value: SortableTableContext<T>;
}

export function SortableTableProvider<T>({ children, value }: ProviderProps<T>) {
  return (
    <TableContext.Provider value={value}>{children}</TableContext.Provider>
  );
}

export function useSortableTableContext() {
  const context = useContext(TableContext);

  if (context === undefined) {
    throw new Error('useTableContext must be used within a TableProvider');
  }

  return context;
}
