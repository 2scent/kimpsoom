import { render } from '@testing-library/react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import useUpbitPrice from '../hooks/useUpbitPrice';
import useBybitPrice from '../hooks/useBybitPrice';
import useExchangeRate from '../hooks/useExchangeRate';

import KimpItem from './KimpItem';
import calculatePremium from '../utils/calculatePremium';

jest.mock('../hooks/useBybitPrice');
jest.mock('../hooks/useExchangeRate');
jest.mock('../hooks/useUpbitPrice');

describe('KimpItem', () => {
  const ticker = 'BTC';
  const koreaPrice = 2946000;
  const foreignPrice = 21374.5;
  const exchangeRate = 1338.5;

  const queryClient = new QueryClient();

  const renderKimpItem = () => render((
    <QueryClientProvider client={queryClient}>
      <KimpItem
        ticker={ticker}
      />
    </QueryClientProvider>
  ));

  beforeEach(() => {
    useUpbitPrice.mockImplementation(() => ({
      data: koreaPrice,
    }));

    useBybitPrice.mockImplementation(() => ({
      data: foreignPrice,
    }));

    useExchangeRate.mockImplementation(() => ({
      data: exchangeRate,
    }));
  });

  it('renders ticker', () => {
    const { container } = renderKimpItem();

    expect(container).toHaveTextContent(ticker);
  });

  it('renders korea price', () => {
    const { container } = renderKimpItem();

    expect(container).toHaveTextContent(koreaPrice.toLocaleString());
  });

  it('renders foreign price', () => {
    const { container } = renderKimpItem();

    expect(container).toHaveTextContent(foreignPrice.toLocaleString());
  });

  it('renders premium', () => {
    const { container } = renderKimpItem();

    const premium = calculatePremium({
      koreaPrice,
      foreignPrice,
      exchangeRate,
    });

    expect(container).toHaveTextContent(`${premium} %`);
  });
});
