import useConnectBybit from './hooks/useConnectBybit';

import BybitCoin from './BybitCoin';

export default function BybitCoins({ coins }) {
  useConnectBybit({
    codes: coins.map((coin) => coin.name),
  });

  return (
    <ul>
      {coins.map((coin) => (
        <BybitCoin
          key={coin.name}
          coin={coin}
        />
      ))}
    </ul>
  );
}
