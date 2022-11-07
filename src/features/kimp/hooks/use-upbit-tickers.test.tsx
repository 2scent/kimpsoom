import { waitFor } from '@testing-library/react';

import TICKERS from '@fixtures/tickers';

import { renderHookWithClient } from '@/shared/utils/react-query-testing';

import fetchUpbitTickers from '../api/fetch-upbit-tickers';

import useUpbitTickers from './use-upbit-tickers';

jest.mock('../api/fetch-upbit-tickers');

describe('useUpbitTickers', () => {
  beforeAll(() => {
    (fetchUpbitTickers as jest.Mock).mockResolvedValue(TICKERS);
  });

  it('returns upbit tickers', async () => {
    const { result } = renderHookWithClient(() => useUpbitTickers());

    await waitFor((
      () => expect(result.current.data).toEqual(TICKERS)
    ));
  });
});
