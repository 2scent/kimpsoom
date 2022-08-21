import { render } from '@testing-library/react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import BYBIT_COINS from '@fixtures/bybit-coins';

import useBybitCoins from '../hooks/useBybitCoins';

import BybitContainer from './BybitContainer';

jest.mock('../hooks/useConnectBybit');
jest.mock('../hooks/useBybitCoins');

describe('BybitContainer', () => {
  beforeEach(() => {
    useBybitCoins.mockImplementation(() => ({
      isLoading: given.isLoading,
      data: BYBIT_COINS,
    }));
  });

  const queryClient = new QueryClient();

  const renderBybitContainer = () => render((
    <QueryClientProvider client={queryClient}>
      <BybitContainer />
    </QueryClientProvider>
  ));

  it('renders heading', () => {
    const { container } = renderBybitContainer();

    expect(container).toHaveTextContent('바이비트');
  });

  context('when loading', () => {
    given('isLoading', () => true);

    it('renders loading', () => {
      const { container } = renderBybitContainer();

      expect(container).toHaveTextContent('로딩 중');
    });
  });

  context('when loaded', () => {
    given('isLoading', () => false);

    it('renders bybit coins', () => {
      const { container } = renderBybitContainer();

      BYBIT_COINS.forEach(
        (coin) => expect(container).toHaveTextContent(coin.name),
      );
    });
  });
});
