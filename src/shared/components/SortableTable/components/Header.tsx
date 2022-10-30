import { TableHead } from '@mui/material';

import StyledTableRow from '@/shared/components/StyledTableRow';
import StyledTableCell from '@/shared/components/StyledTableCell';
import StyledTableSortLabel from '@/shared/components/StyledTableSortLabel';

import { useSortableTableContext } from '../useSortableTableContext';

function Header() {
  const {
    columns,
    order,
    orderBy,
    setOrder,
    setOrderBy,
  } = useSortableTableContext();

  const createSortHandler = (columndId: string) => () => {
    const isAsc = orderBy === columndId && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(columndId);
  };

  return (
    <TableHead>
      <StyledTableRow>
        {columns.map((column) => (
          <StyledTableCell
            key={column.id as React.Key}
            align={column.numeric ? 'right' : 'left'}
            sortDirection={orderBy === column.id ? order : false}
          >
            <StyledTableSortLabel
              active={orderBy === column.id}
              direction={orderBy === column.id ? order : 'asc'}
              onClick={createSortHandler(column.id)}
            >
              {column.label}
            </StyledTableSortLabel>
          </StyledTableCell>
        ))}
      </StyledTableRow>
    </TableHead>
  );
}

export default Header;
