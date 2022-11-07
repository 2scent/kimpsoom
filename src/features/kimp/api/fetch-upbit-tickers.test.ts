import fetchUpbitTickers from './fetch-upbit-tickers';

describe('fetchUpbitTickers', () => {
  it('returns upbit coins', async () => {
    const tickers = await fetchUpbitTickers();

    tickers.forEach((
      (ticker) => expect(typeof ticker).toBe('string')
    ));
  });
});
