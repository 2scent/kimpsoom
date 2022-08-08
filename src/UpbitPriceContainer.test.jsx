import { render } from '@testing-library/react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import useUpbit from './hooks/useUpbit';

import UpbitPriceContainer from './UpbitPriceContainer';

jest.mock('./hooks/useUpbit');
jest.mock('./hooks/useConnectUpbit');

describe('UpbitPriceContainer', () => {
  const upbitPrice = 31737000;

  beforeEach(() => {
    useUpbit.mockImplementation(() => ({
      isLoading: given.isLoading,
      data: upbitPrice,
    }));
  });

  const queryClient = new QueryClient();

  const renderUpbitPriceContainer = () => render((
    <QueryClientProvider client={queryClient}>
      <UpbitPriceContainer />
    </QueryClientProvider>
  ));

  context('when loading', () => {
    given('isLoading', () => true);

    it('renders loading', () => {
      const { container } = renderUpbitPriceContainer();

      expect(container).toHaveTextContent('로딩 중');
    });
  });

  context('when loaded', () => {
    given('isLoading', () => false);

    it('renders upbit price', async () => {
      const { container } = renderUpbitPriceContainer();

      expect(container).toHaveTextContent(upbitPrice.toLocaleString());
    });
  });
});
