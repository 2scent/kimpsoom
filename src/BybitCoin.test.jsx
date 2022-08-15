import { render } from '@testing-library/react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import BYBIT_COINS from '../fixtures/bybit-coins';

import useBybitPrice from './hooks/useBybitPrice';

import BybitCoin from './BybitCoin';

jest.mock('./hooks/useBybitPrice');

describe('BybitCoin', () => {
  const coin = BYBIT_COINS[0];
  const price = '24138.50';

  const queryClient = new QueryClient();

  const renderBybitCoin = () => render((
    <QueryClientProvider client={queryClient}>
      <BybitCoin
        coin={coin}
      />
    </QueryClientProvider>
  ));

  beforeEach(() => {
    useBybitPrice.mockImplementation(() => ({
      isLoading: given.isLoading,
      data: price,
    }));
  });

  it('renders code', () => {
    const { container } = renderBybitCoin();

    expect(container).toHaveTextContent(coin.name);
  });

  context('when loaded', () => {
    given('isLoading', () => false);

    it('renders price', () => {
      const { container } = renderBybitCoin();

      expect(container).toHaveTextContent(price);
    });
  });
});
