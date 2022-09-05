import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import { Button, Grid } from '@mui/material';

import {
  selectedTickersSelector,
  toggleSelectCoin,
} from '@/store/coinsSlice';

import useUpbitTickers from '../hooks/useUpbitTickers';

function UpbitTickers() {
  const dispatch = useDispatch();

  const { isLoading, data: tickers } = useUpbitTickers();

  const selectedTickers = useSelector(selectedTickersSelector, shallowEqual);

  const handleClickTicker = (ticker) => dispatch(toggleSelectCoin({ ticker }));

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
