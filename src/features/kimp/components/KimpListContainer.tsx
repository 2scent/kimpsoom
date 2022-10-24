import useUpbitTickers from '../hooks/useUpbitTickers';

import KimpList from './KimpList';

function KimpListContainer() {
  const { data: tickers = [] } = useUpbitTickers();

  return (
    <KimpList
      tickers={tickers}
    />
  );
}

export default KimpListContainer;
