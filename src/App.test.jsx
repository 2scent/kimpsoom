import { render } from '@testing-library/react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import useUpbit from './hooks/useUpbit';

import App from './App';

jest.mock('./hooks/useUpbit');
jest.mock('./hooks/useConnectUpbit');

describe('App', () => {
  const upbitPrice = 31737000;

  beforeEach(() => {
    useUpbit.mockReturnValue({
      data: upbitPrice,
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

    expect(container).toHaveTextContent(`업비트 BTC: ${upbitPrice.toLocaleString()}`);
  });
});
