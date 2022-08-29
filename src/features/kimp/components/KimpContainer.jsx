import { Button, Grid } from '@mui/material';
import { useState } from 'react';
import useUpbitTickers from '../hooks/useUpbitTickers';

import KimpList from './KimpList';

function Tickers({
  tickers,
  selectedTickers,
  onClickTicker,
}) {
  return (
    <Grid container spacing={1}>
      {tickers
        .map((ticker) => (
          <Grid
            key={ticker}
            item
            xs={1}
          >
            <Button onClick={() => onClickTicker(ticker)}>
              {ticker}
              {selectedTickers.includes(ticker) ? ' (V)' : ''}
            </Button>
          </Grid>
        ))}
    </Grid>
  );
}

function KimpContainer() {
  const [selectedTickers, setSelectedTickers] = useState([]);
  const { isLoading, data: tickers } = useUpbitTickers({
    onSuccess: setSelectedTickers,
  });

  const handleClickTicker = (ticker) => {
    if (selectedTickers.includes(ticker)) {
      setSelectedTickers(
        selectedTickers
          .filter((selectedTicker) => selectedTicker !== ticker),
      );
      return;
    }

    setSelectedTickers([...selectedTickers, ticker]);
  };

  return (
    <>
      <h1>김프</h1>
      {isLoading
        ? <p>로딩 중</p>
        : (
          <>
            <Tickers
              tickers={tickers}
              selectedTickers={selectedTickers}
              onClickTicker={handleClickTicker}
            />
            <KimpList
              tickers={
                tickers.filter((ticker) => selectedTickers.includes(ticker))
              }
            />
          </>
        )}
    </>
  );
}

export default KimpContainer;
