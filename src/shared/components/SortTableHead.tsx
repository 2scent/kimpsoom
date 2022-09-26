import { TableHead } from '@mui/material';

import StyledTableRow from './StyledTableRow';
import StyledTableCell from './StyledTableCell';
import StyledTableSortLabel from './StyledTableSortLabel';

type SortTableHeadPros<OrderBy> = {
  headCells: {
    id: OrderBy;
    label: string;
    numeric: boolean;
  }[];
  order: 'asc' | 'desc';
  orderBy: OrderBy;
  onRequestSort: (event: React.MouseEvent<unknown>, property: OrderBy) => void;
};

function SortTableHead<OrderBy extends string>({
  headCells,
  order,
  orderBy,
  onRequestSort,
}: SortTableHeadPros<OrderBy>) {
  const createSortHandler = (property: OrderBy) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <StyledTableRow>
        {headCells.map((headCell) => (
          <StyledTableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <StyledTableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
            </StyledTableSortLabel>
          </StyledTableCell>
        ))}
      </StyledTableRow>
    </TableHead>
  );
}

export default SortTableHead;
