import { configureStore } from '@reduxjs/toolkit';

import coinsReducer from './coinsSlice';

const store = configureStore({
  reducer: {
    coins: coinsReducer,
  },
});

export default store;
