import { useState } from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Paper from '@mui/material/Paper';

import StyledTableRow from '@/components/StyledTableRow';
import StyledTableCell from '@/components/StyledTableCell';

import { Box, TableSortLabel } from '@mui/material';
import useConnectBybit from '../hooks/useConnectBybit';
import useConnectUpbit from '../hooks/useConnectUpbit';

import KimpItem from './KimpItem';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: 'ticker',
    numeric: false,
    label: '코인',
  },
  {
    id: 'bybit',
    numeric: true,
    label: 'bybit ($)',
  },
  {
    id: 'upbit',
    numeric: true,
    label: 'upbit (￦)',
  },
  {
    id: 'kimp',
    numeric: true,
    label: '김치 프리미엄 (%)',
  },
];

function EnhancedTableHead({
  order,
  orderBy,
  onRequestSort,
}) {
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <StyledTableRow>
        {headCells.map((headCell) => (
          <StyledTableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span">
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </StyledTableCell>
        ))}
      </StyledTableRow>
    </TableHead>
  );
}

function KimpNewList({ coins }) {
  const tickers = coins.map((coin) => coin.ticker);

  useConnectUpbit({ tickers });
  useConnectBybit({ tickers });

  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('calories');

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  return (
    <TableContainer component={Paper} sx={{ width: 650 }}>
      <Table size="small" aria-label="simple table">
        <EnhancedTableHead
          order={order}
          orderBy={orderBy}
          onRequestSort={handleRequestSort}
        />
        <TableBody>
          {stableSort(coins, getComparator(order, orderBy))
            .map((coin) => (
              <KimpItem
                key={coin.ticker}
                coin={coin}
              />
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default KimpNewList;
