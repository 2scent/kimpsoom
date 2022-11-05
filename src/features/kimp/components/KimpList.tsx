import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import {
  initCoins,
  selectCoins,
  selectedCoinsSelector,
} from '@/shared/store/coinsSlice';

import SortableTable, { SortableColumn } from '@/shared/components/SortableTable';

import {
  Coin,
  foreignPriceComparator,
  kimpComparator,
  koreaPriceComparator,
  tickerCompartor,
} from '../utils/comparators';

import useConnectBybit from '../hooks/useConnectBybit';
import useConnectUpbit from '../hooks/useConnectUpbit';

import KimpItem from './KimpItem';

const columns: SortableColumn<Coin>[] = [
  {
    id: 'ticker',
    numeric: false,
    label: '코인',
    comparator: tickerCompartor,
  },
  {
    id: 'foreignPrice',
    numeric: true,
    label: 'bybit ($)',
    comparator: foreignPriceComparator,
  },
  {
    id: 'koreaPrice',
    numeric: true,
    label: 'upbit (￦)',
    comparator: koreaPriceComparator,
  },
  {
    id: 'kimp',
    numeric: true,
    label: '김치 프리미엄 (￦)',
    comparator: kimpComparator,
  },
];

export const defaultSelectedTickers = [
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

interface KimpListProps {
  tickers: string[];
}

function KimpList({ tickers }: KimpListProps) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initCoins({ tickers }));
    dispatch(selectCoins({ tickers: defaultSelectedTickers }));
  }, []);

  useConnectUpbit(tickers);
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
