import given2 from 'given2';

declare global {
  const given: typeof given2;

  type Ticker = string;

  type Price = number;

  type Rate = number;
}
