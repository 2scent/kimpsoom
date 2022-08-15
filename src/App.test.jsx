import { render } from '@testing-library/react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import UPBIT_COINS from '../fixtures/upbit-coins';
import BYBIT_COINS from '../fixtures/bybit-coins';

import useExchangeRate from './hooks/useExchangeRate';
import useUpbitCoins from './hooks/useUpbitCoins';
import useBybitCoins from './hooks/useBybitCoins';

import App from './App';

jest.mock('./hooks/useExchangeRate');
jest.mock('./hooks/useUpbitCoins');
jest.mock('./hooks/useConnectUpbit');
jest.mock('./hooks/useBybitCoins');
jest.mock('./hooks/useConnectBybit');

describe('App', () => {
  beforeEach(() => {
    useExchangeRate.mockReturnValue({
      data: 1312.00,
    });

    useUpbitCoins.mockReturnValue({
      data: UPBIT_COINS,
    });

    useBybitCoins.mockReturnValue({
      data: BYBIT_COINS,
    });
  });

  const queryClient = new QueryClient();

  const renderApp = () => render((
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  ));

  it('renders heading', () => {
    const { container } = renderApp();

    expect(container).toHaveTextContent('KIMPSOOM');
  });

  it('renders exchange rate', () => {
    const { container } = renderApp();

    expect(container).toHaveTextContent('환율');
  });

  it('renders upbit container', () => {
    const { container } = renderApp();

    expect(container).toHaveTextContent('업비트');
  });

  it('renders bybit container', () => {
    const { container } = renderApp();

    expect(container).toHaveTextContent('바이비트');
  });
});
