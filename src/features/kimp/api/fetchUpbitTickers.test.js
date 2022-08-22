import axios from 'axios';

import UPBIT_COINS from '@fixtures/upbit-coins';

import fetchUpbitTickers from './fetchUpbitTickers';

jest.mock('axios');

describe('fetchUpbitTickers', () => {
  beforeEach(() => {
    axios.get.mockResolvedValue({ data: UPBIT_COINS });
  });

  it('returns upbit coins', async () => {
    const upbitCoins = await fetchUpbitTickers();

    expect(upbitCoins).toEqual(
      UPBIT_COINS
        .filter((coin) => coin.market.startsWith('KRW'))
        .map((coin) => coin.market)
        .map((market) => market.split('-')[1]),
    );
  });
});
