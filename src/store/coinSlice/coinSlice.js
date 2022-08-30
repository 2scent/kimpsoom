import { createSlice } from '@reduxjs/toolkit';

const initialSelectedTickers = [
  'BTC',
  'ETH',
  'BCH',
  'DOT',
  'LINK',
  'ADA',
  'XRP',
  'XLM',
  'TRX',
];

const { reducer, actions } = createSlice({
  name: 'coin',
  initialState: {
    selectedTickers: initialSelectedTickers,
    coins: [],
  },
  reducers: {
    toggleSelectTicker(state, { payload: ticker }) {
      const { selectedTickers } = state;

      if (selectedTickers.includes(ticker)) {
        return {
          ...state,
          selectedTickers: selectedTickers
            .filter((selectedTicker) => selectedTicker !== ticker),
        };
      }

      return {
        ...state,
        selectedTickers: [
          ...selectedTickers,
          ticker,
        ],
      };
    },

    setCoins(state, { payload: tickers }) {
      return {
        ...state,
        coins: tickers.map((ticker) => ({
          ticker,
          upbit: 0.0,
          bybit: 0.0,
          kimp: 0.0,
        })),
      };
    },

    setCoin(state, { payload: { ticker, name, value } }) {
      const { coins } = state;

      return {
        ...state,
        coins: coins.map(
          (coin) => (
            coin.ticker === ticker
              ? { ...coin, [name]: value }
              : coin
          ),
        ),
      };
    },
  },
});

export const {
  setCoins,
  setCoin,
  toggleSelectTicker,
} = actions;

export const selectSelectedTickers = (state) => state.coin.selectedTickers;

export const selectCoins = (state) => state.coin.coins;

export default reducer;
