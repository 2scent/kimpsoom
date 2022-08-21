import axios from 'axios';

import fetchExchangeRate from './fetchExchangeRate';

jest.mock('axios');

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
