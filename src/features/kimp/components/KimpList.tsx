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

type Coin = {
  ticker: string;
  koreaPrice: number;
  foreignPrice: number;
};

const descendingComparators = {
  default: () => 0,

  ticker: (a: Coin, b: Coin) => {
    if (b.ticker < a.ticker) {
      return -1;
    }
    if (b.ticker > a.ticker) {
      return 1;
    }
    return 0;
  },

  foreignPrice: (a: Coin, b: Coin) => a.foreignPrice - b.foreignPrice,

  koreaPrice: (a: Coin, b: Coin) => a.koreaPrice - b.koreaPrice,

  kimp: (a: Coin, b: Coin) => (a.koreaPrice / a.foreignPrice) - (b.koreaPrice / b.foreignPrice),
};

type Order = 'asc' | 'desc';

type OrderBy = 'default' | 'ticker' | 'foreignPrice' | 'koreaPrice' | 'kimp';

function getComparator(order: Order, orderBy: OrderBy) {
  const comparator = descendingComparators[orderBy];

  return order === 'desc'
    ? (a: Coin, b: Coin) => comparator(a, b)
    : (a: Coin, b: Coin) => -comparator(a, b);
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

type KimpListProps = {
  tickers: string[];
};

function KimpList({ tickers }: KimpListProps) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initCoins({ tickers }));
    dispatch(selectCoins({ tickers: defaultSelectTickers }));
  }, []);

  useConnectUpbit({ tickers });
  useConnectBybit({ tickers });

  const coins = useSelector(selectedCoinsSelector);

  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<OrderBy>('default');

  const handleRequestSort = (_: any, property: OrderBy) => {
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
            .map((coin: Coin) => (
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
