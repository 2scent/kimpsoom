import useConnectBybit from './hooks/useConnectBybit';

import BybitPrice from './BybitPrice';

export default function Bybit({ coins }) {
  useConnectBybit(coins.map((coin) => coin.name));

  return (
    <ul>
      {coins.map((coin) => (
        <BybitPrice
          key={coin.name}
          coin={coin}
        />
      ))}
    </ul>
  );
}
