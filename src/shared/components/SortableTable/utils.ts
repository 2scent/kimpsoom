export type Order = 'asc' | 'desc';

export type OrderBy = string | undefined;

export interface SortableColumn<T> {
  id: string;
  label: string;
  numeric: boolean;
  comparator: (a: T, b: T) => number;
}

const defaultComparator = () => 0;

export function getComparator<T>(columns: SortableColumn<T>[], order: Order, orderBy?: string) {
  const column = columns.find((cell) => cell.id === orderBy);
  const comparator = column?.comparator || defaultComparator;

  return order === 'desc'
    ? (a: T, b: T) => comparator(a, b)
    : (a: T, b: T) => -comparator(a, b);
}
