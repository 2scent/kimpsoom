import { renderHook, waitFor } from '@testing-library/react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { fetchExchangeRate } from '../services/api';

import useExchangeRate from './useExchangeRate';

jest.mock('../services/api');

const createWrapper = () => {
  const queryClient = new QueryClient();

  return function Wrapper({ children }) {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
  };
};

describe('useExchangeRate', () => {
  const exchangeRate = 1312.00;

  beforeEach(() => {
    fetchExchangeRate.mockResolvedValue(exchangeRate);
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
