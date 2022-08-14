import axios from 'axios';

import UPBIT_COINS from '../../fixtures/upbit-coins';

import { fetchUpbitCoins } from './api';

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
});
