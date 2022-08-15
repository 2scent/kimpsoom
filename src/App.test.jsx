import { render } from '@testing-library/react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import UPBIT_COINS from '../fixtures/upbit-coins';

import useUpbitCoins from './hooks/useUpbitCoins';

import App from './App';

jest.mock('./hooks/useUpbitCoins');
jest.mock('./hooks/useConnectUpbit');

describe('App', () => {
  beforeEach(() => {
    useUpbitCoins.mockReturnValue({
      data: UPBIT_COINS,
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

  it('renders upbit bitcoin price', () => {
    const { container } = renderApp();

    expect(container).toHaveTextContent(UPBIT_COINS[0].market);
  });
});
