import { waitFor } from '@testing-library/react';

import { renderHookWithClient } from '../utils/react-query-testing';

import fetchExchangeRate from '../api/fetch-exchange-rate';

import useExchangeRate from './use-exchange-rate';

jest.mock('../api/fetch-exchange-rate');

describe('useExchangeRate', () => {
  const exchangeRate = 1312.00;

  beforeEach(() => {
    (fetchExchangeRate as jest.Mock).mockResolvedValue(exchangeRate);
  });

  it('returns exchange rate', async () => {
    const { result } = renderHookWithClient(() => useExchangeRate());

    await waitFor((
      () => expect(result.current.data).toBe(exchangeRate)
    ));
  });
});
