import fetchExchangeRate from './fetch-exchange-rate';

describe('fetchExchangeRate', () => {
  it('returns exchange rate', async () => {
    const exchangeRate = await fetchExchangeRate();

    expect(typeof exchangeRate).toBe('number');
  });
});
