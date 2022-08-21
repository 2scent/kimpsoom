import { render } from '@testing-library/react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import UPBIT_COINS from '../../../../fixtures/upbit-coins';

import useUpbitCoins from '../hooks/useUpbitCoins';

import UpbitContainer from './UpbitContainer';

jest.mock('../hooks/useConnectUpbit');
jest.mock('../hooks/useUpbitCoins');

describe('UpbitContainer', () => {
  beforeEach(() => {
    useUpbitCoins.mockImplementation(() => ({
      isLoading: given.isLoading,
      data: UPBIT_COINS,
    }));
  });

  const queryClient = new QueryClient();

  const renderUpbitContainer = () => render((
    <QueryClientProvider client={queryClient}>
      <UpbitContainer />
    </QueryClientProvider>
  ));

  it('renders heading', () => {
    const { container } = renderUpbitContainer();

    expect(container).toHaveTextContent('업비트');
  });

  context('when loading', () => {
    given('isLoading', () => true);

    it('renders loading', () => {
      const { container } = renderUpbitContainer();

      expect(container).toHaveTextContent('로딩 중');
    });
  });

  context('when loaded', () => {
    given('isLoading', () => false);

    it('renders upbit coins', () => {
      const { container } = renderUpbitContainer();

      UPBIT_COINS.forEach(
        (coin) => expect(container).toHaveTextContent(coin.market),
      );
    });
  });
});
