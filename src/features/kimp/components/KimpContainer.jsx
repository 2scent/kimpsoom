import { useSelector } from 'react-redux';

import { selectSelectedTickers } from '@/store/coinSlice';

import useUpbitTickers from '../hooks/useUpbitTickers';

import KimpList from './KimpList';

function KimpContainer() {
  const selectedTickers = useSelector(selectSelectedTickers);

  const { isLoading, data: tickers } = useUpbitTickers({
    select: (data) => data.filter((ticker) => selectedTickers.includes(ticker)),
  });

  return (
    <>
      <h1>김프</h1>
      {isLoading
        ? <p>로딩 중</p>
        : (
          <KimpList
            tickers={tickers}
          />
        )}
    </>
  );
}

export default KimpContainer;
