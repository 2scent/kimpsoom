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

function KimpList({ tickers }) {
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
        {/* <TableHead>
          <StyledTableRow>
            <StyledTableCell>코인</StyledTableCell>
            <StyledTableCell align="right">bybit ($)</StyledTableCell>
            <StyledTableCell align="right">upbit (￦)</StyledTableCell>
            <StyledTableCell align="right">김치 프리미엄 (%)</StyledTableCell>
          </StyledTableRow>
        </TableHead> */}
        <EnhancedTableHead
          order={order}
          orderBy={orderBy}
          onRequestSort={handleRequestSort}
        />
        <TableBody>
          {tickers
            .sort(getComparator(order, orderBy))
            .map((ticker) => (
              <KimpItem
                key={ticker}
                ticker={ticker}
              />
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default KimpList;
