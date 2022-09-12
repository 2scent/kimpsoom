import { render } from '@testing-library/react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import useExchangeRate from '@/shared/hooks/useExchangeRate';

import ExchangeRate from './ExchangeRate';

jest.mock('@/shared/hooks/useExchangeRate');

describe('ExchangeRate', () => {
  const exchangeRate = 1312.00;

  beforeEach(() => {
    useExchangeRate.mockImplementation(() => ({
      isLoading: given.isLoading,
      data: exchangeRate,
    }));
  });

  const queryClient = new QueryClient();

  const renderExchangeRate = () => render((
    <QueryClientProvider client={queryClient}>
      <ExchangeRate />
    </QueryClientProvider>
  ));

  it('renders heading', () => {
    const { container } = renderExchangeRate();

    expect(container).toHaveTextContent('환율');
  });

  context('when loading', () => {
    given('isLoading', () => true);

    it('renders loading', () => {
      const { container } = renderExchangeRate();

      expect(container).toHaveTextContent('로딩 중');
    });
  });

  context('when loaded', () => {
    given('isLoading', () => false);

    it('renders exchange rate', () => {
      const { container } = renderExchangeRate();

      expect(container).toHaveTextContent(exchangeRate.toFixed(2));
    });
  });
});
