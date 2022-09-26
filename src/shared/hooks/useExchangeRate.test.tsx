import { ReactNode } from 'react';

import { renderHook, waitFor } from '@testing-library/react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import fetchExchangeRate from '../api/fetchExchangeRate';

import useExchangeRate from './useExchangeRate';

jest.mock('../api/fetchExchangeRate');

const createWrapper = () => {
  const queryClient = new QueryClient();

  return function Wrapper({ children }: { children: ReactNode }) {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
  };
};

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
