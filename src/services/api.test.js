import axios from 'axios';

import BYBIT_COINS from '../../fixtures/bybit-coins';
import UPBIT_COINS from '../../fixtures/upbit-coins';

import {
  fetchBybitCoins,
  fetchExchangeRate,
  fetchUpbitCoins,
} from './api';

jest.mock('axios');

describe('api', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('fetchUpbitCoins', () => {
    beforeEach(() => {
      axios.get.mockResolvedValue({ data: UPBIT_COINS });
    });

    it('returns upbit coins', async () => {
      const upbitCoins = await fetchUpbitCoins();

      expect(upbitCoins).toEqual(UPBIT_COINS);
    });
  });

  describe('fetchBybitCoins', () => {
    beforeEach(() => {
      axios.get.mockResolvedValue({ data: { result: BYBIT_COINS } });
    });

    it('returns bybit coins', async () => {
      const upbitCoins = await fetchBybitCoins();

      expect(upbitCoins).toEqual(BYBIT_COINS);
    });
  });

  describe('fetchExchangeRate', () => {
    const basePrice = 1312.00;

    beforeEach(() => {
      axios.get.mockResolvedValue({ data: [{ basePrice }] });
    });

    it('returns exchange rate', async () => {
      const exchangeRate = await fetchExchangeRate();

      expect(exchangeRate).toBe(basePrice);
    });
  });
});
