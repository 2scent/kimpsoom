import { createSlice } from '@reduxjs/toolkit';

import { RootState } from './index';

type SelectableCoin = {
  readonly ticker: string;
  readonly koreaPrice?: number;
  readonly foreignPrice?: number;
  readonly selected?: boolean;
};

export interface CoinsState {
  readonly coins: SelectableCoin[];
}

const initialState: CoinsState = {
  coins: [],
};

const { reducer, actions } = createSlice({
  name: 'coins',
  initialState,
  reducers: {
    initCoins(state, { payload: { tickers } }) {
      return {
        ...state,
        coins: tickers.map((ticker: Ticker) => ({
          ticker,
          koreaPrice: null,
          foreignPrice: null,
          selected: false,
        })),
      };
    },

    selectCoins(state, { payload: { tickers } }) {
      const { coins } = state;

      return {
        ...state,
        coins: coins.map((
          (coin) => (tickers.includes(coin.ticker)
            ? { ...coin, selected: true }
            : coin)
        )),
      };
    },

    toggleSelectCoin(state, { payload: { ticker } }) {
      const { coins } = state;

      return {
        ...state,
        coins: coins.map((
          (coin) => (coin.ticker === ticker
            ? { ...coin, selected: !coin.selected }
            : coin)
        )),
      };
    },

    changeKoreaPrice(state, { payload: { ticker, koreaPrice } }) {
      const { coins } = state;

      return {
        ...state,
        coins: coins.map((
          (coin) => (coin.ticker === ticker
            ? { ...coin, koreaPrice }
            : coin)
        )),
      };
    },

    changeForeignPrice(state, { payload: { ticker, foreignPrice } }) {
      const { coins } = state;

      return {
        ...state,
        coins: coins.map((
          (coin) => (coin.ticker === ticker
            ? { ...coin, foreignPrice }
            : coin)
        )),
      };
    },
  },
});

export const {
  initCoins,
  selectCoins,
  toggleSelectCoin,
  changeKoreaPrice,
  changeForeignPrice,
} = actions;

export const coinsSelector = (state: RootState) => state.coins.coins;

export const selectedCoinsSelector = (state: RootState) => state.coins.coins
  .filter((coin) => coin.selected);

export const selectedTickersSelector = (state: RootState) => state.coins.coins
  .filter((coin) => coin.selected)
  .map((coin) => coin.ticker);

export default reducer;
