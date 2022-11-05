import { renderWithClient } from '@/shared/utils/testing/react-query';

import useExchangeRate from '@/shared/hooks/useExchangeRate';

import calculatePremium from '../utils/calculatePremium';

import KimpItem from './KimpItem';

jest.mock('@/shared/hooks/useExchangeRate');

describe('KimpItem', () => {
  const TICKER = 'BTC';
  const KOREA_PRICE = 2946000;
  const FOREIGN_PRICE = 21374.5;
  const EXCHANGE_RATE = 1338.5;

  beforeAll(() => {
    (useExchangeRate as jest.Mock).mockReturnValue({ data: EXCHANGE_RATE });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderKimpItem = ({
    koreaPrice,
    foreignPrice,
  }: {
    koreaPrice?: number;
    foreignPrice?: number;
  }) => {
    const coin = {
      ticker: TICKER,
      koreaPrice,
      foreignPrice,
    };

    return renderWithClient((
      <table>
        <tbody>
          <KimpItem coin={coin} />
        </tbody>
      </table>
    ));
  };

  it('renders ticker', () => {
    const { container } = renderKimpItem({});

    expect(container).toHaveTextContent(TICKER);
  });

  context('with korea price', () => {
    const renderKimpItemWithKoreaPrice = () => renderKimpItem({
      koreaPrice: KOREA_PRICE,
    });

    it('renders korea price', () => {
      const { container } = renderKimpItemWithKoreaPrice();

      expect(container).toHaveTextContent(KOREA_PRICE.toLocaleString());
    });
  });

  context('with foreign price', () => {
    const renderKimpItemWithForeignPrice = () => renderKimpItem({
      foreignPrice: FOREIGN_PRICE,
    });

    it('renders foreign price', () => {
      const { container } = renderKimpItemWithForeignPrice();

      expect(container).toHaveTextContent(FOREIGN_PRICE.toLocaleString());
    });
  });

  context('with both prices', () => {
    const renderKimpItemWithBothPrices = () => renderKimpItem({
      koreaPrice: KOREA_PRICE,
      foreignPrice: FOREIGN_PRICE,
    });

    it('renders price difference', () => {
      const { container } = renderKimpItemWithBothPrices();

      const difference = KOREA_PRICE - (FOREIGN_PRICE * EXCHANGE_RATE);

      expect(container).toHaveTextContent(difference.toLocaleString());
    });

    it('renders kimchi premium', () => {
      const { container } = renderKimpItemWithBothPrices();

      const premium = calculatePremium({
        koreaPrice: KOREA_PRICE,
        foreignPrice: FOREIGN_PRICE,
        exchangeRate: EXCHANGE_RATE,
      });

      expect(container).toHaveTextContent(`${premium}%`);
    });
  });
});
