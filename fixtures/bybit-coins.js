const bybitCoins = [
  {
    name: 'BTCUSDT',
    alias: 'BTCUSDT',
    status: 'Trading',
    base_currency: 'BTC',
    quote_currency: 'USDT',
    price_scale: 2,
    taker_fee: '0.0006',
    maker_fee: '0.0001',
    funding_interval: 480,
    leverage_filter: {
      min_leverage: 1,
      max_leverage: 100,
      leverage_step: '0.01',
    },
    price_filter: {
      min_price: '0.5',
      max_price: '999999',
      tick_size: '0.5',
    },
    lot_size_filter: {
      max_trading_qty: 20,
      min_trading_qty: 0.001,
      qty_step: 0.001,
      post_only_max_trading_qty: '100',
    },
  },
  {
    name: 'ETHUSDT',
    alias: 'ETHUSDT',
    status: 'Trading',
    base_currency: 'ETH',
    quote_currency: 'USDT',
    price_scale: 2,
    taker_fee: '0.0006',
    maker_fee: '0.0001',
    funding_interval: 480,
    leverage_filter: {
      min_leverage: 1,
      max_leverage: 100,
      leverage_step: '0.01',
    },
    price_filter: {
      min_price: '0.05',
      max_price: '99999.9',
      tick_size: '0.05',
    },
    lot_size_filter: {
      max_trading_qty: 1000,
      min_trading_qty: 0.01,
      qty_step: 0.01,
      post_only_max_trading_qty: '5000',
    },
  }, {
    name: 'BTCUSD',
    alias: 'BTCUSD',
    status: 'Trading',
    base_currency: 'BTC',
    quote_currency: 'USD',
    price_scale: 2,
    taker_fee: '0.0006',
    maker_fee: '0.0001',
    funding_interval: 480,
    leverage_filter: {
      min_leverage: 1,
      max_leverage: 100,
      leverage_step: '0.01',
    },
    price_filter: {
      min_price: '0.5',
      max_price: '999999',
      tick_size: '0.5',
    },
    lot_size_filter: {
      max_trading_qty: 2000000,
      min_trading_qty: 1,
      qty_step: 1,
      post_only_max_trading_qty: '10000000',
    },
  },
];

export default bybitCoins;
