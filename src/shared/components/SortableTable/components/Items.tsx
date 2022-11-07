import { TableBody } from '@mui/material';

import stableSort from '@/shared/utils/stable-sort';

import { useSortableTableContext } from '../use-sortable-table-context';

import { getComparator } from '../utils';

interface ItemsProps<T> {
  items: T[];
  render: (item: T) => JSX.Element;
}

function Items<T>({ items: data, render }: ItemsProps<T>) {
  const { columns, order, orderBy } = useSortableTableContext();

  return (
    <TableBody>
      {stableSort(data, getComparator(columns, order, orderBy))
        .map(render)}
    </TableBody>
  );
}

export default Items;
