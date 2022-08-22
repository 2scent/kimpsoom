import axios from 'axios';

export default async function fetchUpbitTickers() {
  const url = 'https://api.upbit.com/v1/market/all';

  const response = await axios.get(url);

  return response.data
    .filter((coin) => coin.market.startsWith('KRW'))
    .map((coin) => coin.market)
    .map((market) => market.split('-')[1]);
}
