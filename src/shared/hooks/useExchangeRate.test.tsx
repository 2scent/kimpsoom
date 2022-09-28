import { renderHook, waitFor } from '@testing-library/react';

import { createWrapper } from '../utils/testing/react-query';

import fetchExchangeRate from '../api/fetchExchangeRate';

import useExchangeRate from './useExchangeRate';

jest.mock('../api/fetchExchangeRate');

describe('useExchangeRate', () => {
  const exchangeRate = 1312.00;

  beforeEach(() => {
    (fetchExchangeRate as jest.Mock).mockResolvedValue(exchangeRate);
  });

  it('returns exchange rate', async () => {
    const { result } = renderHook(() => useExchangeRate(), {
      wrapper: createWrapper(),
    });

    await waitFor((
      () => expect(result.current.data).toBe(exchangeRate)
    ));
  });
});
