import axios from 'axios';

export async function fetchUpbitCoins() {
  const url = 'https://api.upbit.com/v1/market/all';

  const response = await axios.get(url);

  return response.data;
}

export async function fetchBybitCoins() {
  const url = 'https://api-testnet.bybit.com/v2/public/symbols';

  const response = await axios.get(url);

  return response.data.result;
}

export async function fetchExchangeRate() {
  const url = 'https://quotation-api-cdn.dunamu.com/v1/forex/recent?codes=FRX.KRWUSD';

  const response = await axios.get(url);

  return response.data[0].basePrice;
}
