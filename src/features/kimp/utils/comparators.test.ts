import {
  foreignPriceComparator,
  kimpComparator,
  koreanPriceComparator,
  tickerCompartor,
} from './comparators';

describe('comparators', () => {
  describe('tickerComprator', () => {
    context('when first coin ticker is greater', () => {
      const firstCoin = { ticker: 'ETH' };
      const secondCoin = { ticker: 'BTC' };

      it('returns -1', () => {
        const result = tickerCompartor(firstCoin, secondCoin);

        expect(result).toBe(-1);
      });
    });

    context('when second coin ticker is greater', () => {
      const firstCoin = { ticker: 'BTC' };
      const secondCoin = { ticker: 'ETH' };

      it('returns 1', () => {
        const result = tickerCompartor(firstCoin, secondCoin);

        expect(result).toBe(1);
      });
    });

    context('when two coin tickers are the same', () => {
      const firstCoin = { ticker: 'BTC' };
      const secondCoin = { ticker: 'BTC' };

      it('returns zero', () => {
        const result = tickerCompartor(firstCoin, secondCoin);

        expect(result).toBe(0);
      });
    });
  });

  describe('koreanPriceComparator', () => {
    context('when both coins have korean price', () => {
      const firstCoin = {
        ticker: 'BTC',
        koreanPrice: 20000,
      };

      const secondCoin = {
        ticker: 'ETH',
        koreanPrice: 10000,
      };

      it('returns korean price difference between two coins', () => {
        const result = koreanPriceComparator(firstCoin, secondCoin);

        expect(result).toBeGreaterThan(0);
      });
    });

    context("when first coin doesn't have korean price", () => {
      const firstCoin = {
        ticker: 'BTC',
      };

      const secondCoin = {
        ticker: 'ETH',
        koreanPrice: 10000,
      };

      it('assumes korean price of first coin is zero.', () => {
        const result = koreanPriceComparator(firstCoin, secondCoin);

        expect(result).toBe(-10000);
      });
    });

    context("when second coin doesn't have korean price", () => {
      const firstCoin = {
        ticker: 'BTC',
        koreanPrice: 20000,
      };

      const secondCoin = {
        ticker: 'ETH',
      };

      it('assumes korean price of second coin is zero.', () => {
        const result = koreanPriceComparator(firstCoin, secondCoin);

        expect(result).toBe(20000);
      });
    });
  });

  describe('foreignPriceComparator', () => {
    context('when both coins have foreign price', () => {
      const firstCoin = {
        ticker: 'BTC',
        foreignPrice: 20000,
      };

      const secondCoin = {
        ticker: 'ETH',
        foreignPrice: 10000,
      };

      it('returns foreign price difference between two coins', () => {
        const result = foreignPriceComparator(firstCoin, secondCoin);

        expect(result).toBeGreaterThan(0);
      });
    });

    context("when first coin doesn't have foreign price", () => {
      const firstCoin = {
        ticker: 'BTC',
      };

      const secondCoin = {
        ticker: 'ETH',
        foreignPrice: 10000,
      };

      it('assumes foreign price of first coin is zero.', () => {
        const result = foreignPriceComparator(firstCoin, secondCoin);

        expect(result).toBe(-10000);
      });
    });

    context("when second coin doesn't have foreign price", () => {
      const firstCoin = {
        ticker: 'BTC',
        foreignPrice: 20000,
      };

      const secondCoin = {
        ticker: 'ETH',
      };

      it('assumes foreign price of second coin is zero.', () => {
        const result = foreignPriceComparator(firstCoin, secondCoin);

        expect(result).toBe(20000);
      });
    });
  });

  describe('kimpComparator', () => {
    context('when both coins have korean price and foreign price', () => {
      const firstCoin = {
        ticker: 'BTC',
        koreanPrice: 20000,
        foreignPrice: 2500,
      };

      const secondCoin = {
        ticker: 'ETH',
        koreanPrice: 10000,
        foreignPrice: 1000,
      };

      it('returns rate (korean price / foreign price) difference between two coins', () => {
        const result = kimpComparator(firstCoin, secondCoin);

        expect(result).toBe(-2);
      });
    });

    context("when first coin doesn't have korean price or foreign price", () => {
      const firstCoin = {
        ticker: 'BTC',
      };

      const secondCoin = {
        ticker: 'ETH',
        koreanPrice: 10000,
        foreignPrice: 1000,
      };

      it('assumes first coin rate is zero.', () => {
        const result = kimpComparator(firstCoin, secondCoin);

        expect(result).toBe(-10);
      });
    });

    context("when second coin doesn't have korean price or foreign price", () => {
      const firstCoin = {
        ticker: 'BTC',
        koreanPrice: 20000,
        foreignPrice: 2500,
      };

      const secondCoin = {
        ticker: 'ETH',
      };

      it('assumes second coin rate is zero.', () => {
        const result = kimpComparator(firstCoin, secondCoin);

        expect(result).toBe(8);
      });
    });
  });
});
