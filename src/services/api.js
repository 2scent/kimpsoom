import axios from 'axios';

export async function fetchUpbitCoins() {
  const url = 'https://api.upbit.com/v1/market/all';

  const response = await axios.get(url);

  return response.data;
}

export function xxx() {}
