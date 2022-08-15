import { renderHook, waitFor } from '@testing-library/react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import UPBIT_COINS from '../../fixtures/upbit-coins';

import { fetchUpbitCoins } from '../services/api';

import useUpbitCoins from './useUpbitCoins';

jest.mock('../services/api');

const createWrapper = () => {
  const queryClient = new QueryClient();

  return function Wrapper({ children }) {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
  };
};

describe('useUpbitCoins', () => {
  beforeEach(() => {
    fetchUpbitCoins.mockResolvedValue(UPBIT_COINS);
  });

  it('returns upbit krw market coins', async () => {
    const { result } = renderHook(() => useUpbitCoins(), {
      wrapper: createWrapper(),
    });

    await waitFor((
      () => expect(result.current.data).toEqual((
        UPBIT_COINS.filter((coin) => coin.market.startsWith('KRW'))
      ))
    ));
  });
});
