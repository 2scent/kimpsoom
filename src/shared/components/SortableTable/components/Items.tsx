import { TableBody } from '@mui/material';

import stableSort from '@/shared/utils/sort/stable-sort';

import { useSortableTableContext } from '../useSortableTableContext';

import { SortableColumn, Order } from '../SortableTable';

const defaultComparator = () => 0;

function getComparator<T>(columns: SortableColumn<T>[], order: Order, orderBy?: string) {
  const column = columns.find((cell) => cell.id === orderBy);
  const comparator = column?.comparator || defaultComparator;

  return order === 'desc'
    ? (a: T, b: T) => comparator(a, b)
    : (a: T, b: T) => -comparator(a, b);
}

type ItemsProps<T> = {
  items: T[];
  render: (item: T) => JSX.Element;
};

function Items<T>({ items: data, render }: ItemsProps<T>) {
  const { columns, order, orderBy } = useSortableTableContext();

  return (
    <TableBody>
      {
      stableSort(data, getComparator(columns, order, orderBy))
        .map(render)
}
    </TableBody>
  );
}

export default Items;
