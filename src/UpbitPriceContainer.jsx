import useConnectUpbit from './hooks/useConnectUpbit';
import Price from './Price';

export default function UpbitPriceContainer({ coins }) {
  useConnectUpbit(coins.map((coin) => coin.market));

  return (
    <ul>
      {
        coins.map((coin) => (
          <Price
            key={coin.market}
            coin={coin}
          />
        ))
      }
    </ul>
  );
}
