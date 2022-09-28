import { renderHook, waitFor } from '@testing-library/react';

import TICKERS from '@fixtures/tickers';

import { createWrapper } from '@/shared/utils/testing/react-query';

import fetchUpbitTickers from '../api/fetchUpbitTickers';

import useUpbitTickers from './useUpbitTickers';

jest.mock('../api/fetchUpbitTickers');

describe('useUpbitCoins', () => {
  beforeEach(() => {
    (fetchUpbitTickers as jest.Mock).mockResolvedValue(TICKERS);
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
