import { render } from '@testing-library/react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import UPBIT_COINS from '../../../../fixtures/upbit-coins';

import useConnectUpbit from '../hooks/useConnectUpbit';

import UpbitCoins from './UpbitCoins';

jest.mock('../hooks/useConnectUpbit');

describe('UpbitCoins', () => {
  const queryClient = new QueryClient();

  const renderUpbitCoins = () => render((
    <QueryClientProvider client={queryClient}>
      <UpbitCoins
        coins={UPBIT_COINS}
      />
    </QueryClientProvider>
  ));

  it('renders upbit coins', () => {
    const { container } = renderUpbitCoins();

    UPBIT_COINS.forEach(
      (coin) => expect(container).toHaveTextContent(coin.market),
    );
  });

  it('calls useConnectUpbit with coin codes', () => {
    renderUpbitCoins();

    expect(useConnectUpbit).toBeCalledWith({
      codes: UPBIT_COINS.map((coin) => coin.market),
    });
  });
});
