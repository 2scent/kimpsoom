export interface Coin {
  readonly ticker: Ticker;
  readonly koreaPrice: Price;
  readonly foreignPrice: Price;
  readonly exchangeRate: Rate;
}
