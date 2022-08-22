import useUpbitTickers from '../hooks/useUpbitTickers';

import KimpList from './KimpList';

function KimpContainer() {
  const { isLoading, data: tickers } = useUpbitTickers();

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
