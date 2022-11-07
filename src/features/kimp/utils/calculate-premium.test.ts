import calculatePremium from './calculate-premium';

describe('calculatePremium', () => {
  const koreanPrice = 2946000;
  const foreignPrice = 21374.5;
  const exchangeRate = 1338.5;

  context('with valid parameters', () => {
    it('returns premium(%)', () => {
      const premium = calculatePremium({
        koreanPrice,
        foreignPrice,
        exchangeRate,
      });

      expect(premium).toBe(
        ((koreanPrice / (foreignPrice * exchangeRate)) * 100 - 100).toFixed(2),
      );
    });
  });

  context('without koreanPrice', () => {
    it('returns empty string', () => {
      const premium = calculatePremium({
        foreignPrice,
        exchangeRate,
      });

      expect(premium).toBe('');
    });
  });

  context('without foreignPrice', () => {
    it('returns empty string', () => {
      const premium = calculatePremium({
        koreanPrice,
        exchangeRate,
      });

      expect(premium).toBe('');
    });
  });

  context('without exchangeRate', () => {
    it('returns empty string', () => {
      const premium = calculatePremium({
        koreanPrice,
        foreignPrice,
      });

      expect(premium).toBe('');
    });
  });
});
