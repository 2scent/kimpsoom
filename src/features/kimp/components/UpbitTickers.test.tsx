import { fireEvent, render } from '@testing-library/react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { useDispatch, useSelector } from 'react-redux';

import TICKERS from '@fixtures/tickers';

import { toggleSelectCoin } from '@/shared/store/coinsSlice';

import useUpbitTickers from '../hooks/useUpbitTickers';

import UpbitTickersContainer from './UpbitTickersContainer';

jest.mock('../hooks/useUpbitTickers');

describe('UpbitTickersContainer', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    (useDispatch as jest.Mock).mockReturnValue(dispatch);
    (useSelector as jest.Mock).mockReturnValue([]);

    (useUpbitTickers as jest.Mock).mockImplementation(() => ({
      data: TICKERS,
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const queryClient = new QueryClient();

  const renderUpbitTickersContainer = () => render((
    <QueryClientProvider client={queryClient}>
      <UpbitTickersContainer />
    </QueryClientProvider>
  ));
  
  it('renders tickers', () => {
    const { container } = renderUpbitTickersContainer();

    TICKERS.forEach(
      (ticker) => expect(container).toHaveTextContent(ticker),
    );
  });

  it('listens click event', () => {
    const { getByRole } = renderUpbitTickersContainer();

    TICKERS.forEach(
      (ticker) => {
        fireEvent.click(getByRole('button', { name: ticker }));
        expect(dispatch).toBeCalledWith(toggleSelectCoin({ ticker }));
      },
    );
  });
});
