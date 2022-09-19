import { createSlice } from '@reduxjs/toolkit';

type Coin = {
  ticker: string;
  koreaPrice?: number;
  foreignPrice?: number;
  selected: boolean;
};

type Ticker = Coin['ticker'];

type CoinSliceState = {
  coins: Coin[];
};

type StoreState = {
  coins: CoinSliceState;
};

const initialState: CoinSliceState = {
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

export const coinsSelector = (state: StoreState) => state.coins.coins;

export const selectedCoinsSelector = (state: StoreState) => state.coins.coins
  .filter((coin) => coin.selected);

export const selectedTickersSelector = (state: StoreState) => state.coins.coins
  .filter((coin) => coin.selected)
  .map((coin) => coin.ticker);

export default reducer;
