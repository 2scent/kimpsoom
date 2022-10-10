import { ReactNode, useState } from 'react';

import {
  Table,
  TableContainer,
  Paper,
} from '@mui/material';

import { SortableTableProvider } from './useSortableTableContext';

import Header from './components/Header';
import Items from './components/Items';

export type Order = 'asc' | 'desc';

export type OrderBy = string | undefined;

export interface SortableColumn<T> {
  id: string;
  label: string;
  numeric: boolean;
  comparator: (a: T, b: T) => number;
}

type SortableTableProps<T> = {
  columns: SortableColumn<T>[];
  children: ReactNode;
};

function SortableTable<Data>({
  columns,
  children,
}: SortableTableProps<Data>) {
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<OrderBy>();

  return (
    <SortableTableProvider
      value={{
        columns,
        order,
        setOrder,
        orderBy,
        setOrderBy,
      }}
    >
      <TableContainer component={Paper}>
        <Table size="small" aria-label="simple table">
          {children}
        </Table>
      </TableContainer>
    </SortableTableProvider>
  );
}

SortableTable.Header = Header;
SortableTable.Items = Items;

export default SortableTable;
