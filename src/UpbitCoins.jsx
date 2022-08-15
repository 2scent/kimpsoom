import useConnectUpbit from './hooks/useConnectUpbit';

import UpbitCoin from './UpbitCoin';

export default function UpbitCoins({ coins }) {
  useConnectUpbit({
    codes: coins.map((coin) => coin.market),
  });

  return (
    <ul>
      {coins.map((coin) => (
        <UpbitCoin
          key={coin.market}
          coin={coin}
        />
      ))}
    </ul>
  );
}
