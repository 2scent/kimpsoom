import calculateKimp from './calculate-kimp';

describe('calculateKimp', () => {
  const koreanPrice = 2946000;
  const foreignPrice = 21374.5;
  const exchangeRate = 1338.5;

  context('with valid parameters', () => {
    it('returns premium(%)', () => {
      const premium = calculateKimp({
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
      const premium = calculateKimp({
        foreignPrice,
        exchangeRate,
      });

      expect(premium).toBe('');
    });
  });

  context('without foreignPrice', () => {
    it('returns empty string', () => {
      const premium = calculateKimp({
        koreanPrice,
        exchangeRate,
      });

      expect(premium).toBe('');
    });
  });

  context('without exchangeRate', () => {
    it('returns empty string', () => {
      const premium = calculateKimp({
        koreanPrice,
        foreignPrice,
      });

      expect(premium).toBe('');
    });
  });
});
