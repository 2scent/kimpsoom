import { renderHook, waitFor } from '@testing-library/react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import BYBIT_COINS from '../../fixtures/bybit-coins';

import { fetchBybitCoins } from '../services/api';

import useBybitCoins from './useBybitCoins';

jest.mock('../services/api');

const createWrapper = () => {
  const queryClient = new QueryClient();

  return function Wrapper({ children }) {
    return (
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    );
  };
};

describe('useBybitCoins', () => {
  beforeEach(() => {
    fetchBybitCoins.mockResolvedValue(BYBIT_COINS);
  });

  it('returns bybit usdt market coins', async () => {
    const { result } = renderHook(() => useBybitCoins(), {
      wrapper: createWrapper(),
    });

    await waitFor((
      () => expect(result.current.data).toEqual((
        BYBIT_COINS.filter((coin) => coin.quote_currency === 'USDT')
      ))
    ));
  });
});
