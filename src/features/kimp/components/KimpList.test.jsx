import { render } from '@testing-library/react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import TICKERS from '@fixtures/tickers';

import useConnectBybit from '../hooks/useConnectBybit';
import useConnectUpbit from '../hooks/useConnectUpbit';

import KimpList from './KimpList';

jest.mock('../hooks/useConnectBybit');
jest.mock('../hooks/useConnectUpbit');

describe('KimpList', () => {
  const queryClient = new QueryClient();

  const renderKimpList = () => render((
    <QueryClientProvider client={queryClient}>
      <KimpList
        tickers={TICKERS}
      />
    </QueryClientProvider>
  ));

  it('renders tickers', () => {
    const { container } = renderKimpList();

    TICKERS.forEach(
      (ticker) => expect(container).toHaveTextContent(ticker),
    );
  });

  it('calls useConnectUpbit with tickers', () => {
    renderKimpList();

    expect(useConnectUpbit).toBeCalledWith({
      tickers: TICKERS,
    });
  });

  it('calls useConnectBybit with tickers', () => {
    renderKimpList();

    expect(useConnectBybit).toBeCalledWith({
      tickers: TICKERS,
    });
  });
});
