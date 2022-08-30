import { useDispatch, useSelector } from 'react-redux';

import { Button, Grid } from '@mui/material';

import {
  selectSelectedTickers,
  toggleSelectTicker,
} from '@/store/coinSlice';

import useUpbitTickers from '../hooks/useUpbitTickers';

function UpbitTickers() {
  const dispatch = useDispatch();

  const { isLoading, data: tickers } = useUpbitTickers();

  const selectedTickers = useSelector(selectSelectedTickers);

  const handleClickTicker = (ticker) => dispatch(toggleSelectTicker(ticker));

  return (
    <>
      <h1>코인</h1>
      {isLoading
        ? <p>로딩 중</p>
        : (
          <Grid container spacing={1}>
            {tickers
              .map((ticker) => (
                <Grid
                  key={ticker}
                  item
                  xs={1}
                >
                  <Button onClick={() => handleClickTicker(ticker)}>
                    {ticker}
                    {selectedTickers.includes(ticker) && ' (V)'}
                  </Button>
                </Grid>
              ))}
          </Grid>
        )}
    </>
  );
}

export default UpbitTickers;
