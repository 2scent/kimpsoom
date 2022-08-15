import useConnectUpbit from './hooks/useConnectUpbit';

import UpbitPrice from './UpbitPrice';

export default function UpbitPriceContainer({ coins }) {
  useConnectUpbit(coins.map((coin) => coin.market));

  return (
    <ul>
      {coins.map((coin) => (
        <UpbitPrice
          key={coin.market}
          coin={coin}
        />
      ))}
    </ul>
  );
}
