import { renderHook, waitFor } from '@testing-library/react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import TICKERS from '@fixtures/tickers';

import fetchUpbitTickers from '../api/fetchUpbitTickers';

import useUpbitTickers from './useUpbitTickers';

jest.mock('../api/fetchUpbitTickers');

const createWrapper = () => {
  const queryClient = new QueryClient();

  return function Wrapper({ children }) {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
  };
};

describe('useUpbitCoins', () => {
  beforeEach(() => {
    fetchUpbitTickers.mockResolvedValue(TICKERS);
  });

  it('returns upbit krw market tickers', async () => {
    const { result } = renderHook(() => useUpbitTickers(), {
      wrapper: createWrapper(),
    });

    await waitFor((
      () => expect(result.current.data).toEqual(TICKERS)
    ));
  });
});
