import axios from 'axios';

import { Rate } from '@/shared/models';

export default async function fetchExchangeRate(): Promise<Rate> {
  const url = 'https://quotation-api-cdn.dunamu.com/v1/forex/recent?codes=FRX.KRWUSD';

  const response = await axios.get(url);

  return response.data[0].basePrice;
}
