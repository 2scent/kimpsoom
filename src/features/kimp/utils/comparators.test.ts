import {
  foreignPriceComparator,
  kimpComparator,
  koreaPriceComparator,
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

  describe('koreaPriceComparator', () => {
    context('when both coins have korea price', () => {
      const firstCoin = {
        ticker: 'BTC',
        koreaPrice: 20000,
      };

      const secondCoin = {
        ticker: 'ETH',
        koreaPrice: 10000,
      };

      it('returns korea price difference between two coins', () => {
        const result = koreaPriceComparator(firstCoin, secondCoin);

        expect(result).toBeGreaterThan(0);
      });
    });

    context("when first coin doesn't have korea price", () => {
      const firstCoin = {
        ticker: 'BTC',
      };

      const secondCoin = {
        ticker: 'ETH',
        koreaPrice: 10000,
      };

      it('assumes korea price of first coin is zero.', () => {
        const result = koreaPriceComparator(firstCoin, secondCoin);

        expect(result).toBe(-10000);
      });
    });

    context("when second coin doesn't have korea price", () => {
      const firstCoin = {
        ticker: 'BTC',
        koreaPrice: 20000,
      };

      const secondCoin = {
        ticker: 'ETH',
      };

      it('assumes korea price of second coin is zero.', () => {
        const result = koreaPriceComparator(firstCoin, secondCoin);

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
    context('when both coins have korea price and foreign price', () => {
      const firstCoin = {
        ticker: 'BTC',
        koreaPrice: 20000,
        foreignPrice: 2500,
      };

      const secondCoin = {
        ticker: 'ETH',
        koreaPrice: 10000,
        foreignPrice: 1000,
      };

      it('returns rate (korea price / foreign price) difference between two coins', () => {
        const result = kimpComparator(firstCoin, secondCoin);

        expect(result).toBe(-2);
      });
    });

    context("when first coin doesn't have korea price or foreign price", () => {
      const firstCoin = {
        ticker: 'BTC',
      };

      const secondCoin = {
        ticker: 'ETH',
        koreaPrice: 10000,
        foreignPrice: 1000,
      };

      it('assumes first coin rate is zero.', () => {
        const result = kimpComparator(firstCoin, secondCoin);

        expect(result).toBe(-10);
      });
    });

    context("when second coin doesn't have korea price or foreign price", () => {
      const firstCoin = {
        ticker: 'BTC',
        koreaPrice: 20000,
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
