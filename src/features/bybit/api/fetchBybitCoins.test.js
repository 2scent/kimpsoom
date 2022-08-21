import axios from 'axios';

import BYBIT_COINS from '@fixtures/bybit-coins';

import fetchBybitCoins from './fetchBybitCoins';

jest.mock('axios');

describe('fetchBybitCoins', () => {
  beforeEach(() => {
    axios.get.mockResolvedValue({ data: { result: BYBIT_COINS } });
  });

  it('returns bybit coins', async () => {
    const upbitCoins = await fetchBybitCoins();

    expect(upbitCoins).toEqual(BYBIT_COINS);
  });
});
