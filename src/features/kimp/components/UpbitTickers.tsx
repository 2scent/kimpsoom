import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import { Grid } from '@mui/material';

import {
  selectedTickersSelector,
  toggleSelectCoin,
} from '@/shared/store/coinsSlice';

import useUpbitTickers from '../hooks/useUpbitTickers';

import TickerButton from './TickerButton';

function UpbitTickers() {
  const dispatch = useDispatch();

  const { data: tickers } = useUpbitTickers();

  const selectedTickers = useSelector(selectedTickersSelector, shallowEqual);

  const handleClickTicker = (ticker: string) => dispatch(toggleSelectCoin({ ticker }));

  return (
    <Grid
      container
      spacing={1}
    >
      {tickers
        ?.map((ticker) => (
          <Grid
            key={ticker}
            item
            xs={1}
          >
            <TickerButton
              ticker={ticker}
              selected={selectedTickers.includes(ticker)}
              onClick={handleClickTicker}
            />
          </Grid>
        ))}
    </Grid>
  );
}

export default UpbitTickers;
