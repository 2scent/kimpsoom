import calculatePremium from './calculatePremium';

describe('calculatePremium', () => {
  const koreaPrice = 2946000;
  const foreignPrice = 21374.5;
  const exchangeRate = 1338.5;

  context('with valid parameters', () => {
    it('returns premium(%)', () => {
      const premium = calculatePremium({
        koreaPrice,
        foreignPrice,
        exchangeRate,
      });

      expect(premium).toBe(
        ((koreaPrice / (foreignPrice * exchangeRate)) * 100 - 100).toFixed(2),
      );
    });
  });

  context('without koreaPrice', () => {
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
        koreaPrice,
        exchangeRate,
      });

      expect(premium).toBe('');
    });
  });

  context('without exchangeRate', () => {
    it('returns empty string', () => {
      const premium = calculatePremium({
        koreaPrice,
        foreignPrice,
      });

      expect(premium).toBe('');
    });
  });
});
