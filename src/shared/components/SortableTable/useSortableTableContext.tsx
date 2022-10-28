import { createContext, useContext } from 'react';

import { SortableColumn, Order, OrderBy } from './utils';

type ContextProps<T> = {
  columns: SortableColumn<T>[];
  order: Order;
  orderBy: OrderBy;
  setOrder: React.Dispatch<React.SetStateAction<Order>>;
  setOrderBy: React.Dispatch<React.SetStateAction<OrderBy>>
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TableContext = createContext<ContextProps<any> | undefined>(undefined);

type ProviderProps<T> = {
  children: React.ReactNode;
  value: ContextProps<T>;
};

function SortableTableProvider<T>({ children, value }: ProviderProps<T>) {
  return (
    <TableContext.Provider value={value}>{children}</TableContext.Provider>
  );
}

function useSortableTableContext() {
  const context = useContext(TableContext);

  if (context === undefined) {
    throw new Error('useTableContext must be used within a TableProvider');
  }

  return context;
}

export { SortableTableProvider, useSortableTableContext };
