import { renderWithClient } from '@/shared/utils/react-query-testing';

import useExchangeRate from '@/shared/hooks/use-exchange-rate';

import calculateKimp from '../utils/calculate-kimp.ts';

import KimpItem from './KimpItem';

jest.mock('@/shared/hooks/use-exchange-rate');

describe('KimpItem', () => {
  const TICKER = 'BTC';
  const KOREAN_PRICE = 2946000;
  const FOREIGN_PRICE = 21374.5;
  const EXCHANGE_RATE = 1338.5;

  beforeAll(() => {
    (useExchangeRate as jest.Mock).mockReturnValue({ data: EXCHANGE_RATE });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderKimpItem = ({
    koreanPrice,
    foreignPrice,
  }: {
    koreanPrice?: number;
    foreignPrice?: number;
  }) => {
    const coin = {
      ticker: TICKER,
      koreanPrice,
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

  context('with korean price', () => {
    const renderKimpItemWithKoreanPrice = () => renderKimpItem({
      koreanPrice: KOREAN_PRICE,
    });

    it('renders korean price', () => {
      const { container } = renderKimpItemWithKoreanPrice();

      expect(container).toHaveTextContent(KOREAN_PRICE.toLocaleString());
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
      koreanPrice: KOREAN_PRICE,
      foreignPrice: FOREIGN_PRICE,
    });

    it('renders price difference', () => {
      const { container } = renderKimpItemWithBothPrices();

      const difference = KOREAN_PRICE - (FOREIGN_PRICE * EXCHANGE_RATE);

      expect(container).toHaveTextContent(difference.toLocaleString());
    });

    it('renders kimchi premium', () => {
      const { container } = renderKimpItemWithBothPrices();

      const premium = calculateKimp({
        koreanPrice: KOREAN_PRICE,
        foreignPrice: FOREIGN_PRICE,
        exchangeRate: EXCHANGE_RATE,
      });

      expect(container).toHaveTextContent(`${premium}%`);
    });
  });
});
