import axios from 'axios';

interface Market {
  market: string;
}

export default async function fetchUpbitTickers(): Promise<string[]> {
  const url = 'https://api.upbit.com/v1/market/all';

  const response = await axios.get<Market[]>(url);

  return response.data
    .filter((market) => market.market.startsWith('KRW'))
    .map((market) => market.market)
    .map((market) => market.split('-')[1]);
}
