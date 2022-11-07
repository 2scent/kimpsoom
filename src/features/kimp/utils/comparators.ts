export interface Coin {
  ticker: string;
  koreanPrice?: number;
  foreignPrice?: number;
  kimp?: unknown;
}

export function tickerCompartor(firstCoin: Coin, secondCoin: Coin) {
  if (firstCoin.ticker > secondCoin.ticker) {
    return -1;
  }
  if (firstCoin.ticker < secondCoin.ticker) {
    return 1;
  }
  return 0;
}

export function koreanPriceComparator(firstCoin: Coin, secondCoin: Coin) {
  const firstKoreanPrice = firstCoin.koreanPrice ?? 0;
  const secondKoreanPrice = secondCoin.koreanPrice ?? 0;

  return firstKoreanPrice - secondKoreanPrice;
}

export function foreignPriceComparator(firstCoin: Coin, secondCoin: Coin) {
  const firstForeignPrice = firstCoin.foreignPrice ?? 0;
  const secondForeignPrice = secondCoin.foreignPrice ?? 0;

  return firstForeignPrice - secondForeignPrice;
}

function calculateRate(koreanPrice?: number, foreignPrice?: number) {
  if (!koreanPrice || !foreignPrice) return 0;
  return koreanPrice / foreignPrice;
}

export function kimpComparator(firstCoin: Coin, secondCoin: Coin) {
  const firstRate = calculateRate(firstCoin.koreanPrice, firstCoin.foreignPrice);
  const secondRate = calculateRate(secondCoin.koreanPrice, secondCoin.foreignPrice);

  return firstRate - secondRate;
}
