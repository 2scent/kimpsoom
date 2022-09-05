import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Paper from '@mui/material/Paper';

import { initCoins, selectCoins, selectedCoinsSelector } from '@/store/coinsSlice';

import StyledTableRow from '@/components/StyledTableRow';
import StyledTableCell from '@/components/StyledTableCell';
import StyledTableSortLabel from '@/components/StyledTableSortLabel';

import useConnectBybit from '../hooks/useConnectBybit';
import useConnectUpbit from '../hooks/useConnectUpbit';

import KimpItem from './KimpItem';

function descendingComparator(a, b, orderBy) {
  if (orderBy === 'foreignPrice') {
    return a[orderBy] - b[orderBy];
  }

  if (orderBy === 'koreaPrice') {
    return a[orderBy] - b[orderBy];
  }

  if (orderBy === 'kimp') {
    return (a.koreaPrice / a.foreignPrice) - (b.koreaPrice / b.foreignPrice);
  }

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
    id: 'foreignPrice',
    numeric: true,
    label: 'bybit ($)',
  },
  {
    id: 'koreaPrice',
    numeric: true,
    label: 'upbit (￦)',
  },
  {
    id: 'kimp',
    numeric: true,
    label: '김치 프리미엄 (￦)',
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

function KimpList({ tickers }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initCoins({ tickers }));
    dispatch(selectCoins({
      tickers: [
        'BTC',
        'ETH',
        'BCH',
        'DOT',
        'LINK',
        'ADA',
        'XRP',
        'XLM',
        'TRX',
      ],
    }));
  }, []);

  useConnectUpbit({ tickers });
  useConnectBybit({ tickers });

  const coins = useSelector(selectedCoinsSelector);

  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('');

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  return (
    <TableContainer component={Paper}>
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

export default KimpList;
