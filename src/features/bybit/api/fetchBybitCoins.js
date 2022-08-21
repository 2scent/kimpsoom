import axios from 'axios';

export default async function fetchBybitCoins() {
  const url = 'https://api-testnet.bybit.com/v2/public/symbols';

  const response = await axios.get(url);

  return response.data.result;
}
