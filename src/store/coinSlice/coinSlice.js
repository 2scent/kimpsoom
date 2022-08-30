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
  },
});

export const {
  toggleSelectTicker,
} = actions;

export const selectSelectedTickers = (state) => state.coin.selectedTickers;

export default reducer;
