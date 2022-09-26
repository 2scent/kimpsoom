export type Ticker = string;

export type Price = number;

export type Rate = number;

export interface Coin {
  ticker: Ticker;
  koreaPrice: Price;
  foreignPrice: Price;
  exchangeRate: Rate;
}
