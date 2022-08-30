import { render } from '@testing-library/react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { useDispatch, useSelector } from 'react-redux';

import TICKERS from '@fixtures/tickers';

import useUpbitTickers from '../hooks/useUpbitTickers';

import UpbitTickers from './UpbitTickers';

jest.mock('../hooks/useUpbitTickers');

describe('UpbitTickers', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    useDispatch.mockReturnValue(dispatch);
    useSelector.mockReturnValue(TICKERS);

    useUpbitTickers.mockImplementation(() => ({
      isLoading: given.isLoading,
      data: TICKERS,
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const queryClient = new QueryClient();

  const renderUpbitTickers = () => render((
    <QueryClientProvider client={queryClient}>
      <UpbitTickers />
    </QueryClientProvider>
  ));

  it('renders heading', () => {
    const { container } = renderUpbitTickers();

    expect(container).toHaveTextContent('코인');
  });

  context('when loading', () => {
    given('isLoading', () => true);

    it('renders loading', () => {
      const { container } = renderUpbitTickers();

      expect(container).toHaveTextContent('로딩 중');
    });
  });

  context('when loaded', () => {
    given('isLoading', () => false);

    it('renders tickers', () => {
      const { container } = renderUpbitTickers();

      TICKERS.forEach(
        (ticker) => expect(container).toHaveTextContent(ticker),
      );
    });
  });
});
