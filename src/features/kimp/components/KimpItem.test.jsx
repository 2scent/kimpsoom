import { render } from '@testing-library/react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { useExchangeRate } from '@/features/exchange-rate';

import calculatePremium from '../utils/calculatePremium';

import KimpItem from './KimpItem';

jest.mock('@/features/exchange-rate');

describe('KimpItem', () => {
  const coin = {
    ticker: 'BTC',
    koreaPrice: 2946000,
    foreignPrice: 21374.5,
  };
  const exchangeRate = 1338.5;

  const queryClient = new QueryClient();

  const renderKimpItem = () => render((
    <QueryClientProvider client={queryClient}>
      <KimpItem
        coin={coin}
      />
    </QueryClientProvider>
  ));

  beforeEach(() => {
    useExchangeRate.mockImplementation(() => ({
      data: exchangeRate,
    }));
  });

  it('renders ticker', () => {
    const { container } = renderKimpItem();

    expect(container).toHaveTextContent(coin.ticker);
  });

  it('renders korea price', () => {
    const { container } = renderKimpItem();

    expect(container).toHaveTextContent(coin.koreaPrice.toLocaleString());
  });

  it('renders foreign price', () => {
    const { container } = renderKimpItem();

    expect(container).toHaveTextContent(coin.foreignPrice.toLocaleString());
  });

  it('renders price difference', () => {
    const { container } = renderKimpItem();

    const difference = coin.koreaPrice - (coin.foreignPrice * exchangeRate);

    expect(container).toHaveTextContent(difference.toLocaleString());
  });

  it('renders kimchi premium', () => {
    const { container } = renderKimpItem();

    const premium = calculatePremium({
      koreaPrice: coin.koreaPrice,
      foreignPrice: coin.foreignPrice,
      exchangeRate,
    });

    expect(container).toHaveTextContent(`${premium}%`);
  });
});
