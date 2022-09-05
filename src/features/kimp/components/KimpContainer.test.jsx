import { render } from '@testing-library/react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { useDispatch, useSelector } from 'react-redux';

import TICKERS from '@fixtures/tickers';

import useUpbitTickers from '../hooks/useUpbitTickers';

import KimpContainer from './KimpContainer';

jest.mock('../hooks/useConnectBybit');
jest.mock('../hooks/useConnectUpbit');
jest.mock('../hooks/useUpbitTickers');

describe('KimpContainer', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    useDispatch.mockReturnValue(dispatch);
    useSelector.mockReturnValue(TICKERS.map((ticker) => ({ ticker })));

    useUpbitTickers.mockImplementation(() => ({
      isLoading: given.isLoading,
      data: TICKERS,
    }));
  });

  const queryClient = new QueryClient();

  const renderKimpContainer = () => render((
    <QueryClientProvider client={queryClient}>
      <KimpContainer />
    </QueryClientProvider>
  ));

  it('renders heading', () => {
    const { container } = renderKimpContainer();

    expect(container).toHaveTextContent('김프');
  });

  context('when loading', () => {
    given('isLoading', () => true);

    it('renders loading', () => {
      const { container } = renderKimpContainer();

      expect(container).toHaveTextContent('로딩 중');
    });
  });

  context('when loaded', () => {
    given('isLoading', () => false);

    it('renders tickers', () => {
      const { container } = renderKimpContainer();

      TICKERS.forEach(
        (ticker) => expect(container).toHaveTextContent(ticker),
      );
    });
  });
});
