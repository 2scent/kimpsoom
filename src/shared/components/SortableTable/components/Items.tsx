import { TableBody } from '@mui/material';

import stableSort from '@/shared/utils/sort/stable-sort';

import { useSortableTableContext } from '../useSortableTableContext';

import { getComparator } from '../utils';

type ItemsProps<T> = {
  items: T[];
  render: (item: T) => JSX.Element;
};

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
