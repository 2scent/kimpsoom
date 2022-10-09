import { renderWithClient } from '@/shared/utils/testing/react-query';

import useExchangeRate from '@/shared/hooks/useExchangeRate';

import calculatePremium from '../utils/calculatePremium';

import KimpItem from './KimpItem';

jest.mock('@/shared/hooks/useExchangeRate');

describe('KimpItem', () => {
  const coin = {
    ticker: 'BTC',
    koreaPrice: 2946000,
    foreignPrice: 21374.5,
  };
  const exchangeRate = 1338.5;

  beforeEach(() => {
    (useExchangeRate as jest.Mock).mockReturnValue({ data: exchangeRate });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderKimpItem = () => renderWithClient((
    <KimpItem
      coin={coin}
    />
  ));

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
