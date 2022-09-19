import axios from 'axios';

type Coin = {
  market: string;
}

export default async function fetchUpbitTickers(): Promise<string[]> {
  const url = 'https://api.upbit.com/v1/market/all';

  const response = await axios.get<Coin[]>(url);

  return response.data
    .filter((coin) => coin.market.startsWith('KRW'))
    .map((coin) => coin.market)
    .map((market) => market.split('-')[1]);
}
