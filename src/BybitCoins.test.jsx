import { render } from '@testing-library/react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import BYBIT_COINS from '../fixtures/bybit-coins';

import useConnectBybit from './hooks/useConnectBybit';

import BybitCoins from './BybitCoins';

jest.mock('./hooks/useConnectBybit');

describe('BybitCoins', () => {
  const queryClient = new QueryClient();

  const renderBybitCoins = () => render((
    <QueryClientProvider client={queryClient}>
      <BybitCoins
        coins={BYBIT_COINS}
      />
    </QueryClientProvider>
  ));

  it('renders bybit coins', () => {
    const { container } = renderBybitCoins();

    BYBIT_COINS.forEach(
      (coin) => expect(container).toHaveTextContent(coin.name),
    );
  });

  it('calls useConnectBybit with coin codes', () => {
    renderBybitCoins();

    expect(useConnectBybit).toBeCalledWith({
      codes: BYBIT_COINS.map((coin) => coin.name),
    });
  });
});
