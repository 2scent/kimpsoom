import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import {
  initCoins,
  selectCoins,
  selectedCoinsSelector,
} from '@/shared/store/coinsSlice';

import SortableTable, { SortableColumn } from '@/shared/components/SortableTable';

import useConnectBybit from '../hooks/useConnectBybit';
import useConnectUpbit from '../hooks/useConnectUpbit';

import KimpItem from './KimpItem';

type Coin = {
  ticker: string;
  koreaPrice?: number;
  foreignPrice?: number;
  kimp?: unknown;
};

const columns: SortableColumn<Coin>[] = [
  {
    id: 'ticker',
    numeric: false,
    label: '코인',
    comparator: (a, b) => {
      if (b.ticker < a.ticker) {
        return -1;
      }
      if (b.ticker > a.ticker) {
        return 1;
      }
      return 0;
    },
  },
  {
    id: 'foreignPrice',
    numeric: true,
    label: 'bybit ($)',
    comparator: (a, b) => (a.foreignPrice ?? 0) - (b.foreignPrice ?? 0),
  },
  {
    id: 'koreaPrice',
    numeric: true,
    label: 'upbit (￦)',
    comparator: (a, b) => (a.koreaPrice ?? 0) - (b.koreaPrice ?? 0),
  },
  {
    id: 'kimp',
    numeric: true,
    label: '김치 프리미엄 (￦)',
    comparator: (a, b) => ((a.koreaPrice ?? 0) / (a.foreignPrice ?? 0))
      - ((b.koreaPrice ?? 0) / (b.foreignPrice ?? 0)),
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
  useConnectBybit(tickers);

  const coins = useSelector(selectedCoinsSelector);

  return (
    <SortableTable columns={columns}>
      <SortableTable.Header />
      <SortableTable.Items
        items={coins}
        render={(coin) => (
          <KimpItem
            key={coin.ticker}
            coin={coin}
          />
        )}
      />
    </SortableTable>
  );
}

export default KimpList;
