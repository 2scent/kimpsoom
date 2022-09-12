import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import {
  Table,
  TableBody,
  TableContainer,
  Paper,
} from '@mui/material';

import {
  initCoins,
  selectCoins,
  selectedCoinsSelector,
} from '@/shared/store/coinsSlice';

import stableSort from '@/shared/utils/stableSort';

import SortTableHead from '@/shared/components/SortTableHead';
import useConnectBybit from '../hooks/useConnectBybit';
import useConnectUpbit from '../hooks/useConnectUpbit';

import KimpItem from './KimpItem';

const defaultComparator = () => 0;

const descendingComparators = {
  ticker: (a, b) => {
    if (b.ticker < a.ticker) {
      return -1;
    }
    if (b.ticker > a.ticker) {
      return 1;
    }
    return 0;
  },

  foreignPrice: (a, b) => a.foreignPrice - b.foreignPrice,

  koreaPrice: (a, b) => a.koreaPrice - b.koreaPrice,

  kimp: (a, b) => (a.koreaPrice / a.foreignPrice) - (b.koreaPrice / b.foreignPrice),
};

function getComparator(order, orderBy) {
  const comparator = descendingComparators[orderBy] || defaultComparator;

  return order === 'desc'
    ? (a, b) => comparator(a, b)
    : (a, b) => -comparator(a, b);
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

const defaultSelectTickers = [
  'BTC',
  'ETH',
  'BCH',
  'DOT',
  'LINK',
  'ADA',
  'XRP',
  'XLM',
  'TRX',
];

function KimpList({ tickers }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initCoins({ tickers }));
    dispatch(selectCoins({ tickers: defaultSelectTickers }));
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
        <SortTableHead
          headCells={headCells}
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
