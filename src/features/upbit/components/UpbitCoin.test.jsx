import { render } from '@testing-library/react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import UPBIT_COINS from '../../../../fixtures/upbit-coins';

import useUpbitPrice from '../hooks/useUpbitPrice';

import UpbitCoin from './UpbitCoin';

jest.mock('../hooks/useUpbitPrice');

describe('UpbitCoin', () => {
  const coin = UPBIT_COINS[0];
  const price = 32346000;

  const queryClient = new QueryClient();

  const renderUpbitCoin = () => render((
    <QueryClientProvider client={queryClient}>
      <UpbitCoin
        coin={coin}
      />
    </QueryClientProvider>
  ));

  beforeEach(() => {
    useUpbitPrice.mockImplementation(() => ({
      isLoading: given.isLoading,
      data: price,
    }));
  });

  it('renders code', () => {
    const { container } = renderUpbitCoin();

    expect(container).toHaveTextContent(coin.market);
  });

  context('when loaded', () => {
    given('isLoading', () => false);

    it('renders price', () => {
      const { container } = renderUpbitCoin();

      expect(container).toHaveTextContent(price.toLocaleString());
    });
  });
});
