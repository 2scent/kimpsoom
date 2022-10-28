export interface Coin {
  ticker: string;
  koreaPrice?: number;
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

export function koreaPriceComparator(firstCoin: Coin, secondCoin: Coin) {
  const firstKoreaPrice = firstCoin.koreaPrice ?? 0;
  const secondKoreaPrice = secondCoin.koreaPrice ?? 0;

  return firstKoreaPrice - secondKoreaPrice;
}

export function foreignPriceComparator(firstCoin: Coin, secondCoin: Coin) {
  const firstForeignPrice = firstCoin.foreignPrice ?? 0;
  const secondForeignPrice = secondCoin.foreignPrice ?? 0;

  return firstForeignPrice - secondForeignPrice;
}

function calculateRate(koreaPrice?: number, foreignPrice?: number) {
  if (!koreaPrice || !foreignPrice) return 0;
  return koreaPrice / foreignPrice;
}

export function kimpComparator(firstCoin: Coin, secondCoin: Coin) {
  const firstRate = calculateRate(firstCoin.koreaPrice, firstCoin.foreignPrice);
  const secondRate = calculateRate(secondCoin.koreaPrice, secondCoin.foreignPrice);

  return firstRate - secondRate;
}
