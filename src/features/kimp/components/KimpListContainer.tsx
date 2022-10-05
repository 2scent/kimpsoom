import useUpbitKrwTickers from '../hooks/useUpbitTickers';

import KimpList from './KimpList';

function KimpListContainer() {
  const { data: tickers } = useUpbitKrwTickers();

  return (
    <KimpList
      tickers={tickers ?? []}
    />
  );
}

export default KimpListContainer;
